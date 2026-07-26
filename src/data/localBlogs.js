const BASE = import.meta.env.BASE_URL || '/'

export const LOCAL_BLOG_POSTS = [
  {
    id: 'ornith-broken-agent-blog',
    title: 'Ornith Under the Microscope: 30 Rewrites, 504,000 Tokens, and Code That Still Does Not Run',
    subtitle: 'Instrumenting Ornith, an open-source agentic coding assistant run locally through Ollama, by auditing the deliverable code instead of the reasoning trace.',
    date: '2026-07-26',
    tags: ['Agentic Coding', 'Ollama', 'Local Models', 'Debugging', 'Evaluation'],
    coverImage: `${BASE}blog/Ornith/ornith_eval_speed.png`,
    readTime: '10 min',
    category: 'Agentic coding audit',
  },
  {
    id: 'qwen-vs-nemotron',
    title: 'Qwen3.6:35B-A3B-MTP vs Nemotron-3-Nano:30B-A3B — A Detailed Local Inference Comparison',
    subtitle: 'A field report from someone who runs these models to actually ship code, not just to run a benchmark suite.',
    date: '2026-07-20',
    tags: ['Local LLM', 'Ollama', 'Qwen', 'Nemotron', 'Inference'],
    coverImage: `${BASE}blog/Nemotron_VS_Qwen/qwen ollama ps.png`,
    readTime: '12 min',
    category: 'Local LLM comparison',
  },
]

export const BLOG_IMAGES = {
  ornith_reasoning_failure_poster: `${BASE}blog/Ornith/Agentic_Assistant_Reasoning_Failure_Audit.png`,
  ornith_big_task_details: `${BASE}blog/Ornith/big_task_details.png`,
  ornith_big_task_context_details: `${BASE}blog/Ornith/big_task_context_details.png`,
  ornith_eval_speed: `${BASE}blog/Ornith/ornith_eval_speed.png`,
  ornith_prompt_eval: `${BASE}blog/Ornith/ornith_prompt_eval.png`,
  ornith_usage_details: `${BASE}blog/Ornith/usage_details.png`,
  'nemotron_3_nano': `${BASE}blog/Nemotron_VS_Qwen/nemotron 3 nano.png`,
  'qwen_ollama_ps': `${BASE}blog/Nemotron_VS_Qwen/qwen ollama ps.png`,
  'nemotron_3_nano_project': `${BASE}blog/Nemotron_VS_Qwen/nemotron 3 nano project.png`,
  'nemotron_3_nano_t_s': `${BASE}blog/Nemotron_VS_Qwen/nemotron 3 nano t_s.png`,
  'qwen_ollama_project': `${BASE}blog/Nemotron_VS_Qwen/qwen ollama project.png`,
  'qwen_ollama_t_s': `${BASE}blog/Nemotron_VS_Qwen/qwen ollama t_s.png`,
  'nemotron_3_nano_ans': `${BASE}blog/Nemotron_VS_Qwen/nemotron 3 nano ans.png`,
  'qwen_ollama_ans': `${BASE}blog/Nemotron_VS_Qwen/qwen ollama ans.png`,
}

export const BLOG_VIDEO = {
  ornith_reasoning_failure: `${BASE}blog/Ornith/When_Agents_Overthink.mp4`,
  'local_llm_showdown': `${BASE}blog/Nemotron_VS_Qwen/Local_LLM_Showdown.mp4`,
}
