import { useEffect, useRef, useState, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import gsap from 'gsap'
import { HiArrowLeft, HiXMark, HiChevronLeft, HiChevronRight } from 'react-icons/hi2'
import { LOCAL_BLOG_POSTS, BLOG_IMAGES, BLOG_VIDEO } from '../data/localBlogs'

/* ─── Lightbox ─── */
function Lightbox({ images, currentIndex, onClose, onPrev, onNext }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose, onPrev, onNext])

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
        aria-label="Close"
      >
        <HiXMark className="w-6 h-6" />
      </button>

      {images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); onPrev() }}
            className="absolute left-4 md:left-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
            aria-label="Previous"
          >
            <HiChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onNext() }}
            className="absolute right-4 md:right-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
            aria-label="Next"
          >
            <HiChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      <div className="max-w-5xl w-full mx-4 md:mx-8" onClick={(e) => e.stopPropagation()}>
        <img
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
          className="w-full h-auto max-h-[85vh] object-contain rounded-xl shadow-2xl"
        />
        <p className="text-center text-white/70 text-sm mt-4 font-mono">
          {images[currentIndex].caption}
          {images.length > 1 && ` — ${currentIndex + 1} / ${images.length}`}
        </p>
      </div>
    </div>
  )
}

/* ─── Image pair comparison ─── */
function ImagePair({ left, right, onImageClick }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
      <button
        onClick={() => onImageClick(left)}
        className="group relative overflow-hidden rounded-xl border border-slate-200 bg-slate-50 hover:border-primary-300 transition-all hover:shadow-lg"
      >
        <img
          src={left.src}
          alt={left.alt}
          className="w-full h-auto"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <span className="absolute bottom-3 left-3 text-xs font-mono text-white opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 px-2 py-1 rounded">
          {left.label}
        </span>
      </button>
      <button
        onClick={() => onImageClick(right)}
        className="group relative overflow-hidden rounded-xl border border-slate-200 bg-slate-50 hover:border-primary-300 transition-all hover:shadow-lg"
      >
        <img
          src={right.src}
          alt={right.alt}
          className="w-full h-auto"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <span className="absolute bottom-3 left-3 text-xs font-mono text-white opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 px-2 py-1 rounded">
          {right.label}
        </span>
      </button>
    </div>
  )
}

