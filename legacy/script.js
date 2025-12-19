// Resume-derived profile content
const profile = {
  name: "Padharthi V S M Sreekar",
  title: "Senior Machine Learning Engineer",
  email: "padarthi24sreekar2@gmail.com",
  linkedin: "https://www.linkedin.com/in/p-v-s-m-sreekar-21b888149/",
  github: "", // add your GitHub URL if available
  phone: "+91 9515178067",
  location: "Bangalore, India",
  resumePath: "Resume_Sreekar_pvsm.pdf",
  about:
    "Machine Learning Engineer with 4+ years building and deploying large-scale NLP products. Seeking opportunities to leverage LLMs, MLOps, and end-to-end delivery to drive measurable business value.",
  skills: [
    // Core skills grouped from resume
    "Data Analysis", "Language Modelling", "Model Distillation", "Quantization", "Deployment",
    // Frameworks / Tools
    "PyTorch", "Lightning", "Transformers", "OpenAI", "FastAPI", "AWS", "Docker", "Jenkins", "Elasticsearch", "Databricks", "Optuna", "Kafka", "LightGBM"
  ],
  experience: [
    {
      role: "Senior Machine Learning Engineer",
      company: "Freshworks",
      period: "Oct 2020 — Present · Bangalore, India",
      achievements: [
        "Owned features end-to-end with PMs; defined strategy, developed, trained, and deployed ML features that improved customer experience.",
        "Optimized and fine-tuned open-source LLMs for internal use; replaced OpenAI models to improve scalability and reduce latency across Desk and Chat products (escalation prediction, sentiment, typo correction).",
        "Designed and implemented Q&A backend infrastructure for streamlined query handling.",
        "Delivered sentiment analysis over email and chat to improve communications and service quality.",
        "Built end-to-end automation for auto-triage, smart-reply, and canned responses using Databricks, REST APIs, Kafka, and Jenkins; drove operational efficiency.",
        "Standardized ML microservice development via a reusable FastAPI template with consistent architecture, logging, and observability.",
        "Developed and maintained LightGBM classifiers with ongoing retraining for customer apps.",
        "Accelerated LightGBM hyperparameter tuning for auto-triage with Optuna to run multiple experiments and reduce DS time investment.",
        "Created a load testing platform for sequential/non-sequential tests across CRUD APIs to ensure scalability and robustness."
      ]
    },
    {
      role: "Machine Learning Intern",
      company: "Freshworks",
      period: "Jan 2020 — Oct 2020 · Chennai, India",
      achievements: [
        "Researched pronoun replacement with relative nouns to improve NLP readability."
      ]
    }
  ],
  achievements: [
    // Add noteworthy highlights if any emerge later
  ],
  publications: [
    {
      title: "A Multi-Model Adaptation of Speculative Decoding for Classification",
      venue: "arXiv, 2025 · Somnath Roy, Padharthi Sreekar, Srivatsa Narasimha, Anubhav Anand",
      link: "https://arxiv.org/abs/2503.18076",
      doi: "10.48550/arXiv.2503.18076"
    }
  ],
  certifications: [
    // Add certifications if provided in future updates
  ],
  projects: [
    // Keep placeholders until real project links/details are provided
    {
      name: "LLM Optimization for Support Automation",
      description: "Replaced external LLM APIs with fine-tuned OSS models powering escalation prediction, sentiment, and typo correction in Desk and Chat products.",
      tags: ["LLM", "PyTorch", "Transformers", "FastAPI", "AWS"],
      links: []
    },
    {
      name: "Auto-triage & Smart Reply Platform",
      description: "Automated triage and responses using Databricks, REST APIs, Kafka, and Jenkins; added monitoring and load testing for reliability.",
      tags: ["Databricks", "Kafka", "Jenkins", "Elasticsearch", "Optuna"],
      links: []
    }
  ],
  education: [
    { school: "BML Munjal University", degree: "Bachelor of Computer Science", period: "2016 — 2020", notes: "Delhi" }
  ]
};

function byId(id) { return document.getElementById(id); }

