/**
 * 在线简历 — 交互脚本（原生 JS，无依赖）
 */
(function () {
  'use strict';

  /* ===== 二维码灯箱 ===== */
  const qrImg = document.querySelector('.qr-img');
  if (qrImg) {
    // 创建灯箱层
    const lightbox = document.createElement('div');
    lightbox.className = 'qr-lightbox';
    const bigImg = document.createElement('img');
    bigImg.src = qrImg.src;
    bigImg.alt = '微信小程序码';
    lightbox.appendChild(bigImg);
    document.body.appendChild(lightbox);

    const openLightbox = () => lightbox.classList.add('active');
    const closeLightbox = () => lightbox.classList.remove('active');

    qrImg.addEventListener('click', openLightbox);
    lightbox.addEventListener('click', closeLightbox);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeLightbox();
    });
  }

  /* ===== 滚动入场动画（IntersectionObserver） ===== */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    // 先清除 CSS 中的固定动画延迟，交由滚动触发
    revealEls.forEach((el) => {
      el.style.animation = 'none';
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const delay = el.style.getPropertyValue('--delay') || '0s';
            el.style.transition = `opacity .6s cubic-bezier(.22,.61,.36,1) ${delay}, transform .6s cubic-bezier(.22,.61,.36,1) ${delay}`;
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    revealEls.forEach((el) => observer.observe(el));
  }

  /* ===== 当前年份自动填充 ===== */
  const yearEl = document.querySelector('.footer__inner span');
  if (yearEl) {
    yearEl.textContent = yearEl.textContent.replace('2026', new Date().getFullYear());
  }
})();
