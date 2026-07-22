// ponytail: local blog posts stored as JSX to avoid markdown parser dependency
// Add more posts by appending to the array
const BASE = import.meta.env.BASE_URL || '/'

export const LOCAL_BLOG_POSTS = [
  {
    id: 'qwen-vs-nemotron',
    title: 'Qwen3.6:35B-A3B-MTP vs Nemotron-3-Nano:30B-A3B — A Detailed Local Inference Comparison',
    subtitle: 'A field report from someone who runs these models to actually ship code, not just to run a benchmark suite.',
    date: '2026-07-20',
    tags: ['Local LLM', 'Ollama', 'Qwen', 'Nemotron', 'Inference'],
    coverImage: `${BASE}blog/Nemotron_VS_Qwen/qwen ollama ps.png`,
    readTime: '12 min',
  },
]

// Image path mapping for the Qwen vs Nemotron post
export const BLOG_IMAGES = {
  'nemotron_3_nano': `${BASE}blog/Nemotron_VS_Qwen/nemotron 3 nano.png`,
  'qwen_ollama_ps': `${BASE}blog/Nemotron_VS_Qwen/qwen ollama ps.png`,
  'nemotron_3_nano_project': `${BASE}blog/Nemotron_VS_Qwen/nemotron 3 nano project.png`,
  'nemotron_3_nano_t_s': `${BASE}blog/Nemotron_VS_Qwen/nemotron 3 nano t_s.png`,
  'qwen_ollama_project': `${BASE}blog/Nemotron_VS_Qwen/qwen ollama project.png`,
  'qwen_ollama_t_s': `${BASE}blog/Nemotron_VS_Qwen/qwen ollama t_s.png`,
  'nemotron_3_nano_ans': `${BASE}blog/Nemotron_VS_Qwen/nemotron 3 nano ans.png`,
  'qwen_ollama_ans': `${BASE}blog/Nemotron_VS_Qwen/qwen ollama ans.png`,
}
