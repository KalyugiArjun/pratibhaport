/**
 * Pratibha Dwivedi - Minimal & Interactive Portfolio Logic
 * With Direct WhatsApp Integration, Real Project Previews & Smooth UX
 */

document.addEventListener('DOMContentLoaded', () => {
  if (typeof PORTFOLIO_DATA === 'undefined') {
    console.error('Portfolio data not found.');
    return;
  }

  const data = PORTFOLIO_DATA;

  // Initialize Modules
  initTheme();
  initMobileNav();
  initTypingEffect(data.profile.typedTitles);
  renderStats(data.stats);
  renderProjects(data.projects);
  renderSkills(data.skills);
  renderTimeline(data.experiences);
  initTimelineScroll();
  initModal(data.projects);
  initWhatsAppContactForm();
  initCopyActions();
  initScrollSpy();
  initBackToTop();
  bindResumeLinks(data.profile.resumeUrl);
});

/* ==========================================================================
   THEME TOGGLE
   ========================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const savedTheme = localStorage.getItem('pratibha_portfolio_theme') || 'dark';

  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('pratibha_portfolio_theme', newTheme);
      updateThemeIcon(newTheme);
      showToast(`Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} mode`);
    });
  }
}

function updateThemeIcon(theme) {
  const btn = document.getElementById('themeToggleBtn');
  if (!btn) return;

  if (theme === 'light') {
    btn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    `;
    btn.setAttribute('aria-label', 'Switch to Dark Mode');
  } else {
    btn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
    `;
    btn.setAttribute('aria-label', 'Switch to Light Mode');
  }
}

/* ==========================================================================
   MOBILE NAVIGATION
   ========================================================================== */
function initMobileNav() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (menuBtn && navMenu) {
    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      navMenu.classList.toggle('active');
      const isOpen = navMenu.classList.contains('active');
      menuBtn.setAttribute('aria-expanded', isOpen);
      menuBtn.innerHTML = isOpen
        ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
        : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
      });
    });

    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !menuBtn.contains(e.target)) {
        navMenu.classList.remove('active');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
      }
    });
  }

  const siteHeader = document.getElementById('siteHeader');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  });
}

/* ==========================================================================
   ANIMATED TYPING EFFECT
   ========================================================================== */
