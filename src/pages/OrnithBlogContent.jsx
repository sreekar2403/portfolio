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

function ProofBlock({ title, file, excerpt }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 not-prose">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <p className="text-xs font-mono uppercase tracking-[0.18em] text-slate-500 mb-1">Proof file</p>
          <p className="text-sm font-semibold text-slate-900">{title}</p>
        </div>
        <span className="text-xs font-mono text-slate-400 shrink-0">{file}</span>
      </div>
      <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 text-xs overflow-x-auto font-mono leading-relaxed whitespace-pre-wrap">
{excerpt}
      </pre>
    </div>
  )
}

function H2({ children }) {
  return (
    <h2 className="!font-bold !text-slate-900">
      <strong>{children}</strong>
    </h2>
  )
}

export default function OrnithBlogContent() {
  return (
    <article className="prose prose-slate prose-lg max-w-none">
      <p className="text-slate-500 italic text-lg leading-relaxed mb-8 border-l-2 border-primary-300 pl-4">
        Instrumenting Ornith, an open-source agentic coding assistant run locally through Ollama, by auditing the
        deliverable code instead of trusting the reasoning trace.
      </p>

      <div className="not-prose grid grid-cols-1 md:grid-cols-4 gap-4 my-8">
        <Stat label="Rewrites" value="30+" tone="blue" />
        <Stat label="Tokens sent" value="504k" tone="emerald" />
        <Stat label="Tokens received" value="24k" tone="amber" />
        <Stat label="Outcome" value="Aborted" />
      </div>

      <div className="not-prose my-10">
        <div className="flex items-center gap-4 mb-5">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-rose-500 to-rose-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-rose-500/25">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
            </svg>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold font-display tracking-tight text-slate-900 m-0">
            Watch the audit
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
            poster={BLOG_IMAGES.ornith_reasoning_failure_poster}
          >
            <source src={BLOG_VIDEO.ornith_reasoning_failure} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <p className="text-sm text-slate-400 mt-3 text-center font-mono">
          Screen recording — Ornith in the wild, showing the reasoning spiral and failure pattern.
        </p>
      </div>

      <H2>The ask</H2>
      <p>
        The prompt was simple on paper: build a small agentic project in LangChain that can analyze a user request,
        research the topic, write a report, and return the result. The intended shape was a four-file deliverable plus a
        short README. The important part is that the plan was reasonable from the start.
      </p>
      <blockquote>
        Can you build a simple agentic project using LangChain which can analyze user request, research, write a report
        and give it to user.
      </blockquote>

      <H2>What the log actually shows</H2>
      <p>
        The `.gitignore` landed cleanly and stayed done. Everything else drifted. `agent.py` was rewritten roughly 30
        times with the same plan and the same broken structure. The session eventually hit a real syntax error, then
        kept looping instead of fixing the line that actually failed.
      </p>

      <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
        <Figure
          src={BLOG_IMAGES.ornith_big_task_details}
          alt="Ollama transcript showing the Ornith task details"
          caption="Task setup and orchestration context captured from the local run."
        />
        <Figure
          src={BLOG_IMAGES.ornith_big_task_context_details}
          alt="Ollama transcript showing the Ornith context details"
          caption="Context window and token usage details from the same session."
        />
      </div>

      <div className="rounded-xl border border-rose-200 bg-rose-50/60 p-5 my-8 not-prose">
        <p className="text-rose-800 font-medium mb-2">The failure mode</p>
        <p className="text-rose-700 mb-0">
          The agent kept restating the same plan while the implementation underneath it stayed broken. That is the
          expensive version of being wrong: lots of motion, no correction.
        </p>
      </div>

      <H2>Auditing the delivered code</H2>
      <p>
        The broken file was not subtly off. It had several load-bearing problems that would stop it from running at all.
        The shared mistake was treating `ChatOllama` like a context manager, then layering additional undefined names and
        invalid syntax on top of that misunderstanding.
      </p>

      <ul>
        <li>`with ChatOllama(...) as llm:` was used everywhere, but the model object is not a context manager.</li>
        <li>`research()` referenced `ai_message`, which was never defined.</li>
        <li>`return await llm.apredict([python]).content` mixed a missing variable, a deprecated call, and the wrong result shape.</li>
        <li>`compile_report()` stopped mid-function and returned nothing.</li>
        <li>`run_agent()` used malformed syntax and referenced the wrong variable names.</li>
      </ul>

      <H2>Runtime signals</H2>
      <p>
        The screenshots also show that the machine was not the bottleneck. The run had enough CPU and GPU headroom to
        keep moving; the bottleneck was the agent itself, not the hardware.
      </p>

      <div className="not-prose my-8">
        <Figure
          src={BLOG_IMAGES.ornith_usage_details}
          alt="Windows Task Manager showing the machine under load during the Ornith run"
          caption="Task Manager showed moderate GPU usage while the model was running."
          wide
        />
      </div>

      <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
        <Figure
          src={BLOG_IMAGES.ornith_prompt_eval}
          alt="Prompt evaluation log for Ornith"
          caption="Prompt processing output from the same local session."
        />
        <Figure
          src={BLOG_IMAGES.ornith_eval_speed}
          alt="Token generation speed log for Ornith"
          caption="Generation speed stayed visible and measurable even as the implementation stayed broken."
        />
      </div>

      <H2>Proof appendix</H2>
      <p>
        Below are the raw code and log artifacts from the research folder. This is the part that makes the post a proof
        record instead of just a narrative summary.
      </p>

      <div className="space-y-4 not-prose my-8">
        <ProofBlock
          title="agent.py"
          file="langchain_research_agent/agent.py"
          excerpt={`"""Research-Reporter Agent using LangChain LCEL."""

# 1. Request -> Research sub-tasks (Agent step 1)

def parse_request(user_input):
    """Turn a raw prompt into research-question tasks."""
    chunks = [c.strip() for c in user_input.split(".") if c.strip()]
    return [{"topic": chunk, "intent": "research"} for chunk in chunks if len(chunk)>3]

async def research(topic):
    with ChatOllama(model="qwen3", temperature=0) as llm:
        prompt_text = (
            f"Search the web for information about this topic and return a concise summary.\n"
            f"- Topic: {topic}\n\nContext:"
        )

    ai_message_content = "Research step ready\n- topic=" + str(topic)
    content = str(ai_message.content)

    return await llm.apredict([python]).content`}
        />

        <ProofBlock
          title="example.py"
          file="langchain_research_agent/example.py"
          excerpt={`"""Example usage: run the research agent."""

from agent import run_agent


if __name__ == "__main__":
    result = run_agent("LangChain")
    print(result)`}
        />

        <ProofBlock
          title="README.md"
          file="langchain_research_agent/README.md"
          excerpt={`# LangChain Research Reporter Agent

An agent that **researches** your question, writes a structured report, and serves it back.

Usage example:
from langchain_research_agent.agent import run_agent
result = run_agent("LangChain")
print(result)`}
        />

        <ProofBlock
          title="requirements.txt"
          file="langchain_research_agent/requirements.txt"
          excerpt={`langchain>=0.3.0
langchain-openai>=0.2.0
python-dotenv>=1.0.0`}
        />

        <ProofBlock
          title="ornith_run.log"
          file="langchain_research_agent/ornith_run.log"
          excerpt={`can you build a simple agentic project using langchain which can analyse user request, research, write a report and give it to user.

The user wants me to build a simple agentic project using LangChain that can:
1. Analyze the user's request
2. Research (search for relevant information)
3. Write a report based on findings
4. Give the report back to the user`}
        />

        <ProofBlock
          title="sample_logs.txt"
          file="sample_logs.txt"
          excerpt={`The user wants me to build a simple agentic project using LangChain that can:
1. Analyze the user's request
2. Research (search for relevant information)
3. Write a report based on findings
4. Give the report back to the user

Let me design this:

1. RequestAnalyzer - Step 1: Parse/tweak the input request into sub-tasks
2. Researcher - Step 2: Use web search + web_fetch to gather info on different aspects`}
        />

        <ProofBlock
          title="rust_code_thinking_low.txt"
          file="rust_code_thinking_low.txt"
          excerpt={`Thinking level: low

Write a Rust function that takes a Vec<i64> and returns (min, max, sum) using iterators. Include a doc comment and example.

The user wants a Rust function that returns (min, max, sum) as a tuple from a Vec<i64>, using iterators.`}
        />

        <ProofBlock
          title="rust_code_medium_thinking_log.txt"
          file="rust_code_medium_thinking_log.txt"
          excerpt={`The user wants a Rust function that:
1. Takes a Vec<i64>
2. Returns (min, max, sum)
3. Uses iterators
4. Has a doc comment
5. Has an example

I'll write this to the current folder.`}
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
              <td className="py-3 px-4 text-slate-600">Small, multi-file LangChain agent with report generation.</td>
            </tr>
            <tr className="border-t border-slate-200">
              <td className="py-3 px-4 font-medium text-slate-700">Rewrite count</td>
              <td className="py-3 px-4 text-slate-600">About 30 passes on the same broken implementation.</td>
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
        <li>LangChain and Ollama APIs change often, so details can shift across versions.</li>
        <li>The session behavior is the useful signal here: repeated rewrites without a real fix.</li>
      </ul>

      <H2>Where this leaves me</H2>
      <p>
        The practical lesson is blunt. When a model keeps repeating its own plan almost verbatim and the code does not
        materially change, treat that as a stop signal. The cost of letting it keep going is measured in time, tokens,
        and false confidence.
      </p>
    </article>
  )
}


