/**
 * ANCHAL GUPTA - ULTRA-MODERN PORTFOLIO ENGINE
 * Positioning: AI/ML Engineer & Software Developer
 * Production & Vercel Deployment Ready
 */

document.addEventListener('DOMContentLoaded', () => {
  // 0. Initialize Theme Toggle (Light mode default)
  initThemeToggle();

  // 1. Initialize Neural Particle Canvas
  initNeuralCanvas();

  // 2. Scroll Progress Bar & Navigation ScrollSpy
  initScrollProgressAndNav();

  // 3. Dynamic Typing Effect in Hero
  initTypingEffect();

  // 4. 3D Interactive Card Tilt & Glow Reflection
  initCard3DTilt();

  // 5. Recruiter Role Spotlight Mode Switcher
  initRoleSpotlight();

  // 6. Project Category & Realtime Search Filtering
  initProjectFiltering();

  // 7. Project Technical Deep Dive Modal
  initProjectDeepDiveModal();

  // 8. Interactive Resume Modal
  initResumeModal();

  // 9. Mobile Drawer Menu
  initMobileMenu();

  // 10. Email Copy & Toast
  initEmailCopy();

  // 11. Contact Form Dispatcher
  initContactForm();

  // 12. Animated Stat Counters
  if (typeof initStatCounters === 'function') {
    initStatCounters();
  }

  // 13. Smooth Scroll Reveal & Interactive Motion
  initScrollReveal();
});

/* ==========================================================================
   1. HYPER-TECH NEURAL & CYBER PARTICLE CANVAS (SUBTLE AMBIENT BACKGROUND)
   ========================================================================== */
function initNeuralCanvas() {
  const canvas = document.getElementById('neural-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  let packets = [];
  
  let mouse = { x: null, y: null, radius: 140 };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });

  function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initScene();
  }

  function initScene() {
    particles = [];
    packets = [];

    const count = Math.floor((width * height) / 22000);
    const particleCount = Math.min(Math.max(count, 30), 65);

    // Nodes
    for (let i = 0; i < particleCount; i++) {
      const isHub = i % 8 === 0;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        size: isHub ? 2.5 : (Math.random() * 1.2 + 0.8),
        isHub: isHub,
        pulseRadius: 0,
        color: isHub ? 'rgba(6, 182, 212, 0.45)' : (Math.random() > 0.5 ? 'rgba(99, 102, 241, 0.35)' : 'rgba(34, 211, 238, 0.35)')
      });
    }
  }

  let lastPacketTime = 0;

  function animate(timestamp) {
    ctx.clearRect(0, 0, width, height);

    // 1. Spawn travelling data packets along lines
    if (timestamp - lastPacketTime > 900 && particles.length > 1) {
      lastPacketTime = timestamp;
      const startIdx = Math.floor(Math.random() * particles.length);
      for (let j = 0; j < particles.length; j++) {
        if (startIdx !== j) {
          const dx = particles[startIdx].x - particles[j].x;
          const dy = particles[startIdx].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            packets.push({
              x: particles[startIdx].x,
              y: particles[startIdx].y,
              targetX: particles[j].x,
              targetY: particles[j].y,
              progress: 0,
              speed: 0.015 + Math.random() * 0.015
            });
            break;
          }
        }
      }
    }

    // Update and draw packets
    for (let k = packets.length - 1; k >= 0; k--) {
      let pkt = packets[k];
      pkt.progress += pkt.speed;
      if (pkt.progress >= 1) {
        packets.splice(k, 1);
      } else {
        const curX = pkt.x + (pkt.targetX - pkt.x) * pkt.progress;
        const curY = pkt.y + (pkt.targetY - pkt.y) * pkt.progress;
        ctx.beginPath();
        ctx.arc(curX, curY, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = '#22d3ee';
        ctx.shadowColor = '#06b6d4';
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    // 3. Update & Draw Neural Nodes & Synapses
    for (let i = 0; i < particles.length; i++) {
      let p = particles[i];

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      // Mouse interactive deflection & attraction
      if (mouse.x && mouse.y) {
        let dx = mouse.x - p.x;
        let dy = mouse.y - p.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          let force = (mouse.radius - dist) / mouse.radius;
          p.x -= (dx / dist) * force * 1.5;
          p.y -= (dy / dist) * force * 1.5;

          // Draw laser line to cursor
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(6, 182, 212, ${(1 - dist / 120) * 0.35})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        }
      }

      // Draw Node
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();

      // Hub Node Concentric Pulse Rings
      if (p.isHub) {
        p.pulseRadius = (p.pulseRadius + 0.15) % 18;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size + p.pulseRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(6, 182, 212, ${(1 - p.pulseRadius / 18) * 0.4})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      // Connect Lines
      for (let j = i + 1; j < particles.length; j++) {
        let p2 = particles[j];
        let dx = p.x - p2.x;
        let dy = p.y - p2.y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 135) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          let opacity = (1 - dist / 135) * 0.28;
          ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
          ctx.lineWidth = 0.75;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
  requestAnimationFrame(animate);
}

/* ==========================================================================
   2. SCROLL PROGRESS BAR & NAVIGATION SCROLLSPY
   ========================================================================== */
function initScrollProgressAndNav() {
  const progressBar = document.getElementById('scroll-progress');
  const header = document.querySelector('.navbar-wrapper');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id], div[id="ai-projects"], div[id="software-projects"]');

  window.addEventListener('scroll', () => {
    // Top Progress Bar
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0 && progressBar) {
      const progress = (window.scrollY / totalHeight) * 100;
      progressBar.style.width = `${progress}%`;
    }

    // Header Background Elevation
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // ScrollSpy active link detection
    let current = '';
    const scrollPosition = window.scrollY + 200;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('data-section') === current || link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   3. DYNAMIC HERO TYPING EFFECT
   ========================================================================== */
function initTypingEffect() {
  const typingEl = document.getElementById('typing-text');
  if (!typingEl) return;

  const roles = [
    "AI/ML Engineering",
    "Generative AI & LLMs",
    "Full-Stack Software Dev",
    "RAG & Agent Systems",
    "FastAPI & Scalable Backends"
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typingDelay = 100;

  function type() {
    const currentRole = roles[roleIdx];

    if (isDeleting) {
      typingEl.textContent = currentRole.substring(0, charIdx - 1);
      charIdx--;
      typingDelay = 45;
    } else {
      typingEl.textContent = currentRole.substring(0, charIdx + 1);
      charIdx++;
      typingDelay = 110;
    }

    if (!isDeleting && charIdx === currentRole.length) {
      isDeleting = true;
      typingDelay = 1800; // Pause at end of word
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      typingDelay = 400; // Pause before typing next
    }

    setTimeout(type, typingDelay);
  }

  type();
}

/* ==========================================================================
   4. 3D INTERACTIVE CARD TILT & SPECULAR GLOW
   ========================================================================== */
function initCard3DTilt() {
  // Only enable on desktop pointer devices
  if (window.matchMedia('(hover: none)').matches) return;

  const tiltCards = document.querySelectorAll('.tilt-card');

  tiltCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });
}

/* ==========================================================================
   5. RECRUITER ROLE SPOTLIGHT MODE SWITCHER
   ========================================================================== */
function initRoleSpotlight() {
  const spotlightBtns = document.querySelectorAll('.spotlight-btn');
  const targetElements = document.querySelectorAll('[data-category]');

  spotlightBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      spotlightBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const mode = btn.getAttribute('data-spotlight');

      targetElements.forEach((el) => {
        const cat = el.getAttribute('data-category');
        if (mode === 'all') {
          el.style.opacity = '1';
          el.style.filter = 'none';
        } else if (mode === cat) {
          el.style.opacity = '1';
          el.style.filter = 'none';
        } else {
          el.style.opacity = '0.35';
          el.style.filter = 'grayscale(60%)';
        }
      });
    });
  });
}

