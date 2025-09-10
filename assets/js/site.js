// Header & Footer inject + Countdown
// === Pinch Blocker (ピンチだけ禁止 / 通常のブラウザズームは許可) ===
// 目的: ユーザースケール UI (Ctrl+ + / ブラウザ設定) は使える状態を保ちつつ、
//       モバイルのピンチ操作による accidental zoom を防ぐ。
// 解除方法: 下の ENABLE_PINCH を true にするか、この即時関数を削除。
(function pinchOnlyBlock(){
  const ENABLE_PINCH = false; // true にするとピンチ再許可
  if(ENABLE_PINCH) return;

  // iOS Safari の gesture* イベントを抑止 (ピンチ開始を止める)
  ['gesturestart','gesturechange','gestureend'].forEach(ev => {
    document.addEventListener(ev, e => { e.preventDefault(); }, { passive:false });
  });

  // マルチタッチ (2本以上) / scale 変化時を検出して抑止
  function isPinchEvent(e){
    return (e.touches && e.touches.length > 1) || (typeof e.scale === 'number' && e.scale !== 1);
  }
  window.addEventListener('touchmove', e => {
    if(isPinchEvent(e)) e.preventDefault();
  }, { passive:false });

  // (任意) 特定要素内でピンチを許可したい場合:
  // 1. 下記コメントアウトを解除
  // 2. 対象要素に data-allow-pinch="true" を付与
  // window.addEventListener('touchmove', e => {
  //   const target = e.target.closest('[data-allow-pinch]');
  //   if(target) return; // 許可領域
  //   if(isPinchEvent(e)) e.preventDefault();
  // }, { passive:false });
})();
document.addEventListener('DOMContentLoaded', () => {
  // Inject header
  const headerMount = document.querySelector('#header');
  if (headerMount) {
    fetch('template/header.html').then(r => r.text()).then(html => {
      headerMount.innerHTML = html;
    }).catch(() => {/* ignore */});
  }

  // Inject footer if a mount exists
  const footerMount = document.querySelector('#footer');
  if (footerMount) {
    fetch('template/footer_template.html').then(r => r.text()).then(html => {
      footerMount.innerHTML = html;
    }).catch(() => {/* ignore */});
  }

  // Countdown to event start
  const eventDate = new Date('2025-09-20T09:00:00+09:00');
  const els = {
    days: document.getElementById('days'),
    hours: document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds'),
    title: document.querySelector('.countdown-title')
  };

  function updateCountdown() {
    if (!els.days || !els.hours || !els.minutes || !els.seconds) return;
    const now = new Date();
    const diff = eventDate - now;
    if (diff > 0) {
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      els.days.textContent = String(days).padStart(2, '0');
      els.hours.textContent = String(hours).padStart(2, '0');
      els.minutes.textContent = String(minutes).padStart(2, '0');
      els.seconds.textContent = String(seconds).padStart(2, '0');
    } else {
      els.days.textContent = '00';
      els.hours.textContent = '00';
      els.minutes.textContent = '00';
      els.seconds.textContent = '00';
      if (els.title) els.title.textContent = '飛翔祭開催中！';
    }
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // --- Swiper 自動初期化（存在時のみ、未初期化要素のみ） ---
  if (window.Swiper) {
    document.querySelectorAll('.class-swiper').forEach(el => {
      if (el.swiper) return;
      new Swiper(el, {
        slidesPerView: 3,              // デフォルトは3枚（デスクトップ）
        spaceBetween: 24,
        centeredSlides: false,
        loop: true,
        autoplay: { delay: 3000, disableOnInteraction: false },
        pagination: { el: el.querySelector('.swiper-pagination'), clickable: true },
        breakpoints: {
          0:   { slidesPerView: 1, spaceBetween: 16 },  // 900px未満は常に1枚
          600: { slidesPerView: 1, spaceBetween: 20 },  // タブレットも1枚
          900: { slidesPerView: 3, spaceBetween: 24 }   // デスクトップで3枚
        }
      });
    });

    document.querySelectorAll('.club-swiper').forEach(el => {
      if (el.swiper) return;
      new Swiper(el, {
        slidesPerView: 3,              // デフォルトは3枚（デスクトップ）
        spaceBetween: 24,
        centeredSlides: false,
        loop: true,
        autoplay: { delay: 3500, disableOnInteraction: false },
        pagination: { el: el.querySelector('.swiper-pagination'), clickable: true },
        breakpoints: {
          0:   { slidesPerView: 1, spaceBetween: 16 },  // 900px未満は常に1枚
          600: { slidesPerView: 1, spaceBetween: 20 },  // タブレットも1枚
          900: { slidesPerView: 3, spaceBetween: 24 }   // デスクトップで3枚
        }
      });
    });

    document.querySelectorAll('.food-swiper').forEach(el => {
      if (el.swiper) return;
      new Swiper(el, {
        slidesPerView: 3,              // デフォルトは3枚（デスクトップ）
        spaceBetween: 24,
        centeredSlides: false,
        loop: true,
        autoplay: { delay: 3500, disableOnInteraction: false },
        pagination: { el: el.querySelector('.swiper-pagination'), clickable: true },
        breakpoints: {
          0:   { slidesPerView: 1, spaceBetween: 16 },  // 900px未満は常に1枚
          600: { slidesPerView: 1, spaceBetween: 20 },  // タブレットも1枚
          900: { slidesPerView: 3, spaceBetween: 24 }   // デスクトップで3枚
        }
      });
    });

    document.querySelectorAll('.indv-swiper').forEach(el => {
      if (el.swiper) return;
      new Swiper(el, {
        slidesPerView: 3,              // デフォルトは3枚（デスクトップ）
        spaceBetween: 24,
        centeredSlides: false,
        loop: true,
        autoplay: false,
        pagination: { el: el.querySelector('.swiper-pagination'), clickable: true },
        breakpoints: {
          0:   { slidesPerView: 1, spaceBetween: 16 },  // 900px未満は常に1枚
          600: { slidesPerView: 1, spaceBetween: 20 },  // タブレットも1枚
          900: { slidesPerView: 3, spaceBetween: 24 }   // デスクトップで3枚
        }
      });
    });
  }

  // --- ナビのアクティブ表示 ---
  try {
    const current = new URL(location.href);
    const norm = p => p.replace(/\/index\.html?$/i, '/').toLowerCase();
    const curPath = norm(current.pathname);
    document.querySelectorAll('a[href]').forEach(a => {
      const href = a.getAttribute('href');
      if (!href || /^https?:\/\//i.test(href) || href.startsWith('mailto:') || href.startsWith('#')) return;
      const targetPath = norm(new URL(href, current.origin).pathname);
      if (targetPath === curPath) a.classList.add('is-active');
    });
  } catch (e) {
    // no-op
  }
});
