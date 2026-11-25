import { BLOG_IMAGES } from '../data/localBlogs'

function Figure({ src, alt, caption }) {
  return (
    <figure className="my-6">
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

function Stat({ label, value, tone = 'slate', compact = false }) {
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
      <div className={`mt-2 font-bold ${compact ? 'text-lg' : 'text-2xl'} ${valueClass}`}>{value}</div>
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

function H3({ children }) {
  return <h3 className="!mt-8 !mb-3 !text-lg !font-semibold !text-slate-900">{children}</h3>
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

function Callout({ title, children, tone = 'note' }) {
  const tones = {
    note: 'border-primary-200 bg-primary-50/50',
    warn: 'border-amber-300 bg-amber-50/60',
    evidence: 'border-slate-300 bg-slate-100/70',
  }
  const titleTone = tone === 'warn' ? 'text-amber-800' : tone === 'evidence' ? 'text-slate-700' : 'text-primary-700'
  return (
    <div className={`not-prose my-8 rounded-xl border p-5 ${tones[tone]}`}>
      <p className={`!mt-0 !mb-2 font-mono text-xs uppercase tracking-[0.16em] ${titleTone}`}>{title}</p>
      <div className="text-sm leading-relaxed text-slate-700 space-y-3">{children}</div>
    </div>
  )
}

function Code({ children, caption }) {
  return (
    <div className="not-prose my-6">
      <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 text-xs overflow-x-auto font-mono leading-relaxed whitespace-pre-wrap">
        {children}
      </pre>
      {caption && (
        <p className="mt-2 font-mono text-xs text-slate-500">{caption}</p>
      )}
    </div>
  )
}

export default function Inkling2MiniBlogContent() {
  return (
    <article className="prose prose-slate prose-lg max-w-none prose-headings:scroll-mt-24 prose-p:leading-7 prose-li:leading-7 space-y-10">
      <p className="text-slate-500 italic text-lg leading-relaxed mb-8 border-l-2 border-primary-300 pl-4">
        Seven tasks, one small local model, and deliberately no benchmark numbers. I pushed Inkling-2-Mini
        through reasoning puzzles, a distributed-systems scenario, a production FastAPI brief, a money-transfer
        race condition, a full dashboard, a SaaS funnel, and a 100-word constraint, then wrote down what held
        up, what broke, and what I have no evidence to claim either way.
      </p>

      <div className="not-prose grid grid-cols-1 md:grid-cols-4 gap-4 my-8">
        <Stat label="Tasks run" value="7 domains" tone="blue" />
        <Stat label="Score range" value="7.8 – 10" tone="emerald" />
        <Stat label="Speed observed" value="3–7 tok/s" tone="amber" />
        <Stat label="Verdict" value="Verify code" />
      </div>

      <H2>Why I wanted to evaluate Inkling-2-Mini</H2>
      <p>
        Most of what I write about local models starts with speed, because on an 8 GB laptop GPU, speed is the
        first wall you hit. This evaluation started somewhere different. I wanted to know how a small local
        model behaves when a task is <em>not</em> just "write this function", when it spans architecture,
        transactions, product metrics, UI constraints, and a word count, all in the same sitting.
      </p>
      <p>
        That matters because the expensive failure mode of a capable model is rarely a syntax error. It is the
        answer that reads like it came from a staff engineer and quietly skips the transaction boundary. So the
        question I set out to answer was simple:
      </p>
      <blockquote>
        Where is Inkling-2-Mini genuinely useful, where is it unreliable, and what should I verify before
        trusting it in a real workflow?
      </blockquote>
      <p>
        What follows is a qualitative, conversation-based evaluation across seven task categories. It is not a
        benchmark, not a pass-rate study, and not a head-to-head against a frontier model. Every score you see
        is my own reviewer judgment about a specific observed response.
      </p>

      <H2>Test environment and methodology</H2>
      <p>
        Evaluation date: <strong>25 November 2026</strong>. Machine: a Windows laptop with an{' '}
        <strong>NVIDIA RTX 4060 Laptop GPU (8 GB VRAM)</strong> and <strong>32 GB of system RAM</strong>, running
        the model in <strong>LM Studio 0.4.28+2</strong> from a Q4_K_M GGUF on disk. Everything below comes from
        that session: the model file, the runtime configuration, and an exported chat transcript covering all
        seven tasks. The model was given practical tasks with constraints, expected outcomes, or realistic
        engineering and business scenarios, and I assessed six things each time:
      </p>
      <ol>
        <li>Correctness of the answer or implementation.</li>
        <li>Whether it identified assumptions and missing information.</li>
        <li>Whether it followed explicit instructions.</li>
        <li>Whether its code actually matched its architectural explanation.</li>
        <li>Whether it considered edge cases, failure modes, and operational risks.</li>
        <li>Whether its claims were supported by the supplied evidence.</li>
      </ol>

      <H3>The reproducibility record</H3>
      <p>
        This is the part most model write-ups skip, so I am putting it first. Model identity, quantization, and
        runtime are now recoverable, so they are filled in from Hugging Face, the file on disk, and the export
        header. Sampling settings and per-task timing were never captured, and those stay blank rather than
        getting a plausible-looking guess:
      </p>

      <div className="not-prose my-8">
        <Table
          headers={['Metadata', 'Current record']}
          rows={[
            ['<strong>Model name</strong>', 'Inkling-2-Mini'],
            ['<strong>Repository / publisher</strong>', '<code>lmstudio-community/Inkling-2-Mini-GGUF</code>, GGUF built by the LM Studio team; base model <code>thinkingmachines/Inkling-2-Mini</code> by Thinking Machines Lab, Apache-2.0, released 20 Nov 2026'],
            ['<strong>Revision / checksum</strong>', 'Repo revision <code>23c938b0…</code> (last modified 2026-11-21); <code>Inkling-2-Mini-Q4_K_M.gguf</code> SHA-256 <code>dac3702a…db483de</code>, 17,478,094,048 bytes'],
            ['<strong>Quantization</strong>', 'Q4_K_M, 16.28 GiB on disk, plus a 0.60 GiB BF16 vision encoder (<code>mmproj</code>)'],
            ['<strong>Architecture</strong>', '<code>inkling2_loop</code> · 26.07B total parameters · 128 experts, 8 active per token · text and image input'],
            ['<strong>Runtime</strong>', 'LM Studio 0.4.28+2, stated in the export header'],
            ['<strong>OS / GPU / RAM</strong>', 'Windows · RTX 4060 Laptop GPU, 8 GB · 32 GB RAM'],
            ['<strong>Context length</strong>', '65,536 configured in LM Studio; the model supports up to 1,048,576'],
            ['<strong>Temperature / top-p / top-k</strong>', 'Not recorded in the export'],
            ['<strong>Prompt template</strong>', "The GGUF's embedded Jinja chat template; default thinking effort 0.9 unless overridden"],
            ['<strong>Repeated trials</strong>', 'Not recorded; each task appears to be a single conversational trial'],
            ['<strong>Inference speed</strong>', '<strong>3–7 tokens/sec observed</strong> across these runs'],
          ]}
        />
      </div>

      <H3>The file on disk</H3>
      <Code caption="Local model record, cross-checked against the Hugging Face file listing.">
{`%USERPROFILE%\\.lmstudio\\models\\lmstudio-community\\Inkling-2-Mini-GGUF\\
├── Inkling-2-Mini-Q4_K_M.gguf         17,478,094,048 bytes  (16.28 GiB)
│     sha256 dac3702abcb5684cbcb1fbd148d94b2d531283be974630ac61964d194db483de
└── mmproj-Inkling-2-Mini-BF16.gguf       641,805,888 bytes  (vision encoder)

repo: huggingface.co/lmstudio-community/Inkling-2-Mini-GGUF @ 23c938b0
base: huggingface.co/thinkingmachines/Inkling-2-Mini  (Apache-2.0)`}
      </Code>

      <H3>The runtime, exactly as configured</H3>
      <p>
        These are the LM Studio load settings used for the evaluation, transcribed from the model configuration
        panel. The two that matter most for the speed numbers further down are{' '}
        <strong>GPU Offload: 7 layers</strong> and <strong>Context Length: 65,536</strong>:
      </p>

      <Code caption="LM Studio 0.4.28+2 load configuration for this evaluation.">
{`Model file                 Inkling-2-Mini-Q4_K_M.gguf
API identifier             thinkmachines/inkling-2-mini
Context Length             65536            (model supports up to 1048576)
GPU Offload                7 layers         (model has 24)
CPU Thread Pool Size       7
Evaluation Batch Size      2048
Physical Batch Size        512
Max Concurrent Predictions 4
Unified KV Cache           on
Context Checkpoints        32
Offload KV Cache to GPU    on
Keep Model in Memory       on
Try mmap()                 on
On Demand Tensor Loading   Auto
Seed                       0 (random)
Number of Experts          8
MoE layers forced to CPU   0
MoE Expert Cache           0 MiB
Speculative Decoding       off
Flash Attention            on
RoPE frequency base/scale  auto
Reasoning Budget Message   (empty)`}
      </Code>

      <H3>Where the proof comes from</H3>
      <p>
        Every task below ran in one LM Studio chat, which was exported as Markdown after the session. That
        export is the primary evidence for this article: it contains the exact prompts, the model's visible
        reasoning traces, and the full responses for all seven tasks.
      </p>

      <Code caption="Header of the exported chat transcript (7 tasks, exported 25 Nov 2026, 15:57).">
{`# You are a highly cap
Model: thinkingmachines/inkling-2-mini
Created: 11/11/2026, 9:19:13 pm
Exported from: LM Studio 0.4.28+2`}
      </Code>

      <p>
        <strong>Speed, since it is usually the first question:</strong> generation ran at{' '}
        <strong>3–7 tokens/sec</strong> across these runs, with only 7 of 24 layers offloaded to an 8 GB GPU.
        That is the honest number for a 16 GiB quant on this hardware. Time-to-first-token, prompt-processing
        rate, and VRAM peaks were not captured, so those fields stay empty.
      </p>

      <Callout tone="warn" title="What this evaluation is not">
        <ul className="list-disc pl-5 space-y-1">
          <li>Not a standardized benchmark such as SWE-bench, HumanEval, MMLU, or GPQA.</li>
          <li>Not a statistically significant pass-rate study.</li>
          <li>Not a controlled head-to-head against frontier models.</li>
          <li>Not proof that generated code was deployed or passed a complete external test suite.</li>
          <li>
            Not a performance benchmark: generation was observed at 3–7 tokens/sec, but no time-to-first-token,
            prompt-processing rate, GPU utilization, or per-task memory telemetry was captured, so none of those
            numbers appear here.
          </li>
        </ul>
      </Callout>

      <p>Throughout the article I keep five evidence labels distinct:</p>
      <div className="not-prose my-8">
        <Table
          headers={['Label', 'Meaning']}
          rows={[
            ['<strong>Observed</strong>', 'Directly represented in the conversation or supplied model output'],
            ['<strong>Reviewer assessment</strong>', 'My qualitative judgment about that response or code'],
            ['<strong>Derived</strong>', 'A calculation I reproduced from stated input values'],
            ['<strong>Not verified</strong>', 'Needs files, browser rendering, execution, or telemetry I do not have'],
            ['<strong>Reconstructed summary</strong>', 'A faithful summary of an earlier task where the verbatim transcript is not in this bundle'],
          ]}
        />
      </div>

      <H2>1. General reasoning: small problems, useful signals</H2>
      <p>
        I started with short, classic prompts. They are cheap, they are well understood, and they tell you
        quickly whether a model is thinking or pattern-matching.
      </p>
      <ul>
        <li>
          <strong>Bat-and-ball arithmetic.</strong> The model answered <strong>$0.05 for the ball</strong> (and
          $1.05 for the bat in the standard $1.10 framing), resisting the intuitive but wrong $0.10.{' '}
          <em>Observed, correct.</em>
        </li>
        <li>
          <strong>Longest substring without repeating characters.</strong> It returned a Python sliding-window
          solution with a last-seen index map, <strong>O(n)</strong> time and O(k) auxiliary space.{' '}
          <em>Observed, correct pattern.</em>
        </li>
        <li>
          <strong>Eight balls, one heavier, two weighings.</strong> It proposed a valid 3–3–2 strategy: weigh
          three against three; if balanced the heavier ball is in the remaining two; if not, keep the heavier
          side's three and weigh one against one, with the third implied. <em>Observed, correct and efficient.</em>
        </li>
        <li>
          <strong>Concurrency vs parallelism</strong>, under a strict three-bullet, maximum-15-words-per-bullet
          constraint. It held the structure and got the distinction broadly right: concurrency is about managing
          overlapping tasks, parallelism about simultaneous execution. <em>Observed.</em>
        </li>
        <li>
          <strong>Fictional-entity hallucination check.</strong> Asked about a model called
          "NexusGPT-47 Ultra", it declined to invent a history or spec sheet and said it could not verify the
          entity. <em>Observed, positive behavior, but one refusal does not establish general hallucination
          resistance.</em>
        </li>
      </ul>
      <p>
        <strong>Reviewer assessment:</strong> strong across the board, with no aggregate score recorded. The
        interesting signal was not that it got five easy questions right; it was that the constrained
        concurrency question was answered correctly <em>and</em> inside the format limit.
      </p>

      <Code caption="Verbatim reasoning trace from the export, Test 1, section 4 — the model counting its own bullets before answering.">
{`Bullet1: "Concurrency is managing multiple tasks over time; parallelism is executing
tasks simultaneously on separate resources." Count Concurrency1 is2 managing3 multiple4
tasks5 over6 time7 parallelism8 is9 executing10 tasks11 simultaneously12 on13 separate14
resources15. Good 15 (semicolon doesn't matter).
Bullet2: "Concurrency can occur on one core; parallelism requires more than one processing
unit or hardware thread." Count Concurrency1 can2 occur3 on4 one5 core6 parallelism7 requires8
more9 than10 one11 processing12 unit13 or14 hardware15 thread16. Too 16. Revise: "Concurrency
can happen on one core; parallelism needs multiple cores, threads, or devices." Count
Concurrency1 can2 happen3 on4 one5 core6 parallelism7 needs8 multiple9 cores10 threads11
or12 devices13. Good.`}
      </Code>

      <H2>2. Distributed systems: reasoning about a 500 ms budget</H2>
      <p>
        The scenario: a request flows through services <code>A → B → C</code>. Service C normally takes about
        <strong> 400 ms</strong>, but sometimes takes <strong>2 seconds</strong> or fails outright. The
        end-to-end latency budget at A is <strong>500 ms</strong>. I am not allowed to add hardware or remove
        the dependency.
      </p>
      <p>
        This is a good test because the naive answer is "add a retry", which makes everything worse. The
        response actually proposed the right set of mechanisms:
      </p>
      <ul>
        <li>End-to-end <strong>deadline propagation</strong> from A downward.</li>
        <li>A <strong>capped timeout</strong> for service C, so one slow call cannot eat the whole budget.</li>
        <li>A <strong>circuit breaker</strong> for failure isolation.</li>
        <li><strong>Stale-cache fallback</strong> where semantically acceptable.</li>
        <li><strong>Constrained retries</strong>, not blind ones.</li>
        <li><strong>Fail-fast</strong> when the remaining deadline is insufficient.</li>
      </ul>
      <p>
        It also named the real trade-off: when a dependency is slow or failing, <em>a strict latency guarantee
        and a fresh successful result cannot always both be had</em>. That is the correct framing, and it is the
        one most first-pass designs miss.
      </p>

      <Callout title="Reviewer assessment · 8.5 / 10" tone="evidence">
        <p className="!mt-0">
          <strong>Observed strengths:</strong> the important reliability patterns were all identified, the
          latency budget was treated as a hard constraint, retries were not treated as an unconditional cure,
          and graceful degradation was considered.
        </p>
        <p>
          <strong>Observed gaps:</strong> the accompanying code sketch did not actually enforce the end-to-end
          deadline, some placeholders were undefined, and the implementation was visibly less complete than the
          explanation around it.
        </p>
      </Callout>
      <p>
        The lesson I took from this task, which repeats in nearly every code task below:{" "}
        <strong>the architecture was right, the enforcement was not</strong>. A deadline that is discussed but
        never checked is a comment, not a guarantee.
      </p>

      <Code caption="Verbatim from the export, Test 2 — the request-handling logic the model actually wrote.">
{`remaining_ms = (deadline - time.monotonic()) * 1000
if remaining_ms < MIN_USEFUL_BUDGET_MS:   # e.g. 80ms for A/B overhead
    return Result(False, None, stale=bool(cached), error="insufficient budget")

try:
    b_result = call_b(req, timeout_ms=min(remaining_ms - RESERVE_MS, B_TIMEOUT_MS))
    if b_result.ok and not is_stale(b_result.value, req.freshness_policy):
        put_cache(req.key, b_result.value, ttl_ms=CACHE_TTL_MS)
        return Result(True, b_result.value)

    # B failed/slow: use stale cache if allowed, else fast error.
    if cached and req.allow_stale:
        return Result(False, cached.value, stale=True, error="fresh data unavailable")
    return Result(False, None, error=b_result.error or "B timeout/failure")

except TimeoutError as e:
    if cached and req.allow_stale:
        return Result(False, cached.value, stale=True, error=str(e))
    return Result(False, None, error=str(e))

# B internally calls C with a capped timeout and circuit breaker:
def call_b(req, timeout_ms):
    if circuit_breaker.is_open():
        return b_result(ok=False, value=None, error="C circuit open")
    try:
        c_value = call_c(req, timeout_ms=min(timeout_ms - B_RESERVE_MS, C_TIMEOUT_MS))  # e.g. 420-450ms cap
        circuit_breaker.record_success()
        return b_result(ok=True, value=transform_for_a(c_value))
    except TimeoutError as e:
        circuit_breaker.record_failure()
        # No retry if it would exceed remaining deadline or amplify load.
        return b_result(ok=False, value=None, error=str(e))`}
      </Code>

      <p>
        Note what that code does and does not do: it caps waits and fails fast, and it says so in plain text
        right after the snippet —{" "}
        <em>
          "the only hard guarantee is that A returns within 500ms by capping waits and failing fast; successful
          fresh completion cannot be guaranteed because C can take 2 seconds or fail."
        </em>{" "}
        The <code>deadline</code>, <code>RESERVE_MS</code>, <code>B_TIMEOUT_MS</code>, and{" "}
        <code>circuit_breaker</code> values it leans on are referenced but never defined in the sketch. That is
        the gap between the explanation and the implementation this whole evaluation kept running into.
      </p>

      <Code caption="Illustrative only, my own sketch of what enforcement would require. Not model output from the evaluation.">
{`remaining = deadline - now()            # end-to-end budget, propagated
if remaining <= RESERVE:                # fail fast, don't burn the budget
    raise DeadlineExceeded

async with asyncio.timeout(min(remaining, C_TIMEOUT)):
    result = await call_c()             # capped, cannot consume the whole budget

# plus: circuit breaker, bounded retries with jitter,
# and a stale-cache fallback where staleness is acceptable`}
      </Code>

      <H2>3. Backend coding: good architecture, implementation gaps</H2>
      <p>
        Next was a production-oriented <strong>FastAPI</strong> service, reviewed from a supplied text artifact.
        The brief asked for application lifecycle management, async SQLAlchemy, connection pooling, request IDs
        with structured JSON logging, idempotency for duplicate requests, centralized exception handling,
        graceful shutdown, and tests.
      </p>
      <p>What came back was a coherent six-part structure:</p>
      <ol>
        <li>App startup initializes settings, logging, engine/pool, and startup checks.</li>
        <li>Middleware assigns request IDs and tracks request duration.</li>
        <li>Database dependencies create and release async sessions.</li>
        <li>Route handlers delegate business logic to services.</li>
        <li>Repository/service code manages transactions.</li>
        <li>Shutdown closes database resources.</li>
      </ol>
      <p>
        Real positives: bounded connection-pool configuration, database unique constraints used for
        idempotency, structured logs carrying request IDs and latency, domain-specific error mapping, generic
        handling for unexpected server errors, and explicit rollback/commit thinking. It clearly knows what a
        production API is made of.
      </p>
      <p>
        It is in the gaps between those components that the review found problems:
      </p>

      <div className="not-prose my-8">
        <Table
          headers={['Area', 'Finding', 'Why it matters']}
          rows={[
            ['<strong>Idempotency race</strong>', 'The business side effect could run before the idempotency record was safely claimed', 'Concurrent duplicates can both perform the work'],
            ['<strong>Transaction boundary</strong>', '<code>IntegrityError</code> may surface at commit time, outside the relevant try/except', 'Error handling can miss the actual failure point'],
            ['<strong>Timeout</strong>', 'A timeout setting existed but was never enforced by the implementation', 'Configuration gives a false sense of protection'],
            ['<strong>Imports</strong>', 'A required <code>text</code> import was missing from the supplied code', 'The service may fail at runtime'],
            ['<strong>Logging</strong>', 'Error paths did not consistently log exceptions', 'Reduced diagnosability in production'],
            ['<strong>Middleware</strong>', 'Exception paths did not reliably guarantee the intended log event', 'Missing or misleading request records'],
            ['<strong>Tests</strong>', 'At least one test was effectively a <code>pass</code> placeholder', 'Coverage was overstated'],
            ['<strong>Test consistency</strong>', 'Some tests and route behavior did not line up cleanly', 'The suite may not validate the real implementation'],
            ['<strong>Shutdown</strong>', 'Graceful draining of in-flight requests was not demonstrated', 'Resource cleanup alone is not a safe shutdown'],
            ['<strong>Idempotency semantics</strong>', 'Duplicate, concurrent, failed, and replayed request behavior was incomplete', 'Correctness needs a specified state machine'],
          ]}
        />
      </div>

      <H3>The one that matters most: idempotency</H3>
      <p>
        This is the finding I would keep even if I threw the rest of the review away. Inserting a unique
        idempotency record <em>after</em> performing the business operation does not make an endpoint
        idempotent. The claim has to be <strong>atomic, and coordinated with the business transaction</strong>:
      </p>

      <Code caption="Illustrative pattern, my own code. The evaluated service did not demonstrate this ordering.">
{`BEGIN;
-- 1. atomically claim the key first; unique constraint is the lock
INSERT INTO idempotency_keys (key, status)
VALUES (:key, 'in_progress')
ON CONFLICT DO NOTHING;          -- second concurrent request stops here

-- 2. perform the side effect inside the SAME transaction
INSERT INTO payments (...) VALUES (...);

-- 3. only now mark the key complete and commit
UPDATE idempotency_keys SET status = 'done' WHERE key = :key;
COMMIT;`}
      </Code>

      <Callout title="Reviewer assessment · 7.8 / 10" tone="evidence">
        <p className="!mt-0">
          Good architecture and useful code scaffolding. <strong>Do not treat the generated service as
          production-ready</strong> without execution, concurrency tests, failure injection, and a transaction
          review.
        </p>
      </Callout>

      <H2>4. Database concurrency: naming the race is not proving the fix</H2>
      <p>
        The task was a small, mean one. Given <code>transfer_money(session, source_id, target_id, amount)</code>
        that reads two balances, mutates ORM objects, and commits, find the concurrency hazards and propose
        something safer.
      </p>
      <p>The diagnosis was excellent. It identified, unprompted:</p>
      <ul>
        <li>Time-of-check/time-of-use races and lost updates.</li>
        <li>Missing-account handling and amount validation.</li>
        <li>Self-transfer behavior and transaction ownership.</li>
        <li><strong>Deadlocks caused by inconsistent lock ordering.</strong></li>
      </ul>
      <p>The proposed approach was also credible, at the database level:</p>
      <ul>
        <li>Lock account rows with <code>SELECT ... FOR UPDATE</code>.</li>
        <li><strong>Sort account IDs before locking</strong> to remove the classic deadlock cycle.</li>
        <li>Use a conditional atomic debit: <code>UPDATE ... WHERE balance &gt;= amount RETURNING</code>.</li>
        <li>Update the target account, then commit or roll back.</li>
      </ul>

      <Code caption="The lock-ordering rule the model correctly called out.">
{`-- consistent global order, regardless of transfer direction
SELECT * FROM accounts
WHERE id IN (:a, :b)
ORDER BY id
FOR UPDATE;`}
      </Code>

      <p>Where it got weaker was the proof. The proposed tests and implementation had these gaps:</p>

      <div className="not-prose my-8">
        <Table
          headers={['Area', 'Finding']}
          rows={[
            ['<strong>Rollback handling</strong>', 'The rollback catch was concentrated around commit rather than covering the whole transaction'],
            ['<strong>Test concurrency</strong>', '<code>asyncio.gather</code> with separate sessions was not fully specified or validated'],
            ['<strong>Assertions</strong>', 'The test asserted <em>at most one</em> success rather than proving exactly one valid outcome'],
            ['<strong>Money conservation</strong>', 'Exact post-transfer balances and total-balance invariants were not adequately asserted'],
            ['<strong>Target update</strong>', 'The target-side increment was not necessarily an atomic SQL update'],
            ['<strong>Decimal correctness</strong>', 'Currency scale and precision requirements were not enforced'],
            ['<strong>Failure test</strong>', 'A monkeypatch referenced an undefined function'],
          ]}
        />
      </div>

      <p>
        A stronger suite would assert the invariants directly, not merely the absence of an obvious crash:
      </p>
      <ul>
        <li>Exactly one of two competing overdraft transfers succeeds.</li>
        <li>The source balance never goes negative, and total money stays conserved.</li>
        <li>Missing source/target accounts are handled; invalid, zero, negative, and excessive-precision amounts are rejected.</li>
        <li>Deadlock behavior is bounded and observable.</li>
        <li>A failure between debit and credit <strong>rolls back both sides</strong>.</li>
      </ul>

      <Callout title="Reviewer assessment · 8.5 / 10" tone="evidence">
        <p className="!mt-0">
          Strong conceptual diagnosis, credible locking strategy, weak proof. The gap between "I can describe
          the race" and "I have written the test that would catch it" was at its widest here.
        </p>
      </Callout>

      <H2>5. Frontend: a complete dashboard, on paper and on screen</H2>
      <p>
        The fifth task was a standalone, single-file <strong>Nexus Analytics</strong> dashboard in plain
        HTML/CSS/JavaScript, with no frameworks and no CDN dependencies: sidebar navigation, KPI cards, revenue
        and category charts, a transaction table, search, date-range selection, a light/dark theme,
        responsiveness, and accessibility considerations.
      </p>
      <p>The supplied source did contain, at least structurally:</p>
      <ul>
        <li>Semantic landmarks, a skip link, visible focus styling, and horizontal table scrolling.</li>
        <li>CSS custom properties driving both themes, persisted to local storage.</li>
        <li>An SVG revenue chart and an SVG donut chart, avoiding any charting library.</li>
        <li>Responsive breakpoints around <strong>1100 px, 820 px, and 560 px</strong>.</li>
        <li>Rendering functions split out over seeded sample data, plus search/filtering and section switching.</li>
        <li>A mobile sidebar overlay with Escape-key handling.</li>
      </ul>
      <p>Source review also turned up a set of mismatches between what the UI claimed and what the code did:</p>

      <div className="not-prose my-8">
        <Table
          headers={['Area', 'Finding', 'Impact']}
          rows={[
            ['<strong>Desktop sidebar</strong>', 'The collapse control toggled a class whose CSS only exists at the mobile breakpoint', 'Desktop collapse does not do what it appears to'],
            ['<strong>Revenue chart</strong>', 'The subtitle mentioned a moving average; the chart drew daily revenue only', 'UI copy and behavior disagree'],
            ['<strong>Navigation</strong>', 'Non-overview sections were placeholders, not implemented pages', 'Not a complete multi-section product'],
            ['<strong>Active Users KPI</strong>', 'The metric summed daily user counts rather than counting distinct users', 'The KPI label can be misleading'],
            ['<strong>Donut chart</strong>', 'A comment described a top-start angle; the SVG circle was not rotated to match', 'Small visual/implementation mismatch'],
            ['<strong>Mobile a11y</strong>', 'Focus was not clearly moved into the mobile nav, or restored to the toggle on close', 'Keyboard navigation gets confusing'],
            ['<strong>Theme persistence</strong>', 'Local storage used; restricted file contexts may behave differently', 'Needs browser validation'],
          ]}
        />
      </div>

      <H3>What the source actually renders</H3>
      <p>
        The export contained the complete single-file dashboard as one fenced HTML block, though with its
        angle brackets HTML-escaped for Markdown. I decoded that escaping — reversing only the exporter's
        entity substitutions, changing no code — and opened the file in a headless browser after the fact.
        The four images below are<strong> post-hoc renders of that exported source</strong>, captured in
        Chromium at desktop and mobile widths — they are not screenshots from the original evaluation session,
        and nothing about them was seen by the model or by the original reviewer at the time.
      </p>
      <p>
        What they show is that the file does run: the KPI cards populate from the seeded sample data, the SVG
        line chart and donut chart draw, the theme toggle switches both palettes, and at 390 px the layout
        collapses to stacked cards with the sidebar behind a working menu button and overlay. That is a
        meaningful data point for a zero-framework single file — but it is one browser on one machine, not
        the cross-browser, keyboard, or accessibility verification listed as still missing below.
      </p>

      <div className="not-prose my-8 space-y-6">
        <Figure
          src={BLOG_IMAGES.inkling2mini_nexus_desktop}
          alt="Nexus Analytics dashboard rendered from the exported source at desktop width in light theme: sidebar navigation, four KPI cards, an SVG revenue line chart, and a traffic-sources donut chart"
          caption="Post-hoc render of the exported source, desktop 1440×900, light theme. KPI values, line chart, and donut all populate from the file's own seeded data."
        />
        <Figure
          src={BLOG_IMAGES.inkling2mini_nexus_dark}
          alt="The same Nexus Analytics dashboard in dark theme, with the toggle switched to Light, showing the second CSS custom-property palette"
          caption="Same render after clicking the file's own theme button: the dark palette applies and the toggle label flips to Light."
        />
        <div className="grid gap-6 md:grid-cols-2">
          <Figure
            src={BLOG_IMAGES.inkling2mini_nexus_mobile}
            alt="The dashboard at 390 px wide: header with menu button, then KPI cards stacked vertically"
            caption="Mobile 390×844: cards stack vertically, no horizontal overflow."
          />
          <Figure
            src={BLOG_IMAGES.inkling2mini_nexus_mobile_nav}
            alt="The mobile dashboard with the sidebar navigation open over a dimmed overlay, showing Overview, Revenue, Customers, Reports, and Settings links"
            caption="Mobile menu open: slide-out sidebar with overlay, wired to the button and Escape key."
          />
        </div>
      </div>

      <Callout title="Evidence limitation · the honest part" tone="warn">
        <p className="!mt-0">
          The renders above are <strong>post-hoc</strong>: extracted from the chat export and opened in a
          browser after the evaluation ended, not captured during the original session. They verify that the
          file renders and its visible controls work in one Chromium build. They are not evidence of
          cross-browser behavior, keyboard-only navigation, screen-reader behavior, or pixel-level visual
          quality, and the bundle still contains <strong>no screenshots from the evaluation itself</strong>.
        </p>
        <p>
          <strong>The 8.0/10 in the scorecard below is for source implementation only.</strong> A source file can look plausible
          and still render poorly, or hide interaction problems that only show up with a keyboard.
        </p>
      </Callout>

      <H2>6. Business reasoning: turning a funnel into a decision</H2>
      <p>
        The sixth task was not code at all. Given a SaaS funnel with incomplete information, separate facts from
        assumptions and recommend one intervention.
      </p>

      <div className="not-prose my-8">
        <Table
          headers={['Metric', 'Value']}
          rows={[
            ['Visitors', '<strong>100,000 / month</strong>'],
            ['Signups', '<strong>10,000 / month</strong>'],
            ['Onboarding completions', '<strong>4,000 / month</strong>'],
            ['Activated users', '<strong>1,500 / month</strong>'],
            ['Paying customers', '<strong>300 / month</strong>'],
            ['Revenue', '<strong>$15,000 / month</strong>'],
            ['Monthly churn', '<strong>8%</strong>'],
          ]}
        />
      </div>

      <p>The core calculations were correct:</p>

      <div className="not-prose my-8">
        <Table
          headers={['Stage', 'Conversion', 'Drop-off']}
          rows={[
            ['Visitors → Signups', '<strong>10.0%</strong>', '90.0%'],
            ['Signups → Onboarding complete', '<strong>40.0%</strong>', '60.0%'],
            ['Onboarding → Activated', '<strong>37.5%</strong>', '62.5%'],
            ['Activated → Paying', '<strong>20.0%</strong>', '80.0%'],
            ['Visitors → Paying', '<strong>0.30%</strong>', '99.70%'],
          ]}
        />
      </div>

      <p>
        And the derived numbers hold up (<em>derived, reproduced by me from the stated inputs</em>): ARPU is
        $15,000 ÷ 300 = <strong>$50/month</strong>; expected lifetime under constant 8% churn is 1 ÷ 0.08 ={' '}
        <strong>12.5 months</strong>; simplified gross revenue over that lifetime is $50 × 12.5 ={' '}
        <strong>$625</strong>. That last figure is <em>not</em> full LTV, it excludes margin, acquisition cost,
        discounting, expansion, downgrades, and cohort effects.
      </p>
      <p>
        The model chose <strong>A. Improve onboarding</strong> over adding 10 requested features, improving
        performance by 40%, or launching a referral program, on the reasoning that onboarding has a large
        measured drop-off, feature requests do not prove willingness to pay, performance gains have no measured
        link to conversion here, and referrals add traffic without repairing downstream leakage. That is a
        defensible pick, and the fact/assumption separation was clean.
      </p>

      <Code caption="Verbatim reasoning trace from the export, Test 6 — the arithmetic and the fact/assumption split happening before any prose was written.">
{`The user wants a structured analysis. Need compute conversion rates: visitor->signup 10%,
signup->onboarding complete 40% (4000/10000), onboarding->activation 37.5% (1500/4000),
activation->paying 20% (300/1500), overall visitor->paid 0.3% (300/100000). Revenue per
paying customer = $50/month ... Churn 8% monthly means average lifetime ~12.5 months if
simple geometric (1/0.08=12.5), but with new customers nuances. Biggest drop:
signup->onboarding complete is 60% loss (40% completion); activation from onboarded also big
62.5% loss; visitor->signup 90% loss but that's top-of-funnel traffic quality/marketing, not
necessarily fixable by one initiative? ... Choose A. Need separate facts vs assumptions.
Missing info: traffic source quality, signup intent/source, onboarding drop-off reasons,
activation definition, pricing/ARPU, churn cohorts, feature usage, performance baseline and
correlation with conversion, referral economics, capacity constraints.`}
      </Code>

      <Callout title="Reviewer correction · projection arithmetic" tone="warn">
        <p className="!mt-0">
          The model estimated roughly <strong>2,100–2,400</strong> activated users if onboarding completion
          rose to 55–60%. Holding the existing 37.5% onboarding-to-activation rate constant:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>At 55%: 10,000 × 0.55 × 0.375 = <strong>2,062.5 ≈ 2,063</strong></li>
          <li>At 60%: 10,000 × 0.60 × 0.375 = <strong>2,250</strong></li>
        </ul>
        <p>
          The corrected range is <strong>≈ 2,063–2,250</strong>, not 2,100–2,400. Directionally sensible,
          numerically loose. Check projections.
        </p>
      </Callout>

      <Callout title="Reviewer nuance · biggest loss vs best intervention" tone="note">
        <p className="!mt-0">Calling onboarding "the biggest controllable problem" mixes three different measures of loss:</p>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs border border-slate-200 rounded-lg overflow-hidden bg-white">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left py-2 px-3 font-semibold text-slate-700">Transition</th>
                <th className="text-right py-2 px-3 font-semibold text-slate-700">Absolute users lost</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-slate-200"><td className="py-2 px-3">Visitors → Signups</td><td className="py-2 px-3 text-right">90,000</td></tr>
              <tr className="border-t border-slate-200"><td className="py-2 px-3">Signups → Onboarding</td><td className="py-2 px-3 text-right">6,000</td></tr>
              <tr className="border-t border-slate-200"><td className="py-2 px-3">Onboarding → Activation</td><td className="py-2 px-3 text-right">2,500</td></tr>
              <tr className="border-t border-slate-200"><td className="py-2 px-3">Activation → Paying</td><td className="py-2 px-3 text-right">1,200</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          The largest absolute loss is visitors-to-signups. The worst percentage drop among post-signup stages
          is onboarding-to-activation at 62.5%. Onboarding completion itself sits at 40%. These are different
          questions, and the recommendation would be stronger if it diagnosed onboarding and activation
          together, then prioritized by observed abandonment reasons and expected revenue impact.
        </p>
      </Callout>

      <p>
        <strong>Reviewer assessment: 8.8/10.</strong> Correct core math, good facts-versus-assumptions
        discipline, solid alternative analysis, and it notably refused to treat feature requests as validated
        revenue opportunities. The deduction is for a recommendation stated slightly too confidently given
        missing causal evidence, plus that loose projection.
      </p>

      <H2>7. Instruction following: the 100-word announcement</H2>
      <p>The final task was pure constraint satisfaction. The announcement had to:</p>
      <ul>
        <li>Be exactly 100 words.</li>
        <li>Open with a question as its first sentence.</li>
        <li>Avoid a list of banned phrases.</li>
        <li>Cover both technical and user benefits.</li>
        <li>End with a direct call to action.</li>
        <li>Use no hashtags or emojis.</li>
        <li>Keep a separate verification note outside the 100-word count.</li>
      </ul>

      <blockquote>
        Can your team ship reliable software faster without losing control? Meet Forge, an AI coding assistant
        that reads your repository, drafts tests, flags risky changes, and explains every suggestion in plain
        language. It learns from approved patterns, keeps secrets out of prompts, and works inside your existing
        editor and CI pipeline. Engineers spend less time hunting regressions and more time designing the product
        users love. Teams gain faster reviews, fewer late-night fixes, and clearer handoffs between frontend,
        backend, and operations. Try Forge this week: connect a repository, review one pull request and see
        whether it earns trust in your workflow.
      </blockquote>

      <Code caption="Verbatim reasoning trace from the export, Test 7 — a first draft that came out at 101 words and was corrected before answering.">
{`Count words. Let's count systematically.
Can1 your2 team3 ship4 reliable5 software6 faster7 without8 losing9 control10? Meet11 Forge12
an13 AI14 coding15 assistant16 that17 reads18 your19 repository20 drafts21 tests22 flags23
risky24 changes25 and26 explains27 every28 suggestion29 in30 plain31 language32. ... reviewone pull request together92 and93 see94 whether95 it96 earns97 trust98 in99 your100
workflow101.
Oops 101. Need exactly 100. Remove one word without losing meaning. Change "together" maybe
remove? Count then 100 if remove together: ... review one pull request and see... Let's
recount with removal of "together" (word 92) => total 100. Check sentence still good:
"review one pull request and see whether it earns trust in your workflow." Good.
... Great exactly 100 if hyphenated late-night counts as one word (standard), CI one, AI one.`}
      </Code>

      <p>
        The supplied verification checked out: it starts with a question, counts as exactly 100
        whitespace-separated words (treating "late-night" as one word), contains no banned phrases, carries
        both technical benefits (repository-aware drafting, tests, risk flags, CI fit) and user benefits (less
        regression hunting, faster reviews, clearer handoffs), ends with a direct CTA, and uses no hashtags or
        emojis. It also still reads like something a human could ship.
      </p>
      <p>
        <strong>Reviewer assessment: 10/10 for the tested constraints</strong>, with the obvious caveat: this
        is one successful constrained-writing task, not proof of perfect word-count compliance across arbitrary
        prompts.
      </p>

      <H2>The scorecard</H2>
      <p>
        These are my qualitative reviewer estimates from the observed exercises. They are{" "}
        <strong>not official benchmark scores</strong>, and they are not comparable across rows; the tests
        differ in scope, difficulty, and evidence quality.
      </p>

      <div className="not-prose my-8">
        <Table
          headers={['Test', 'Category', 'Score']}
          rows={[
            ['<strong>General reasoning and reliability</strong>', 'Logic, algorithms, uncertainty', 'Strong; no aggregate score'],
            ['<strong>Distributed-systems design</strong>', 'Architecture and resilience', '<strong>8.5 / 10</strong>'],
            ['<strong>FastAPI production service</strong>', 'Backend implementation', '<strong>7.8 / 10</strong>'],
            ['<strong>Database concurrency</strong>', 'Transactions and tests', '<strong>8.5 / 10</strong>'],
            ['<strong>Nexus Analytics dashboard</strong>', 'Frontend source implementation', '<strong>8.0 / 10</strong> (source only)'],
            ['<strong>SaaS funnel prioritization</strong>', 'Business and product reasoning', '<strong>8.8 / 10</strong>'],
            ['<strong>100-word announcement</strong>', 'Instruction following', '<strong>10 / 10</strong>'],
          ]}
        />
      </div>

      <div className="not-prose my-8">
        <Table
          headers={['Dimension', 'Verdict']}
          rows={[
            ['Reasoning and problem decomposition', '<strong>Strong</strong>'],
            ['Instruction following', '<strong>Excellent in tested examples</strong>'],
            ['Architecture and trade-off analysis', '<strong>Strong</strong>'],
            ['Code completeness', 'Good, needs execution-based verification'],
            ['Production-grade error handling', 'Needs improvement'],
            ['Test quality', 'Needs improvement'],
            ['Frontend source generation', 'Good'],
            ['Rendered visual quality', 'Post-hoc render works in one browser; original-session screenshots still missing'],
            ['Business analysis', '<strong>Strong</strong>'],
            ['Arithmetic precision', 'Strong, but verify projections'],
            ['Uncertainty handling', 'Positive examples observed'],
          ]}
        />
      </div>

      <p>
        I am deliberately not averaging those numbers into a single headline score. The tasks are too different
        in kind, and averaging them would imply a precision this evaluation does not have.
      </p>

      <H2>Recurring patterns across all seven tasks</H2>
      <H3>What kept showing up as a strength</H3>
      <ul>
        <li>
          <strong>Structured responses.</strong> Complex tasks were consistently organized into sections, tables,
          and explicit reasoning steps rather than walls of prose.
        </li>
        <li>
          <strong>Risk awareness.</strong> It named real failure modes unprompted: race conditions, retry storms,
          idempotency errors, missing accounts, misleading metrics.
        </li>
        <li>
          <strong>Trade-off reasoning.</strong> It usually explained why one approach was preferable and what
          would flip the decision.
        </li>
        <li>
          <strong>Constraint adherence.</strong> The 100-word task and the three-bullet concurrency answer both
          held their format limits.
        </li>
        <li>
          <strong>Implementation breadth.</strong> It produced substantial Python and frontend source instead of
          hiding behind high-level descriptions.
        </li>
      </ul>

      <H3>What kept showing up as a weakness</H3>
      <ul>
        <li>
          <strong>Implementation does not always match the design.</strong> Sound architecture did not guarantee
          correct transaction boundaries or complete error handling.
        </li>
        <li>
          <strong>Tests are weaker than the explanation.</strong> Tests asserted too little, included
          placeholders, or failed to prove the invariants that mattered.
        </li>
        <li>
          <strong>Metric semantics slip.</strong> Summed daily users presented as "Active Users"; a bottleneck
          claim that mixed absolute loss with relative conversion.
        </li>
        <li>
          <strong>Projection arithmetic is loose.</strong> The funnel projection was directionally right and
          numerically off.
        </li>
        <li>
          <strong>Visual output needs browser evidence.</strong> A source file can look complete and still render
          badly or break keyboard navigation.
        </li>
      </ul>

      <blockquote>
        A capable general-purpose local assistant with strong structured reasoning and useful code-generation
        ability, but whose implementation and test outputs should be independently verified before production
        use.
      </blockquote>

      <H2>What surprised me, and what still needs work</H2>
      <p>
        <strong>What surprised me:</strong> the breadth. I expected a small local model to be strongest on the
        coding tasks and wobbly elsewhere. Instead the highest-scored analytical task of the day was a business
        analysis that correctly refused to treat a list of feature requests as evidence of willingness to pay, and the
        distributed-systems answer identified the exact trade-off, latency versus freshness, that usually takes
        a senior engineer a sentence of hesitation. The hallucination check was clean too: asked about an entity
        it had no business knowing, it said so rather than inventing a spec sheet.
      </p>
      <p>
        <strong>What still needs work:</strong> everything downstream of the explanation. The pattern was
        consistent enough to be the headline; the model describes a correct system and then hands back code that
        only partially implements it. Missing imports, unenforced timeouts, idempotency claims made after the
        side effect, a rollback handler scoped to the wrong line, a test that asserts nothing. None of these are
        exotic bugs; they are exactly the ones a code reviewer catches on the first pass, and exactly the ones
        you do not want an autonomous agent shipping on your behalf.
      </p>

      <H2>Final verdict: where I would and would not use it</H2>
      <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-5">
          <p className="!mt-0 !mb-3 font-mono text-xs uppercase tracking-[0.16em] text-emerald-800">Where I would use it</p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700">
            <li>As a first-pass architect: it enumerates reliability patterns and trade-offs well.</li>
            <li>For explaining code, race conditions, and failure modes in plain language.</li>
            <li>For product and business analysis where it separates facts from assumptions.</li>
            <li>For constrained copy and formatting tasks, which it handled exactly.</li>
            <li>For scaffolds and drafts I fully intend to read, run, and test myself.</li>
          </ul>
        </div>
        <div className="rounded-xl border border-amber-300 bg-amber-50/60 p-5">
          <p className="!mt-0 !mb-3 font-mono text-xs uppercase tracking-[0.16em] text-amber-800">Where I would not</p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700">
            <li>Unreviewed production code, especially around transactions and idempotency.</li>
            <li>Any claim that a test "passes" without me running it myself.</li>
            <li>Money paths or migrations, until concurrency tests prove the invariants.</li>
            <li>UI claims that have never been rendered in a browser and clicked through.</li>
            <li>Speed claims beyond the observed 3–7 tok/s, since TTFT and prompt-processing telemetry were never captured.</li>
          </ul>
        </div>
      </div>

      <H3>What I would test next</H3>
      <ol>
        <li>
          <strong>Executable software engineering.</strong> Ask for a complete repository, then run formatters,
          type checkers, linters, and unit tests; inject failures and cancellations; require it to fix failures
          without weakening the tests.
        </li>
        <li>
          <strong>Agentic behavior.</strong> Tool-call schema correctness, multi-step tool use, file read/write
          accuracy, recovery after failed commands, and whether it ever falsely claims a command succeeded.
        </li>
        <li>
          <strong>Frontend/browser verification.</strong> Post-hoc renders now exist (Test 5), but navigation,
          filters, theme persistence, and modal behavior still need exercising across browsers, plus
          keyboard-only navigation and a console check on every page.
        </li>
        <li>
          <strong>Adversarial reasoning.</strong> Contradictory requirements, internally inconsistent tables,
          false premises, and missing information that should trigger a clarifying question.
        </li>
        <li>
          <strong>Repeatability and performance.</strong> Record exact prompt, model identifier, quantization,
          runtime config, time to first token, total generation time, output tokens per second, and peak
          RAM/VRAM, then run each task multiple times in a fresh session to measure consistency rather than
          best-case output.
        </li>
      </ol>

      <Callout title="The practical lesson" tone="note">
        <p className="!mt-0 text-base">
          Evaluate local models by what they can <strong>demonstrate</strong>, what they can{" "}
          <strong>execute</strong>, and what they can <strong>verify</strong>, not just by how convincing their
          explanations sound. In this evaluation the explanations were consistently better than the
          implementations, and that gap is exactly where trust gets lost.
        </p>
      </Callout>

      <H2>Evidence and limitations note</H2>
      <p>
        This article is built from an evaluation dossier and the raw LM Studio chat export behind it, both
        prepared 25 November 2026, not from a formal benchmark run. Worth being explicit about what backs each
        claim:
      </p>
      <ul>
        <li>
          <strong>Included:</strong> the full chat export covering all seven tasks (prompt, visible reasoning
          trace, and response), the model file record with its SHA-256, the LM Studio load configuration, the
          observed 3–7 tokens/sec range, the funnel response and its calculations, the exact 100-word
          announcement above, and the cover illustration used as this article's hero.
        </li>
        <li>
          <strong>Quoted as excerpts:</strong> the code blocks marked "verbatim from the export" are trimmed
          excerpts of longer reasoning traces; ellipses mark anything I cut. The complete export is retained
          separately as the source of record.
        </li>
        <li>
          <strong>Reviewed earlier, source files not attached:</strong> the FastAPI service artifact and the
          Nexus Analytics dashboard source, both reviewed against the export's responses.
        </li>
        <li>
          <strong>Rendered after the fact:</strong> the four dashboard images in Test 5 are post-hoc Chromium
          renders of the HTML block in the chat export, captured for this article — not screenshots from the
          evaluation session. They show the file rendering and its theme/menu controls working in that one
          browser; they do not establish cross-browser or accessibility behavior.
        </li>
        <li>
          <strong>Still not available:</strong> screenshots from the original evaluation session itself, and
          per-task timing telemetry (time-to-first-token, prompt-processing rate, GPU utilization, VRAM peaks).
          So no in-session visual claim appears anywhere above, and the only performance figure is the observed
          token-rate range.
        </li>
      </ul>
      <p>
        Scores are qualitative reviewer judgments, task-specific, and not comparable across rows. Sampling
        settings (temperature, top-p, top-k) were never recorded and have been left blank rather than filled in
        with plausible-looking guesses. The hero image is a{" "}
        <strong>generated illustration created for this evaluation</strong>, not a screenshot of any interface.
      </p>

      <H2>Share summary</H2>
      <Callout title="Social" tone="evidence">
        <p className="!mt-0">
          <strong>
            I ran Inkling-2-Mini through seven real tasks, reasoning to a SaaS funnel to a 100-word constraint.
          </strong>{' '}
          Strong architecture, strong risk spotting, excellent instruction following, and a consistent gap
          between what the explanation promised and what the code actually enforced, unenforced timeouts,
          idempotency claimed after the side effect, tests that assert nothing. Scores: 7.8 to 10, all
          qualitative. 3–7 tok/s on an 8 GB laptop, with the raw LM Studio export as proof. The takeaway:
          evaluate local models by what they can execute and verify, not by how good the explanation sounds.
        </p>
      </Callout>
    </article>
  )
}