/* ==========================================================================
   6. PROJECT CATEGORY & REALTIME SEARCH FILTERING
   ========================================================================== */
function initProjectFiltering() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const searchInput = document.getElementById('project-search-input');
  const projectCards = document.querySelectorAll('.project-card');
  const aiGroup = document.getElementById('ai-projects');
  const swGroup = document.getElementById('software-projects');
  const dataGroup = document.getElementById('data-projects');

  let activeCategory = 'all';

  function applyFilters() {
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

    projectCards.forEach((card) => {
      const cardCategory = card.getAttribute('data-category');
      const cardKeywords = (card.getAttribute('data-keywords') || '') + ' ' + card.innerText.toLowerCase();

      const matchesCat = activeCategory === 'all' || activeCategory === cardCategory;
      const matchesSearch = query === '' || cardKeywords.includes(query);

      if (matchesCat && matchesSearch) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });

    // Toggle group headers visibility based on filter
    if (aiGroup) {
      aiGroup.style.display = (activeCategory === 'software' || activeCategory === 'data') ? 'none' : 'block';
    }
    if (swGroup) {
      swGroup.style.display = (activeCategory === 'ai' || activeCategory === 'data') ? 'none' : 'block';
    }
    if (dataGroup) {
      dataGroup.style.display = (activeCategory === 'ai' || activeCategory === 'software') ? 'none' : 'block';
    }
  }

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.getAttribute('data-filter');
      applyFilters();

      if (activeCategory === 'ai' && aiGroup) {
        aiGroup.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else if (activeCategory === 'software' && swGroup) {
        swGroup.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else if (activeCategory === 'data' && dataGroup) {
        dataGroup.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', applyFilters);
  }
}



/* ==========================================================================
   8. MOBILE DRAWER NAVIGATION
   ========================================================================== */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!menuBtn || !mobileDrawer) return;

  menuBtn.addEventListener('click', () => {
    mobileDrawer.classList.toggle('open');
    const isOpen = mobileDrawer.classList.contains('open');
    menuBtn.innerHTML = isOpen 
      ? '<i class="fa-solid fa-xmark text-xl"></i>' 
      : '<i class="fa-solid fa-bars-staggered text-xl"></i>';
  });

  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => {
      mobileDrawer.classList.remove('open');
      menuBtn.innerHTML = '<i class="fa-solid fa-bars-staggered text-xl"></i>';
    });
  });
}



/* ==========================================================================
   10. CONTACT FORM DISPATCHER (MAILTO)
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('user-name')?.value || '';
    const email = document.getElementById('user-email')?.value || '';
    const subject = document.getElementById('user-subject')?.value || 'Portfolio Opportunity';
    const message = document.getElementById('user-message')?.value || '';

    const bodyContent = `Hi Anchal,%0D%0A%0D%0AMy Name: ${encodeURIComponent(name)}%0D%0AMy Email: ${encodeURIComponent(email)}%0D%0A%0D%0AMessage:%0D%0A${encodeURIComponent(message)}`;
    const mailtoUrl = `mailto:guptaanchal0321@gmail.com?subject=${encodeURIComponent(subject)}&body=${bodyContent}`;

    window.location.href = mailtoUrl;
  });
}

/* ==========================================================================
   11. INTERACTIVE RESUME MODAL & PRINT ENGINE
   ========================================================================== */
