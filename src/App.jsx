import React, { useEffect, useRef, useMemo, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Github, Linkedin, Mail, ExternalLink, Code2, Cpu, BarChart3, Rocket, BookOpen, Brain, Network, Zap } from 'lucide-react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, Float, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

// --- Advanced 3D Neural Background ---
function NeuralParticles() {
  const ref = useRef();
  const [sphere] = useState(() => {
    const arr = new Float32Array(3000 * 3);
    for (let i = 0; i < 3000; i++) {
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      const x = 5 * Math.sin(phi) * Math.cos(theta);
      const y = 5 * Math.sin(phi) * Math.sin(theta);
      const z = 5 * Math.cos(phi);
      arr.set([x, y, z], i * 3);
    }
    return arr;
  });

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#3b82f6"
          size={0.05}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

function FloatingCores() {
  return (
    <>
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <Sphere args={[1, 64, 64]} position={[-5, 2, -10]}>
          <MeshDistortMaterial
            color="#1e1b4b"
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0}
            emissive="#3b82f6"
            emissiveIntensity={0.5}
          />
        </Sphere>
      </Float>
      <Float speed={3} rotationIntensity={1} floatIntensity={3}>
        <Sphere args={[1.5, 64, 64]} position={[8, -4, -12]}>
          <MeshDistortMaterial
            color="#0f172a"
            attach="material"
            distort={0.5}
            speed={1.5}
            roughness={0}
            emissive="#10b981"
            emissiveIntensity={0.3}
          />
        </Sphere>
      </Float>
    </>
  );
}

const ScenicBackground = () => (
  <div className="fixed inset-0 z-0 pointer-events-none">
    <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#3b82f6" />
      <NeuralParticles />
      <FloatingCores />
    </Canvas>
  </div>
);

const Section = ({ children, className, id }) => (
  <motion.section 
    id={id}
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className={`py-24 px-6 max-w-6xl mx-auto relative z-10 ${className}`}
  >
    {children}
  </motion.section>
);

const SkillBadge = ({ name }) => (
  <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-full text-xs font-semibold tracking-wide uppercase">
    {name}
  </span>
);

