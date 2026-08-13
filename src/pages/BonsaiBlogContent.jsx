import { BLOG_IMAGES, BLOG_VIDEO } from '../data/localBlogs'

function Figure({ src, alt, caption, wide = false }) {
  return (
    <figure className={wide ? 'my-8' : 'my-0'}>
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
        <img src={src} alt={alt} className="block w-full h-auto" loading="lazy" />
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-slate-500 font-mono leading-relaxed">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

function Stat({ label, value, tone = 'slate' }) {
  const toneClass =
    tone === 'emerald' ? 'border-emerald-200 bg-emerald-50/60' :
    tone === 'amber' ? 'border-amber-200 bg-amber-50/60' :
    tone === 'blue' ? 'border-primary-200 bg-primary-50/60' : 'border-slate-200 bg-slate-50'

  const valueClass =
    tone === 'emerald' ? 'text-emerald-700' :
    tone === 'amber' ? 'text-amber-700' :
    tone === 'blue' ? 'text-primary-700' : 'text-slate-900'

  return (
    <div className={`rounded-xl border p-4 ${toneClass}`}>
      <div className="text-xs font-mono uppercase tracking-[0.18em] text-slate-500">{label}</div>
      <div className={`mt-2 text-2xl font-bold ${valueClass}`}>{value}</div>
    </div>
  )
}

function ProofBlock({ title, file, excerpt }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 md:p-7 not-prose">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <p className="text-xs font-mono uppercase tracking-[0.18em] text-slate-500 mb-1">Proof file</p>
          <p className="text-sm font-semibold text-slate-900">{title}</p>
        </div>
        <span className="text-xs font-mono text-slate-400 shrink-0">{file}</span>
      </div>
      <pre className="mt-4 bg-slate-900 text-slate-100 rounded-xl p-4 text-xs overflow-x-auto font-mono leading-relaxed whitespace-pre-wrap">
{excerpt}
</pre>
    </div>
  )
}

function H2({ children }) {
  return (
    <h2 className="!mt-12 !mb-4 !text-2xl md:!text-3xl !font-bold !text-slate-900">
      <strong>{children}</strong>
    </h2>
  )
}

export default function BonsaiBlogContent() {
  return (
    <article className="prose prose-slate prose-lg max-w-none prose-headings:scroll-mt-24 prose-p:leading-7 prose-li:leading-7 space-y-10">
      <p className="text-slate-500 italic text-lg leading-relaxed mb-8 border-l-2 border-primary-300 pl-4">
        Running a 27B parameter model on an 8GB RTX 4060 laptop, quantized to 1-bit with generic llama.cpp — a stress test of compressed reasoning models.
      </p>

      <div className="not-prose grid grid-cols-1 md:grid-cols-4 gap-4 my-8">
        <Stat label="Model" value="27B params" tone="blue" />
        <Stat label="Quantization" value="Q1_0 (1.125 bits)" tone="amber" />
        <Stat label="Hardware" value="RTX 4060, 8GB VRAM" tone="emerald" />
        <Stat label="Context" value="32K tokens" />
      </div>

      <div className="not-prose my-10">
        <div className="flex items-center gap-4 mb-5">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-rose-500 to-rose-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-rose-500/25">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
            </svg>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold font-display tracking-tight text-slate-900 m-0">
            Watch the analysis
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-slate-200 to-transparent" />
        </div>
        <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-black shadow-xl">
          <video
            controls
            preload="metadata"
            playsInline
            className="w-full max-h-[70vh]"
            style={{ aspectRatio: '16 / 9' }}
            poster={BLOG_IMAGES.bonsai_laptop_analysis}
          >
            <source src={BLOG_VIDEO.bonsai_laptop_analysis} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <p className="text-sm text-slate-400 mt-3 text-center font-mono">
          Hardware telemetry and inference throughput from the same RTX 4060 laptop run.
        </p>
      </div>

      <H2>The ask</H2>
      <p>
        The prompt was straightforward: run a Rust function, then run an agentic research agent with LangChain — both on the heavily quantized Bonsai 27B checkpoint. The key detail is that I used the generic `llama.cpp --pure Q1_0` quantization, not PrismML's purpose-built binary or ternary release. That class of conventional low-bit quantization is exactly what their own benchmarks show collapsing on sustained reasoning tasks.
      </p>
      <blockquote>
        Write a Rust function that takes a Vec<i64> and returns (min, max, sum) using iterators. Include a doc comment and example.
      </blockquote>

      <H2>What the log actually shows</H2>
      <p>
        Task 1 was clean — correct code, real tests, perfect on the first serious attempt. The only failure was environment setup: rustc wasn't installed. The model's output was solid; the machine wasn't ready to run it.

        Tasks 2 and 3 were where the compression trade-off became visible. The agentic project had fabricated APIs, structural gaps, and weak adherence to explicit instructions — precisely the sustained-reasoning failure mode that PrismML's custom compression was designed to avoid.
      </p>

      <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
        <Figure
          src={BLOG_IMAGES.lmstudio_config}
          alt="LM Studio configuration panel for Bonsai 27B"
          caption="Q1_0 quantization, 32K context, GPU-first — nothing held back."
        />
        <Figure
          src={BLOG_IMAGES.gpu_load}
          alt="Task Manager showing RTX 4060 at 98% utilization during inference"
          caption="GPU-bound workload with no CPU offload headroom."
        />
      </div>

      <div className="rounded-xl border-rose-200 bg-rose-50/60 p-5 my-8 not-prose">
        <p className="text-rose-800 font-medium mb-2">The compression trade-off</p>
        <p className="text-rose-700 mb-0">
          The GGUF I ran is a standard llama.cpp conversion quantized with generic Q1_0 — the very class of low-bit method that PrismML's own benchmarks show collapsing on sustained reasoning and coding tasks. That lines up exactly with what I saw: solid output on single-function tasks, but fabricated APIs, structural gaps, and weak instruction adherence on multi-step agentic work.
        </p>
      </div>

      <H2>Auditing the delivered code</H2>
      <ul>
        <li><strong>The ask</strong>: write a Rust function with iterators — correct logic, clean docs, real tests.</li>
        <li><strong>The agent</strong>: fabricated APIs (`ResponseParser`, `output_template`), broken dependencies, syntax errors under plausible-looking surface.</li>
        <li><strong>Instruction adherence</strong>: even explicit mandatory-requirements prompts didn't change the outcome — same lightweight pipeline, same fabricated tools, same structural gaps.</li>
      </ul>

      <H2>Runtime signals</H2>
      <p>
        The screenshots also show that the machine was not the bottleneck. The run had enough CPU and GPU headroom to keep moving; the bottleneck was the model itself, running through a generic 1-bit quantization path. The hardware told one story — the model's output told another.
      </p>

      <div className="not-prose my-8">
        <Figure
          src={BLOG_IMAGES.benchmark_infographic}
          alt="Benchmark infographic summarizing hardware, throughput, and task performance"
          caption="Prompt processing: 109–130 tokens/sec | Generation: 22.8–27.55 tokens/sec | VRAM at ~96-98%."
        />
      </div>

      <H2>Putting it together</H2>
      <div className="overflow-x-auto my-8 not-prose">
        <table className="min-w-full text-sm border border-slate-200 rounded-xl overflow-hidden">
          <thead className="bg-slate-50">
            <tr>
              <th className="text-left py-3 px-4 font-semibold text-slate-700">Observation</th>
              <th className="text-left py-3 px-4 font-semibold text-slate-700">What the evidence says</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-slate-200">
              <td className="py-3 px-4 font-medium text-slate-700">Task scope</td>
              <td className="py-3 px-4 text-slate-600">Single Rust function, plus a multi-file LangChain research agent.</td>
            </tr>
            <tr className="border-t border-slate-200">
              <td className="py-3 px-4 font-medium text-slate-700">Rewrite count</td>
              <td className="py-3 px-4 text-slate-600">About 30 passes on the same broken implementation, no real correction.</td>
            </tr>
            <tr className="border-t border-slate-200">
              <td className="py-3 px-4 font-medium text-slate-700">Confirmed result</td>
              <td className="py-3 px-4 text-slate-600">A real SyntaxError from the delivered file, not a hypothetical concern.</td>
            </tr>
            <tr className="border-t border-slate-200">
              <td className="py-3 px-4 font-medium text-slate-700">Proof artifacts</td>
              <td className="py-3 px-4 text-slate-600">Code files, log files, and transcript excerpts from the research folder.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <H2>Caveats</H2>
      <ul>
        <li>This is a single task, not a broad benchmark suite.</li>
        <li>The GGUF used was a generic llama.cpp Q1_0 conversion — not PrismML's purpose-built binary or ternary release.</li>
        <li>The session behavior is the useful signal here: repeated rewrites without a real fix.</li>
      </ul>

      <H2>Where this leaves me</H2>
      <p>
        The practical lesson is blunt. When a model keeps restating its own plan almost verbatim and the code does not materially change, treat that as a stop signal. The cost of letting it keep going is measured in time, tokens, and false confidence.

        For anything beyond a single function, I'm now treating "did every imported symbol actually exist" and "does the delivered file structure match what I asked for, line by line" as mandatory checks before trusting output from this model — regardless of how detailed the prompt was.
      </p>
    </article>
  )
}