function initResumeModal() {
  const resumeModal = document.getElementById('resume-modal');
  const openResumeNavBtn = document.getElementById('open-resume-btn');
  const openResumeHeroBtn = document.getElementById('hero-resume-trigger');
  const closeResumeBtn = document.getElementById('close-resume-modal');
  const printResumeBtn = document.getElementById('print-resume-btn');
  const trackButtons = document.querySelectorAll('#resume-track-buttons .resume-tab-btn');
  const summaryText = document.getElementById('resume-summary-text');
  const projectsContainer = document.getElementById('resume-projects-container');
  const skillsText = document.getElementById('resume-skills-text');

  if (!resumeModal) return;

  function openModal() {
    resumeModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    resumeModal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  const closeResumeBottomBtn = document.getElementById('close-resume-bottom-btn');
  const printResumeBottomBtn = document.getElementById('print-resume-bottom-btn');

  if (openResumeNavBtn) openResumeNavBtn.addEventListener('click', openModal);
  if (openResumeHeroBtn) openResumeHeroBtn.addEventListener('click', openModal);
  if (closeResumeBtn) closeResumeBtn.addEventListener('click', closeModal);
  if (closeResumeBottomBtn) closeResumeBottomBtn.addEventListener('click', closeModal);

  resumeModal.addEventListener('click', (e) => {
    if (e.target === resumeModal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && resumeModal.classList.contains('active')) {
      closeModal();
    }
  });

  function triggerPrint() {
    window.print();
  }

  if (printResumeBtn) printResumeBtn.addEventListener('click', triggerPrint);
  if (printResumeBottomBtn) printResumeBottomBtn.addEventListener('click', triggerPrint);

  // Interactive Track Switcher Data
  const trackSummaries = {
    'all': 'Computer Science graduate specializing in Data Science with comprehensive hands-on experience across software engineering, artificial intelligence, machine learning, and data engineering. Progressed to Junior Software Engineer at GRX10 Solutions after developer internship, with AI research internship at UST Global and cloud data engineering internship at Tata Trent Limited.',
    'swe': 'Software Engineer specializing in scalable full-stack web applications, RESTful microservices, and backend automation. Production experience building reactive TypeScript/React frontends and high-performance FastAPI & PostgreSQL backends at GRX10 Solutions and commercial e-commerce deployments with automated PyTest & Playwright CI/CD test suites.',
    'aiml': 'AI/ML & Data Engineer with specialized expertise in Generative AI, Multi-Agent LangChain architectures, RAG retrieval pipelines (FAISS/Sentence-BERT), Multimodal Emotion Recognition research at UST Global, and enterprise ETL pipelines on Azure Data Factory and Databricks PySpark at Tata Trent Limited.'
  };

  const trackProjects = {
    'all': [
      {
        title: 'Enterprise AI Research Agent',
        desc: 'Autonomous multi-agent synthesis system using LangChain, Gemini API, Tavily & FAISS (< 4.2s latency).'
      },
      {
        title: 'Customer Support Automation Platform',
        desc: 'RAG pipeline with Sentence-BERT & FAISS on 10K+ support tickets with multi-task NLP categorization.'
      },
      {
        title: 'Indian Deepfake Face Detection (99.96% Acc)',
        desc: 'Deep learning CNN & XceptionNet71 classifier evaluated across 140K+ synthetic images with 100% TNR.'
      },
      {
        title: 'Pavithram Foods Production Website',
        desc: 'Live Next.js commercial platform with headless WordPress CMS, Cloudflare edge caching, and 100 Lighthouse score.'
      }
    ],
    'swe': [
      {
        title: 'Pavithram Foods Production Website',
        desc: 'Live Next.js commercial platform with headless WordPress CMS, Cloudflare edge caching, and 100 Lighthouse score.'
      },
      {
        title: 'Healthcare EHR Platform & APIs',
        desc: 'Scalable FastAPI backend & PostgreSQL schemas for medical record OCR workflows with PyTest & Playwright test suites.'
      },
      {
        title: 'Customer Support Automation Platform',
        desc: 'High-throughput FastAPI REST backend with asynchronous processing queues, sub-18ms vector retrieval, and Streamlit analytics.'
      },
      {
        title: 'Amivya Health Web Platform & WhatsApp Bot',
        desc: 'Full-stack healthcare web application, Meta Graph WhatsApp APIs, responsive UI engineering, and clinical workflows.'
      }
    ],
    'aiml': [
      {
        title: 'Enterprise AI Research Agent',
        desc: 'Autonomous multi-agent synthesis system using LangChain, Gemini API, Tavily & FAISS (< 4.2s latency).'
      },
      {
        title: 'Customer Support Automation Platform',
        desc: 'RAG pipeline with Sentence-BERT & FAISS on 10K+ support tickets with multi-task NLP categorization.'
      },
      {
        title: 'Indian Deepfake Face Detection (99.96% Acc)',
        desc: 'Deep learning CNN & XceptionNet71 classifier evaluated across 140K+ synthetic images with 100% TNR.'
      },
      {
        title: 'Enterprise ETL Data Warehouse & Analytics',
        desc: 'Automated Azure Data Factory & Databricks PySpark pipelines processing 1M+ records with star-schema Power BI dashboards.'
      }
    ]
  };

  const trackSkills = {
    'all': '<strong>Languages &amp; Core:</strong> Python, JavaScript, TypeScript, SQL, HTML/CSS, PySpark<br />' +
      '<strong>Frameworks &amp; Backend:</strong> FastAPI, React, Next.js, Django, Node.js, REST APIs, Tailwind CSS<br />' +
      '<strong>AI/ML &amp; Data:</strong> LangChain, RAG, FAISS, Sentence-BERT, Gemini API, OpenCV, YOLOv11, PyTorch, Azure Data Factory, Power BI<br />' +
      '<strong>Databases &amp; DevOps:</strong> PostgreSQL, MySQL, SQLite, Docker, Git/GitHub, Cloudflare Pages, PyTest, Playwright',
    'swe': '<strong>Languages &amp; Core:</strong> Python, JavaScript, TypeScript, SQL, HTML5, CSS3/Tailwind, Bash<br />' +
      '<strong>Frameworks &amp; Full-Stack:</strong> FastAPI, React, Next.js, Django, Node.js, RESTful APIs, State Management<br />' +
      '<strong>Databases &amp; Architecture:</strong> PostgreSQL, MySQL, SQLite, Redis, Microservices, System Design, Schema Design<br />' +
      '<strong>DevOps &amp; Testing:</strong> Docker, Git/GitHub, Cloudflare Pages, CI/CD, PyTest, Playwright End-to-End Testing',
    'aiml': '<strong>AI, LLMs &amp; Agents:</strong> LangChain, Multi-Agent Systems, RAG Pipelines, Sentence-BERT, Gemini API, HuggingFace<br />' +
      '<strong>Deep Learning &amp; CV:</strong> PyTorch, OpenCV, YOLOv11, MTCNN, XceptionNet71, CNNs, Multimodal Emotion Pipelines<br />' +
      '<strong>Data &amp; Cloud Engineering:</strong> Azure Data Factory, Databricks PySpark, Azure SQL, FAISS Vector Search, Power BI, ETL/ELT<br />' +
      '<strong>Backend &amp; Tools:</strong> Python, SQL, FastAPI, Streamlit, Docker, PostgreSQL, Git/GitHub'
  };

  function renderTrackProjects(track) {
    if (!projectsContainer) return;
    const projects = trackProjects[track] || trackProjects['all'];
    projectsContainer.innerHTML = projects.map(p => `
      <div class="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
        <strong class="text-slate-900 block font-semibold mb-0.5">${p.title}</strong>
        <p class="resume-entry-body">${p.desc}</p>
      </div>
    `).join('');
  }

  trackButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      trackButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const track = btn.getAttribute('data-track');
      
      // Update Summary
      if (summaryText && trackSummaries[track]) {
        summaryText.textContent = trackSummaries[track];
      }

      // Update Featured Projects
      renderTrackProjects(track);

      // Update Technical Skills
      if (skillsText && trackSkills[track]) {
        skillsText.innerHTML = trackSkills[track];
      }
    });
  });
}