export default function App() {
  return (
    <div className="bg-[#050810] text-slate-300 min-h-screen font-sans selection:bg-blue-500/40 relative overflow-hidden">
      {/* 3D Visual Layer */}
      <ScenicBackground />
      
      {/* Cinematic Overlays */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,#050810_100%)] pointer-events-none z-[1]" />
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] pointer-events-none contrast-150 brightness-100 z-[2]" />
      <div className="fixed inset-0 z-0 opacity-[0.02] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)', backgroundSize: '100px 100px' }} />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-3xl border-b border-white/5 bg-[#050810]/40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center text-sm">
          <motion.span 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="text-xl font-black bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400 bg-clip-text text-transparent tracking-tighter"
          >
            PVSM SREEKAR
          </motion.span>
          <div className="flex gap-8 items-center font-medium tracking-widest text-xs uppercase text-slate-400">
             <a href="#experience" className="hover:text-white transition-colors">Experience</a>
             <a href="#publications" className="hover:text-white transition-colors">Research</a>
             <div className="h-4 w-px bg-white/10 mx-2" />
             <div className="flex gap-4">
              <a href="mailto:padarthi24sreekar2@gmail.com" className="hover:text-blue-400 transition-all hover:scale-110"><Mail size={16}/></a>
              <a href="https://www.linkedin.com/in/p-v-s-m-sreekar-21b888149/" target="_blank" rel="noopener" className="hover:text-blue-400 transition-all hover:scale-110"><Linkedin size={16}/></a>
              <a href="https://github.com/sreekar2403" target="_blank" rel="noopener" className="hover:text-blue-400 transition-all hover:scale-110"><Github size={16}/></a>
             </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <Section className="pt-56 pb-40 text-center">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/5 border border-blue-500/10 text-blue-400/80 text-[10px] font-black mb-12 uppercase tracking-[0.3em] backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Lead Machine Learning Engineer @ Freshworks
          </div>
          <h1 className="text-7xl md:text-9xl font-black mb-10 tracking-tighter text-white leading-[0.85]">
            Engineering <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-400 via-indigo-400 to-emerald-400">
              Future AI
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-slate-500 text-xl leading-relaxed font-light">
            Building end-to-end MLOps architectures and fine-tuning disruptive LLMs 
            that redefine scalable SaaS intelligence.
          </p>
          
          <div className="mt-16 flex justify-center gap-6">
            <motion.button 
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const el = document.getElementById('experience');
                if (el) {
                  const yOffset = -100; // Offset for fixed nav
                  const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                  window.scrollTo({ top: y, behavior: 'smooth' });
                  console.log('Fired scroll to experience');
                }
              }}
              className="px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black transition-all shadow-[0_0_30px_rgba(59,130,246,0.25)] hover:shadow-[0_0_40px_rgba(59,130,246,0.4)] cursor-pointer relative z-[20]"
            >
              DECODE PORTFOLIO
            </motion.button>
            <motion.button 
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const el = document.getElementById('publications');
                if (el) {
                  const yOffset = -100;
                  const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                  window.scrollTo({ top: y, behavior: 'smooth' });
                  console.log('Fired scroll to research');
                }
              }}
              className="px-10 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-2xl font-black transition-all backdrop-blur-md cursor-pointer relative z-[20]"
            >
              SYSTEM LOGS
            </motion.button>
          </div>


        </motion.div>
      </Section>

      {/* Impact Stats Bento Grid */}
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { label: 'Latency Reduction', val: '40%', icon: <Rocket size={24} className="text-emerald-400"/>, color: 'from-emerald-500/10' },
            { label: 'Time Saved Annually', val: '500+ Hrs', icon: <BarChart3 size={24} className="text-blue-400"/>, color: 'from-blue-500/10' },
            { label: 'Feature Impact', val: '35%', desc: 'Resolution improvement', icon: <Cpu size={24} className="text-purple-400"/>, color: 'from-purple-500/10' }
          ].map((stat, i) => (
            <motion.div 
              whileHover={{ y: -10, scale: 1.02 }}
              key={i} 
              className={`p-10 rounded-[2.5rem] bg-gradient-to-br ${stat.color} to-white/[0.02] border border-white/5 flex flex-col items-center text-center backdrop-blur-md shadow-2xl group transition-all duration-500`}
            >
              <div className="mb-8 p-5 bg-white/5 rounded-[2rem] group-hover:bg-white/10 transition-colors shadow-inner">{stat.icon}</div>
              <h3 className="text-5xl font-black text-white mb-3 tracking-tighter">{stat.val}</h3>
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em]">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Experience Timeline */}
      <Section id="experience">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-4">
          <div>
            <h2 className="text-5xl font-black text-white flex items-center gap-6 tracking-tighter uppercase">
              <Network size={40} className="text-blue-500" /> Career Log
            </h2>
            <p className="text-slate-600 mt-4 font-bold tracking-[0.2em] uppercase text-xs border-l-2 border-blue-500 pl-4 ml-1">Sequence of high-impact iterations</p>
          </div>
        </div>

        <div className="relative space-y-0">
          <div className="absolute left-[7px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-blue-500 via-white/5 to-transparent md:left-1/2 md:-ml-[1px]" />

          {[
            {
              role: "Lead Machine Learning Engineer",
              company: "Freshworks",
              period: "Jan 2025 - Present",
              current: true,
              desc: [
                "Driving architectural migration to open-source LLMs, enhancing horizontal scalability by 20%.",
                "Engineered proprietary speculative decoding frameworks for high-fidelity model evaluation.",
                "Mentoring a high-performance team of engineers on distributed AI systems and MLOps."
              ]
            },
            {
              role: "Senior Data Scientist",
              company: "Freshworks",
              period: "Oct 2022 - Jan 2025",
              desc: [
                "Spearheaded end-to-end automation for Auto-triage and Smart Reply leveraging Databricks and Kafka.",
                "Realized 50% surge in operational throughput via predictive ticket routing and automated response systems.",
                "Unified ML microservice standards using modular FastAPI templates for rapid deployment."
              ],
              skills: ["Databricks", "Kafka", "PySpark", "Jenkins"]
            },
            {
              role: "Senior Machine Learning Engineer",
              company: "Freshworks",
              period: "Oct 2020 - Oct 2022",
              desc: [
                "Optimized sentiment engines and escalation predictors for multi-tenant SaaS environments.",
                "Build state-of-the-art Q&A backend infrastructure for zero-touch query resolution.",
                "Architected hyperparameter search spaces using Optuna, compressing R&D cycles by 30%."
              ],
              skills: ["PyTorch", "Optuna", "Escalation Systems"]
            },
            {
              role: "Machine Learning Intern",
              company: "Freshworks",
              period: "Jan 2020 - Oct 2020",
              desc: [
                "Executed research in pronoun replacement to enhance structural NLP readability.",
                "Curated large-scale synthetic datasets for transformer fine-tuning and evaluation."
              ],
              skills: ["NLP Research", "Transformer Modeling"]
            }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`relative flex flex-col md:flex-row gap-12 mb-32 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
            >
              <div className="flex-1 md:text-right">
                <div className="hidden md:block">
                  <h3 className="text-3xl font-black text-white leading-tight uppercase tracking-tighter">{item.role}</h3>
                  <p className="text-blue-500/80 font-black mt-2 uppercase tracking-widest text-[10px]">{item.company} • {item.period}</p>
                </div>
              </div>

              <div className="relative z-10 flex flex-col items-center">
                <div className={`w-4 h-4 rounded-full border-4 border-[#050810] ${item.current ? 'bg-blue-500 shadow-[0_0_25px_#3b82f6]' : 'bg-slate-800'}`} />
              </div>

              <div className="flex-1 md:text-left">
                <div className="md:hidden">
                  <h3 className="text-2xl font-black text-white uppercase tracking-tighter">{item.role}</h3>
                  <p className="text-blue-500/80 font-black mt-2 uppercase tracking-widest text-[10px]">{item.company} • {item.period}</p>
                </div>
                <div className="hidden md:block" />
                <ul className="mt-6 space-y-4 text-slate-500 text-sm font-medium border-l border-white/5 pl-6">
                  {item.desc.map((d, i) => <li key={i} className="leading-relaxed">{d}</li>)}
                </ul>
                <div className="flex gap-2 mt-8 flex-wrap">
                  {item.skills?.map(s => <SkillBadge key={s} name={s} />)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Publications Section */}
      <Section id="publications" className="grid md:grid-cols-5 gap-16">
        <div className="md:col-span-3">
          <h2 className="text-4xl font-black text-white mb-12 flex items-center gap-4 tracking-tighter uppercase">
            <BookOpen size={32} className="text-emerald-500" /> Technical Paper
          </h2>
          <motion.div 
            whileHover={{ y: -5 }}
            className="p-12 rounded-[3rem] bg-gradient-to-br from-emerald-500/5 to-white/[0.01] border border-white/5 hover:border-emerald-500/20 transition-all shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative group"
          >
            <Zap className="absolute top-8 right-8 text-emerald-500/10 group-hover:text-emerald-500/30 transition-colors" size={64} />
            <h3 className="text-3xl font-black text-white mb-4 tracking-tight leading-tight">A Multi-Model Adaptation of Speculative Decoding for Classification</h3>
            <p className="text-slate-500 text-base mb-10 leading-relaxed font-medium">
              Groundbreaking research published on <span className="text-emerald-500/80 font-black">arXiv (2025)</span> analyzing efficiency gains in speculative decoding architectures for production classification engines.
            </p>
            <a href="https://arxiv.org/abs/2503.18076" target="_blank" rel="noopener" className="inline-flex items-center gap-3 px-8 py-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-emerald-500/20 transition-all">
              Access Full Repository <ExternalLink size={16}/>
            </a>
          </motion.div>
        </div>
        
        <div className="md:col-span-2">
          <h2 className="text-4xl font-black text-white mb-12 tracking-tighter uppercase">Education</h2>
          <div className="p-12 rounded-[3rem] bg-white/[0.02] border border-white/5 backdrop-blur-md shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-[50px] group-hover:bg-blue-500/10 transition-colors" />
            <h3 className="font-black text-white text-2xl tracking-tighter uppercase">B.Tech <br/> Computer Science</h3>
            <p className="text-blue-500 font-bold mt-2 uppercase tracking-widest text-[10px]">BML Munjal University, Haryana</p>
            <p className="text-sm text-slate-500 mt-10 leading-relaxed font-medium">
              Specialized focus on Distributed ML Systems and Transformer Architectures. <br/>
              Class of 2020.
            </p>
            <div className="mt-12 flex gap-2">
              <SkillBadge name="C.S.E" /> <SkillBadge name="GPA 8.4" />
            </div>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="py-32 border-t border-white/5 text-center relative z-10 bg-[#050810]/50 backdrop-blur-lg">
        <div className="flex justify-center gap-12 mb-12">
          <a href="https://github.com/sreekar2403" className="text-slate-600 hover:text-white transition-all hover:scale-125"><Github size={28}/></a>
          <a href="https://www.linkedin.com/in/p-v-s-m-sreekar-21b888149/" className="text-slate-600 hover:text-white transition-all hover:scale-125"><Linkedin size={28}/></a>
          <a href="mailto:padarthi24sreekar2@gmail.com" className="text-slate-600 hover:text-white transition-all hover:scale-125"><Mail size={28}/></a>
        </div>
        <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.5em]">P V S M SREEKAR — 2025</p>
        <p className="text-[9px] text-slate-700 mt-4 uppercase tracking-[0.2em] font-mono">Build ID: SG-24-03A | Protocol: React-Three-Fiber</p>
      </footer>
    </div>
  );
}
