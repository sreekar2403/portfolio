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
  const toneClass = tone === 'emerald'
    ? 'border-emerald-200 bg-emerald-50/60'
    : tone === 'amber'
      ? 'border-amber-200 bg-amber-50/60'
      : tone === 'blue'
        ? 'border-primary-200 bg-primary-50/60'
        : 'border-slate-200 bg-slate-50'

  const valueClass = tone === 'emerald'
    ? 'text-emerald-700'
    : tone === 'amber'
      ? 'text-amber-700'
      : tone === 'blue'
        ? 'text-primary-700'
        : 'text-slate-900'

  return (
    <div className={`rounded-xl border p-4 ${toneClass}`}>
      <div className="text-xs font-mono uppercase tracking-[0.18em] text-slate-500">{label}</div>
      <div className={`mt-2 text-2xl font-bold ${valueClass}`}>{value}</div>
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

function Table({ headers, rows }) {
  return (
    <div className="overflow-x-auto my-8 not-prose">
      <table className="min-w-full text-sm border border-slate-200 rounded-xl overflow-hidden">
        <thead className="bg-slate-50">
          <tr>
            {headers.map((h, i) => (
              <th key={i} className="text-left py-3 px-4 font-semibold text-slate-700">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t border-slate-200">
              {row.map((cell, j) => (
                <td key={j} className="py-3 px-4 text-slate-600" dangerouslySetInnerHTML={{ __html: cell }} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function NemotronBlogContent() {
  return (
    <article className="prose prose-slate prose-lg max-w-none prose-headings:scroll-mt-24 prose-p:leading-7 prose-li:leading-7 space-y-10">
      <p className="text-slate-500 italic text-lg leading-relaxed mb-8 border-l-2 border-primary-300 pl-4">
        Three tasks, one local model, one RTX 4060 laptop — a field report on running NVIDIA Nemotron-3.5-Lightning through Ollama.
      </p>

      <div className="not-prose my-8">
        <Table
          headers={['Specification', 'Value']}
          rows={[
            ['<strong>Total parameters</strong>', '30B'],
            ['<strong>Active per forward pass</strong>', '~3B'],
            ['<strong>Architecture</strong>', 'Hybrid Mamba-2 + MoE + Attention layers'],
            ['<strong>Context length</strong>', 'Up to 1M tokens (native window 262K)'],
            ['<strong>Precision</strong>', 'BF16 and NVFP4 checkpoints'],
            ['<strong>Quantization (Ollama latest)</strong>', 'Q4_K_M, ~25 GB'],
            ['<strong>Speculative decoding</strong>', 'Native MTP + optional DSpark/DFlash draft models'],
            ['<strong>Release date</strong>', '11 August 2026'],
            ['<strong>License</strong>', 'OpenMDW License Agreement v1.1'],
          ]}
        />
      </div>

      <div className="not-prose my-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1 h-px bg-gradient-to-l from-slate-200 to-transparent" />
          <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
          </svg>
          <h2 className="text-2xl md:text-3xl font-bold font-display tracking-tight text-slate-900 m-0">
            Watch the benchmark run
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
            poster={BLOG_IMAGES.nemotron_35_lightning_poster}
          >
            <source src={BLOG_VIDEO.nemotron_benchmark} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <p className="text-sm text-slate-400 mt-3 text-center font-mono">
          Full benchmark run: three tasks, MTP speculative decoding, and real-time performance on the RTX 4060 laptop.
        </p>
      </div>

      <p>
        NVIDIA Nemotron 3.5 Lightning is an open, text-only large language model released on 11 August 2026, designed
        specifically as an "execution layer" model for long-running, always-on AI agents. It is the sibling of Nemotron 3
        Nano and part of NVIDIA's Nemotron 3 model family.
      </p>
      <p>
        Because only ~3B parameters are active per token, the model's compute cost per token is that of a small dense
        model, while its memory footprint is that of a 30B model. This is the reason a 30B model can be considered at all
        on an 8 GB VRAM laptop: the weights can be partially offloaded to system RAM, and the Mamba-2 layers keep the KV
        cache very small compared to pure-attention transformers of the same size.
      </p>

      <H2>The setup</H2>
      <p>
        The model under test is <code>nemotron-3.5-lightning:latest</code> (Q4_K_M quant, ~25 GB), served through Ollama
        on a laptop with an NVIDIA RTX 4060 Laptop GPU (8GB VRAM) and 32GB of system RAM. The session ran with a
        32,768-token context, MTP (multi-token prediction) speculative decoding active — draft acceptance rates ranged from
        0.52 to 0.94 across runs — and prompt cache plus context checkpoints enabled. Model load time was about 22.8
        seconds.
      </p>

      <div className="overflow-x-auto my-8 not-prose">
        <table className="min-w-full text-sm border border-slate-200 rounded-xl overflow-hidden">
          <thead className="bg-slate-50">
            <tr>
              <th className="text-left py-3 px-4 font-semibold text-slate-700">Component</th>
              <th className="text-left py-3 px-4 font-semibold text-slate-700">Value (from Task Manager)</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-slate-200">
              <td className="py-3 px-4 font-medium text-slate-700">CPU</td>
              <td className="py-3 px-4 text-slate-600">53% utilization, 4.13 GHz</td>
            </tr>
            <tr className="border-t border-slate-200">
              <td className="py-3 px-4 font-medium text-slate-700">Memory</td>
              <td className="py-3 px-4 text-slate-600">28.3 / 31.1 GB in use (90%)</td>
            </tr>
            <tr className="border-t border-slate-200">
              <td className="py-3 px-4 font-medium text-slate-700">GPU 1 (RTX 4060)</td>
              <td className="py-3 px-4 text-slate-600">49% utilization, 50°C</td>
            </tr>
            <tr className="border-t border-slate-200">
              <td className="py-3 px-4 font-medium text-slate-700">Dedicated VRAM</td>
              <td className="py-3 px-4 text-slate-600">6.7 / 8.0 GB used</td>
            </tr>
            <tr className="border-t border-slate-200">
              <td className="py-3 px-4 font-medium text-slate-700">Shared GPU memory</td>
              <td className="py-3 px-4 text-slate-600">0.2 / 15.0 GB used</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>
        The weights are ~25 GB (Q4_K_M), which cannot fit in 8 GB VRAM. The observed VRAM ceiling of ~6.7 GB used,
        combined with ~90% system RAM usage, indicates a partial GPU offload — the typical "as many layers as fit in VRAM,
        the rest in system RAM" split. The important detail is that the model fits almost entirely in high-speed VRAM
        rather than spilling massively to shared memory, and the temperature stays low for a laptop under inference load.
      </p>
      <p>
        I ran the same three-task battery I use for every local model that lands on this machine:
      </p>
      <ol>
        <li>A single, well-scoped Rust function with tests.</li>
        <li>A loosely-specified LangChain agent project.</li>
        <li>The same agent under an extremely detailed, mandatory-requirements prompt.</li>
      </ol>
      <p>
        The point of the battery is not to rank models on a benchmark. It is to see how a model behaves when the scope is
        tight, when it is loose, and when the prompt tries to force a specific deliverable.
      </p>

      <H2>Task 1: Rust function — clean pass, and a genuinely good self-verification</H2>
      <p>
        The ask was deliberately small and precise:
      </p>
      <blockquote>
        Write a Rust function that takes a Vec&lt;i64&gt; and returns (min, max, sum) using iterators. Include a doc comment and example.
      </blockquote>
      <p>
        The model delivered <code>rust_code_testing.rs</code> with a correct, idiomatic single-pass fold:
      </p>
      <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 text-xs overflow-x-auto font-mono leading-relaxed whitespace-pre-wrap my-6">
{`pub fn min_max_sum(numbers: Vec<i64>) -> (i64, i64, i64) {
    let (min, max, sum): (i64, i64, i64) = numbers
        .into_iter()
        .fold((i64::MAX, i64::MIN, 0), |(min, max, sum), num| {
            (
                min.min(num),
                max.max(num),
                sum + num,
            )
        });
    (min, max, sum)
}`}
      </pre>
      <p>
        The doc comment came with a runnable example, and the <code>#[cfg(test)]</code> module included three tests,
        all correct:
      </p>
      <ul>
        <li><strong>Basic:</strong> <code>vec![3, 1, 4, 1, 5, 9, 2, 6]</code> → <code>(1, 9, 31)</code></li>
        <li><strong>Single element:</strong> <code>vec![42]</code> → <code>(42, 42, 42)</code></li>
        <li><strong>Negative numbers:</strong> <code>vec![-5, -1, -3, -10]</code> → <code>(-10, -1, -19)</code></li>
      </ul>
      <p>
        Then I asked the model to verify its own code. This is where it genuinely impressed me. Its self-verification
        confirmed the correctness, the idiomatic style, the single O(n) pass, the documentation, and the reasonable
        test coverage — and then it independently flagged the empty-vector edge case, which returns
        <code>(i64::MAX, i64::MIN, 0)</code>, and suggested handling it. That is a real, correct observation, not
        flattery.
      </p>
      <p>
        One detail worth noting: the session header showed <em>"Current model does not support thinking"</em>. This
        model has no visible thinking mode, yet it still produced correct code and a sound self-review. The transcripts
        show the model producing explicit "Here's a thinking process:" blocks before answering — it "thinks on paper" even
        though the harness has no native reasoning mode for this model.
      </p>
      <p>
        From the ollama log: prompt processing ran at roughly 186–190 tokens/sec, generation at 17–28 tokens/sec
        (settling around 20–21), and MTP draft acceptance at 0.85.
      </p>

      <H2>Task 2: Loosely-specified LangChain agent — solid structure, honest import verification</H2>
      <p>
        The second ask was deliberately vague:
      </p>
      <blockquote>
        can you create a folder called simple_prompt_langchain and can you build a simple agentic project using langchain which can analyse user request, research, write a report and give it to user.
      </blockquote>
      <p>
        The model delivered <code>simple_prompt_langchain/</code> with <code>main.py</code>, <code>__init__.py</code>,
        and <code>requirements.txt</code>. The <code>main.py</code> is clean and well-structured:
      </p>
      <ul>
        <li><code>analyse_request()</code> — keyword-based intent classifier (financial/weather/news/general).</li>
        <li><code>research()</code> — a clearly-marked stub with hardcoded summaries (it explicitly says to replace with a real API).</li>
        <li><code>write_report()</code> — report assembly.</li>
        <li>A CLI loop using <code>create_zero_agent</code> + <code>AgentExecutor</code>, with a stub OpenAI fallback when no API key is present.</li>
      </ul>
      <p>
        Importantly, the code used legacy LangChain import paths (<code>from langchain.llms import OpenAI</code>,
        <code>from langchain.agents import create_zero_agent</code>).
      </p>
      <p>
        The standout moment came when I asked whether its imports were real or hallucinated. The model was honest. It
        tried to verify live:
      </p>
      <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 text-xs overflow-x-auto font-mono leading-relaxed whitespace-pre-wrap my-6">
{`python -c "from langchain.llms import OpenAI"`}
      </pre>
      <p>
        That raised <code>ModuleNotFoundError</code> — langchain is not installed on this machine — so instead of
        guessing, it verified against the documented LangChain API history. It correctly concluded that the imports
        are not hallucinated — they match the pre-split LangChain era — but are version-dependent and would need updating
        for v1+.
      </p>
      <p>
        It even attempted to fetch the official LangChain docs with <code>curl</code>, found the site was
        JavaScript-rendered, and explicitly stated it could not retrieve the pages rather than pretending it had. It
        concluded honestly: <em>"The imports are not hallucinated — they match the API that existed when the code was
        written. Whether they work for you depends on which LangChain version is installed."</em>
      </p>
      <p>
        This is the honest-verification behavior you want from a local model: it distinguished <em>"real but legacy"</em>
        from <em>"fabricated"</em>, and said plainly when it could not test live.
      </p>
      <p>
        Performance: prompt processing at roughly 210 tokens/sec, generation at 17–27 tokens/sec, and MTP acceptance
        between 0.55 and 0.82.
      </p>

      <H2>Task 3: Full agentic research project — strict prompt, real hallucination</H2>
      <p>
        For the third task I kept the same agentic ask but wrapped it in an extremely detailed, mandatory-requirements
        prompt. The strict prompt demanded:
      </p>
      <ul>
        <li>A ReAct or Structured Chat Agent.</li>
        <li>At least three tools: web search (Tavily or DuckDuckGo), Wikipedia, and a Python REPL/calculator.</li>
        <li>An exact file structure: <code>simple-research-agent/</code> with <code>main.py</code>, <code>agent.py</code>, <code>tools.py</code>, <code>requirements.txt</code>, and <code>README.md</code>.</li>
        <li>CLI in <code>main.py</code>, easy-to-swap LLM, error handling.</li>
        <li>A six-section report: Title, Executive Summary, Research Findings, Analysis, Conclusion, Sources.</li>
        <li>Output the full project structure, then complete contents of every file labelled <code>=== main.py ===</code>, then run instructions.</li>
      </ul>
      <p>
        The model produced the exact 5-file structure and the complete contents of every file, in the requested format,
        twice (it re-printed the full project after a follow-up clarification):
      </p>
      <ul>
        <li><code>tools.py</code> — wired the three mandated tools: <code>DuckDuckGoSearchRun</code>, <code>WikipediaQueryRun</code>, <code>PythonREPL</code>, each wrapped with error handling.</li>
        <li><code>agent.py</code> — a ReAct agent via <code>create_react_agent</code> + <code>AgentExecutor</code> with a system prompt encoding the 4-step workflow.</li>
        <li><code>main.py</code> — clean CLI: accepts a query via argv or interactive <code>input()</code>, calls <code>run_report()</code>, prints the report, wraps everything in try/except.</li>
        <li><code>README.md</code> — full install/run/usage instructions and report-section documentation.</li>
      </ul>
      <p>
        The architecture is genuinely correct for the ask. But there was a real hallucination.
      </p>
      <p>
        <strong>A real hallucinated import:</strong> In the first pass, <code>agent.py</code> contained:
      </p>
      <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 text-xs overflow-x-auto font-mono leading-relaxed whitespace-pre-wrap my-6">
{`from langchat.chat_models import ChatOpenAI  # noqa: F401`}
      </pre>
      <p>
        <em>"langchat"</em> is not a real package — the correct module is <code>langchain.chat_models</code>. This is a
        genuine hallucinated import path (a one-character slip from <code>langchain</code>), the same class of error the
        model itself flagged as version-dependency in Task 2. Notably, the model's own thinking trace shows the correct
        <code>from langchain.chat_models import ChatOpenAI</code>, but the actual delivered output has the typo. A
        sneaky, plausible-looking failure that survives a casual read.
      </p>
      <p>
        The rest of the generated project is coherent and structurally complete, but this file would fail to import as
        written. It is exactly the kind of bug that the harness's follow-up "verify your code" workflow is meant to catch.
      </p>
      <p>
        Performance: the context ballooned to roughly 15k+ tokens (the prompt itself is huge), one request returned a
        500 error mid-session, and the longest generation ran 4 minutes 50 seconds for 5,413 tokens at about 18.8
        tokens/sec. MTP acceptance ranged from 0.52 to 0.94.
      </p>

      <H2>Hardware: where the model actually ran</H2>
      <p>
        The screenshot below is the machine during the run. The model fits almost entirely in high-speed VRAM rather
        than spilling to shared memory, and the temperature is low for a laptop under inference load.
      </p>
      <div className="not-prose my-8">
        <Figure
          src={BLOG_IMAGES.nemotron_35_lightning_metrics}
          alt="Windows Task Manager showing the RTX 4060 Laptop GPU during the Nemotron-3.5-Lightning run"
          caption="Task Manager during the run: RTX 4060 Laptop GPU at 49% utilization, 6.7/8.0 GB dedicated VRAM, 50°C — the model fits almost entirely in VRAM with minimal spill to shared memory."
        />
      </div>
      <div className="not-prose grid grid-cols-1 md:grid-cols-4 gap-4 my-8">
        <Stat label="GPU util" value="49%" tone="blue" />
        <Stat label="VRAM" value="6.7/8.0 GB" tone="emerald" />
        <Stat label="GPU temp" value="50°C" />
        <Stat label="System RAM" value="28.3/31.1 GB" tone="amber" />
      </div>
      <p>
        From the screenshot: GPU at 49% utilization, 6.7/8.0 GB of dedicated VRAM used (0.2 GB shared), 50°C, CPU at
        53% running at 4.13 GHz, and system RAM at 28.3/31.1 GB (90%). The model weights are ~25 GB, which cannot fit in
        8 GB VRAM — the memory pattern indicates a partial GPU offload, with as many layers as fit in VRAM offloaded and
        the rest in system RAM.
      </p>

      <H2>Performance measurements</H2>
      <p>
        All numbers below are from the raw llama-server <code>print_timing</code> logs. The model runs with MTP
        speculative decoding enabled — llama.cpp logs a draft acceptance rate for each request, which is a direct read-out
        of how often the multi-token predictor was accepted.
      </p>

      <div className="overflow-x-auto my-8 not-prose">
        <table className="min-w-full text-sm border border-slate-200 rounded-xl overflow-hidden">
          <thead className="bg-slate-50">
            <tr>
              <th className="text-left py-3 px-4 font-semibold text-slate-700">Task</th>
              <th className="text-left py-3 px-4 font-semibold text-slate-700">Prompt eval</th>
              <th className="text-left py-3 px-4 font-semibold text-slate-700">Decode</th>
              <th className="text-left py-3 px-4 font-semibold text-slate-700">Total time</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-slate-200">
              <td className="py-3 px-4 font-medium text-slate-700">Task 1a — write Rust file</td>
              <td className="py-3 px-4 text-slate-600">1683 tok, 186.3 t/s</td>
              <td className="py-3 px-4 text-slate-600">1584 tok, 21.3 t/s</td>
              <td className="py-3 px-4 text-slate-600">83.6 s</td>
            </tr>
            <tr className="border-t border-slate-200">
              <td className="py-3 px-4 font-medium text-slate-700">Task 1b — verify Rust code</td>
              <td className="py-3 px-4 text-slate-600">1643 tok, 188.9 t/s</td>
              <td className="py-3 px-4 text-slate-600">330 tok, 18.0 t/s</td>
              <td className="py-3 px-4 text-slate-600">27.0 s</td>
            </tr>
            <tr className="border-t border-slate-200">
              <td className="py-3 px-4 font-medium text-slate-700">Task 2 — LangChain project</td>
              <td className="py-3 px-4 text-slate-600">1681 tok, 210.6 t/s</td>
              <td className="py-3 px-4 text-slate-600">287 tok, 17.4 t/s</td>
              <td className="py-3 px-4 text-slate-600">24.5 s</td>
            </tr>
            <tr className="border-t border-slate-200">
              <td className="py-3 px-4 font-medium text-slate-700">Task 3 — first big answer</td>
              <td className="py-3 px-4 text-slate-600">19 tok, 41.3 t/s</td>
              <td className="py-3 px-4 text-slate-600">1832 tok, 20.3 t/s</td>
              <td className="py-3 px-4 text-slate-600">90.9 s</td>
            </tr>
            <tr className="border-t border-slate-200">
              <td className="py-3 px-4 font-medium text-slate-700">Task 3 — long answer</td>
              <td className="py-3 px-4 text-slate-600">513 tok, 212.0 t/s</td>
              <td className="py-3 px-4 text-slate-600">5413 tok, 18.8 t/s</td>
              <td className="py-3 px-4 text-slate-600 font-semibold">~4 min 50 s</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>
        <strong>Prompt processing is fast:</strong> 150–220 tokens/s for typical prompts, dropping to ~40–90 t/s only when
        the prompt itself was huge (the research-agent turns had 15,000+ token accumulated contexts being re-processed).
      </p>
      <p>
        <strong>Decode throughput is the real bottleneck: ~17–24 tokens/s</strong> on this 8 GB VRAM laptop, largely flat
        regardless of answer length. That translates to ~50 ms per token, which is what makes a 5,400-token answer take
        ~5 minutes.
      </p>
      <p>
        <strong>MTP draft acceptance varied</strong> by request: 0.55, 0.63, 0.72, 0.76, 0.85, 0.94 across different
        turns — the multi-token predictor was accepted roughly 55–94% of the time depending on content. Higher acceptance =
        more tokens "for free" from the draft.
      </p>

      <H2>A notable operational incident</H2>
      <p>
        During Task 3, one request returned HTTP 500 after ~4.7 s, and llama.cpp logged:
      </p>
      <blockquote>
        forcing full prompt re-processing due to lack of cache data (likely due to SWA or hybrid/recurrent memory)
      </blockquote>
      <p>
        The server cancelled that task and the same content was retried, which then succeeded. The logs also show
        "erased invalidated context checkpoint" messages on several turns. The hybrid Mamba-2/recurrent layers appear to
        invalidate KV/context caches under certain reuse patterns, which triggers full prompt re-processing and can
        occasionally stall a request. The largest saved prompt state was 17,968 tokens (170.857 MiB), and the cache grew
        to 2 prompts, 613 MiB over the session — modest, but worth knowing for long agent sessions.
      </p>

      <H2>Where this leaves me</H2>

      <h3 className="!mt-8 !mb-3 !text-xl !font-bold !text-slate-900">Honesty scorecard</h3>
      <div className="overflow-x-auto my-8 not-prose">
        <table className="min-w-full text-sm border border-slate-200 rounded-xl overflow-hidden">
          <thead className="bg-slate-50">
            <tr>
              <th className="text-left py-3 px-4 font-semibold text-slate-700">Claim by the model</th>
              <th className="text-left py-3 px-4 font-semibold text-slate-700">Reality</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-slate-200">
              <td className="py-3 px-4 text-slate-600">"I can't compile Rust here" (Task 1)</td>
              <td className="py-3 px-4 text-slate-600">True — it had no Rust toolchain; it recommended <code>cargo check</code>.</td>
            </tr>
            <tr className="border-t border-slate-200">
              <td className="py-3 px-4 text-slate-600">"LangChain is not installed, so I can't import-test" (Task 2)</td>
              <td className="py-3 px-4 text-slate-600">True — <code>ModuleNotFoundError</code> was reproduced in-session.</td>
            </tr>
            <tr className="border-t border-slate-200">
              <td className="py-3 px-4 text-slate-600">"The imports match the pre-split LangChain API; version-dependent" (Task 2)</td>
              <td className="py-3 px-4 text-slate-600">True and technically correct.</td>
            </tr>
            <tr className="border-t border-slate-200">
              <td className="py-3 px-4 text-slate-600">"I couldn't fetch the LangChain docs — the site is JS-rendered" (Task 2)</td>
              <td className="py-3 px-4 text-slate-600">True — <code>curl</code> returned the JS shell, not content.</td>
            </tr>
            <tr className="border-t border-slate-200">
              <td className="py-3 px-4 text-slate-600">"The Rust function returns (i64::MAX, i64::MIN, 0) on empty input" (Task 1)</td>
              <td className="py-3 px-4 text-slate-600">True — verified against the fold's initial values.</td>
            </tr>
            <tr className="border-t border-slate-200">
              <td className="py-3 px-4 text-slate-600 font-medium"><code>from langchat.chat_models import ChatOpenAI</code> (Task 3)</td>
              <td className="py-3 px-4 text-red-600 font-medium">False — hallucinated import; module does not exist.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="!mt-8 !mb-3 !text-xl !font-bold !text-slate-900">Task verdicts</h3>
      <div className="overflow-x-auto my-8 not-prose">
        <table className="min-w-full text-sm border border-slate-200 rounded-xl overflow-hidden">
          <thead className="bg-slate-50">
            <tr>
              <th className="text-left py-3 px-4 font-semibold text-slate-700">Task</th>
              <th className="text-left py-3 px-4 font-semibold text-slate-700">Verdict</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-slate-200">
              <td className="py-3 px-4 font-medium text-slate-700">1 — Rust function</td>
              <td className="py-3 px-4 text-slate-600">Genuinely solid: correct code, real tests, and a self-verification that caught a real edge case. Best single-function result of the battery.</td>
            </tr>
            <tr className="border-t border-slate-200">
              <td className="py-3 px-4 font-medium text-slate-700">2 — Loose LangChain agent</td>
              <td className="py-3 px-4 text-slate-600">Architecturally sound and, more importantly, honest about its own verification limits — it said "I can't test this live" and checked docs instead of fabricating.</td>
            </tr>
            <tr className="border-t border-slate-200">
              <td className="py-3 px-4 font-medium text-slate-700">3 — Strict prompt</td>
              <td className="py-3 px-4 text-slate-600">A plausible-looking complete project that contained a hallucinated import (<code>langchat</code>) that would fail on first run — exactly the kind of error the model itself flagged in Task 2.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <H2>Conclusions</H2>
      <p>
        <strong>Facts:</strong> Nemotron 3.5 Lightning is a 30B-total / 3B-active hybrid Mamba-2 + MoE + Attention model
        with native MTP speculative decoding, released 11 Aug 2026 under OpenMDW-1.1, with up to 1M context and Q4_K_M
        weights of ~25 GB. On this 32 GB RAM / 8 GB VRAM laptop it ran via Ollama at a 32K context, loading in ~22.8 s,
        decoding at 17–24 t/s, with MTP draft acceptance of 55–94%. Across three real tasks it produced correct, idiomatic
        Rust (with tests and a correct self-verification), a coherent LangChain agent project, and a complete 5-file ReAct
        research agent matching a strict specification. It was demonstrably honest about its own limits in two tasks, and
        in one case emitted a genuinely hallucinated import (<code>langchat</code>).
      </p>
      <p>
        <strong>Interpretation:</strong> As a local coding/agent "workhorse" on 8 GB VRAM, the
        model's quality is impressive for its footprint, but its ~18–24 t/s decode makes long outputs slow and its
        MoE/hybrid stack shows occasional cache-invalidation fragility.
      </p>
      <p>
        The single most valuable practice demonstrated by these transcripts is the <strong>verify-your-own-output
        loop</strong>: the model's self-reviews caught real edge cases (empty vector) and version mismatches — and would
        have caught the <code>langchat</code> typo if run on Task 3's output. If you run this model locally for agentic
        work, always build a verification step into the loop.
      </p>
      <p>
        The practical takeaway: for anything beyond a single function, verify (a) files actually exist on disk,
        (b) every import resolves, and (c) the code runs — regardless of how detailed the prompt was.
        Nemotron-3.5-Lightning is a strong, fast local model for well-scoped tasks, but the multi-file agentic case
        still needs the same verification discipline as any other local model.
      </p>
    </article>
  )
}
