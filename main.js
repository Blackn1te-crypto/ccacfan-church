/* ════════════════════════════════════════════════════════════
   Chiedza Chevanotenda Apostolic Church — main.js
   ════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ---------- SPLASH ---------- */
  var splash = document.getElementById('splash');

  if (splash) {
    var hideSplash = function () {
      splash.classList.add('is-hidden');
      document.body.classList.remove('has-splash');
      setTimeout(function () {
        if (splash.parentNode) splash.parentNode.removeChild(splash);
      }, 1000);
    };

    window.addEventListener('load', function () {
      setTimeout(hideSplash, 3400);
    });

    // Safety fallback
    setTimeout(function () {
      if (document.body.contains(splash)) hideSplash();
    }, 5000);
  }

  /* ---------- MOBILE NAV ---------- */
  var navToggle = document.getElementById('navToggle');
  var mainNav = document.getElementById('mainNav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      var open = mainNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(open));
    });

    var links = mainNav.querySelectorAll('a');
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener('click', function () {
        mainNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    }
  }

  /* ---------- SCRIPTURE CAROUSEL ---------- */
  var carousel = document.getElementById('scriptureCarousel');
  if (carousel) {
    var slides = carousel.querySelectorAll('.scripture__slide');
    var dotsWrap = document.getElementById('scriptureDots');
    var current = 0;
    var timer;

    // Build dots
    slides.forEach(function (_, i) {
      var btn = document.createElement('button');
      btn.setAttribute('aria-label', 'Scripture ' + (i + 1));
      if (i === 0) btn.classList.add('is-active');
      btn.addEventListener('click', function () {
        goTo(i);
        restart();
      });
      dotsWrap.appendChild(btn);
    });

    var dots = dotsWrap.querySelectorAll('button');

    function goTo(index) {
      slides[current].classList.remove('is-active');
      dots[current].classList.remove('is-active');
      current = index;
      slides[current].classList.add('is-active');
      dots[current].classList.add('is-active');
    }

    function next() {
      goTo((current + 1) % slides.length);
    }

    function restart() {
      clearInterval(timer);
      timer = setInterval(next, 6500);
    }

    restart();
  }

  /* ---------- FOOTER YEAR ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- SMOOTH ANCHOR SCROLL ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (id.length > 1) {
        var target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

})();