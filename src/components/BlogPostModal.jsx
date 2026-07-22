import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { HiXMark } from 'react-icons/hi2'
import { BLOG_IMAGES } from '../data/localBlogs'

// ponytail: blog content rendered as JSX, not markdown parser
// avoids adding remark/unified dependency for a single post
function QwenVsNemotronContent() {
  const img = (key) => (
    <img
      src={BLOG_IMAGES[key]}
      alt=""
      className="rounded-lg border border-slate-200 my-6 w-full"
      loading="lazy"
    />
  )

  return (
    <article className="prose prose-slate prose-lg max-w-none">
      <p className="text-slate-500 italic text-lg leading-relaxed mb-8">
        A field report from someone who runs these models to actually ship code, not just to run a benchmark suite.
      </p>

      <h2>Why this comparison exists</h2>
      <p>
        For a while now my daily workflow has been: ideate on Claude directly, or on NVIDIA's free hosted endpoints,
        then hand the grunt work — refactors, boilerplate, repetitive edits — off to local models through OpenCode + Ollama.
        Not every model earns a permanent spot in that loop.
      </p>
      <p>A few things I've learned the hard way:</p>
      <ul>
        <li>
          <strong>Qwen2.5-Coder is a genuinely strong coding model</strong>, but it wasn't built with agentic tool-calling
          loops in mind, and it falls apart the moment you drop it into a harness that expects structured multi-step tool use.
        </li>
        <li>
          <strong>Dense 6–14B models</strong> are fine in isolation, but they choke the moment a task spans a large repo or
          needs multiple cross-file edits in the same pass. On an 8GB VRAM laptop, that's roughly <strong>3–8 tokens/sec</strong> —
          slow enough that every agentic turn becomes a coffee break.
        </li>
        <li>
          <strong>A3B-style MoE (Mixture-of-Experts) models</strong> are where things changed for me. "A3B" means the model
          has a much larger total parameter count, but only routes each token through roughly <strong>3B active parameters</strong> at
          inference time. You get a bigger knowledge base <em>and</em> the speed of a small model, because you're not running
          the whole network on every token — just the "experts" the router decides are relevant.
        </li>
      </ul>
      <p>
        That combination is why A3B-class models have become my default for agentic coding work on constrained hardware.
        But not all A3B models behave the same under load, so I ran two of the current options head-to-head, on the same
        machine, using nothing but real prompts and real logs:
      </p>
      <ul>
        <li><code>qwen3.6:35b-a3b-mtp-q4_K_M</code></li>
        <li><code>nemotron-3-nano:30b-a3b-q4_K_M</code></li>
      </ul>

      <h2>Methodology (keeping this honest)</h2>
      <p>
        This is <strong>not</strong> a controlled benchmark suite — no MMLU, no HumanEval, no repeated trials for statistical
        significance. It's a same-machine, same-session field comparison, which is exactly the kind of decision most of us
        are actually making: <em>"which of these two models do I point OpenCode at today?"</em>
      </p>
      <p>Controls I did keep constant:</p>
      <ul>
        <li><strong>Context window:</strong> fixed to 32,768 tokens for both models.</li>
        <li><strong>Quantization:</strong> both <code>q4_K_M</code> — same 4-bit weight quantization scheme, so neither model gets an unfair precision advantage.</li>
        <li><strong>Temperature:</strong> left at Ollama's default for both, no manual tuning either direction.</li>
        <li><strong>Hardware:</strong> same machine, same session, back-to-back.</li>
      </ul>

      <h2>Round 1: What <code>ollama ps</code> tells you before a single token is generated</h2>
      <p>
        The first thing worth checking with any local model is how it's actually being placed on your hardware — how much
        lands on GPU vs. spills to CPU, because that ratio alone can explain half of any speed difference you see later.
      </p>
      <p><strong>Nemotron-3-Nano:</strong></p>
      {img('nemotron_3_nano')}
      <p>
        <code>nemotron-3-nano:30b-a3b-q4_K_M</code> — <strong>25 GB</strong> on disk, split <strong>77% CPU / 23% GPU</strong>,
        running with a 32,768-token context window.
      </p>
      <p><strong>Qwen3.6:</strong></p>
      {img('qwen_ollama_ps')}
      <p>
        <code>qwen3.6:35b-a3b-mtp-q4_K_M</code> — <strong>22 GB</strong> on disk, split <strong>79% CPU / 21% GPU</strong>,
        same 32,768-token context.
      </p>
      <p>Two things stand out immediately:</p>
      <ol>
        <li>
          <strong>Qwen is the larger model on paper (35B vs 30B total) but the smaller file on disk (22GB vs 25GB).</strong> That's
          a real difference in how efficiently each model's MoE routing and weight layout compress under the same q4_K_M scheme —
          not something you'd predict from parameter count alone.
        </li>
        <li>
          <strong>The CPU/GPU split is close enough (77/23 vs 79/21) that neither model has a meaningful hardware placement advantage.</strong> Whatever
          speed gap shows up next isn't explained by one model getting more GPU offload than the other.
        </li>
      </ol>

      <h2>Round 2: Prompt processing — how fast each model reads your context</h2>
      <p>
        Before a model generates anything, it has to <em>ingest</em> your prompt — your system prompt, your repo context,
        your conversation history. On long-context agentic work, this step alone can eat tens of seconds per turn.
      </p>
      <p><strong>Nemotron-3-Nano, task 4628:</strong></p>
      {img('nemotron_3_nano_project')}
      <p>
        Reading the raw server log: prompt eval finished at <strong>16,386 tokens in 64,575.30 ms</strong>, which the server
        itself reports as <strong>3.94 ms/token → 253.75 tokens/sec</strong>. That's consistent across the whole ramp — you
        can see it climbing from 255.72 t/s at 87% progress down to 254.04 t/s once the full prompt is cached.
      </p>
      <p><strong>Nemotron-3-Nano, task 1915 (a second, independent run):</strong></p>
      {img('nemotron_3_nano_t_s')}
      <p>
        Same story: <strong>16,382 tokens processed at 257.70 tokens/sec</strong>, landing in the same 254–258 t/s band as
        the first run. Good — that consistency across two separate tasks tells me this number is real, not a one-off fluke.
      </p>
      <p><strong>Qwen3.6, task 0 (first sample):</strong></p>
      {img('qwen_ollama_project')}
      <p>
        Qwen ingests the same size prompt — <strong>16,382 tokens</strong> — and the log shows it climbing through
        <strong>269.99 → 270.93 → 271.29 tokens/sec</strong> as it approaches full context.
      </p>
      <p><strong>Qwen3.6, task 0 (second sample, later in the session):</strong></p>
      {img('qwen_ollama_t_s')}
      <p>
        This later run pushes it further: <strong>16,382 tokens at 276.57 tokens/sec</strong>, holding in the <strong>270–277 t/s</strong> range throughout.
      </p>

      <div className="overflow-x-auto my-8">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="text-left py-3 px-4 font-semibold">Model</th>
              <th className="text-left py-3 px-4 font-semibold">Prompt tokens</th>
              <th className="text-left py-3 px-4 font-semibold">Prompt eval speed</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-100">
              <td className="py-3 px-4">Nemotron-3-Nano</td>
              <td className="py-3 px-4">16,382–16,386</td>
              <td className="py-3 px-4">253.75–257.70 t/s</td>
            </tr>
            <tr>
              <td className="py-3 px-4">Qwen3.6-A3B-MTP</td>
              <td className="py-3 px-4">16,382</td>
              <td className="py-3 px-4">269.99–276.57 t/s</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>
        Qwen holds a consistent <strong>~7–9% edge</strong> in raw prompt ingestion speed across multiple runs. Not huge on its
        own, but it's the first of several data points pointing the same direction.
      </p>

      <h2>Round 3: Generation speed — and where the real gap opens up</h2>
      <p>
        This is the number that actually matters for agentic work, because it's the part of the loop you're staring at the
        screen waiting on: how fast does the model produce <em>new</em> tokens, and — critically — <strong>does that speed
        hold up as the response gets longer?</strong>
      </p>
      <p><strong>Nemotron-3-Nano, task 4628 — the full generation curve:</strong></p>
      <pre className="bg-slate-900 text-slate-100 rounded-lg p-4 text-sm overflow-x-auto my-6">
{`n_decoded = 100,  tg = 25.26 t/s
n_decoded = 168,  tg = 24.01 t/s
n_decoded = 291,  tg = 22.33 t/s
n_decoded = 469,  tg = 21.17 t/s
n_decoded = 644,  tg = 20.64 t/s
n_decoded = 760,  tg = 20.40 t/s
n_decoded = 873,  tg = 20.15 t/s, tg_3s = 18.72 t/s`}
      </pre>
      <p>
        Final line for this task: <strong><code>eval time = 43694.11 ms / 880 tokens (49.65 ms/token, 20.14 tokens per second)</code></strong>.
        Total round trip: <strong>108.27 seconds for 17,266 tokens.</strong>
      </p>

      <p><strong>Nemotron-3-Nano, task 1915 — a second, independent generation:</strong></p>
      <pre className="bg-slate-900 text-slate-100 rounded-lg p-4 text-sm overflow-x-auto my-6">
{`n_decoded = 100,  tg = 25.95 t/s
n_decoded = 298,  tg = 23.07 t/s
n_decoded = 598,  tg = 21.32 t/s
n_decoded = 838,  tg = 20.86 t/s
n_decoded = 1016, tg = 20.63 t/s, tg_3s = 19.66 t/s`}
      </pre>
      <p>
        Same decay shape: starts in the mid-20s t/s, and by roughly 900–1,000 generated tokens it's settled into the
        <strong>18–20 t/s</strong> range. Two separate runs, same curve — this is a real, repeatable pattern for this model, not noise.
      </p>

      <p><strong>Qwen3.6, task 0 — first generation sample:</strong></p>
      {img('qwen_ollama_project')}
      <pre className="bg-slate-900 text-slate-100 rounded-lg p-4 text-sm overflow-x-auto my-6">
{`n_decoded = 125,  tg = 41.16 t/s
n_decoded = 305,  tg = 32.99 t/s
n_decoded = 714,  tg = 33.04 t/s
n_decoded = 1142, tg = 33.69 t/s
n_decoded = 1460, tg = 29.66 t/s
n_decoded = 1768, tg = 28.75 t/s, tg_3s = 23.16 t/s`}
      </pre>

      <p><strong>Qwen3.6 — the same session, generation continuing further:</strong></p>
      {img('qwen_ollama_t_s')}
      <pre className="bg-slate-900 text-slate-100 rounded-lg p-4 text-sm overflow-x-auto my-6">
{`n_decoded = 100,  tg = 28.75 t/s
n_decoded = 1002, tg = 23.16 t/s
n_decoded = 1650, tg = 23.34 t/s
n_decoded = 2071, tg = 23.36 t/s
n_decoded = 2333, tg = 23.04 t/s, tg_3s = 23.12 t/s`}
      </pre>
      <p>
        This is the part I didn't expect going in: <strong>Qwen's decode speed stabilizes and holds.</strong> After the initial
        burst above 40 t/s cools off, it settles into a stable <strong>23–29 t/s band and stays there — even out past 2,300
        generated tokens.</strong> It doesn't keep decaying the way Nemotron's curve does; it finds a floor and holds it.
      </p>

      <div className="overflow-x-auto my-8">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="text-left py-3 px-4 font-semibold">Model</th>
              <th className="text-left py-3 px-4 font-semibold">Peak tg</th>
              <th className="text-left py-3 px-4 font-semibold">Steady-state tg</th>
              <th className="text-left py-3 px-4 font-semibold">Tokens generated</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-100">
              <td className="py-3 px-4">Nemotron-3-Nano</td>
              <td className="py-3 px-4">~26 t/s</td>
              <td className="py-3 px-4"><strong>~18–20 t/s</strong></td>
              <td className="py-3 px-4">~880–1,016</td>
            </tr>
            <tr>
              <td className="py-3 px-4">Qwen3.6-A3B-MTP</td>
              <td className="py-3 px-4">~41 t/s</td>
              <td className="py-3 px-4"><strong>~23–29 t/s</strong></td>
              <td className="py-3 px-4">~1,768–2,333</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>Two things worth being precise about here, because it's easy to overstate this:</p>
      <ol>
        <li>
          Qwen's <em>steady-state</em> floor (~23–29 t/s) is meaningfully higher than Nemotron's (~18–20 t/s) — roughly
          <strong>20–40% faster</strong> once both models have settled in.
        </li>
        <li>
          This comparison is happening at <em>different generation lengths</em> — Nemotron's logs cap out around 900–1,000
          decoded tokens, Qwen's run over twice as far. That's not a controlled apples-to-apples decay curve at identical
          lengths, so I'm reporting what the logs actually show rather than extrapolating Nemotron's curve further than the
          data goes. What <em>is</em> fair to say: Qwen was still comfortably above 23 t/s at a token count where Nemotron's
          own logs had already dropped below 20 t/s.
        </li>
      </ol>
      <p>
        My working theory for <em>why</em>: Qwen3.6 here is the <strong>MTP variant — multi-token prediction</strong>, meaning
        the model is architected to draft and verify multiple tokens per forward pass instead of strictly one-at-a-time. That's
        a plausible mechanical explanation for why it holds a stable, higher decode rate over long generations rather than
        bleeding speed the longer it runs. Nemotron-3-Nano doesn't carry that MTP tag, and its curve behaves accordingly.
      </p>

      <h2>Round 4: The part no tokens/sec chart shows you</h2>
      <p>
        Speed on paper is only half of what you're paying for in an agentic loop. The other half is: <em>does the model
        reason efficiently, or does it burn wall-clock time arguing with itself?</em>
      </p>
      <p>
        I logged a full working session with Nemotron-3-Nano in "Ponytail mode" (a lightweight system prompt style meant to
        keep responses terse — code first, minimal commentary after). Three moments from that session are worth walking through
        in detail.
      </p>
      <p>
        <strong>Moment 1 — a straightforward build request took 2 minutes 32 seconds of internal deliberation.</strong> Asked
        to build a simple CLI todo app in Python with file persistence and unit tests, the model's own visible "thought" process
        worked through reasonable design decisions — argparse vs. subcommands, JSON vs. plain-text storage, where to put the
        export feature — before writing any code. Thorough, if a little wordy, but defensible for a multi-part spec.
      </p>
      <p>
        <strong>Moment 2 — an ambiguous one-line follow-up cost 32 seconds and never actually got resolved cleanly.</strong> I
        sent: <em>"write it to current directory <code>C:\Users\...\linkedin posts</code>"</em> — genuinely ambiguous, since
        no prior file content had been specified. The model's internal trace shows it correctly identifying the ambiguity, but
        then spending real time weighing whether to guess at content anyway before landing on asking for clarification. Reasonable
        outcome, expensive path to get there.
      </p>
      <p>
        <strong>Moment 3 — this is the one that actually surprised me.</strong> I replied with a single word: <strong>"ok."</strong>
        Nemotron's internal thought process for that one word ran <strong>40.2 seconds</strong>, and the visible reasoning shows
        it <em>relitigating its own output-formatting rule</em> — debating with itself about whether a reply counts as "three
        short lines" or "two short lines" against a self-imposed constraint, before settling on a two-line acknowledgment.
      </p>
      <p>
        That same looping pattern shows up again on a completely different, technical question about LangChain's "deepagents":
      </p>
      {img('nemotron_3_nano_ans')}
      <p>
        You can see it in the screenshot itself — the model drafts a "skipped / add when" answer, then stops to second-guess
        whether its own reply satisfies its self-imposed line-count rule — and re-derives essentially the same two-line answer
        <strong>three separate times</strong> before committing to output it.
      </p>
      <p>
        None of this is catastrophic — the eventual answers were fine — but it's real, measurable overhead. In an agentic
        harness, every one of these internal loops is wall-clock time you're waiting on before the next tool call even fires.
      </p>
      <p>
        Compare that to Qwen3.6's answer to a similarly open-ended technical question, in the same class of "is there really
        a package called X":
      </p>
      {img('qwen_ollama_ans')}
      <p>
        No visible relitigating. The model states plainly that there's no official LangChain package called <code>deepagents</code>,
        then lays out the three real interpretations people usually mean — the independent OSS package (<code>pip install deepagents</code>),
        LangGraph's actual agent-executor replacement, or the general "deep agent" architecture pattern — and closes by offering
        to scaffold whichever one I actually meant. Direct, structured, and done in 3 minutes 40 seconds without a single visible
        detour into re-deriving its own formatting rules.
      </p>

      <h2>Putting it all together</h2>
      <div className="overflow-x-auto my-8">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="text-left py-3 px-4 font-semibold">Metric</th>
              <th className="text-left py-3 px-4 font-semibold">Nemotron-3-Nano:30B-A3B</th>
              <th className="text-left py-3 px-4 font-semibold">Qwen3.6:35B-A3B-MTP</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-100">
              <td className="py-3 px-4">Disk size</td>
              <td className="py-3 px-4">25 GB</td>
              <td className="py-3 px-4">22 GB</td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="py-3 px-4">CPU/GPU split</td>
              <td className="py-3 px-4">77% / 23%</td>
              <td className="py-3 px-4">79% / 21%</td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="py-3 px-4">Prompt eval speed</td>
              <td className="py-3 px-4">253.75–257.70 t/s</td>
              <td className="py-3 px-4">269.99–276.57 t/s</td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="py-3 px-4">Peak generation speed</td>
              <td className="py-3 px-4">~26 t/s</td>
              <td className="py-3 px-4">~41 t/s</td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="py-3 px-4">Steady-state generation speed</td>
              <td className="py-3 px-4">~18–20 t/s</td>
              <td className="py-3 px-4">~23–29 t/s</td>
            </tr>
            <tr>
              <td className="py-3 px-4">Reasoning overhead on trivial turns</td>
              <td className="py-3 px-4">High — visible self-looping</td>
              <td className="py-3 px-4">Low — direct answers</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Caveats, because a single-machine test deserves them</h2>
      <ul>
        <li>
          This is <strong>one machine, one session</strong> — not a reproducible benchmark suite, and I haven't run statistical
          trials across dozens of prompts.
        </li>
        <li>
          Both models are being run at the same quantization and context length, but they are <strong>architecturally different
          models</strong> from different labs — this isn't an isolated "does MTP help" ablation, it's a real-world "which one
          should I actually use" comparison.
        </li>
        <li>
          Generation-length comparisons above are reported at the lengths the logs actually reached, not extrapolated further —
          I've tried to flag where the comparison is exact versus where it's directional.
        </li>
        <li>
          Your mileage will genuinely vary by hardware, by how much VRAM you can dedicate, and by workload — a model that reasons
          more verbosely might be exactly what you want for some tasks.
        </li>
      </ul>

      <h2>Where this leaves me</h2>
      <p>
        For agentic coding work through OpenCode on constrained hardware, Qwen3.6:35B-A3B-MTP is now my default. It ingests
        context faster, holds a meaningfully higher and more stable generation speed on long outputs, and — based on what I can
        observe from output behavior — doesn't appear to burn turns relitigating its own formatting decisions the way
        Nemotron-3-Nano did in this session.
      </p>
      <p>
        Nemotron-3-Nano isn't a bad model — the actual answers it produced were correct — but if your workload involves long
        agentic sessions where a model needs to hold up over thousands of generated tokens per task, the gap here is hard to ignore.
      </p>
      <p>
        If you're running local models for coding on similarly constrained hardware, I'd genuinely like to compare notes — drop
        your own <code>ollama ps</code> numbers and generation curves in the comments.
      </p>
    </article>
  )
}

export default function BlogPostModal({ post, onClose }) {
  const overlayRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    // Animate in
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 })
    gsap.fromTo(contentRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, delay: 0.1 })

    // Lock body scroll
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const handleClose = () => {
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.2 })
    gsap.to(contentRef.current, { y: 20, opacity: 0, duration: 0.2, onComplete: onClose })
  }

  // Close on escape
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') handleClose() }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center overflow-y-auto py-8 px-4"
      onClick={(e) => { if (e.target === overlayRef.current) handleClose() }}
    >
      <div
        ref={contentRef}
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full relative"
        style={{ opacity: 0 }}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
          aria-label="Close"
        >
          <HiXMark className="w-5 h-5 text-slate-600" />
        </button>

        {/* Header */}
        <div className="p-8 md:p-12 border-b border-slate-100">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-block w-2 h-2 rounded-full bg-primary-500" />
            <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">
              {post.date} · {post.readTime}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold font-display tracking-tight text-slate-900 mb-4">
            {post.title}
          </h1>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="skill-badge text-[0.6rem]">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-8 md:p-12">
          <QwenVsNemotronContent />
        </div>
      </div>
    </div>
  )
}
