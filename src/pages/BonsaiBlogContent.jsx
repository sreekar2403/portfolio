import { BLOG_IMAGES, BLOG_VIDEO } from '../data/localBlogs'

function Figure({ src, alt, caption, wide = false }) {
  return (
    <figure className={wide ? 'my-8' : 'my-0'}>
      <div className="flex justify-center">
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50 max-w-2xl w-auto">
          <img src={src} alt={alt} className="block w-auto h-auto" loading="lazy" />
        </div>
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-slate-500 font-mono leading-relaxed">
          {caption}
        </figcaption>
      )}
    </figure>
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
        Three tasks, one local model, one RTX 4060 laptop pushed to its thermal ceiling — a field report on running prism-ml/bonsai-27b through LM Studio.
      </p>

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
            poster={BLOG_IMAGES.bonsai}
          >
            <source src={BLOG_VIDEO.bonsai_laptop_analysis} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <p className="text-sm text-slate-400 mt-3 text-center font-mono">
          Hardware telemetry and inference throughput from the same RTX 4060 laptop run.
        </p>
      </div>

      <H2>The setup</H2>
      <p>
        I run local models through LM Studio on a laptop with an <strong>NVIDIA RTX 4060 Laptop GPU (8GB VRAM) and 32GB of system RAM</strong>. This round was Bonsai 27B — specifically the lmstudio-community/Bonsai-27B-GGUF build, Bonsai-27B-Q1_0.gguf, a 27-billion-parameter, Qwen3.6-based checkpoint compressed down with a standard 1-bit llama.cpp quantization. More on what that means, and why it's an important detail, below — it's what makes a 27B model fit on an 8GB card at all.
      </p>

      <div className="not-prose my-8">
          <Figure
            src={BLOG_IMAGES.bonsai_lmstudio_config}
            alt="LM Studio configuration panel for Bonsai 27B"
            caption="Q1_0 quantization, 32K context, GPU-first — nothing held back."
          />
      </div>

      <p>
        <strong>32,000 tokens of context</strong> (the model itself supports up to 262,144), <strong>all 64 layers offloaded to GPU</strong>, a 10-thread CPU pool, 2048-token evaluation batches, unified KV cache with 32 context checkpoints, flash attention on, KV cache offloaded to GPU memory, and the model kept resident in memory. This is a fully-loaded, GPU-first configuration — nothing held back.
      </p>

      <H2>What Bonsai 27B actually is</H2>
      <p>
        Before getting into results, it's worth explaining what this model is, because it's an unusual entry in the local-model landscape and the architecture directly explains some of what shows up later in the testing.
      </p>
      <p>
        Bonsai 27B is built by <strong>PrismML</strong>, a team that grew out of Caltech research with backing from Khosla Ventures, Cerberus, Google, and Samsung. The underlying language backbone is <strong>Qwen3.6-27B</strong> — the same model family behind the MTP-variant Qwen3.6 I tested in an earlier local-model comparison — run through a <strong>hybrid-attention architecture</strong> with custom low-bit inference kernels layered on top. PrismML's pitch is specifically about compression: fitting a 27-billion-parameter model into a footprint small enough to run on a phone, without the usual quality collapse that comes with pushing quantization that far.
      </p>
      <p>
        The compression scheme itself is genuinely different from standard 4-bit/8-bit quantization. Instead of representing each weight with several bits of precision, Bonsai's <strong>binary variant reduces every weight to a single sign bit</strong> — each one maps to either −scale or +scale, with one shared FP16 scale factor per group of 128 weights. That works out to <strong>1.125 effective bits per weight</strong>, roughly a 14x reduction versus full FP16 precision. A slightly less aggressive <strong>ternary variant</strong> (three possible states instead of two) lands at <strong>1.71 effective bits per weight</strong>, at a larger ~7.2GB footprint.
      </p>
      <p>
        The reason this is interesting rather than just "very compressed": PrismML's own published benchmarks (15 tasks across six skill categories, run head-to-head against conventional low-bit methods like IQ2_XXS) show that generic quantization approaches <strong>collapse selectively</strong> at extreme compression — they hold up fine on broad knowledge benchmarks like MMLU-Redux while falling apart specifically on tasks that need sustained, multi-step reasoning, like AIME-style math or LiveCodeBench. Their claim is that Bonsai's sign-bit-plus-scale approach avoids that selective collapse: the binary model reportedly retains <strong>89.5% of FP16's average score</strong> at 1.125 bits per weight, and the ternary model <strong>94.6%</strong> at 1.71 bits — specifically on the reasoning-heavy benchmarks where conventional methods degrade the most.
      </p>
      <p>
        Beyond the compression scheme, Bonsai 27B is also genuinely multimodal — it ships with a separate vision adapter (in a compact 4-bit form for the on-device variants) so it can process images alongside text — and it carries the full 262K-token context window, hybrid "thinking" reasoning modes with adjustable effort levels, and support for speculative decoding.
      </p>
      <p>
        <strong>One detail matters a lot for interpreting the rest of this test</strong>, though: what I actually ran wasn't one of PrismML's purpose-built binary or ternary releases. The GGUF I loaded — Bonsai-27B-Q1_0.gguf, distributed via lmstudio-community — is described directly on its own model card as a standard <strong>llama.cpp conversion of the unpacked checkpoint, quantized with the generic llama-quantize --pure Q1_0 method</strong>. That's exactly the class of conventional, non-purpose-built low-bit quantization that PrismML's own benchmarks show collapsing selectively on sustained-reasoning and coding tasks — as distinct from their custom binary/ternary kernels, which are specifically engineered to avoid that collapse. In other words, I wasn't testing "Bonsai 27B at its best-supported low-bit operating point" — I was testing a 27B reasoning-and-coding model run through the same kind of generic 1-bit quantization that the model's own creators built Bonsai specifically to outperform. That's a meaningfully different (and less favorable) test setup than PrismML's flagship binary/ternary release, and it's worth keeping in mind for everything that follows.
      </p>
      <p>
        I gave it three tasks, escalating in complexity: a single well-scoped Rust function, a loosely-specified LangChain agent, and the same agent again under an extremely detailed, mandatory-requirements prompt. Here's what actually happened.
      </p>

      <H2>Task 1: A single Rust function — clean logic, real-world tooling friction</H2>
      <p>
        The ask: <em>"Write a Rust function that takes a Vec&lt;i64&gt; and returns (min, max, sum) using iterators. Include a doc comment and example."</em>
      </p>
      <p>
        Bonsai 27B wrote a correct, idiomatic single-pass fold on its first real attempt, then refined it once — shifting from borrowing (&amp;[i64]) to owned iteration (Vec&lt;i64&gt; via .into_iter()) to better match its own example usage:
      </p>

      <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 text-xs overflow-x-auto font-mono leading-relaxed whitespace-pre-wrap my-6">
{`fn stats(data: Vec<i64>) -> (i64, i64, i64) {
    data.into_iter().fold((i64::MAX, i64::MIN, 0), |(acc_min, acc_max, acc_sum), x| {
        let new_min = if x < acc_min { x } else { acc_min };
        let new_max = if x > acc_max { x } else { acc_max };
        (new_min, new_max, acc_sum + x)
    })
}`}
      </pre>

      <p>
        Doc comment, a runnable example block, and four unit tests — basic values, a single element, an empty vector, and negative numbers. The logic is correct: verified by hand, stats(vec![3, 1, 4, 1, 5]) does resolve to (1, 5, 14), and the empty-vector sentinel matches the test's expectation. This wasn't a spiral — two clean iterations, each producing valid code, landing on a solid final version.
      </p>
      <p>
        Then it tried to actually compile and run it, and hit a wall that had nothing to do with the code itself:
      </p>

      <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 text-xs overflow-x-auto font-mono leading-relaxed whitespace-pre-wrap my-6">
{`$ cd /workspace/research/bonsai_27b && rustc stats.rs -o stats_test && ./stats_test
The token '&&' is not a valid statement separator in this version.`}
      </pre>

      <p>
        Windows PowerShell doesn't support && chaining the way bash does. The retry with ; instead of && still failed because the directory didn't exist yet. Once it found the right path, the actual blocker showed up:
      </p>

      <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 text-xs overflow-x-auto font-mono leading-relaxed whitespace-pre-wrap my-6">
{`rustc : The term 'rustc' is not recognized as the name of a cmdlet, function, script file, or operable program.`}
      </pre>

      <p>
        Rust's compiler simply wasn't installed on the machine. The whole task, including all the failed shell attempts, took 3 minutes 58 seconds. This is worth being precise about: <strong>the model's code was correct; the environment it was asked to prove that in wasn't set up for the language it was asked to write.</strong> That's a fair distinction to draw, and it's the most straightforwardly positive result of the three tests.
      </p>

      <H2>Task 2: A loosely-specified LangChain agent — sound architecture, fabricated APIs</H2>
      <p>
        The ask, unconstrained: <em>"Can you build a simple agentic project using LangChain which can analyse user request, research, write a report and give it to user."</em>
      </p>
      <p>
        Bonsai delivered a five-file project — agent.py, app.py, README.md, requirements.txt, test_agent.py — built around a clean three-step pipeline: <strong>Analyze → Research → Report</strong>. That high-level shape is genuinely sound and matches what was asked. The problems are in the implementation details, and there are several:
      </p>
      <ul>
        <li><code>from langchain_core.prompts import PromptTemplate, ResponseParser</code> — ResponseParser isn't a real export from that module. It's referenced later as ResponseParser.parse_string(response), which would fail immediately with an ImportError.</li>
        <li><code>PromptTemplate(input_variables=["user_input"], output_template="...")</code> — the real PromptTemplate constructor takes template=, not output_template=. This would raise a TypeError on every call.</li>
        <li><code>from langchain_community.tools import default_web_search_bing</code> — not a real LangChain Community tool. Both of the agent's two "different" search tools (search and google_search) call this same fabricated function, so despite having two @tool-decorated methods, there's really only one (non-functional) capability underneath.</li>
        <li>The @tool decorator is applied directly to bound instance methods (def search(self, query: str)), which isn't how LangChain's @tool decorator is meant to be used — it expects a standalone function, and self ends up baked into the generated tool schema.</li>
        <li>Inside write_report(), the list comprehension building formatted_results is missing a closing parenthesis — a genuine unbalanced-bracket syntax error that would corrupt parsing of the rest of the function.</li>
        <li>requirements.txt lists langchain-llm-factories&gt;=0.2.0 — not a real PyPI package. pip install -r requirements.txt would fail on this line before installing anything else.</li>
        <li>The README's project-structure diagram lists only agent.py, app.py, and requirements.txt under a folder called simplf_agent/ — a typo, and it omits test_agent.py, which was in fact delivered as a separate file.</li>
      </ul>
      <p>
        None of these are subtle. ResponseParser, output_template, and default_web_search_bing are all invented APIs — plausible-sounding, consistent with real LangChain naming conventions, and not real. That's a more specific failure than "buggy code": it's the model generating fluent, confident references to library surface area that doesn't exist, which is a materially harder class of bug to catch by reading the code casually — you'd need to actually try running it, or already know the library well, to notice.
      </p>

      <H2>Task 3: The same ask, under an extremely explicit, mandatory-requirements prompt</H2>
      <p>
        This is the test that actually surprised me. I gave Bonsai the loosely-worded version above, and separately, a much stricter version with hard requirements: use a <strong>ReAct or Structured Chat Agent</strong>, include <strong>at least 3 tools</strong> (web search, Wikipedia, Python REPL/calculator), enforce an <strong>exact file structure</strong> (simple-research-agent/ with main.py, agent.py, tools.py, requirements.txt, README.md), and produce a report with <strong>six specific sections</strong> (Title, Executive Summary, Research Findings, Analysis, Conclusion, Sources).
      </p>
      <p>
        Comparing the delivered project against that checklist:
      </p>

      <div className="overflow-x-auto my-8 not-prose">
        <table className="min-w-full text-sm border border-slate-200 rounded-xl overflow-hidden">
          <thead className="bg-slate-50">
            <tr>
              <th className="text-left py-3 px-4 font-semibold text-slate-700">Mandatory requirement</th>
              <th className="text-left py-3 px-4 font-semibold text-slate-700">Delivered?</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-slate-200">
              <td className="py-3 px-4 font-medium text-slate-700">ReAct or Structured Chat Agent (not a simple chain)</td>
              <td className="py-3 px-4 text-slate-600">No — the code calls .llm.invoke() directly with prompt templates; there's no AgentExecutor reasoning loop actually wired up, despite AgentExecutor being imported</td>
            </tr>
            <tr className="border-t border-slate-200">
              <td className="py-3 px-4 font-medium text-slate-700">At least 3 distinct tools (web search, Wikipedia, Python REPL/calculator)</td>
              <td className="py-3 px-4 text-slate-600">No — two tool-decorated methods exist, both calling the same fabricated search function; no Wikipedia tool, no Python REPL/calculator tool anywhere</td>
            </tr>
            <tr className="border-t border-slate-200">
              <td className="py-3 px-4 font-medium text-slate-700">Exact file structure (main.py, agent.py, tools.py, requirements.txt, README.md)</td>
              <td className="py-3 px-4 text-slate-600">No — delivered app.py instead of main.py, no tools.py at all, plus an extra test_agent.py not in the required structure</td>
            </tr>
            <tr className="border-t border-slate-200">
              <td className="py-3 px-4 font-medium text-slate-700">Report with 6 named sections (Title, Executive Summary, Research Findings, Analysis, Conclusion, Sources)</td>
              <td className="py-3 px-4 text-slate-600">No — the report prompt template asks for 4 sections (executive summary, key points, recommendations, sources), missing a distinct Title and splitting neither Research Findings nor Analysis out separately</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>
        That's a genuinely useful finding on its own: <strong>a highly explicit, itemized, "you MUST follow ALL of these" prompt didn't meaningfully change the shape of what got built.</strong> The model still produced essentially the same lightweight, direct-invocation pipeline rather than an actual tool-calling agent loop, still skipped two of the three mandated tools, still didn't match the required file layout, and still under-delivered on the report structure. Whether that's a context-following limitation specific to this checkpoint, an artifact of the Q1_0 quantization stripping out instruction-adherence capacity, or something else, I can't say for certain from one test — but the gap between "detailed spec" and "delivered project" was, if anything, unchanged from the loosely-worded version.
      </p>

      <H2>What the hardware was actually doing</H2>
      <p>
        During active generation: <strong>GPU utilization at 98%, temperature at 88°C</strong>, dedicated GPU memory at <strong>7.6 of 8.0 GB</strong> — essentially no headroom left. CPU sat comparatively idle at 16%, and system RAM was at 17.8 of 31.6 GB. This is a GPU-bound, thermally-stressed setup, not a CPU-offload story like some of the other local models I've tested.
      </p>

      <div className="not-prose my-8">
        <Figure
          src={BLOG_IMAGES.bonsai_benchmark_infographic}
          alt="Benchmark infographic summarizing hardware, throughput, and task performance"
          caption="Prompt processing: 109–130 tokens/sec | Generation: 22.8–27.55 tokens/sec | VRAM at ~96-98%."
        />
      </div>

      <ul>
        <li><strong>Prompt processing</strong>: 109.85–130.09 tokens/sec</li>
        <li><strong>Generation speed</strong>: 22.84–27.55 tokens/sec</li>
        <li><strong>VRAM saturation</strong>: ~96–98% of the 8GB card</li>
        <li><strong>Sustained GPU temperature</strong>: 88°C — near the top of what's reasonable for laptop silicon under continuous load</li>
      </ul>

      <p>
        Those generation numbers are respectable for a 27B-class model on 8GB of VRAM — comparable to, or better than, other local models I've run on the same hardware. But it's worth restating the point from the architecture section above: the GGUF I ran is a generic llama.cpp --pure Q1_0 conversion, not PrismML's purpose-built binary or ternary release. PrismML's own benchmarks show that exact class of conventional low-bit quantization collapsing selectively on sustained-reasoning and coding tasks, while conventional broad-knowledge benchmarks keep looking fine. That lines up unusually well with what I actually saw: solid, coherent output on a single self-contained function (Task 1), but fabricated APIs, structural gaps, and weak adherence to explicit instructions on the two multi-step, multi-file agentic tasks (Tasks 2 and 3) — precisely the "sustained reasoning" failure mode PrismML's compression method was built to avoid, on a checkpoint that wasn't using it. That's a plausible, specific explanation rather than a vague "it's heavily quantized so it's worse" claim — though it's still one test session, not a controlled comparison against PrismML's actual binary/ternary release on the same hardware.
      </p>

      <H2>Where this leaves me</H2>
      <p>
        Three tasks, three different lessons:
      </p>
      <ol>
        <li><strong>Well-scoped, single-function tasks</strong>: genuinely solid. Correct logic, clean docs, real tests, on the first serious attempt. The only failure here was environment setup (no rustc on PATH), not model output.</li>
        <li><strong>Loosely-specified multi-file projects</strong>: architecturally sensible at a glance, but with fabricated APIs, a broken dependency, and a real syntax error sitting underneath a plausible-looking surface. This is the kind of bug set that survives a quick read-through and only shows up when you actually try to run it.</li>
        <li><strong>Explicitly-constrained multi-file projects</strong>: the mandatory requirements didn't meaningfully change the outcome. Detailed, itemized specs are not a reliable lever for getting stricter architectural compliance out of this checkpoint at this quantization level.</li>
      </ol>
      <p>
        Practically: for anything beyond a single function, I'm now treating "did every imported symbol actually exist" and "does the delivered file structure match what I asked for, line by line" as mandatory checks before trusting output from this model — regardless of how detailed the prompt was.
      </p>
      <p>
        If you're running Bonsai 27B, or anything else this heavily quantized, on similarly constrained hardware, I'd like to compare notes on where the compression trade-off actually bites.
      </p>
    </article>
  )
}
