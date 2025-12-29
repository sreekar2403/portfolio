import React from 'react'

export const PROJECTS = [
  {
    id: 'multi-agentic-platform',
    title: <italic>FRIDAY (Local Multi-Agentic Platform)</italic>,
    description: (
      <>
        <p className="text-slate-200 text-sm leading-relaxed">
          Multi-agentic platform for <strong className="text-white">local LLM inference</strong>.
        </p>
        <ul className="list-disc list-inside text-slate-200 text-sm mt-3 space-y-1">
          <li>Helps you with your day-to-day tasks using local LLMs.</li>
          <li>Supports in tracking your short & long term goals</li>
          <li>Can create workflows to automate your tasks</li>
        </ul>
      </>
    ),
    githubUrl: 'https://github.com/sreekar2403/Friday',
    tags: ['Python', 'Ollama', 'Langchain', 'Google'],
    media: null,
    completionDate: '2025-12-29',
    complexity: 'Intermediate',
  },
]

export const TAG_COLORS = {
  Python: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/20',
  PyTorch: 'text-rose-300 bg-rose-500/10 border-rose-500/20',
  Research: 'text-indigo-300 bg-indigo-500/10 border-indigo-500/20',
  FastAPI: 'text-teal-300 bg-teal-500/10 border-teal-500/20',
  Docker: 'text-cyan-300 bg-cyan-500/10 border-cyan-500/20',
  'CI/CD': 'text-yellow-300 bg-yellow-500/10 border-yellow-500/20',
  LLM: 'text-purple-300 bg-purple-500/10 border-purple-500/20',
  Databricks: 'text-orange-300 bg-orange-500/10 border-orange-500/20',
  PySpark: 'text-blue-300 bg-blue-500/10 border-blue-500/20',
  Observability: 'text-pink-300 bg-pink-500/10 border-pink-500/20',
}