/* ─── Single screenshot with caption ─── */
function Screenshot({ image, caption, onImageClick }) {
  return (
    <figure className="my-8">
      <button
        onClick={() => onImageClick(image)}
        className="group relative overflow-hidden rounded-xl border border-slate-200 bg-slate-50 hover:border-primary-300 transition-all hover:shadow-lg block w-full text-left"
      >
        <img
          src={image.src}
          alt={image.alt}
          className="w-full h-auto"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <span className="absolute bottom-3 right-3 text-xs font-mono text-white opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 px-2 py-1 rounded">
          Click to enlarge
        </span>
      </button>
      {caption && (
        <figcaption className="text-sm text-slate-500 mt-3 text-center font-mono">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

/* ─── Metric card for comparison tables ─── */
function MetricRow({ label, nemotron, qwen, highlight }) {
  return (
    <tr className="border-b border-slate-100 last:border-0">
      <td className="py-3 px-4 font-medium text-slate-700">{label}</td>
      <td className={`py-3 px-4 ${highlight ? 'font-semibold text-slate-900' : 'text-slate-600'}`}>{nemotron}</td>
      <td className={`py-3 px-4 ${highlight ? 'font-semibold text-primary-600' : 'text-slate-600'}`}>{qwen}</td>
    </tr>
  )
}

/* ─── Section divider with label ─── */
function SectionDivider({ number, title }) {
  return (
    <div className="flex items-center gap-4 my-12 md:my-16">
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-primary-500/25">
        {number}
      </div>
      <h2 className="text-2xl md:text-3xl font-bold font-display tracking-tight text-slate-900">
        {title}
      </h2>
      <div className="flex-1 h-px bg-gradient-to-r from-slate-200 to-transparent" />
    </div>
  )
}

/* ─── Blog content ─── */
function QwenVsNemotronContent({ onImageClick }) {
  return (
    <article className="prose prose-slate prose-lg max-w-none">
      <p className="text-slate-500 italic text-lg leading-relaxed mb-8 border-l-2 border-primary-300 pl-4">
        A field report from someone who runs these models to actually ship code, not just to run a benchmark suite.
      </p>

      {/* ── Video showdown ── */}
      <div className="not-prose my-8 md:my-10">
        <div className="flex items-center gap-4 mb-5">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-rose-500 to-rose-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-rose-500/25">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
            </svg>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold font-display tracking-tight text-slate-900 m-0">
            Watch the showdown
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
            poster={BLOG_IMAGES['Coding_AI_Performance_Comparison']}
          >
            <source src={BLOG_VIDEO['local_llm_showdown']} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <p className="text-sm text-slate-400 mt-3 text-center font-mono">
          Screen recording — Qwen3.6:35B-A3B-MTP vs Nemotron-3-Nano:30B-A3B running head-to-head
        </p>
      </div>

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
        <li><strong>Quantization:</strong> both <code>q4_K_M</code> — same 4-bit weight quantization scheme.</li>
        <li><strong>Temperature:</strong> left at Ollama's default for both, no manual tuning.</li>
        <li><strong>Hardware:</strong> same machine, same session, back-to-back.</li>
      </ul>

      {/* ── Round 1 ── */}
      <SectionDivider number={1} title="What ollama ps tells you before a single token is generated" />

      <p>
        The first thing worth checking with any local model is how it's actually being placed on your hardware — how much
        lands on GPU vs. spills to CPU, because that ratio alone can explain half of any speed difference you see later.
      </p>

      <ImagePair
        left={{
          src: BLOG_IMAGES['nemotron_3_nano'],
          alt: 'ollama ps output for Nemotron-3-Nano',
          label: 'Nemotron-3-Nano'
        }}
        right={{
          src: BLOG_IMAGES['qwen_ollama_ps'],
          alt: 'ollama ps output for Qwen3.6',
          label: 'Qwen3.6'
        }}
        onImageClick={onImageClick}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-2">Nemotron-3-Nano</p>
          <p className="text-2xl font-bold text-slate-900">25 GB</p>
          <p className="text-sm text-slate-500 mt-1">77% CPU / 23% GPU</p>
        </div>
        <div className="rounded-xl border border-primary-200 bg-primary-50/50 p-5">
          <p className="text-xs font-mono text-primary-500 uppercase tracking-widest mb-2">Qwen3.6</p>
          <p className="text-2xl font-bold text-primary-700">22 GB</p>
          <p className="text-sm text-primary-600/70 mt-1">79% CPU / 21% GPU</p>
        </div>
      </div>

      <p>Two things stand out immediately:</p>
      <ol>
        <li>
          <strong>Qwen is the larger model on paper (35B vs 30B total) but the smaller file on disk (22GB vs 25GB).</strong> That's
          a real difference in how efficiently each model's MoE routing and weight layout compress under the same q4_K_M scheme.
        </li>
        <li>
          <strong>The CPU/GPU split is close enough (77/23 vs 79/21) that neither model has a meaningful hardware placement advantage.</strong> Whatever
          speed gap shows up next isn't explained by one model getting more GPU offload than the other.
        </li>
      </ol>

      {/* ── Round 2 ── */}
      <SectionDivider number={2} title="Prompt processing — how fast each model reads your context" />

      <p>
        Before a model generates anything, it has to <em>ingest</em> your prompt — your system prompt, your repo context,
        your conversation history. On long-context agentic work, this step alone can eat tens of seconds per turn.
      </p>

      <Screenshot
        image={{
          src: BLOG_IMAGES['nemotron_3_nano_project'],
          alt: 'Nemotron prompt processing log'
        }}
        caption="Nemotron-3-Nano: 16,386 tokens processed at 253.75 tokens/sec"
        onImageClick={onImageClick}
      />

      <Screenshot
        image={{
          src: BLOG_IMAGES['nemotron_3_nano_t_s'],
          alt: 'Nemotron prompt processing — second run'
        }}
        caption="Nemotron-3-Nano (2nd run): 16,382 tokens at 257.70 tokens/sec — consistent"
        onImageClick={onImageClick}
      />

      <Screenshot
        image={{
          src: BLOG_IMAGES['qwen_ollama_project'],
          alt: 'Qwen prompt processing log'
        }}
        caption="Qwen3.6: 16,382 tokens climbing through 269.99 → 271.29 tokens/sec"
        onImageClick={onImageClick}
      />

      <Screenshot
        image={{
          src: BLOG_IMAGES['qwen_ollama_t_s'],
          alt: 'Qwen prompt processing — later run'
        }}
        caption="Qwen3.6 (later run): 16,382 tokens at 276.57 tokens/sec"
        onImageClick={onImageClick}
      />

      <div className="overflow-x-auto my-8 rounded-xl border border-slate-200">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="text-left py-3 px-4 font-semibold text-slate-700">Model</th>
              <th className="text-left py-3 px-4 font-semibold text-slate-700">Prompt tokens</th>
              <th className="text-left py-3 px-4 font-semibold text-slate-700">Eval speed</th>
            </tr>
          </thead>
          <tbody>
            <MetricRow
              label="Nemotron-3-Nano"
              nemotron="16,382–16,386"
              qwen="253.75–257.70 t/s"
            />
            <MetricRow
              label="Qwen3.6-A3B-MTP"
              nemotron="16,382"
              qwen="269.99–276.57 t/s"
              highlight
            />
          </tbody>
        </table>
      </div>

      <p>
        Qwen holds a consistent <strong>~7–9% edge</strong> in raw prompt ingestion speed across multiple runs. Not huge on its
        own, but it's the first of several data points pointing the same direction.
      </p>

      {/* ── Round 3 ── */}
      <SectionDivider number={3} title="Generation speed — where the real gap opens up" />

      <p>
        This is the number that actually matters for agentic work, because it's the part of the loop you're staring at the
        screen waiting on: how fast does the model produce <em>new</em> tokens, and — critically — <strong>does that speed
        hold up as the response gets longer?</strong>
      </p>

      <p><strong>Nemotron-3-Nano, task 4628 — the full generation curve:</strong></p>
      <pre className="bg-slate-900 text-slate-100 rounded-xl p-5 text-sm overflow-x-auto my-6 font-mono leading-relaxed">
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
      <pre className="bg-slate-900 text-slate-100 rounded-xl p-5 text-sm overflow-x-auto my-6 font-mono leading-relaxed">
{`n_decoded = 100,  tg = 25.95 t/s
n_decoded = 298,  tg = 23.07 t/s
n_decoded = 598,  tg = 21.32 t/s
n_decoded = 838,  tg = 20.86 t/s
n_decoded = 1016, tg = 20.63 t/s, tg_3s = 19.66 t/s`}
      </pre>
      <p>
        Same decay shape: starts in the mid-20s t/s, and by roughly 900–1,000 generated tokens it's settled into the
        <strong>18–20 t/s</strong> range. Two separate runs, same curve — this is a real, repeatable pattern.
      </p>

      <p><strong>Qwen3.6, task 0 — first generation sample:</strong></p>
      <Screenshot
        image={{
          src: BLOG_IMAGES['qwen_ollama_project'],
          alt: 'Qwen generation log'
        }}
        caption="Qwen3.6 generation curve — starts at 41.16 t/s"
        onImageClick={onImageClick}
      />
      <pre className="bg-slate-900 text-slate-100 rounded-xl p-5 text-sm overflow-x-auto my-6 font-mono leading-relaxed">
{`n_decoded = 125,  tg = 41.16 t/s
n_decoded = 305,  tg = 32.99 t/s
n_decoded = 714,  tg = 33.04 t/s
n_decoded = 1142, tg = 33.69 t/s
n_decoded = 1460, tg = 29.66 t/s
n_decoded = 1768, tg = 28.75 t/s, tg_3s = 23.16 t/s`}
      </pre>

      <p><strong>Qwen3.6 — the same session, generation continuing further:</strong></p>
      <Screenshot
        image={{
          src: BLOG_IMAGES['qwen_ollama_t_s'],
          alt: 'Qwen generation continuing'
        }}
        caption="Qwen3.6 generation stabilizes at 23–29 t/s — holds steady past 2,300 tokens"
        onImageClick={onImageClick}
      />
      <pre className="bg-slate-900 text-slate-100 rounded-xl p-5 text-sm overflow-x-auto my-6 font-mono leading-relaxed">
{`n_decoded = 100,  tg = 28.75 t/s
n_decoded = 1002, tg = 23.16 t/s
n_decoded = 1650, tg = 23.34 t/s
n_decoded = 2071, tg = 23.36 t/s
n_decoded = 2333, tg = 23.04 t/s, tg_3s = 23.12 t/s`}
      </pre>

      <div className="bg-primary-50 border border-primary-200 rounded-xl p-5 my-8">
        <p className="text-primary-800 font-medium mb-1">Key insight</p>
        <p className="text-primary-700">
          <strong>Qwen's decode speed stabilizes and holds.</strong> After the initial burst above 40 t/s cools off,
          it settles into a stable <strong>23–29 t/s band and stays there — even out past 2,300 generated tokens.</strong>
          It doesn't keep decaying the way Nemotron's curve does; it finds a floor and holds it.
        </p>
      </div>

      <div className="overflow-x-auto my-8 rounded-xl border border-slate-200">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="text-left py-3 px-4 font-semibold text-slate-700">Model</th>
              <th className="text-left py-3 px-4 font-semibold text-slate-700">Peak tg</th>
              <th className="text-left py-3 px-4 font-semibold text-slate-700">Steady-state tg</th>
              <th className="text-left py-3 px-4 font-semibold text-slate-700">Tokens generated</th>
            </tr>
          </thead>
          <tbody>
            <MetricRow
              label="Nemotron-3-Nano"
              nemotron="~26 t/s"
              qwen="~18–20 t/s"
              highlight={false}
            />
            <MetricRow
              label="Qwen3.6-A3B-MTP"
              nemotron="~41 t/s"
              qwen="~23–29 t/s"
              highlight
            />
          </tbody>
        </table>
      </div>

      <p>Two things worth being precise about:</p>
      <ol>
        <li>
          Qwen's <em>steady-state</em> floor (~23–29 t/s) is meaningfully higher than Nemotron's (~18–20 t/s) — roughly
          <strong>20–40% faster</strong> once both models have settled in.
        </li>
        <li>
          This comparison is happening at <em>different generation lengths</em> — Nemotron's logs cap out around 900–1,000
          decoded tokens, Qwen's run over twice as far. What <em>is</em> fair to say: Qwen was still comfortably above 23 t/s
          at a token count where Nemotron's own logs had already dropped below 20 t/s.
        </li>
      </ol>
      <p>
        My working theory: Qwen3.6 here is the <strong>MTP variant — multi-token prediction</strong>, meaning
        the model drafts and verifies multiple tokens per forward pass instead of strictly one-at-a-time. That's
        a plausible mechanical explanation for why it holds a stable, higher decode rate over long generations.
      </p>

      {/* ── Round 4 ── */}
      <SectionDivider number={4} title="The part no tokens/sec chart shows you" />

      <p>
        Speed on paper is only half of what you're paying for in an agentic loop. The other half is: <em>does the model
        reason efficiently, or does it burn wall-clock time arguing with itself?</em>
      </p>
      <p>
        I logged a full working session with Nemotron-3-Nano in "Ponytail mode" (a lightweight system prompt style meant to
        keep responses terse). Three moments from that session are worth walking through.
      </p>
      <p>
        <strong>Moment 1 — a straightforward build request took 2 minutes 32 seconds of internal deliberation.</strong> Asked
        to build a simple CLI todo app, the model's own visible "thought" process worked through reasonable design decisions
        before writing any code. Thorough, if a little wordy, but defensible for a multi-part spec.
      </p>
      <p>
        <strong>Moment 2 — an ambiguous one-line follow-up cost 32 seconds and never actually got resolved cleanly.</strong> I
        sent: <em>"write it to current directory <code>C:\Users\...\linkedin posts</code>"</em> — genuinely ambiguous. The model's
        internal trace shows it correctly identifying the ambiguity, but spending real time weighing whether to guess at content
        before landing on asking for clarification.
      </p>
      <p>
        <strong>Moment 3 — this is the one that surprised me.</strong> I replied with a single word: <strong>"ok."</strong>
        Nemotron's internal thought process for that one word ran <strong>40.2 seconds</strong>, relitigating its own
        output-formatting rule — debating whether a reply counts as "three short lines" or "two short lines."
      </p>

      <Screenshot
        image={{
          src: BLOG_IMAGES['nemotron_3_nano_ans'],
          alt: 'Nemotron reasoning trace looping on its own formatting rule'
        }}
        caption="Nemotron-3-Nano re-derives the same two-line answer three separate times"
        onImageClick={onImageClick}
      />

      <p>
        Compare that to Qwen3.6's answer to a similarly open-ended technical question:
      </p>

      <Screenshot
        image={{
          src: BLOG_IMAGES['qwen_ollama_ans'],
          alt: 'Qwen answering the DeepAgents question directly'
        }}
        caption="Qwen3.6 — direct, structured, no visible relitigating"
        onImageClick={onImageClick}
      />

      <p>
        No visible relitigating. The model states plainly that there's no official LangChain package called <code>deepagents</code>,
        then lays out the three real interpretations — the independent OSS package, LangGraph's actual agent-executor replacement,
        or the general "deep agent" architecture pattern — and closes by offering to scaffold whichever one I actually meant.
        Direct, structured, and done in 3 minutes 40 seconds without a single detour.
      </p>

      {/* ── Summary ── */}
      <SectionDivider number={5} title="Putting it all together" />

      <div className="overflow-x-auto my-8 rounded-xl border border-slate-200">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="text-left py-3 px-4 font-semibold text-slate-700">Metric</th>
              <th className="text-left py-3 px-4 font-semibold text-slate-700">Nemotron-3-Nano:30B-A3B</th>
              <th className="text-left py-3 px-4 font-semibold text-primary-600">Qwen3.6:35B-A3B-MTP</th>
            </tr>
          </thead>
          <tbody>
            <MetricRow label="Disk size" nemotron="25 GB" qwen="22 GB" />
            <MetricRow label="CPU/GPU split" nemotron="77% / 23%" qwen="79% / 21%" />
            <MetricRow label="Prompt eval speed" nemotron="253.75–257.70 t/s" qwen="269.99–276.57 t/s" highlight />
            <MetricRow label="Peak generation speed" nemotron="~26 t/s" qwen="~41 t/s" highlight />
            <MetricRow label="Steady-state generation speed" nemotron="~18–20 t/s" qwen="~23–29 t/s" highlight />
            <MetricRow label="Reasoning overhead on trivial turns" nemotron="High — visible self-looping" qwen="Low — direct answers" />
          </tbody>
        </table>
      </div>

      <h2>Caveats, because a single-machine test deserves them</h2>
      <ul>
        <li>
          This is <strong>one machine, one session</strong> — not a reproducible benchmark suite.
        </li>
        <li>
          Both models are <strong>architecturally different</strong> from different labs — this isn't an isolated "does MTP help" ablation.
        </li>
        <li>
          Generation-length comparisons are reported at the lengths the logs actually reached, not extrapolated further.
        </li>
        <li>
          Your mileage will genuinely vary by hardware, VRAM, and workload.
        </li>
      </ul>

      <h2>Where this leaves me</h2>
      <p>
        For agentic coding work through OpenCode on constrained hardware, <strong>Qwen3.6:35B-A3B-MTP is now my default.</strong> It ingests
        context faster, holds a meaningfully higher and more stable generation speed on long outputs, and doesn't appear
        to burn turns relitigating its own formatting decisions the way Nemotron-3-Nano did in this session.
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

/* ─── Page ─── */
export default function BlogPostPage() {
  const { slug } = useParams()
  const pageRef = useRef(null)
  const coverRef = useRef(null)
  const [lightbox, setLightbox] = useState({ open: false, index: 0 })

  const post = LOCAL_BLOG_POSTS.find((p) => p.id === slug)

  // All clickable images for lightbox
  const allImages = [
    { src: BLOG_IMAGES['nemotron_3_nano'], alt: 'ollama ps — Nemotron-3-Nano', caption: 'Nemotron-3-Nano: ollama ps output' },
    { src: BLOG_IMAGES['qwen_ollama_ps'], alt: 'ollama ps — Qwen3.6', caption: 'Qwen3.6: ollama ps output' },
    { src: BLOG_IMAGES['nemotron_3_nano_project'], alt: 'Nemotron prompt processing', caption: 'Nemotron-3-Nano: prompt eval log' },
    { src: BLOG_IMAGES['nemotron_3_nano_t_s'], alt: 'Nemotron prompt processing (2nd)', caption: 'Nemotron-3-Nano: prompt eval — second run' },
    { src: BLOG_IMAGES['qwen_ollama_project'], alt: 'Qwen prompt processing', caption: 'Qwen3.6: prompt eval log' },
    { src: BLOG_IMAGES['qwen_ollama_t_s'], alt: 'Qwen prompt processing (2nd)', caption: 'Qwen3.6: prompt eval — later run' },
    { src: BLOG_IMAGES['nemotron_3_nano_ans'], alt: 'Nemotron reasoning trace', caption: 'Nemotron-3-Nano: self-looping reasoning trace' },
    { src: BLOG_IMAGES['qwen_ollama_ans'], alt: 'Qwen answer', caption: 'Qwen3.6: direct answer — no relitigating' },
  ]

  const openLightbox = useCallback((image) => {
    const idx = allImages.findIndex((i) => i.src === image.src)
    setLightbox({ open: true, index: idx >= 0 ? idx : 0 })
  }, [])

  const closeLightbox = useCallback(() => setLightbox((s) => ({ ...s, open: false })), [])
  const prevImage = useCallback(() => setLightbox((s) => ({
    ...s,
    index: s.index > 0 ? s.index - 1 : allImages.length - 1,
  })), [])
  const nextImage = useCallback(() => setLightbox((s) => ({
    ...s,
    index: s.index < allImages.length - 1 ? s.index + 1 : 0,
  })), [])

  useEffect(() => {
    window.scrollTo(0, 0)
    if (pageRef.current) {
      gsap.fromTo(pageRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'power2.out' })
    }
    if (coverRef.current) {
      gsap.fromTo(
        coverRef.current.querySelectorAll('.cover-animate'),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out', delay: 0.2 }
      )
    }
  }, [slug])

  if (!post) {
    return (
      <div className="min-h-screen bg-surface-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Blog post not found</h1>
          <Link
            to="/#blogs"
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors"
          >
            <HiArrowLeft className="w-4 h-4" />
            Back to blogs
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div ref={pageRef} className="min-h-screen bg-white" style={{ opacity: 0 }}>
      {/* ─── Cover Hero ─── */}
      <header ref={coverRef} className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-primary-900">
        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }} />
        {/* Gradient orbs */}
        <div className="absolute top-20 -left-32 w-96 h-96 bg-primary-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-10 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px]" />

        <div className="relative max-w-4xl mx-auto px-4 pt-8 pb-16 md:pt-12 md:pb-24">
          {/* Back link */}
          <Link
            to="/#blogs"
            className="cover-animate inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm font-medium mb-8"
          >
            <HiArrowLeft className="w-4 h-4" />
            Back to blogs
          </Link>

          {/* Tags */}
          <div className="cover-animate flex flex-wrap gap-2 mb-6">
            {post.tags?.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs font-mono bg-white/10 text-white/80 border border-white/10"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="cover-animate text-3xl md:text-4xl lg:text-5xl font-bold font-display tracking-tight text-white mb-4 leading-tight">
            {post.title}
          </h1>

          {/* Subtitle */}
          <p className="cover-animate text-lg text-white/60 mb-8 max-w-3xl">
            {post.subtitle}
          </p>

          {/* Meta */}
          <div className="cover-animate flex items-center gap-4 text-sm text-white/50 font-mono">
            <span>{post.date}</span>
            <span className="w-1 h-1 rounded-full bg-white/30" />
            <span>{post.readTime}</span>
            <span className="w-1 h-1 rounded-full bg-white/30" />
            <span>Local LLM comparison</span>
          </div>
        </div>
      </header>

      {/* ─── Article Body ─── */}
      <main className="max-w-4xl mx-auto px-4 py-12 md:py-16">
        <QwenVsNemotronContent onImageClick={openLightbox} />
      </main>

      {/* ─── Footer ─── */}
      <footer className="border-t border-slate-200 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 py-8 flex items-center justify-between">
          <Link
            to="/#blogs"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors text-sm font-medium"
          >
            <HiArrowLeft className="w-4 h-4" />
            Back to all articles
          </Link>
        </div>
      </footer>

      {/* ─── Lightbox ─── */}
      {lightbox.open && (
        <Lightbox
          images={allImages}
          currentIndex={lightbox.index}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}
    </div>
  )
}
