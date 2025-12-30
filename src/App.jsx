import React, { useEffect, useRef } from 'react';
import { motion as MOTION } from 'framer-motion';
import { Github, Linkedin, Mail, ExternalLink, Code2, Cpu, BarChart3, Rocket, BookOpen, Brain, Network, Zap } from 'lucide-react';
import * as THREE from 'three';
import Projects from './components/Projects';

const ScenicBackground = () => {
  const containerRef = useRef(null);
  useEffect(() => {
    let camera, scene, renderer, raycaster, pointer, mesh, line;
    let geometry, material;
    const container = containerRef.current;
    if (!container) return;

    camera = new THREE.PerspectiveCamera(27, window.innerWidth / window.innerHeight, 1, 3500);
    camera.position.z = 2750;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    scene.fog = new THREE.Fog(0xffffff, 2000, 3500);

    scene.add(new THREE.AmbientLight(0x444444, 3));
    const light1 = new THREE.DirectionalLight(0xffffff, 1.5);
    light1.position.set(1, 1, 1);
    scene.add(light1);
    const light2 = new THREE.DirectionalLight(0xffffff, 4.5);
    light2.position.set(0, -1, 0);
    scene.add(light2);

    const triangles = 5000;
    geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(triangles * 3 * 3);
    const normals = new Float32Array(triangles * 3 * 3);
    const colors = new Float32Array(triangles * 3 * 3);
    const color = new THREE.Color();
    const n = 800, n2 = n / 2;
    const d = 120, d2 = d / 2;
    const pA = new THREE.Vector3();
    const pB = new THREE.Vector3();
    const pC = new THREE.Vector3();
    const cb = new THREE.Vector3();
    const ab = new THREE.Vector3();
    for (let i = 0; i < positions.length; i += 9) {
      const x = Math.random() * n - n2;
      const y = Math.random() * n - n2;
      const z = Math.random() * n - n2;
      const ax = x + Math.random() * d - d2;
      const ay = y + Math.random() * d - d2;
      const az = z + Math.random() * d - d2;
      const bx = x + Math.random() * d - d2;
      const by = y + Math.random() * d - d2;
      const bz = z + Math.random() * d - d2;
      const cx = x + Math.random() * d - d2;
      const cy = y + Math.random() * d - d2;
      const cz = z + Math.random() * d - d2;
      positions[i] = ax; positions[i + 1] = ay; positions[i + 2] = az;
      positions[i + 3] = bx; positions[i + 4] = by; positions[i + 5] = bz;
      positions[i + 6] = cx; positions[i + 7] = cy; positions[i + 8] = cz;
      pA.set(ax, ay, az);
      pB.set(bx, by, bz);
      pC.set(cx, cy, cz);
      cb.subVectors(pC, pB);
      ab.subVectors(pA, pB);
      cb.cross(ab);
      cb.normalize();
      const nx = cb.x, ny = cb.y, nz = cb.z;
      normals[i] = nx; normals[i + 1] = ny; normals[i + 2] = nz;
      normals[i + 3] = nx; normals[i + 4] = ny; normals[i + 5] = nz;
      normals[i + 6] = nx; normals[i + 7] = ny; normals[i + 8] = nz;
      const vx = (x / n) + 0.5;
      const vy = (y / n) + 0.5;
      const vz = (z / n) + 0.5;
      color.setRGB(vx, vy, vz);
      colors[i] = color.r; colors[i + 1] = color.g; colors[i + 2] = color.b;
      colors[i + 3] = color.r; colors[i + 4] = color.g; colors[i + 5] = color.b;
      colors[i + 6] = color.r; colors[i + 7] = color.g; colors[i + 8] = color.b;
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('normal', new THREE.BufferAttribute(normals, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.computeBoundingSphere();
    material = new THREE.MeshPhongMaterial({
      color: 0xaaaaaa, specular: 0xffffff, shininess: 250, side: THREE.DoubleSide, vertexColors: true
    });
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    raycaster = new THREE.Raycaster();
    pointer = new THREE.Vector2();

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(4 * 3), 3));
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x0b1220, transparent: true });
    line = new THREE.Line(lineGeometry, lineMaterial);
    scene.add(line);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(() => {
      const time = Date.now() * 0.001;
      mesh.rotation.x = time * 0.15;
      mesh.rotation.y = time * 0.25;
      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObject(mesh);
      if (intersects.length > 0) {
        const intersect = intersects[0];
        const face = intersect.face;
        const linePosition = line.geometry.attributes.position;
        const meshPosition = mesh.geometry.attributes.position;
        linePosition.copyAt(0, meshPosition, face.a);
        linePosition.copyAt(1, meshPosition, face.b);
        linePosition.copyAt(2, meshPosition, face.c);
        linePosition.copyAt(3, meshPosition, face.a);
        mesh.updateMatrix();
        line.geometry.applyMatrix4(mesh.matrix);
        line.visible = true;
      } else {
        line.visible = false;
      }
      renderer.render(scene, camera);
    });
    container.appendChild(renderer.domElement);

    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    const onPointerMove = (event) => {
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('resize', onWindowResize);
    window.addEventListener('pointermove', onPointerMove);

    return () => {
      window.removeEventListener('resize', onWindowResize);
      window.removeEventListener('pointermove', onPointerMove);
      renderer.setAnimationLoop(null);
      renderer.dispose();
      if (container) container.innerHTML = '';
      scene.traverse((obj) => {
        if (obj.isMesh) {
          obj.geometry?.dispose();
          if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
          else obj.material?.dispose();
        }
      });
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-none" />;
};

const Section = ({ children, className, id, ...props }) => (
  <MOTION.section 
    id={id}
    {...props}
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className={`py-16 md:py-24 px-4 md:px-6 max-w-6xl mx-auto relative z-10 ${className}`}
  >
    {children}
  </MOTION.section>
);

const SkillBadge = ({ name }) => (
  <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-full text-xs font-semibold tracking-wide uppercase">
    {name}
  </span>
);

export default function App() {
  return (
    <div className="bg-[#f7f9fc] text-slate-800 min-h-screen font-sans selection:bg-blue-500/40 relative overflow-hidden">
      {/* 3D Visual Layer */}
      <ScenicBackground />
      
      {/* Cinematic Overlays */}
      <div className="fixed inset-0 bg-transparent pointer-events-none z-[1]" />
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] pointer-events-none contrast-100 brightness-100 z-[2]" />
      <div className="fixed inset-0 z-0 opacity-[0.01] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#dbeafe 1px, transparent 1px), linear-gradient(90deg, #dbeafe 1px, transparent 1px)', backgroundSize: '100px 100px' }} />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-3xl border-b border-slate-200 bg-white/70">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 flex justify-between items-center text-sm">
          <MOTION.span 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="text-lg md:text-xl font-black bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400 bg-clip-text text-transparent tracking-tighter"
          >
            PVSM SREEKAR
          </MOTION.span>
          <div className="flex gap-4 md:gap-8 items-center font-medium tracking-widest text-[10px] md:text-xs uppercase text-slate-600">
             <a href="#projects" className="hover:text-slate-900 transition-colors hidden sm:block">Projects</a>
             <a href="#experience" className="hover:text-slate-900 transition-colors hidden sm:block">Experience</a>
             <a href="#publications" className="hover:text-slate-900 transition-colors hidden sm:block">Research</a>
             <div className="h-4 w-px bg-slate-200 mx-1 md:mx-2 hidden sm:block" />
             <div className="flex gap-3 md:gap-4">
              <a href="mailto:padarthi24sreekar2@gmail.com" className="hover:text-blue-400 transition-all hover:scale-110"><Mail size={16}/></a>
              <a href="https://www.linkedin.com/in/p-v-s-m-sreekar-21b888149/" target="_blank" rel="noopener" className="hover:text-blue-400 transition-all hover:scale-110"><Linkedin size={16}/></a>
              <a href="https://github.com/sreekar2403" target="_blank" rel="noopener" className="hover:text-blue-400 transition-all hover:scale-110"><Github size={16}/></a>
             </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <Section className="pt-56 pb-40 text-center">
        <MOTION.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-700 text-[10px] font-black mb-12 uppercase tracking-[0.3em] backdrop-blur-sm shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Lead Machine Learning Engineer @ Freshworks
          </div>
          <h1 className="text-5xl md:text-9xl font-black mb-8 md:mb-10 tracking-tighter text-slate-900 leading-[0.9] md:leading-[0.85]">
            Engineering <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-400 via-indigo-400 to-emerald-400">
              Future AI
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-slate-700 text-lg md:text-xl leading-relaxed font-light px-4">
            Building end-to-end MLOps architectures and fine-tuning disruptive LLMs 
            that redefine scalable SaaS intelligence.
          </p>
          
          <div className="mt-12 md:mt-16 flex flex-col md:flex-row justify-center gap-4 md:gap-6 px-6">
            <MOTION.button 
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
              className="px-8 md:10 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black transition-all shadow-[0_0_30px_rgba(59,130,246,0.25)] hover:shadow-[0_0_40px_rgba(59,130,246,0.4)] cursor-pointer relative z-[20] w-full md:w-auto"
            >
              DECODE PORTFOLIO
            </MOTION.button>
            <MOTION.button 
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
              className="px-8 md:10 py-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-900 rounded-2xl font-black transition-all backdrop-blur-md cursor-pointer relative z-[20] w-full md:w-auto"
            >
              SYSTEM LOGS
            </MOTION.button>
          </div>


        </MOTION.div>
      </Section>

      {/* Impact Stats Bento Grid */}
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { label: 'Latency Reduction', val: '40%', icon: <Rocket size={24} className="text-emerald-400"/>, color: 'from-emerald-500/10' },
            { label: 'Time Saved Annually', val: '500+ Hrs', icon: <BarChart3 size={24} className="text-blue-400"/>, color: 'from-blue-500/10' },
            { label: 'Feature Impact', val: '35%', desc: 'Resolution improvement', icon: <Cpu size={24} className="text-purple-400"/>, color: 'from-purple-500/10' }
          ].map((stat, i) => (
            <MOTION.div 
              whileHover={{ y: -10, scale: 1.02 }}
              key={i} 
              className={`p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] bg-gradient-to-br ${stat.color} to-white border border-slate-200 flex flex-col items-center text-center backdrop-blur-md shadow-2xl group transition-all duration-500`}
            >
              <div className="mb-6 md:mb-8 p-4 md:p-5 bg-slate-50 rounded-[1.5rem] md:rounded-[2rem] group-hover:bg-slate-100 transition-colors shadow-inner">{stat.icon}</div>
              <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-3 tracking-tighter">{stat.val}</h3>
              <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.3em]">{stat.label}</p>
            </MOTION.div>
          ))}
        </div>
      </Section>

      <Projects />

      {/* Experience Timeline */}
      <Section id="experience">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-6">
          <div className="w-full">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 flex items-center gap-4 md:gap-6 tracking-tighter uppercase">
              <Network size={32} className="text-blue-500" /> Career Log
            </h2>
            <p className="text-slate-600 mt-4 font-bold tracking-[0.2em] uppercase text-[10px] md:text-xs border-l-2 border-blue-500 pl-4 ml-1">Sequence of high-impact iterations</p>
          </div>
        </div>

        <div className="relative space-y-0 px-2 md:px-0">
          <div className="absolute left-[23px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-blue-500 via-slate-200 to-transparent md:left-1/2 md:-ml-[1px]" />

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
            <MOTION.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`relative flex flex-col md:flex-row gap-12 mb-32 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
            >
              <div className="flex-1 md:text-right">
                <div className="hidden md:block">
                  <h3 className="text-3xl font-black text-slate-900 leading-tight uppercase tracking-tighter">{item.role}</h3>
                  <p className="text-blue-500/80 font-black mt-2 uppercase tracking-widest text-[10px]">{item.company} • {item.period}</p>
                </div>
              </div>

              <div className="relative z-10 flex flex-col items-center ml-2 md:ml-0">
                <div className={`w-4 h-4 rounded-full border-4 border-slate-300 ${item.current ? 'bg-blue-500 shadow-[0_0_25px_#3b82f6]' : 'bg-slate-300'}`} />
              </div>

              <div className="flex-1 md:text-left">
                <div className="md:hidden">
                  <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">{item.role}</h3>
                  <p className="text-blue-500/80 font-black mt-2 uppercase tracking-widest text-[10px]">{item.company} • {item.period}</p>
                </div>
                <div className="hidden md:block" />
                <ul className="mt-6 space-y-4 text-slate-700 text-sm font-medium border-l border-slate-200 pl-6">
                  {item.desc.map((d, i) => <li key={i} className="leading-relaxed">{d}</li>)}
                </ul>
                <div className="flex gap-2 mt-8 flex-wrap">
                  {item.skills?.map(s => <SkillBadge key={s} name={s} />)}
                </div>
              </div>
            </MOTION.div>
          ))}
        </div>
      </Section>

      {/* Publications Section */}
      <Section id="publications" className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-16">
        <div className="md:col-span-3">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-8 md:mb-12 flex items-center gap-4 tracking-tighter uppercase">
            <BookOpen size={28} className="text-emerald-500" /> Technical Paper
          </h2>
          <MOTION.div 
            whileHover={{ y: -5 }}
            className="p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] bg-gradient-to-br from-emerald-500/5 to-white border border-slate-200 hover:border-emerald-500/20 transition-all shadow-[0_20px_50px_rgba(0,0,0,0.06)] relative group overflow-hidden"
          >
            <Zap className="absolute -top-4 -right-4 md:top-8 md:right-8 text-emerald-500/10 group-hover:text-emerald-500/30 transition-colors" size={100} />
            <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-4 tracking-tight leading-tight relative z-10">A Multi-Model Adaptation of Speculative Decoding for Classification</h3>
            <p className="text-slate-700 text-sm md:text-base mb-10 leading-relaxed font-medium relative z-10">
              Groundbreaking research published on <span className="text-emerald-500/80 font-black">arXiv (2025)</span> analyzing efficiency gains in speculative decoding architectures for production classification engines.
            </p>
            <a href="https://arxiv.org/abs/2503.18076" target="_blank" rel="noopener" className="inline-flex items-center justify-center gap-3 px-6 md:px-8 py-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-2xl text-[10px] md:text-xs font-black uppercase tracking-widest hover:bg-emerald-500/20 transition-all w-full md:w-auto relative z-10">
              Access Full Repository <ExternalLink size={16}/>
            </a>
          </MOTION.div>
        </div>
        
        <div className="md:col-span-2">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-8 md:mb-12 tracking-tighter uppercase">Education</h2>
          <div className="p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] bg-white border border-slate-200 backdrop-blur-md shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-[50px] group-hover:bg-blue-500/10 transition-colors" />
            <h3 className="font-black text-slate-900 text-xl md:text-2xl tracking-tighter uppercase">B.Tech <br/> Computer Science</h3>
            <p className="text-blue-500 font-bold mt-2 uppercase tracking-widest text-[10px]">BML Munjal University, Haryana</p>
            <p className="text-sm text-slate-700 mt-8 md:mt-10 leading-relaxed font-medium">
              Focused on core computational theory and software engineering principles. <br/>
              Class of 2016.
            </p>
            <div className="mt-8 md:mt-12 flex gap-2 flex-wrap">
              <SkillBadge name="C.S.C" />
            </div>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="py-16 md:py-32 border-t border-slate-200 text-center relative z-10 bg-white backdrop-blur-lg px-6">
        <div className="flex justify-center gap-8 md:gap-12 mb-8 md:mb-12">
          <a href="https://github.com/sreekar2403" className="text-slate-600 hover:text-slate-900 transition-all hover:scale-125"><Github size={24}/></a>
          <a href="https://www.linkedin.com/in/p-v-s-m-sreekar-21b888149/" className="text-slate-600 hover:text-slate-900 transition-all hover:scale-125"><Linkedin size={24}/></a>
          <a href="mailto:padarthi24sreekar2@gmail.com" className="text-slate-600 hover:text-slate-900 transition-all hover:scale-125"><Mail size={24}/></a>
        </div>
        <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em]">P V S M SREEKAR — 2025</p>
      </footer>
    </div>
  );
}
