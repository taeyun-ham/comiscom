/* ============================================================
   커밋이즈커밍 — Main JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ============================================================
  // 1. HEADER — Scroll 감지 & Active 링크
  // ============================================================
  const header = document.getElementById('site-header');
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section[id]');

  function onScroll() {
    // 헤더 스크롤 효과
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // 스크롤 탑 버튼
    const scrollTopBtn = document.getElementById('scroll-top-btn');
    if (scrollTopBtn) {
      if (window.scrollY > 400) {
        scrollTopBtn.classList.add('show');
      } else {
        scrollTopBtn.classList.remove('show');
      }
    }

    // 활성 nav 링크 업데이트
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // ============================================================
  // 2. HAMBURGER MENU
  // ============================================================
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  hamburgerBtn?.addEventListener('click', () => {
    hamburgerBtn.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburgerBtn.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });

  // ============================================================
  // 3. TERMINAL TYPING ANIMATION
  // ============================================================
  const typedCmd = document.getElementById('typed-cmd');
  const terminalOutput = document.getElementById('terminal-output');

  const commands = [
    {
      cmd: 'git commit -m "진심을 커밋합니다"',
      output: `[main a1b2c3d] 진심을 커밋합니다\n 1 file changed, 42 insertions(+)\n ✨ Commit with heart, deliver tomorrow.`
    },
    {
      cmd: 'git push origin main',
      output: `Counting objects: 3, done.\nWriting objects: 100%\nTo github.com/commitiscoming\n * [new branch] main -> main\n 🚀 내일이 배포되었습니다!`
    },
    {
      cmd: 'git push ori',
      output: `Counting objects: 3, done.\nWriting objects: 100%\nTo github.com/commitiscoming\n * [new branch] main -> main\n 🌱 좋은 것은 늘 다가오고 있습니다.`
    }
  ];

  let cmdIndex = 0;
  let charIndex = 0;
  let isTyping = false;
  let isDeleting = false;
  let typingTimer = null;

  function typeCmd() {
    const current = commands[cmdIndex];

    if (!isDeleting && charIndex <= current.cmd.length) {
      typedCmd.textContent = current.cmd.substring(0, charIndex);
      charIndex++;

      if (charIndex > current.cmd.length) {
        // 타이핑 완료 → 출력
        terminalOutput.textContent = '';
        showOutput(current.output, 0, () => {
          // 2초 후 삭제 시작
          typingTimer = setTimeout(() => {
            isDeleting = true;
            typeCmd();
          }, 2500);
        });
        return;
      }
      typingTimer = setTimeout(typeCmd, 60 + Math.random() * 40);
    } else if (isDeleting) {
      typedCmd.textContent = current.cmd.substring(0, charIndex);
      charIndex--;

      if (charIndex < 0) {
        isDeleting = false;
        charIndex = 0;
        terminalOutput.textContent = '';
        cmdIndex = (cmdIndex + 1) % commands.length;
        typingTimer = setTimeout(typeCmd, 500);
        return;
      }
      typingTimer = setTimeout(typeCmd, 30);
    }
  }

  function showOutput(text, idx, callback) {
    if (idx < text.length) {
      terminalOutput.textContent += text[idx];
      setTimeout(() => showOutput(text, idx + 1, callback), 20);
    } else {
      if (callback) callback();
    }
  }

  // 초기 지연 후 시작
  setTimeout(typeCmd, 1200);

  // ============================================================
  // 4. FOOTER COMMIT MESSAGE
  // ============================================================
  const footerCommit = document.getElementById('footer-commit');
  if (footerCommit) {
    const commitMessages = [
      '오늘도 한 커밋, 내일도 한 커밋',
      'main 브랜치에 배포됨 ✓',
      '진심을 코드에 담는 중',
      '커밋 중... (a1b2c3d)',
      '각자의 커밋이 모여 하나의 릴리즈가 됩니다',
    ];
    let msgIdx = 0;

    setInterval(() => {
      msgIdx = (msgIdx + 1) % commitMessages.length;
      footerCommit.style.opacity = '0';
      setTimeout(() => {
        footerCommit.textContent = commitMessages[msgIdx];
        footerCommit.style.transition = 'opacity 0.5s';
        footerCommit.style.opacity = '1';
      }, 300);
    }, 3000);
  }

  // ============================================================
  // 5. CULTURE TABS
  // ============================================================
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;

      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const panel = document.getElementById(`tab-${target}`);
      if (panel) panel.classList.add('active');
    });
  });

  // ============================================================
  // 6. CONTACT FORM
  // ============================================================
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;

      // 로딩 상태
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 전송 중...';
      btn.disabled = true;

      // 실제 전송 로직 없이 UX 시뮬레이션
      setTimeout(() => {
        // 폼 숨기기 & 성공 메시지 보이기
        contactForm.innerHTML = `
          <div class="form-success show">
            <i class="fas fa-check-circle"></i>
            <h4>메시지가 전송되었습니다! 🎉</h4>
            <p>빠른 시일 내에 답변 드리겠습니다.<br/>진심으로 커밋하겠습니다.</p>
            <p style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--color-primary); margin-top:12px;">
              git commit -m "메시지 전달 완료 ✓"
            </p>
          </div>
        `;
      }, 1500);
    });
  }

  // ============================================================
  // 7. SCROLL ANIMATIONS (Intersection Observer)
  // ============================================================
  const fadeEls = document.querySelectorAll(
    '.value-card, .slogan-card, .conduct-item, .culture-card, ' +
    '.service-item, .timeline-item, .commit-item, .contact-item'
  );

  fadeEls.forEach((el, i) => {
    el.classList.add('fade-in');
    el.style.transitionDelay = `${(i % 6) * 0.07}s`;
  });

  const aboutText = document.querySelector('.about-text');
  const aboutVisual = document.querySelector('.about-visual');
  if (aboutText) aboutText.classList.add('fade-in-left');
  if (aboutVisual) aboutVisual.classList.add('fade-in-right');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right').forEach(el => {
    observer.observe(el);
  });

  // ============================================================
  // 8. SCROLL TO TOP
  // ============================================================
  const scrollTopBtn = document.getElementById('scroll-top-btn');
  scrollTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ============================================================
  // 9. SMOOTH SCROLL FOR ANCHOR LINKS
  // ============================================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = header.offsetHeight;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ============================================================
  // 10. VALUE CARDS — Hover Counter Animation
  // ============================================================
  const valueCards = document.querySelectorAll('.value-card');
  valueCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease';
    });
  });

  // ============================================================
  // 11. HERO — Parallax Mouse Effect (Subtle)
  // ============================================================
  const heroSection = document.getElementById('hero');
  if (heroSection) {
    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      const terminal = heroSection.querySelector('.hero-terminal');
      if (terminal) {
        terminal.style.transform = `perspective(1000px) rotateY(${x * 3}deg) rotateX(${-y * 2}deg)`;
        terminal.style.transition = 'transform 0.1s ease';
      }
    });

    heroSection.addEventListener('mouseleave', () => {
      const terminal = heroSection.querySelector('.hero-terminal');
      if (terminal) {
        terminal.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
        terminal.style.transition = 'transform 0.5s ease';
      }
    });
  }

  // ============================================================
  // 12. COMMIT LOG — Animated Glow on Hover
  // ============================================================
  const commitItems = document.querySelectorAll('.commit-item');
  commitItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      const hash = item.querySelector('.commit-hash');
      if (hash) {
        hash.style.boxShadow = '0 0 8px rgba(88,166,255,0.5)';
      }
    });

    item.addEventListener('mouseleave', () => {
      const hash = item.querySelector('.commit-hash');
      if (hash) {
        hash.style.boxShadow = 'none';
      }
    });
  });

  // ============================================================
  // 13. SKILL TAGS — Random Float Animation
  // ============================================================
  const skillTags = document.querySelectorAll('.skill-tag');
  skillTags.forEach((tag, i) => {
    tag.style.animationDelay = `${i * 0.1}s`;
  });

  // ============================================================
  // 14. SECTION LABELS — Code Comment Style
  // ============================================================
  const sectionLabels = document.querySelectorAll('.section-label');
  sectionLabels.forEach(label => {
    const text = label.textContent;
    if (text.startsWith('//')) {
      label.style.fontFamily = 'var(--font-mono)';
    }
  });

  console.log('%c커밋이즈커밍 (Commit is Coming)', 'color: #58a6ff; font-size: 1.2em; font-weight: bold;');
  console.log('%c진심을 커밋하고, 내일을 배포한다 🚀', 'color: #3fb950; font-size: 1em;');
  console.log('%cCommit with heart, deliver tomorrow.', 'color: #8b949e; font-size: 0.9em; font-style: italic;');

});