function render() {
  // Hero
  const titleEl = document.querySelector(".hero__title");
  const subtitleEl = document.querySelector(".hero__subtitle");
  if (titleEl) titleEl.textContent = profile.name;
  // Preserve typing span in subtitle; only set text when no typing span exists
  if (subtitleEl && !document.getElementById('typing')) subtitleEl.textContent = profile.title;

  // About
  const aboutEl = byId("about-text");
  if (aboutEl) aboutEl.textContent = profile.about;

  // Experience
  const expEl = byId("experience-list");
  if (expEl) {
    expEl.innerHTML = profile.experience.map(exp => `
      <article class="item">
        <div class="role">${exp.role} · ${exp.company}</div>
        <div class="meta">${exp.period}</div>
        ${exp.achievements && exp.achievements.length ? `<ul>${exp.achievements.map(a => `<li>${a}</li>`).join("")}</ul>` : ""}
      </article>
    `).join("");
  }

  // Projects
  const projectsEl = byId("projects-grid");
  if (projectsEl) {
    projectsEl.innerHTML = profile.projects.map(p => `
      <article class="card">
        <h3>${p.name}</h3>
        <p>${p.description}</p>
        <ul class="tags">${(p.tags||[]).map(t => `<li>${t}</li>`).join("")}</ul>
        <div class="links">${(p.links||[]).map(l => `<a class="btn" href="${l.href}" target="_blank" rel="noopener">${l.label}</a>`).join("")}</div>
      </article>
    `).join("");
  }

  // Achievements
  const achievementsEl = byId("achievements-list");
  if (achievementsEl) {
    achievementsEl.innerHTML = (profile.achievements||[]).map(a => `
      <article class="card">
        <p>${a}</p>
      </article>
    `).join("");
    const achievementsSection = document.getElementById("achievements");
    const hasAchievements = Array.isArray(profile.achievements) && profile.achievements.length > 0;
    if (achievementsSection) {
      achievementsSection.style.display = hasAchievements ? "" : "none";
      achievementsSection.setAttribute("aria-hidden", hasAchievements ? "false" : "true");
    }
  }

  // Publications
  const publicationsEl = byId("publications-list");
  if (publicationsEl) {
    publicationsEl.innerHTML = (profile.publications||[]).map(pub => `
      <article class="card">
        <h3>${pub.title||"Publication"}</h3>
        <p>${pub.venue||""}</p>
        <div class="links">
          ${pub.link ? `<a class="btn" href="${pub.link}" target="_blank" rel="noopener">Paper</a>` : ""}
          </div>
      </article>
    `).join("");
  }

  // Certifications
  const certsEl = byId("certifications-list");
  if (certsEl) {
    certsEl.innerHTML = (profile.certifications||[]).map(c => `<li>${c}</li>`).join("");
    const certsSection = document.getElementById("certifications");
    const hasCerts = Array.isArray(profile.certifications) && profile.certifications.length > 0;
    if (certsSection) {
      certsSection.style.display = hasCerts ? "" : "none";
      certsSection.setAttribute("aria-hidden", hasCerts ? "false" : "true");
    }
  }

  // Skills
  const skillsEl = byId("skills-list");
  if (skillsEl) {
    skillsEl.innerHTML = profile.skills.map(s => `<li>${s}</li>`).join("");
  }

  // Education
  const eduEl = byId("education-list");
  if (eduEl) {
    eduEl.innerHTML = profile.education.map(ed => `
      <article class="card">
        <h3>${ed.school}</h3>
        <p>${ed.degree}</p>
        <div class="meta">${ed.period}${ed.notes ? ` · ${ed.notes}` : ""}</div>
      </article>
    `).join("");
  }

  // Contact links
  const emailLink = byId("email-link");
  if (emailLink) {
    if (profile.email) {
      emailLink.href = `mailto:${profile.email}`;
      emailLink.textContent = profile.email;
    } else {
      emailLink.removeAttribute("href");
    }
  }
  const linkedinLink = byId("linkedin-link");
  if (linkedinLink && profile.linkedin) linkedinLink.href = profile.linkedin;
  const githubLink = byId("github-link");
  if (githubLink && profile.github) githubLink.href = profile.github;

  // Floating contact icons
  const emailFab = byId('email-fab');
  if (emailFab) {
    if (profile.email) emailFab.href = `mailto:${profile.email}`;
    else emailFab.removeAttribute('href');
  }
  const linkedinFab = byId('linkedin-fab');
  if (linkedinFab && profile.linkedin) linkedinFab.href = profile.linkedin;
  const githubFab = byId('github-fab');
  if (githubFab && profile.github) githubFab.href = profile.github;

  // Resume button in hero
  const resumeBtn = document.querySelector('.hero__actions a[href$=".pdf"]');
  if (resumeBtn && profile.resumePath) resumeBtn.setAttribute("href", profile.resumePath);

  // Footer year
  const yearEl = byId("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Stagger timings for grids and timelines
  const staggerParents = document.querySelectorAll('.stagger');
  staggerParents.forEach(parent => {
    const children = Array.from(parent.children);
    children.forEach((child, idx) => child.style.setProperty('--delay', `${idx * 60}ms`));
  });
}

function setupInteractions() {
  // Mobile nav toggle
  const toggle = document.querySelector(".nav__toggle");
  const menu = document.getElementById("nav-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      menu.classList.toggle("is-open");
    });
  }

  // Theme toggle
  const themeToggle = document.getElementById("theme-toggle");
  const root = document.documentElement;
  // Force light theme only
  root.classList.add('light');

  // Scroll reveal animations
  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }
  }, { threshold: 0.1 });
  revealEls.forEach(el => observer.observe(el));

  // Active nav highlight on scroll
  const sections = Array.from(document.querySelectorAll('main .section'));
  const navLinks = Array.from(document.querySelectorAll('.nav__menu a'));
  function setActive() {
    let currentId = '';
    const fromTop = window.scrollY + 120;
    for (const sec of sections) {
      if (sec.offsetTop <= fromTop) currentId = sec.id;
    }
    navLinks.forEach(link => {
      const href = link.getAttribute('href') || '';
      const id = href.startsWith('#') ? href.slice(1) : '';
      link.classList.toggle('active', id === currentId);
    });
  }
  setActive();
  window.addEventListener('scroll', setActive, { passive: true });

  // Typing effect
  const typingEl = document.getElementById('typing');
  const phrases = [
    'LLMs',
    'MLOps',
    'NLP',
    'Auto-triage',
    'Smart Reply',
    'Model Distillation',
    'Quantization'
  ];
  if (typingEl) {
    let p = 0, i = 0, deleting = false;
    function tick() {
      const full = phrases[p % phrases.length];
      if (!deleting) {
        i++;
      } else {
        i--;
      }
      typingEl.textContent = full.slice(0, Math.max(0, i));
      const atEnd = i === full.length;
      const atStart = i === 0;
      let delay = deleting ? 60 : 100;
      if (atEnd) { deleting = true; delay = 900; }
      if (atStart && deleting) { deleting = false; p++; delay = 400; }
      setTimeout(tick, delay);
    }
    tick();
  }

  // Particles background (lightweight)
  const canvas = document.getElementById('particles');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;
    function resize() {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    }
    window.addEventListener('resize', resize);
    const count = Math.min(100, Math.floor(width * height / 12000));
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 0.5
    }));
    function step() {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'rgba(91, 140, 255, 0.7)';
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      // connect near particles
      ctx.strokeStyle = 'rgba(34, 211, 238, 0.15)';
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d2 = dx*dx + dy*dy;
          if (d2 < 120 * 120) {
            const alpha = 1 - d2 / (120 * 120);
            ctx.globalAlpha = alpha * 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }
      requestAnimationFrame(step);
    }
    step();
  }

  // Global AI network background
  const bg = document.getElementById('bg-net');
  if (bg) {
    const ctx = bg.getContext('2d');
    function resizeBg() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      bg.width = Math.floor(bg.clientWidth * dpr);
      bg.height = Math.floor(bg.clientHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resizeBg();
    window.addEventListener('resize', resizeBg);

    const nodes = 120;
    const pts = Array.from({ length: nodes }, () => ({
      x: Math.random() * bg.clientWidth,
      y: Math.random() * bg.clientHeight,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2
    }));
    function renderBg() {
      ctx.clearRect(0, 0, bg.clientWidth, bg.clientHeight);
      // nodes
      ctx.fillStyle = 'rgba(79, 123, 255, 0.6)';
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > bg.clientWidth) p.vx *= -1;
        if (p.y < 0 || p.y > bg.clientHeight) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2); ctx.fill();
      }
      // edges
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i], b = pts[j];
          const dx = a.x - b.x, dy = a.y - b.y; const d2 = dx*dx + dy*dy;
          if (d2 < 140 * 140) {
            const alpha = 1 - d2 / (140 * 140);
            ctx.strokeStyle = `rgba(6, 182, 212, ${alpha * 0.35})`;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }
      requestAnimationFrame(renderBg);
    }
    renderBg();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  render();
  setupInteractions();
});