function initTypingEffect(words) {
  const typedEl = document.getElementById('typedText');
  if (!typedEl || !words || !words.length) return;

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 80;

  function type() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
      typedEl.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 40;
    } else {
      typedEl.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 80;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      typeSpeed = 1500;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 350;
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

/* ==========================================================================
   METRICS & STATS
   ========================================================================== */
function renderStats(stats) {
  const container = document.getElementById('statsContainer');
  if (!container || !stats) return;

  container.innerHTML = stats.map(stat => `
    <div class="stat-item">
      <div class="stat-value">${stat.value}</div>
      <div class="stat-label">${stat.label}</div>
    </div>
  `).join('');
}

/* ==========================================================================
   PROJECTS RENDERING WITH REAL IMAGES
   ========================================================================== */
function renderProjects(projects) {
  const container = document.getElementById('projectsGrid');
  if (!container || !projects) return;

  container.innerHTML = projects.map(project => `
    <article class="project-card" data-project-id="${project.id}">
      <div class="project-image-box">
        <img src="${project.image}" alt="${project.title}" class="project-img-thumb" loading="lazy">
        <div class="project-category-overlay">${project.subtitle}</div>
      </div>
      <div class="project-body">
        <h3 class="project-title">${project.title}</h3>
        <div class="project-tagline">${project.tagline}</div>
        <p class="project-desc">${project.shortDescription}</p>
        <div class="tech-pills">
          ${project.techStack.map(t => `<span class="tech-pill">${t}</span>`).join('')}
        </div>
        <div class="project-actions">
          <button class="project-btn-detail btn-open-modal" data-id="${project.id}">
            <span>Case Study</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </button>
          <div class="project-links-right">
            <a href="${project.githubUrl}" class="icon-btn-circle" title="View Source on GitHub" target="_blank" rel="noopener">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            </a>
            <a href="${project.liveUrl}" class="icon-btn-circle" title="Live Preview" target="_blank" rel="noopener">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            </a>
          </div>
        </div>
      </div>
    </article>
  `).join('');
}

/* ==========================================================================
   SKILLS RENDERING (CLEAN CHIPS)
   ========================================================================== */
function renderSkills(skills) {
  const container = document.getElementById('skillsGrid');
  if (!container || !skills) return;

  container.innerHTML = skills.map(skill => `
    <div class="skill-chip">
      <div class="skill-chip-icon">
        ${getSkillIconSvg(skill.icon)}
      </div>
      <span>${skill.name}</span>
    </div>
  `).join('');
}

function getSkillIconSvg(iconType) {
  switch (iconType) {
    case 'react':
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="2"></circle><ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(30 12 12)"></ellipse><ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(90 12 12)"></ellipse><ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(150 12 12)"></ellipse></svg>`;
    case 'node':
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg>`;
    case 'js':
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"></rect><path d="M16 8v8"></path><path d="M12 16c-1.5 0-2-1-2-2"></path></svg>`;
    case 'mongodb':
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2C8 6 6 11 6 15a6 6 0 0 0 12 0c0-4-2-9-6-13z"></path><path d="M12 2v20"></path></svg>`;
    case 'tailwind':
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 14c2.5-4 5.5-4 8 0 2.5 4 5.5 4 8 0"></path><path d="M4 8c2.5-4 5.5-4 8 0 2.5 4 5.5 4 8 0"></path></svg>`;
    case 'git':
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="18" r="3"></circle><circle cx="6" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><path d="M6 9v6"></path><path d="M9 6h4a5 5 0 0 1 5 5v4"></path></svg>`;
    case 'api':
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2"></rect><path d="M9 9h6"></path><path d="M9 13h6"></path><path d="M9 17h4"></path></svg>`;
    case 'shield':
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`;
    case 'cloud':
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path></svg>`;
    default:
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 14 14"></polyline></svg>`;
  }
}

/* ==========================================================================
   EXPERIENCE TIMELINE WITH SCROLL PROGRESS
   ========================================================================== */
function renderTimeline(experiences) {
  const container = document.getElementById('experienceTimeline');
  if (!container || !experiences) return;

  const itemsHtml = experiences.map((exp, idx) => `
    <div class="timeline-item ${idx === 0 ? 'active' : ''}" data-index="${idx}">
      <div class="timeline-dot-marker"></div>
      <div class="timeline-card">
        <div class="timeline-top-row">
          <div>
            <h3 class="timeline-role-title">${exp.role}</h3>
            <div class="timeline-company">${exp.company}</div>
          </div>
          <span class="timeline-badge">${exp.badge}</span>
        </div>
        <div class="timeline-period">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:14px;height:14px;"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          <span>${exp.period}</span>
        </div>
        <ul class="timeline-bullets">
          ${exp.bullets.map(b => `<li>${b}</li>`).join('')}
        </ul>
        <div class="tech-pills">
          ${exp.tech.map(t => `<span class="tech-pill">${t}</span>`).join('')}
        </div>
      </div>
    </div>
  `).join('');

  container.innerHTML = `<div class="timeline-scroll-progress" id="timelineProgress"></div>` + itemsHtml;
}

function initTimelineScroll() {
  const timeline = document.getElementById('experienceTimeline');
  const progressBar = document.getElementById('timelineProgress');
  if (!timeline) return;

  function updateTimeline() {
    const items = timeline.querySelectorAll('.timeline-item');
    const rect = timeline.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Trigger point: when timeline reaches ~65% of viewport
    const triggerPoint = windowHeight * 0.65;
    const scrollDistance = triggerPoint - rect.top;
    const totalHeight = rect.height;

    let progress = 0;
    if (scrollDistance > 0) {
      progress = Math.min(100, Math.max(0, (scrollDistance / totalHeight) * 100));
    }

    if (progressBar) {
      progressBar.style.height = `${progress}%`;
    }

    // Activate item dots when scrolled into view
    items.forEach(item => {
      const itemRect = item.getBoundingClientRect();
      if (itemRect.top <= triggerPoint) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', updateTimeline, { passive: true });
  // Call once on load
  setTimeout(updateTimeline, 200);
}

/* ==========================================================================
   CASE STUDY MODAL
   ========================================================================== */
function initModal(projects) {
  const modalBackdrop = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalBody = document.getElementById('modalDetailsBody');
  const modalTitle = document.getElementById('modalProjectTitle');
  const modalLiveBtn = document.getElementById('modalLiveBtn');
  const modalGitBtn = document.getElementById('modalGitBtn');

  if (!modalBackdrop) return;

  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.btn-open-modal');
    if (!trigger) return;

    const projectId = trigger.getAttribute('data-id');
    const project = projects.find(p => p.id === projectId);
    if (!project) return;

    modalTitle.textContent = project.title;
    modalLiveBtn.href = project.liveUrl;
    modalGitBtn.href = project.githubUrl;

    modalBody.innerHTML = `
      <div style="border-radius: var(--radius-md); overflow: hidden; max-height: 240px; margin-bottom: 0.5rem;">
        <img src="${project.image}" alt="${project.title}" style="width: 100%; height: 220px; object-fit: cover;">
      </div>
      <div>
        <div class="section-tag" style="margin-bottom: 0.5rem;">${project.subtitle}</div>
        <p style="font-size: 1.05rem; color: var(--text-primary); font-weight: 600; margin-bottom: 0.5rem;">
          ${project.tagline}
        </p>
        <p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 1rem;">
          ${project.shortDescription}
        </p>
      </div>

      <div>
        <h4 style="font-size: 1rem; font-weight: 700; margin-bottom: 0.5rem;">Key Capabilities & Features:</h4>
        <ul style="display: flex; flex-direction: column; gap: 0.4rem;">
          ${project.highlights.map(h => `<li style="position: relative; padding-left: 1.25rem; font-size: 0.9rem; color: var(--text-secondary);"><span style="position: absolute; left: 0; color: var(--accent-emerald);">✓</span>${h}</li>`).join('')}
        </ul>
      </div>

      <div>
        <h4 style="font-size: 1rem; font-weight: 700; margin-bottom: 0.5rem;">Technologies Used:</h4>
        <div class="tech-pills">
          ${project.techStack.map(t => `<span class="tech-pill">${t}</span>`).join('')}
        </div>
      </div>
    `;

    modalBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  function closeModal() {
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) closeModal();
  });
}

/* ==========================================================================
   CONTACT FORM -> DIRECT WHATSAPP INTEGRATION
   ========================================================================== */
function initWhatsAppContactForm() {
  const form = document.getElementById('contactForm');
  const messageInput = document.getElementById('contactMessage');
  const charCounter = document.getElementById('charCount');
  const btnEmailFallback = document.getElementById('btnSendEmailFallback');

  if (messageInput && charCounter) {
    messageInput.addEventListener('input', () => {
      charCounter.textContent = `${messageInput.value.length} / 400`;
    });
  }

  function validateForm() {
    const name = document.getElementById('contactName').value.trim();
    const contact = document.getElementById('contactEmail').value.trim();
    const subject = document.getElementById('contactSubject').value.trim();
    const message = document.getElementById('contactMessage').value.trim();

    form.querySelectorAll('.form-group').forEach(fg => fg.classList.remove('has-error'));

    let isValid = true;
    if (!name) {
      document.getElementById('nameGroup').classList.add('has-error');
      isValid = false;
    }
    if (!contact) {
      document.getElementById('emailGroup').classList.add('has-error');
      isValid = false;
    }
    if (!message) {
      document.getElementById('messageGroup').classList.add('has-error');
      isValid = false;
    }

    return isValid ? { name, contact, subject, message } : null;
  }

  if (form) {
    // Primary Action: Submit to WhatsApp!
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = validateForm();
      if (!formData) {
        showToast('Please fill out all required fields', 'error');
        return;
      }

      const { name, contact, subject, message } = formData;

      // Construct WhatsApp message with clean markdown formatting
      let waText = `*Hi Pratibha, New Inquiry from Portfolio!* 💼%0A%0A`
        + `*Name:* ${encodeURIComponent(name)}%0A`
        + `*Contact Details:* ${encodeURIComponent(contact)}%0A`;

      if (subject) {
        waText += `*Subject:* ${encodeURIComponent(subject)}%0A`;
      }

      waText += `%0A*Message:*%0A${encodeURIComponent(message)}`;

      const whatsappUrl = `https://wa.me/919129937416?text=${waText}`;

      showToast('Opening WhatsApp to send your message...', 'success');

      // Open WhatsApp in new tab
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
        form.reset();
        if (charCounter) charCounter.textContent = '0 / 400';
      }, 500);
    });

    // Secondary Action: Send via Email client
    if (btnEmailFallback) {
      btnEmailFallback.addEventListener('click', () => {
        const formData = validateForm();
        if (!formData) {
          showToast('Please fill out the form fields first', 'error');
          return;
        }

        const { name, contact, subject, message } = formData;
        const emailSubject = encodeURIComponent(subject || `Portfolio Inquiry from ${name}`);
        const emailBody = encodeURIComponent(`Name: ${name}\nContact: ${contact}\n\nMessage:\n${message}`);
        const mailtoUrl = `mailto:dwivedipratibhaamethi@gmail.com?subject=${emailSubject}&body=${emailBody}`;

        showToast('Opening your email client...', 'success');
        window.location.href = mailtoUrl;
      });
    }
  }
}

