import { BLOG_IMAGES } from '../data/localBlogs'

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

export default function Qwen38BlogContent() {
  return (
    <article className="prose prose-slate prose-lg max-w-none prose-headings:scroll-mt-24 prose-p:leading-7 prose-li:leading-7 space-y-10">
      <p className="text-slate-500 italic text-lg leading-relaxed mb-8 border-l-2 border-primary-300 pl-4">
        Four builds, all run entirely on-device on a quantized 27B model crawling along at ~1.5 tok/s. The
        headline: excellent one-shot scaffolding and a model that bootstraps its own toolchain unprompted —
        plus a painful, well-documented lesson in why 8 GB of VRAM is the wrong place to run multi-step agents.
      </p>

      <div className="not-prose grid grid-cols-1 md:grid-cols-4 gap-4 my-8">
        <Stat label="Model" value="27B Q4" tone="blue" />
        <Stat label="Speed" value="1.5 tok/s" tone="amber" />
        <Stat label="Code out" value="~2.7k LoC" tone="emerald" />
        <Stat label="Verdict" value="Scaffold ✓" />
      </div>

      <H2>About the model</H2>
      <p>
        The model under test was <strong><code>unsloth/Qwen3.8-27B-GGUF</code></strong> (aka Qwen3 27B). Per the
        official card (<a href="https://huggingface.co/Qwen/Qwen3.8-27B" target="_blank" rel="noopener noreferrer">Qwen/Qwen3.8-27B</a>,
        Apache-2.0), it's a dense vision-language model — 27B parameters, 64 layers, hidden size 5120, 48
        linear-attention heads plus 4 KV heads, FFN 17408, trained with MTP — released 2026-08-15 as the dense
        27B sibling of the 2.4T-parameter MoE <code>Qwen3.8-Max</code>. Native context is 262,144 tokens,
        extensible to 1,000,000 via YaRN (<code>factor 4.0</code>, <code>rope_theta 10M</code>). Thinking is on by
        default (<code>&lt;think&gt;...&lt;/think&gt;</code>), with a configurable{' '}
        <code>reasoning_effort</code> (<code>xhigh</code>/<code>medium</code>/<code>low</code>) — <code>xhigh</code>{' '}
        is the default and typically needs ~8k reasoning tokens to hit its best scores. The GGUF build used here
        comes from{' '}
        <a href="https://huggingface.co/unsloth/Qwen3.8-27B-GGUF" target="_blank" rel="noopener noreferrer">Unsloth's Dynamic v3.0</a>{' '}
        quantization (21 quant levels; BF16 is 55 GB, Q4_K_M is 17 GB). Locally, this ran with a 32k context window.
      </p>

      <H2>Benchmarks</H2>
      <p>
        Against that card, Qwen3.8-27B tops 7 of 12 text benchmarks — a +29-point jump over Qwen3.6 on DeepSWE
        (42.2 vs 13.3), 79.0 on QwenSWEBench, and <strong>61.7 vs 53.4 for Opus 4.6 Max</strong> on SWE-bench
        Pro, while trailing Opus by just 5.2 points on Terminal-Bench 2.1 (73.0). On vision tasks it takes 8 of
        11 rows (OSWorld 84.3, RecreationBench 47.1). BenchLM's aggregate score puts it at 71.9/100, ranked #9
        on agentic tasks (68.8) and #18 on coding (65.3) — this is a model built for coding and agent work, not
        general trivia.
      </p>

      <div className="not-prose my-8">
        <Table
          headers={['Benchmark', 'Qwen3.8-27B', 'Qwen3.6-27B', 'Opus 4.6 Max']}
          rows={[
            ['<strong>Terminal-Bench 2.1</strong>', '<strong>73.0</strong>', '63.4', '78.2'],
            ['<strong>SWE-bench Pro</strong>', '<strong>61.7</strong>', '53.5', '53.4'],
            ['<strong>QwenSWEBench</strong>', '<strong>79.0</strong>', '49.3', '63.8'],
            ['<strong>LiveCodeBench v6</strong>', '<strong>90.3</strong>', '83.9', '88.8'],
            ['<strong>IFBench</strong>', '<strong>79.5</strong>', '69.1', '62.5'],
            ['<strong>OSWorld-Verified</strong>', '<strong>84.3</strong>', '63.9', '72.7'],
          ]}
        />
      </div>

      <p>
        On quantization, an independent Quesma benchmark from Aug 26 found that <strong>Q4_K_M (17 GB) tracks
        BF16 (55 GB) almost exactly</strong> on Terminal-Bench, GPQA, and IFBench — 2-bit drops off a little,
        1-bit collapses toward random performance. Reasoning effort turns out to matter more than quantization
        level (<code>xhigh</code> needs roughly 8k reasoning tokens to hit its best scores). This matters for
        what follows: at the offloaded quant used on this laptop, <strong>the quality gap versus BF16 is
        negligible, but latency runs 10–20× slower</strong> than the vLLM/SGLang setups behind the official
        numbers — same output quality, nowhere near the same speed.
      </p>

      <H2>My setup</H2>
      <p>
        The model ran entirely locally through <strong>Ollama + Pi agent</strong> across 2026-08-29 to
        2026-08-31, on a laptop with an <strong>RTX 4060 Laptop GPU (8 GB)</strong>, 31.6 GB of system RAM, and an
        Intel Iris Xe iGPU that never got touched. Mid-inference the box showed CPU pegged at 79% (3.39 GHz),
        RAM sitting at 20.4/31.6 GB, and the GPU at 32% utilization, 60°C, with{' '}
        <strong>6.5 of its 8.0 GB VRAM</strong> occupied — textbook behavior for a quantized 27B model that no
        longer fits in dedicated memory and starts spilling into shared RAM and CPU. Inference speed stayed
        pinned at <strong>1.4–2.5 tok/s</strong> throughout, per the Pi logs. Almost everything below traces
        back to that single number.
      </p>

      <div className="not-prose my-8">
        <Figure
          src={BLOG_IMAGES.qwen38_hardware}
          alt="Illustration of laptop GPU load, slow token throughput, and saturated VRAM"
          caption="6.5/8.0 GB VRAM, 1.4–2.5 tok/s — the same quality as the model card, at 10–20× the latency."
          wide
        />
      </div>

      <H2>Task inventory</H2>
      <div className="not-prose my-8">
        <Figure
          src={BLOG_IMAGES.qwen38_tasks}
          alt="Four task outcomes: verified Rust crate, scaffolded Kanban app, two research agents, one slow run"
          caption="Four artifacts, ~2,683 lines of hand-grade code from prompts alone."
          wide
        />
      </div>

      <div className="not-prose my-8">
        <Table
          headers={['Folder', 'Prompt', 'LoC', 'Status']}
          rows={[
            ['<strong>rust_min_max_sum</strong>', 'Vec&lt;i64&gt; → (min, max, sum), iterators + docs', '61 (src)', '<strong>PASS</strong> — cargo test 6/6 green'],
            ['<strong>kanban-board-app</strong>', 'Vanilla JS Kanban, CRUD + drag-drop + filters', '1,924', 'SCAFFOLDED — never served in-browser'],
            ['<strong>langchain_report_agent</strong>', 'Analyse → research → report agent (Ollama)', '228 (src)', 'CODE COMPLETE, RUN INCOMPLETE (run.log 0 bytes)'],
            ['<strong>simple-research-agent</strong>', 'Same brief, provider-agnostic create_agent', '470 (src)', 'CODE COMPLETE — stub-tested, no live run'],
          ]}
        />
      </div>

      <H2>Deep dive: Task 1 — Minimal correct Rust, the exemplary run</H2>
      <p>
        The prompt, word for word: <em>"Write a Rust function that takes a Vec&lt;i64&gt; and returns (min, max,
        sum) using iterators. Include a doc comment and example."</em> What came back was a tight single-pass fold:
      </p>

      <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 text-xs overflow-x-auto font-mono leading-relaxed whitespace-pre-wrap my-6">
{`pub fn min_max_sum(values: Vec<i64>) -> Option<(i64, i64, i64)> {
    values.into_iter().fold(None, |acc, x| match acc {
        None => Some((x, x, x)),
        Some((min, max, sum)) => Some((min.min(x), max.max(x), sum + x)),
    })
}`}
      </pre>

      <p>
        The doc comment covers <code># Returns</code>, <code># Panics</code> (overflow in debug builds), and a
        doctest that actually runs; five unit tests round it out (typical values, single element, all equal,
        negatives, empty returns None). What pushes this past ordinary codegen is that the agent{' '}
        <strong>set up its own toolchain from nothing</strong>: it checked for <code>cargo</code>/<code>rustc</code>,
        poked around for a linker and a Visual Studio install, pulled down <code>rustup-init.exe</code> (12.8 MB in
        2.3 seconds), and installed the <code>stable-x86_64-pc-windows-gnu</code> minimal profile — correctly
        reasoning that the GNU target has shipped rust-lld since Rust 1.78, so a pure-Rust crate never needs
        Visual Studio at all. It then ran <code>cargo test</code> and got <strong>5 unit tests plus the doctest
        green</strong>. The one gap: no <code>checked_add</code>, so overflow only panics in debug builds — fine
        given the prompt, though production code would want <code>checked_add</code> or an <code>i128</code> sum instead.
      </p>

      <H2>Deep dive: Task 2 — Full vanilla-JS Kanban, best-in-class scaffolding</H2>
      <p>
        This one came out as three files: <code>index.html</code> (192 lines, semantic roles, ARIA-labelled
        modals), <code>css/style.css</code> (685 lines — design tokens, grid layout, drag states, keyframe
        animations, responsive breakpoints, print styles), and <code>js/app.js</code> (1,047 lines, an IIFE in
        strict mode). The feature list is long: <code>localStorage</code> persistence guarded against{' '}
        <code>QuotaExceededError</code>, five seeded sample tasks, full CRUD, HTML5 drag-and-drop alongside a
        200 ms long-press touch-ghost for mobile, debounced search, priority and dynamic-assignee filters,{' '}
        <code>escapeHtml</code> applied to every piece of user content, <code>trapFocus</code> plus{' '}
        <code>Escape</code>-to-close on modals, inline title editing, overdue badges, toast notifications, and a
        pulse animation on the per-column counters — all with zero external dependencies.
      </p>
      <p>
        A few rough edges: <code>Math.random</code>-based IDs where a UUIDv4 would be safer, an unbounded{' '}
        <code>history</code> array, no undo for deletes, and no test coverage. More notably, and unlike the Rust
        task, <strong>this one was never actually served or checked in a browser</strong> — there's no log for this
        folder at all. Call it a strong frontend take-home skeleton that still needs asset wiring and a manual QA pass.
      </p>

      <H2>Deep dive: Tasks 3–4 — Two research agents, correct code, incomplete runs</H2>
      <p>
        Both attempts answer the same brief — <em>"build a simple agentic project using langchain which can
        analyse user request, research, write a report and give it to user"</em> — with two different stacks. The
        Ollama-native version (a <code>reporter/</code> package built on{' '}
        <code>ChatOllama + create_react_agent</code>, ddgs + BeautifulSoup fetching, a{' '}
        <code>save_report</code> tool, and a strict ANALYSE → RESEARCH → WRITE prompt) proved its worth right away
        in <strong>Phase 1: the model built its own test harness for structured tool-calling</strong> and ran it
        across the local models — <code>qwen2.5-coder:7b</code> returned raw JSON as plain text (unusable),{' '}
        <code>llama3.2</code> called tools correctly but was too weak, and <code>nemotron-3.5-lightning</code>{' '}
        produced clean tool calls and got picked as the default. From there it spun up a venv, installed LangChain
        1.3 and LangGraph, ran into the familiar <code>AgentExecutor</code>-was-removed-in-1.x import error,
        inspected <code>dir(langchain.agents)</code> to find the replacement, and correctly pivoted to{' '}
        <code>create_react_agent</code>.
      </p>
      <p>
        Then came the <strong>observability collapse</strong>. The end-to-end run got backgrounded with stdout
        piped to <code>run.log</code>, which sat at <strong>0 bytes</strong> the entire time — plain Python
        buffering, with no <code>PYTHONUNBUFFERED=1</code>, <code>python -u</code>, or <code>flush=True</code>{' '}
        anywhere — while the agent spent hours polling <code>ollama ps</code> instead of just killing the process
        and restarting it unbuffered. The session log runs 643 lines and closes with the user, three-plus hours in,
        typing: <em>"stop it i have been here for more than 3 hours"</em>. The second attempt (
        <code>simple-research-agent</code>, built on <code>create_agent</code>, defaulting to the cloud model{' '}
        <code>gpt-4o-mini</code>, with a safe AST-whitelisted calculator that blocks{' '}
        <code>__import__</code>/<code>open</code>, and the best README of the batch) fixes the buffering problem
        and the error messaging — a visible sign the model learned from the first failure — but it was only ever
        smoke-tested with <code>py_compile</code> and never actually run against Ollama.
      </p>

      <H2>Deep dive: Tasks I did not attempt — system constraints on long runs</H2>
      <p>
        Two more tasks from the prompt bank were deliberately skipped on this machine, for exactly the same
        1.5 tok/s reason laid out above:
      </p>
      <ul>
        <li>
          <strong><code>car-racing-game</code></strong> — full 60-FPS canvas racer (800×600, requestAnimationFrame,
          3-lane road, AI traffic, particles, Web Audio synth, start/pause/game-over screens, touch controls, delta-time
          physics, Car/Obstacle/Particle/Game classes). Vanilla JS, zero libraries.
        </li>
        <li>
          <strong><code>lumina-animated-site</code></strong> — single-page agency site (particle constellation canvas,
          typewriter hero, Intersection-Observer reveals, 3D-tilt cards, scroll-snap gallery, animated counters,
          floating-label form, custom lerped cursor, sticky-footer reveal, prefers-reduced-motion support). Hand-written
          CSS/Web-Animations only, no GSAP/AOS.
        </li>
      </ul>
      <p>
        Both are <strong>long-horizon tasks that need in-browser verification</strong>: each demands several
        rounds of generate → serve → screenshot → fix, with the model juggling a lot of multi-file context (HTML
        plus two CSS files plus two JS files, or a canvas game loop plus audio) across dozens of agentic turns. At
        roughly 40 steps × 500 tokens ÷ 1.5 tok/s, that's about 3.7 hours per run before a single human even looks
        at it — and given the two context overflows already seen from verbose thinking traces, each of these would
        realistically burn a full evening for something a 7B coder model (~15 tok/s on the same 4060) or a hosted
        API would finish in real time. They're staying in the bank until faster hardware or offloaded execution is
        available; going by how the Kanban task turned out, the generation quality would likely be fine —{' '}
        <strong>execution and verification are the actual bottleneck, not what the code looks like.</strong>
      </p>

      <H2>Observations &amp; conclusion</H2>
      <p><strong>What it's good at:</strong> shipping a fully runnable project layout without being asked
        (Cargo.toml, requirements.txt, READMEs running 19–163 lines); writing idiomatic code across languages
        (the single-pass fold, the strict-mode IIFE, modern LangChain 1.x with <code>@tool</code>); documenting
        first rather than as an afterthought; baking in safety and accessibility habits (XSS escaping, ARIA
        roles, an AST whitelist); bootstrapping its own tooling (rustup, venvs, pip, probing Ollama's tool-call
        behavior); and recovering from real errors on its own (the AgentExecutor pivot, the ddgs fallback).</p>
      <p><strong>Where it falls down:</strong> no sense of its own latency — it defaulted to a 25 GB model on an
        8 GB card and then kicked off a 40-step loop anyway; when that loop stalled, it diagnosed the buffering
        bug correctly but never fixed it, polling instead of acting under user pressure; verification was
        one-sided — the Rust task got tested, nothing else did; thinking traces twice overflowed the 32k context
        window; and it built two separate research-agent projects for the same prompt with no explanation for
        the duplication.</p>
      <p>
        The arithmetic doesn't leave much room for optimism: roughly 40 steps × ~500 tokens ÷ 1.5 tok/s works out
        to <strong>about 3.7 hours per agent run</strong> — which lines up almost exactly with the hang that was
        observed. The takeaway: <strong>this setup is good for one-shot generation, not for running multi-step
        agents on this hardware.</strong> That maps directly onto the benchmarks above too: LiveCodeBench-tier
        coding ability explains the clean Rust fold, Vision2Web/RecreationBench scores explain the polish on the
        Kanban build, and CoWorkBench/SWE-bench Pro explain why the agent scaffolding was strong even though a
        1.5 tok/s, 16k-context loop couldn't actually execute it.
      </p>

      <p><strong>Practical takeaways for this hardware:</strong></p>
      <ul>
        <li>27B on 8 GB? Use Q4_K_M, <code>num_ctx</code> ≤ 8192, partial offload, <code>OLLAMA_KEEP_ALIVE=5m</code>. Expect ~2 tok/s; keep prompts single-turn.</li>
        <li>Agents: switch execution to <code>llama3.2</code> (2 GB), <code>qwen2.5-coder:7b</code> (4.7 GB), or cloud — scaffolds here are already provider-agnostic.</li>
        <li>Always <code>PYTHONUNBUFFERED=1 python -u main.py</code> (or <code>flush=True</code>) when logging long runs to file.</li>
        <li>Wire <code>recursion_limit</code> / <code>max_iters</code> into <code>create_react_agent</code> / <code>create_agent</code>; never poll <code>ollama ps</code> as a progress proxy.</li>
      </ul>

      <p>
        The practical rule going forward: use Qwen3-27B for <strong>generation, not execution</strong> — scaffold
        with the 27B, then hand actual execution to something smaller or hosted. Every task should get a
        verification stage baked in (<code>cargo test</code>, <code>python -m py_compile</code>, serve plus
        screenshot, a live <code>agent.stream</code>). If I'm demoing this, I'd lead with the Rust autonomy story
        (it installed its own toolchain unasked) and the Kanban polish — those are the strongest results here —
        and state the 1.5 tok/s local tax up front rather than let it surprise anyone.
      </p>
      <p>
        Sources: the Qwen3.8-27B model card, Unsloth's GGUF and Dynamic v3.0 docs, the Quesma quantization
        benchmark (Aug 26), BenchLM (Sep 1), and the Qwen3 Technical Report (arXiv:2505.09388). Full file-level
        references — line numbers, pi_log spans, LoC counts — live in the fuller observation report this post
        was condensed from.
      </p>
    </article>
  )
}