/* ==========================================================================
   8. INTERACTIVE PROJECT TECHNICAL DEEP DIVE MODAL
   ========================================================================== */
function initProjectDeepDiveModal() {
  const modal = document.getElementById('project-deep-dive-modal');
  const modalContent = document.getElementById('deep-dive-modal-content');
  const closeBtn = document.getElementById('close-deep-dive-modal');
  const triggerBtns = document.querySelectorAll('.view-deep-dive-btn');

  if (!modal || !modalContent) return;

  const projectDetails = {
    'research-agent': {
      title: 'Enterprise AI Research Agent',
      subtitle: 'Autonomous Multi-Agent System for Deep Research Synthesis',
      badge: 'Multi-Agent System · LangChain · FAISS',
      metrics: [
        { value: '< 4.2s', label: 'End-to-End Synthesis Latency' },
        { value: '3-Way', label: 'Agent Tool Routing (Tavily, FAISS, LLM)' },
        { value: '100%', label: 'Deterministic Rate-Limit Backoff' },
        { value: 'SQLite', label: 'Transactional State Machine' }
      ],
      architecture: [
        { name: '1. User Query', desc: 'Streamlit Interface' },
        { name: '2. FastAPI Supervisor', desc: 'Agent Graph Controller' },
        { name: '3. Tavily Web Agent', desc: 'Real-time Search Extraction' },
        { name: '4. FAISS Retriever', desc: 'Vector Context Embeddings' },
        { name: '5. Gemini 1.5 Pro', desc: 'Grounded Markdown Report Synthesis' }
      ],
      tradeoffs: [
        '<strong>Rate-Limit Resilience:</strong> Implemented exponential backoff with jitter on Gemini API calls, preventing 429 Resource Exhausted failures during concurrent research queries.',
        '<strong>State Persistence vs Memory Footprint:</strong> Chose lightweight SQLite state tracking over external Redis clusters for zero-dependency container deployment.',
        '<strong>Deterministic Grounding:</strong> Added cross-source citation validation to ensure all synthesized claims are directly anchored in scraped Tavily URLs or FAISS vector chunks.'
      ],
      liveUrl: 'https://enterprise-research-agent-nzp42bp4cvdaeaaoybprqi.streamlit.app/',
      liveLabel: 'Launch Live App',
      githubUrl: 'https://github.com/Anchalgupta1321/enterprise-research-agent',
      stack: ['Python', 'LangChain', 'Gemini API', 'Tavily API', 'FastAPI', 'Streamlit', 'FAISS', 'SQLite']
    },
    'support-rag': {
      title: 'Customer Support Automation Platform',
      subtitle: 'RAG-Powered Intelligent Ticket Classification & Resolution Pipeline',
      badge: 'NLP & Vector Search · 10K+ Tickets',
      metrics: [
        { value: '10,000+', label: 'Support Tickets Processed' },
        { value: '< 18ms', label: 'FAISS Vector Search Latency' },
        { value: '94.2%', label: 'Automated Classification Precision' },
        { value: '10+ KPIs', label: 'Live Streamlit Analytics Dashboard' }
      ],
      architecture: [
        { name: '1. Ingest Ticket', desc: 'REST API Payload' },
        { name: '2. Multi-Task NLP', desc: 'Transformer NER & Category Tagging' },
        { name: '3. Sentence-BERT', desc: '384-Dim Dense Embeddings' },
        { name: '4. FAISS IndexFlatIP', desc: 'Cosine Similarity Nearest Neighbors' },
        { name: '5. Grounded Generator', desc: 'Historical Solution Resolution' }
      ],
      tradeoffs: [
        '<strong>Vector Index Selection:</strong> Utilized FAISS IndexFlatIP with normalized vectors for exact cosine similarity without quantization loss at 10K ticket scale.',
        '<strong>Hallucination Guardrails:</strong> Set strict 0.75 cosine confidence thresholds before returning automated historical resolutions, routing uncertain queries to human agents.',
        '<strong>Asynchronous Processing:</strong> Decoupled ticket intake from heavy transformer inference via background worker queues to achieve <50ms API response time.'
      ],
      githubUrl: 'https://github.com/Anchalgupta1321/customer-support-ai',
      stack: ['Python', 'FastAPI', 'RAG', 'Sentence-BERT', 'FAISS', 'Transformers', 'Streamlit', 'PostgreSQL']
    },
    'deepfake-detection': {
      title: 'Indian Deepfake Human Face Detection',
      subtitle: 'High-Precision Deep Learning Classifier on 140K+ Synthetic Images',
      badge: 'Computer Vision · 99.96% Accuracy · 100% TNR',
      metrics: [
        { value: '140,000+', label: 'Indian Faces Curated Dataset' },
        { value: '99.96%', label: 'Classification Accuracy' },
        { value: '100%', label: 'True Negative Rate (Zero False Positives)' },
        { value: 'YOLOv11', label: 'Facial Landmark Extraction' }
      ],
      architecture: [
        { name: '1. Input Image / Video', desc: 'High-Resolution Visual Media' },
        { name: '2. MTCNN / YOLOv11', desc: 'Facial Bounding Box & Alignment' },
        { name: '3. Artifact Extractor', desc: 'Frequency & Texture Domain Analysis' },
        { name: '4. XceptionNet71', desc: 'Deep Feature Representation' },
        { name: '5. Binary Classifier', desc: 'Real vs Synthetic Probability Output' }
      ],
      tradeoffs: [
        '<strong>Synthetic Dataset Diversity:</strong> Curated 140K+ Indian face images generated across multiple Stable Diffusion checkpoints to eliminate demographic training bias.',
        '<strong>Architecture Benchmarking:</strong> Evaluated Custom CNN vs ResNet vs XceptionNet71, finding XceptionNet separable convolutions yielded superior subtle artifact detection.',
        '<strong>Inference Optimization:</strong> Applied TensorRT batch quantization allowing real-time video stream inspection at 45 FPS.'
      ],
      githubUrl: 'https://github.com/Anchalgupta1321/DeepFake-Detection',
      stack: ['Python', 'YOLOv11', 'MTCNN', 'XceptionNet71', 'Custom CNN', 'Stable Diffusion', 'OpenCV']
    },
    'crowd-forecasting': {
      title: 'Crowd Behavior Analysis & Forecasting',
      subtitle: 'Spatio-Temporal Crowd Detection, Anomaly Tracking & GAN Simulation',
      badge: 'Deep Learning & Spatial Simulation · +20–25% Accuracy',
      metrics: [
        { value: '+25%', label: 'Forecasting Accuracy Lift' },
        { value: 'Dense Flow', label: 'Optical Flow & Trajectory Prediction' },
        { value: 'LSTM', label: 'Temporal Sequence Memory' },
        { value: 'cGAN', label: 'Stress Simulation Generator' }
      ],
      architecture: [
        { name: '1. Surveillance Feed', desc: 'High-Density Video Stream' },
        { name: '2. YOLO + ResNet-50', desc: 'Pedestrian Density Spatial Grid' },
        { name: '3. Temporal LSTM', desc: 'Trajectory & Velocity Vector Modeling' },
        { name: '4. Conditional GAN', desc: 'Bottleneck & Stampede Simulation' },
        { name: '5. Anomaly Alert', desc: 'Real-time Density Thresholding' }
      ],
      tradeoffs: [
        '<strong>Spatio-Temporal Fusion:</strong> Combined spatial CNN bounding boxes with temporal LSTM recurrence to distinguish intentional queueing from chaotic congestion.',
        '<strong>Generative Stress Modeling:</strong> Used Conditional GANs to simulate dangerous bottleneck scenarios without needing real-world emergency datasets.'
      ],
      stack: ['Python', 'YOLO', 'ResNet-50', 'LSTM', 'Conditional GAN', 'PyTorch', 'Computer Vision']
    },
    'healthcare-ehr': {
      title: 'Healthcare Information Management Platform',
      subtitle: 'Digital Healthcare & Electronic Health Record (EHR) Backend with OCR',
      badge: 'Full-Stack EHR & OCR · PyTest & Playwright',
      metrics: [
        { value: '< 120ms', label: 'EHR REST API Response' },
        { value: '98.5%', label: 'OCR Medical Field Extraction' },
        { value: '100%', label: 'PyTest & Playwright Coverage' },
        { value: 'PostgreSQL', label: 'Relational Clinical Data Schema' }
      ],
      architecture: [
        { name: '1. Medical Record Scan', desc: 'PDF / Image Ingestion' },
        { name: '2. OCR Pipeline', desc: 'Tesseract & Layout Parser' },
        { name: '3. FastAPI Backend', desc: 'Validation & Domain Services' },
        { name: '4. PostgreSQL DB', desc: 'HIPAA-Compliant Encrypted Schema' },
        { name: '5. Clinical UI', desc: 'Doctor & Patient Record Portal' }
      ],
      tradeoffs: [
        '<strong>OCR Data Cleansing:</strong> Implemented regex & domain lexicon parsing to normalize doctor handwriting artifacts into clean structured ICD/dosage codes.',
        '<strong>Reliability & Testing:</strong> Built comprehensive automated e2e testing with Playwright and API unit testing with PyTest across all clinical record workflows.'
      ],
      stack: ['Python', 'FastAPI', 'PostgreSQL', 'REST APIs', 'OCR', 'PyTest', 'Playwright', 'Docker']
    },
    'pavithram-foods': {
      title: 'Pavithram Foods — Official Business Website',
      subtitle: 'Production Commercial Website & Headless CMS Architecture',
      badge: 'Production Live Website · Next.js · Cloudflare Pages',
      metrics: [
        { value: '100 / 100', label: 'Google Lighthouse Performance' },
        { value: '< 50ms', label: 'Global Edge TTFB via Cloudflare' },
        { value: 'Headless', label: 'WordPress CMS Integration' },
        { value: '0 Downtime', label: 'Production Continuous Deployment' }
      ],
      architecture: [
        { name: '1. Next.js App', desc: 'React SSR / Static Generation' },
        { name: '2. Headless WordPress', desc: 'REST API Content Layer' },
        { name: '3. Cloudflare Pages', desc: 'Edge CDN & SSL Acceleration' },
        { name: '4. Client Browser', desc: 'Blazing Fast E-Commerce Catalog' }
      ],
      tradeoffs: [
        '<strong>Headless Decoupling:</strong> Allowed marketing non-technical staff to update food catalog via WordPress while delivering sub-second Next.js edge performance to visitors.',
        '<strong>Edge Caching:</strong> Configured Cloudflare CDN caching rules for static assets while keeping cart and inquiry endpoints dynamic.'
      ],
      liveUrl: 'https://www.pavithramfoods.com/',
      liveLabel: 'Visit Official Website',
      stack: ['Next.js', 'React', 'TypeScript', 'WordPress CMS', 'Cloudflare Pages', 'Tailwind CSS']
    },
    'amivya-health': {
      title: 'Amivya Health Platform & WhatsApp Bot Engine',
      subtitle: 'Healthcare Technology Web Platform & Automated Patient WhatsApp Gateway',
      badge: 'Healthcare Tech · FastAPI · Async WhatsApp CRM',
      metrics: [
        { value: '< 45ms', label: 'WhatsApp Webhook Latency' },
        { value: '24 / 7', label: 'Automated Patient Triage' },
        { value: 'PostgreSQL', label: 'Patient Session & History DB' },
        { value: 'Next.js', label: 'Clinical Provider Dashboard' }
      ],
      architecture: [
        { name: '1. WhatsApp Message', desc: 'Meta Graph API Webhook' },
        { name: '2. FastAPI CRM Engine', desc: 'Async Webhook Dispatcher' },
        { name: '3. Patient Context Service', desc: 'Historical Record Retrieval' },
        { name: '4. AI Triage Service', desc: 'Clinical Intent Classification' },
        { name: '5. WhatsApp Response', desc: 'Instant Patient Care Guidance' }
      ],
      tradeoffs: [
        '<strong>Async Webhook Architecture:</strong> Dispatched AI clinical response tasks to BackgroundTasks so WhatsApp webhooks return 200 OK in under 45ms, eliminating Meta timeout retries.',
        '<strong>Session Memory:</strong> Maintained continuous patient session contexts in PostgreSQL to allow natural multi-turn conversations for appointment booking and symptom check.'
      ],
      stack: ['Python', 'FastAPI', 'React', 'Next.js', 'PostgreSQL', 'WhatsApp Meta API', 'REST APIs']
    },
    'etl-warehouse': {
      title: 'Enterprise ETL Data Warehouse',
      subtitle: 'Automated Cloud Data Ingestion, Databricks Delta Lake & Power BI Analytics',
      badge: 'Cloud Data Engineering · 1M+ Records · 30% Acceleration',
      metrics: [
        { value: '1,000,000+', label: 'Enterprise Transaction Records' },
        { value: '~30%', label: 'Processing & Reporting Time Cut' },
        { value: 'Azure ADF', label: 'Automated Ingestion Triggers' },
        { value: 'Power BI', label: 'Executive Analytics Dashboards' }
      ],
      architecture: [
        { name: '1. Source OLTP Data', desc: 'Enterprise Retail Transactions' },
        { name: '2. Azure Data Factory', desc: 'Automated Pipeline Orchestration' },
        { name: '3. Azure Databricks', desc: 'PySpark Cleansing & Delta Lake Merge' },
        { name: '4. Azure SQL DW', desc: 'Normalized Star Schema Warehouse' },
        { name: '5. Power BI', desc: 'Executive Revenue & Inventory Dashboards' }
      ],
      tradeoffs: [
        '<strong>Incremental CDC Loading:</strong> Replaced full table reloads with Change Data Capture (CDC) delta processing in PySpark, reducing pipeline compute runtime by ~30%.',
        '<strong>Star Schema Optimization:</strong> Engineered columnar indexing and partition keys on transaction dates in Azure SQL DW for sub-second analytical aggregations.'
      ],
      stack: ['Azure Data Factory', 'Azure Databricks', 'PySpark', 'Azure SQL DW', 'ETL / ELT', 'Power BI']
    },
    'resume-analyzer': {
      title: 'AI Resume Analyzer & Screening System',
      subtitle: 'Automated Resume Parsing, Skill Extraction & Candidate Ranking Pipeline',
      badge: 'AI & Automation · 500+ Resumes · 40–50% Time Reduction',
      metrics: [
        { value: '500+', label: 'Candidate Resumes Evaluated' },
        { value: '40–50%', label: 'Recruiter Screening Time Saved' },
        { value: 'Google Drive API', label: 'Automated Batch Ingestion' },
        { value: 'FastAPI', label: 'Structured Qualification API' }
      ],
      architecture: [
        { name: '1. Resume PDF / Docx', desc: 'Google Drive Batch Folder' },
        { name: '2. Document Parser', desc: 'PyPDF2 & Text Extraction' },
        { name: '3. NLP Entity Extractor', desc: 'Skill & Experience Taxonomy' },
        { name: '4. Scoring Engine', desc: 'Job Description Fit Benchmark' },
        { name: '5. Recruiter Dashboard', desc: 'Ranked Candidate Overview' }
      ],
      tradeoffs: [
        '<strong>Fuzzy Skill Matching:</strong> Combined exact dictionary lookup with Sentence-BERT embeddings to match synonymous skills (e.g. "ReactJS" = "React.js" = "React").',
        '<strong>Batch Ingestion:</strong> Automated Google Drive webhook listening so newly uploaded applicant folders are screened in parallel without manual recruiter trigger.'
      ],
      liveUrl: 'https://ai-resume-insights-prz6.onrender.com/',
      liveLabel: 'Launch Live App',
      githubUrl: 'https://github.com/Anchalgupta1321/ai_resume_insights',
      stack: ['Python', 'NLP', 'FastAPI', 'Google Drive API', 'Sentence-BERT', 'Automation']
    }
  };

  function openProjectModal(projectId) {
    const data = projectDetails[projectId] || projectDetails['research-agent'];

    let metricsHtml = data.metrics.map(m => `
      <div class="stat-pill">
        <span class="stat-value text-gradient-dual">${m.value}</span>
        <span class="stat-label">${m.label}</span>
      </div>
    `).join('');

    let archHtml = data.architecture.map((node, i) => `
      <div class="arch-node">
        <div>
          <strong class="text-cyan-300 block text-[11px]">${node.name}</strong>
          <span class="text-slate-400 text-[10px]">${node.desc}</span>
        </div>
      </div>
      ${i < data.architecture.length - 1 ? '<span class="arch-arrow">→</span>' : ''}
    `).join('');

    let tradeoffsHtml = data.tradeoffs.map(t => `
      <li class="flex items-start gap-2.5 text-xs text-slate-300 mb-2 leading-relaxed">
        <i class="fa-solid fa-microchip text-indigo-400 mt-1 text-[11px] flex-shrink-0"></i>
        <div>${t}</div>
      </li>
    `).join('');

    let stackHtml = data.stack.map(s => `
      <span class="tag tag-cyan">${s}</span>
    `).join('');

    modalContent.innerHTML = `
      <div class="pb-4 border-b border-slate-800">
        <div class="flex items-center gap-2 mb-1.5 flex-wrap">
          <span class="badge-pill badge-ai">${data.badge}</span>
        </div>
        <h3 class="font-outfit font-black text-xl sm:text-2xl text-white">${data.title}</h3>
        <p class="text-xs sm:text-sm text-indigo-300 font-mono mt-1">${data.subtitle}</p>
      </div>

      <!-- Quick Metrics Grid -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 my-4">
        ${metricsHtml}
      </div>

      <!-- Interactive System Architecture Visual -->
      <div class="my-4">
        <h4 class="font-outfit font-bold text-white text-xs tracking-wider uppercase mb-2 flex items-center gap-1.5">
          <i class="fa-solid fa-diagram-project text-cyan-400"></i> System Architecture &amp; Data Pipeline Flow
        </h4>
        <div class="arch-visual-container flex flex-wrap items-center justify-between gap-2 overflow-x-auto">
          ${archHtml}
        </div>
      </div>

      <!-- Engineering Trade-offs & Challenges Overcome -->
      <div class="my-4">
        <h4 class="font-outfit font-bold text-white text-xs tracking-wider uppercase mb-2 flex items-center gap-1.5">
          <i class="fa-solid fa-shield-halved text-purple-400"></i> Key Technical Challenges &amp; Design Decisions
        </h4>
        <ul class="highlight-list bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/80">
          ${tradeoffsHtml}
        </ul>
      </div>

      <!-- Tech Stack & Actions -->
      <div class="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
        <div class="flex flex-wrap gap-1.5">
          ${stackHtml}
        </div>
        <div class="flex items-center gap-2 flex-wrap">
          ${data.liveUrl ? `
            <a href="${data.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-xs btn-primary">
              <i class="fa-solid fa-arrow-up-right-from-square"></i> ${data.liveLabel || 'Live Demo'}
            </a>
          ` : ''}
          ${data.githubUrl ? `
            <a href="${data.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-xs btn-glass">
              <i class="fa-brands fa-github text-purple-400"></i> View on GitHub
            </a>
          ` : ''}
          <a href="#contact" class="btn btn-xs btn-secondary" onclick="document.getElementById('project-deep-dive-modal').classList.remove('active'); document.body.style.overflow='auto';">
            <i class="fa-solid fa-paper-plane"></i> Discuss This Project
          </a>
        </div>
      </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  // Trigger buttons
  triggerBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project-id');
      openProjectModal(projectId);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeProjectModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeProjectModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeProjectModal();
    }
  });
}

/* ==========================================================================
   13. SCROLL REVEAL (INTERSECTION OBSERVER)
   ========================================================================== */
function initScrollReveal() {
  const elementsToReveal = document.querySelectorAll(
    'section > div, .project-card, .glass-card, .hero-portrait-card-container, .timeline-item'
  );

  elementsToReveal.forEach((el) => {
    if (!el.closest('.modal-backdrop')) {
      el.classList.add('reveal-on-scroll');
    }
  });

  if (!('IntersectionObserver' in window)) {
    elementsToReveal.forEach((el) => el.classList.add('revealed'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          obs.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.08,
      rootMargin: '0px 0px -25px 0px'
    }
  );

  elementsToReveal.forEach((el) => {
    observer.observe(el);
  });
}

/* ==========================================================================
   14. SMOOTH SCROLL TO ANCHORS & FLOATING BACK TO TOP
   ========================================================================== */
function initSmoothScrollAndBackToTop() {
  const backToTopBtn = document.getElementById('floating-back-to-top');

  // Floating Back-to-Top visibility toggle
  window.addEventListener('scroll', () => {
    if (window.scrollY > 380) {
      backToTopBtn?.classList.add('visible');
    } else {
      backToTopBtn?.classList.remove('visible');
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Smooth scroll with fixed header offset for all internal anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 72;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        // Close mobile drawer if open
        const mobileDrawer = document.getElementById('mobile-drawer');
        if (mobileDrawer && mobileDrawer.classList.contains('open')) {
          mobileDrawer.classList.remove('open');
        }
      }
    });
  });
}

/* ==========================================================================
   15. TOAST NOTIFICATION SYSTEM
   ========================================================================== */
function showToast(message, isSuccess = true) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-message');
  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  const icon = toast.querySelector('i');
  if (icon) {
    if (isSuccess) {
      icon.className = 'fa-solid fa-circle-check text-emerald-400';
    } else {
      icon.className = 'fa-solid fa-circle-exclamation text-rose-400';
    }
  }

  toast.classList.add('show');
  
  if (window.toastTimeout) {
    clearTimeout(window.toastTimeout);
  }
  
  window.toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3800);
}

/* ==========================================================================
   16. EMAIL COPY TO CLIPBOARD
   ========================================================================== */
function initEmailCopy() {
  const copyBtn = document.getElementById('copy-email-btn');
  if (!copyBtn) return;

  copyBtn.addEventListener('click', async () => {
    const email = copyBtn.getAttribute('data-email') || 'guptaanchal0321@gmail.com';
    const badge = copyBtn.querySelector('.contact-card-badge');
    const originalBadge = badge ? badge.innerHTML : '<i class="fa-regular fa-copy"></i> Copy Email';

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = email;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }

      if (badge) {
        badge.innerHTML = '<i class="fa-solid fa-check text-emerald-500"></i> Copied!';
      }
      showToast('Copied email: ' + email, true);

      setTimeout(() => {
        if (badge) {
          badge.innerHTML = originalBadge;
        }
      }, 2500);
    } catch (err) {
      window.location.href = 'mailto:' + email;
    }
  });
}

/* ==========================================================================
   17. ASYNC WEB3FORMS CONTACT FORM DISPATCHER
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const submitBtn = document.getElementById('contact-submit-btn');
  const btnIcon = document.getElementById('submit-btn-icon');
  const btnText = document.getElementById('submit-btn-text');
  const statusMsg = document.getElementById('form-feedback-status');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!submitBtn) return;

    // Loading UI state
    submitBtn.disabled = true;
    if (btnIcon) btnIcon.className = 'fa-solid fa-circle-notch fa-spin';
    if (btnText) btnText.textContent = 'Sending message...';
    if (statusMsg) {
      statusMsg.className = 'text-xs font-mono text-center pt-1 text-slate-400 block';
      statusMsg.textContent = 'Transmitting direct message to Anchal...';
    }

    const formData = new FormData(form);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (response.status === 200 && data.success) {
        showToast('Message sent! Anchal will get back to you shortly.', true);
        if (statusMsg) {
          statusMsg.className = 'text-xs font-mono text-center pt-1 text-emerald-400 font-bold block';
          statusMsg.textContent = '✓ Message sent successfully to Anchal\'s inbox!';
        }
        form.reset();
      } else {
        throw new Error(data.message || 'Submission failed');
      }
    } catch (err) {
      console.warn('Web3Forms dispatch fallback:', err);
      showToast('Notice: Opening your email client to send...', false);
      if (statusMsg) {
        statusMsg.className = 'text-xs font-mono text-center pt-1 text-cyan-400 block';
        statusMsg.textContent = 'Opening default email application...';
      }
      // Fallback to mailto
      const name = document.getElementById('user-name')?.value || '';
      const email = document.getElementById('user-email')?.value || '';
      const phone = document.getElementById('user-phone')?.value || '';
      const topic = document.getElementById('user-subject')?.value || 'Portfolio Inquiry';
      const msg = document.getElementById('user-message')?.value || '';
      
      const mailtoUrl = `mailto:guptaanchal0321@gmail.com?subject=${encodeURIComponent(topic)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${msg}`)}`;
      window.open(mailtoUrl, '_blank');
    } finally {
      // Restore submit button state
      submitBtn.disabled = false;
      if (btnIcon) btnIcon.className = 'fa-solid fa-paper-plane';
      setTimeout(() => {
        if (statusMsg) {
          statusMsg.classList.add('hidden');
        }
      }, 6000);
    }
  });
}

/* ==========================================================================
   18. LIGHT THEME ENFORCEMENT
   ========================================================================== */
function initThemeToggle() {
  document.documentElement.setAttribute('data-theme', 'light');
  localStorage.setItem('portfolio-theme', 'light');
}