/* ==========================================================================
   COPY TO CLIPBOARD
   ========================================================================== */
function initCopyActions() {
  document.addEventListener('click', (e) => {
    const copyBtn = e.target.closest('.btn-copy');
    if (!copyBtn) return;

    const textToCopy = copyBtn.getAttribute('data-copy-text');
    if (!textToCopy) return;

    navigator.clipboard.writeText(textToCopy).then(() => {
      showToast(`Copied: "${textToCopy}"`, 'success');
      const originalHtml = copyBtn.innerHTML;
      copyBtn.innerHTML = `<span>Copied!</span>`;
      setTimeout(() => {
        copyBtn.innerHTML = originalHtml;
      }, 2000);
    }).catch(() => {
      prompt('Copy to clipboard:', textToCopy);
    });
  });
}

/* ==========================================================================
   TOAST NOTIFICATION ENGINE
   ========================================================================== */
function showToast(message, type = 'success') {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:18px;height:18px;flex-shrink:0;">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

/* ==========================================================================
   SCROLL SPY & BACK TO TOP
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 140;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });
}

function initBackToTop() {
  const bttBtn = document.getElementById('backToTopBtn');
  if (!bttBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      bttBtn.classList.add('visible');
    } else {
      bttBtn.classList.remove('visible');
    }
  });

  bttBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function bindResumeLinks(resumeUrl) {
  const resumeButtons = document.querySelectorAll('.btn-download-resume');
  resumeButtons.forEach(btn => {
    btn.setAttribute('href', resumeUrl);
    btn.setAttribute('download', 'Pratibha_Dwivedi_Resume.pdf');
    btn.setAttribute('target', '_blank');
  });
}
