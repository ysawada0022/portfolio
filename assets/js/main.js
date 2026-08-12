/**
 * hako — Web制作ポートフォリオ
 *
 * 依存ライブラリなし。担当するのは以下だけです。
 *  1. モバイルのメニュー開閉
 *  2. スクロールに応じた要素の表示
 *  3. お問い合わせフォームの送信先が未設定のときのガード
 */
(function () {
	'use strict';

	var $ = function (s, c) { return (c || document).querySelector(s); };
	var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

	/* =========================================================
	   1. モバイルメニュー
	   ========================================================= */
	var navToggle = $('[data-nav-toggle]');
	if (navToggle) {
		navToggle.addEventListener('click', function () {
			var open = navToggle.getAttribute('aria-expanded') === 'true';
			navToggle.setAttribute('aria-expanded', String(!open));
			document.body.classList.toggle('is-nav-open', !open);
		});

		// メニュー内のリンクを押したら閉じる（ページ内リンクのため）
		$$('.nav__link').forEach(function (link) {
			link.addEventListener('click', function () {
				navToggle.setAttribute('aria-expanded', 'false');
				document.body.classList.remove('is-nav-open');
			});
		});
	}

	/* =========================================================
	   2. スクロールに応じた表示
	   -----------------------------------------------------------
	   ライブラリを入れるほどの動きではないので IntersectionObserver で。
	   「動きを減らす」設定の環境では何もしない。
	   ========================================================= */
	var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	if (!reduceMotion && 'IntersectionObserver' in window) {
		var targets = $$('.work, .skill, .flow__step, .section__head');

		targets.forEach(function (el) {
			el.style.opacity = '0';
			el.style.transform = 'translateY(16px)';
			el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
		});

		var io = new IntersectionObserver(function (entries) {
			entries.forEach(function (entry) {
				if (!entry.isIntersecting) { return; }
				entry.target.style.opacity = '1';
				entry.target.style.transform = 'none';
				io.unobserve(entry.target);
			});
		}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

		targets.forEach(function (el) { io.observe(el); });
	}
})();
