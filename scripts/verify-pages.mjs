// Verification for APEX ATHLETICS: every route 200, zero h-overflow at
// 320/360/390/768/1024/1440, tap targets >=44px on mobile, zero page errors,
// plus interaction checks (menu, membership toggle, schedule filter, BMI,
// FAQ accordion, join + contact forms) and screenshots.
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const BASE = 'http://127.0.0.1:4175';
const results = [];
const check = (name, ok, detail = '') => {
	results.push({ name, ok, detail });
	console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? ' — ' + detail : ''}`);
};

const routes = [
	'/',
	'/programs',
	'/programs/strength-training',
	'/programs/personal-training',
	'/programs/hiit',
	'/programs/conditioning',
	'/coaches',
	'/coaches/alex-chen',
	'/coaches/maria-rodriguez',
	'/coaches/david-park',
	'/membership',
	'/schedule',
	'/success-stories',
	'/bmi-calculator',
	'/about',
	'/contact',
	'/join',
	'/faq',
	'/blog',
	'/blog/progressive-overload-explained',
	'/blog/hiit-vs-steady-cardio',
	'/blog/nutrition-basics-for-training',
	'/facilities',
	'/gallery',
	'/classes',
	'/location',
	'/corporate-wellness',
	'/nutrition',
	'/challenges',
	'/events',
	'/careers',
	'/member-login',
	'/free-trial',
	'/book-a-tour',
	'/calculators',
	'/cookie-policy',
	'/privacy-policy',
	'/terms',
	'/sitemap'
];

const browser = await chromium.launch();
const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
const errors = [];
page.on('pageerror', (e) => errors.push(String(e)));
page.on('console', (m) => {
	if (m.type() === 'error' && !m.text().includes('fonts.g')) errors.push(m.text());
});

const scrollThrough = async () => {
	await page.evaluate(async () => {
		await new Promise((resolve) => {
			let y = 0;
			const step = () => {
				y += 350;
				window.scrollTo(0, y);
				if (y < document.body.scrollHeight) setTimeout(step, 100);
				else resolve();
			};
			step();
		});
	});
	await page.waitForTimeout(900);
	await page.evaluate(() => window.scrollTo(0, 0));
	await page.waitForTimeout(400);
};

// ---------- every route: 200 + no h-overflow at all widths ----------
for (const vw of [1440, 1024, 768, 390, 360, 320]) {
	await page.setViewportSize({ width: vw, height: 900 });
	for (const r of routes) {
		const errsBefore = errors.length;
		const resp = await page.goto(BASE + r, { waitUntil: 'networkidle' });
		if (vw === 1440) check(`GET ${r}`, resp?.status() === 200, `status ${resp?.status()}`);
		await page.waitForTimeout(700);
		if (vw === 1440) {
			// Resource-load failures to external hosts (ERR_TUNNEL_CONNECTION_FAILED
			// for Unsplash in this VM's Playwright Chromium) are an environment
			// artifact, not a site error — curl verifies those URLs return 200.
			const real = errors.slice(errsBefore).filter((e) => !e.includes('ERR_'));
			check(`no page errors ${r}`, real.length === 0, real.slice(0, 2).join(' | '));
		}
		const overflow = await page.evaluate(
			() => document.documentElement.scrollWidth - document.documentElement.clientWidth
		);
		check(`no h-overflow ${r} @ ${vw}px`, overflow <= 0, overflow > 0 ? `${overflow}px` : '');
	}
}

// ---------- sitemap.xml ----------
await page.setViewportSize({ width: 1440, height: 900 });
const sitemapCount = await page.evaluate(async () => {
	const t = await (await fetch('/sitemap.xml')).text();
	return (t.match(/<loc>/g) || []).length;
});
check('sitemap.xml lists 39 URLs', sitemapCount === 39, `got ${sitemapCount}`);

// ---------- tap targets >= 44px on mobile ----------
await page.setViewportSize({ width: 390, height: 844 });
await page.goto(BASE + '/', { waitUntil: 'networkidle' });
await page.waitForTimeout(800);
const smallTargets = await page.evaluate(() => {
	const bad = [];
	for (const el of document.querySelectorAll('header a, header button, main a, main button')) {
		const r = el.getBoundingClientRect();
		if (r.width > 0 && r.height > 0 && (r.height < 44 || r.width < 24)) {
			bad.push(`${el.tagName}.${(el.className.baseVal ?? el.className ?? '').toString().slice(0, 40)} ${Math.round(r.width)}x${Math.round(r.height)} "${(el.textContent || '').trim().slice(0, 24)}"`);
		}
	}
	return bad.slice(0, 8);
});
check('tap targets >=44px tall on home @390', smallTargets.length === 0, smallTargets.join(' | '));

// ---------- mobile menu ----------
await page.click('button[aria-label="Open menu"]');
await page.waitForTimeout(400);
check(
	'mobile menu opens with nav links',
	await page.evaluate(() => {
		const nav = document.querySelector('nav[aria-label="Mobile"]');
		return !!nav && ['Programs', 'Coaches', 'Membership', 'About', 'Join the Gym'].every((s) => nav.textContent.includes(s));
	})
);
await page.click('button[aria-label="Close menu"]');

// ---------- membership toggle ----------
await page.goto(BASE + '/membership', { waitUntil: 'networkidle' });
await page.waitForTimeout(600);
const monthly = await page.evaluate(() => document.body.innerText.includes('$180'));
await page.click('button:has-text("Yearly")');
await page.waitForTimeout(500);
const yearly = await page.evaluate(() => document.body.innerText.includes('$150') && document.body.innerText.includes('2 months free'));
check('membership yearly toggle $180 -> $150/mo', monthly && yearly, `monthly=${monthly} yearly=${yearly}`);

// ---------- schedule filter ----------
await page.goto(BASE + '/schedule', { waitUntil: 'networkidle' });
await page.waitForTimeout(600);
await page.click('button:has-text("HIIT")');
await page.waitForTimeout(400);
check(
	'schedule HIIT filter shows HIIT, hides Strength',
	await page.evaluate(() => {
		// Day-agnostic: whatever day it is, filtered cards must all be HIIT classes.
		const names = [...document.querySelectorAll('article h2')].map((h) => h.textContent || '');
		return (
			names.length > 0 &&
			names.every((n) => /HIIT/i.test(n)) &&
			!names.some((n) => /Strength|Conditioning|Core/i.test(n))
		);
	})
);

// ---------- BMI calculator ----------
await page.goto(BASE + '/bmi-calculator', { waitUntil: 'networkidle' });
await page.waitForTimeout(600);
// innerText returns CSS-uppercased text ("YOUR BMI"), so read textContent.
const bmiBefore = await page.evaluate(() => document.body.textContent.match(/Your BMI\s*([\d.]+)/)?.[1]);
const bmiChanged = await page.evaluate(() => {
	const ranges = [...document.querySelectorAll('input[type="range"]')];
	if (ranges.length < 2) return false;
	const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
	setter.call(ranges[1], '100');
	ranges[1].dispatchEvent(new Event('input', { bubbles: true }));
	return true;
});
await page.waitForTimeout(600);
const bmiAfter = await page.evaluate(() => document.body.textContent.match(/Your BMI\s*([\d.]+)/)?.[1]);
check('BMI calculator updates on input', bmiChanged && bmiBefore !== bmiAfter, `${bmiBefore} -> ${bmiAfter}`);

// ---------- FAQ accordion ----------
await page.goto(BASE + '/faq', { waitUntil: 'networkidle' });
await page.waitForTimeout(500);
check(
	'FAQ first answer visible, second hidden',
	await page.evaluate(() => {
		const t = document.body.innerText;
		return t.includes('never trained in a gym') && !t.includes('Training shoes, a water bottle');
	})
);
await page.click('button:has-text("What should I bring")');
await page.waitForTimeout(400);
check(
	'FAQ second answer opens on click',
	await page.evaluate(() => document.body.innerText.includes('Training shoes, a water bottle'))
);

// ---------- join form ----------
await page.goto(BASE + '/join', { waitUntil: 'networkidle' });
await page.click('button[type="submit"]');
await page.waitForTimeout(400);
check(
	'join empty submit shows errors',
	await page.evaluate(() => document.body.innerText.toLowerCase().includes('please enter'))
);
await page.fill('input#name', 'Test Person');
await page.fill('input#email', 'test@example.com');
await page.fill('input#phone', '+1 212 555 0100');
await page.click('button[type="submit"]');
await page.waitForTimeout(600);
check(
	'join valid submit shows success',
	await page.evaluate(() => /you are in/i.test(document.body.innerText))
);

// ---------- contact form ----------
await page.goto(BASE + '/contact', { waitUntil: 'networkidle' });
await page.fill('input#name', 'Test Person');
await page.fill('input#email', 'test@example.com');
await page.fill('textarea#message', 'Hello, I would like to know more about membership.');
await page.click('button[type="submit"]');
await page.waitForTimeout(600);
check(
	'contact valid submit shows success',
	await page.evaluate(() => /message received/i.test(document.body.innerText))
);


// ---------- schedule booking ----------
await page.goto(BASE + '/schedule', { waitUntil: 'networkidle' });
await page.waitForTimeout(600);
check(
	'schedule shows Today highlight',
	await page.evaluate(() => document.body.textContent.includes("Showing today's classes"))
);
await page.click('button:has-text("Book This Class") >> nth=0');
await page.waitForTimeout(1000);
await page.fill('input#bk-name', 'Test Booker');
await page.fill('input#bk-email', 'booker@example.com');
await page.click('button:has-text("Confirm Booking")');
await page.waitForFunction(() => document.body.innerText.includes('You are booked in'), { timeout: 8000 }).catch(() => {});
check(
	'schedule booking confirms + saves to localStorage',
	await page.evaluate(() => {
		const saved = JSON.parse(localStorage.getItem('apex-bookings') ?? '[]');
		return document.body.innerText.includes('You are booked in') && saved.length >= 1 && saved[0].email === 'booker@example.com';
	})
);

// ---------- calculators: TDEE + 1RM ----------
await page.goto(BASE + '/calculators', { waitUntil: 'networkidle' });
await page.waitForTimeout(600);
await page.click('button:has-text("Calories (TDEE)")');
await page.waitForTimeout(400);
check(
	'TDEE tab shows calorie targets',
	await page.evaluate(() => document.body.textContent.includes('Maintain') && /\d{3,4} kcal/.test(document.body.textContent))
);
await page.click('button:has-text("One-Rep Max")');
await page.waitForTimeout(400);
check(
	'1RM tab shows estimated max',
	await page.evaluate(() => document.body.textContent.includes('Estimated 1RM'))
);

// ---------- member login ----------
await page.goto(BASE + '/member-login', { waitUntil: 'networkidle' });
await page.fill('input#ml-email', 'wrong@example.com');
await page.fill('input#ml-pass', 'nope');
await page.click('button[type="submit"]');
await page.waitForTimeout(400);
check(
	'member login rejects wrong credentials',
	await page.evaluate(() => document.body.innerText.includes('do not match'))
);
await page.fill('input#ml-email', 'demo@apexathletics.com');
await page.fill('input#ml-pass', 'demo1234');
await page.click('button[type="submit"]');
await page.waitForTimeout(600);
check(
	'member login demo account opens dashboard with booking',
	await page.evaluate(() => {
		const saved = JSON.parse(localStorage.getItem('apex-bookings') ?? '[]');
		return (
			document.body.innerText.includes('Your Dashboard') &&
			saved.length >= 1 &&
			document.body.innerText.includes(saved[0].className)
		);
	})
);

// ---------- gallery filter + lightbox ----------
await page.goto(BASE + '/gallery', { waitUntil: 'networkidle' });
await page.waitForTimeout(600);
await page.click('button:has-text("Strength") >> nth=0');
await page.waitForTimeout(400);
check(
	'gallery Strength filter narrows grid',
	await page.evaluate(() => {
		const t = document.body.textContent || '';
		return t.includes('Barbell platform') && !t.includes('Treadmill zone');
	})
);
await page.click('button[aria-label^="View photo:"] >> nth=0');
await page.waitForTimeout(400);
check(
	'gallery lightbox opens with caption + counter',
	await page.evaluate(() => !!document.querySelector('[role="dialog"][aria-label="Photo viewer"]') && document.body.textContent.includes('of 12'))
);
await page.keyboard.press('Escape');
await page.waitForTimeout(300);

// ---------- testimonial slider ----------
await page.goto(BASE + '/', { waitUntil: 'networkidle' });
await page.waitForTimeout(700);
const firstQuote = await page.evaluate(() => document.querySelector('blockquote')?.textContent?.slice(0, 30));
await page.click('button[aria-label="Next testimonial"]');
await page.waitForTimeout(400);
const secondQuote = await page.evaluate(() => document.querySelector('blockquote')?.textContent?.slice(0, 30));
check('testimonial slider advances on next', firstQuote !== secondQuote, `${firstQuote} -> ${secondQuote}`);

// ---------- free trial form ----------
await page.goto(BASE + '/free-trial', { waitUntil: 'networkidle' });
await page.fill('input#ft-name', 'Trial Person');
await page.fill('input#ft-email', 'trial@example.com');
await page.click('button[type="submit"]');
await page.waitForTimeout(600);
check(
	'free trial valid submit shows success',
	await page.evaluate(() => /trial is booked/i.test(document.body.innerText))
);

// ---------- sticky mobile CTA bar ----------
await page.setViewportSize({ width: 390, height: 844 });
await page.goto(BASE + '/', { waitUntil: 'networkidle' });
await page.waitForTimeout(600);
check(
	'sticky mobile CTA bar visible with Join + Call',
	await page.evaluate(() => {
		const nav = document.querySelector('nav[aria-label="Quick actions"]');
		if (!nav) return false;
		const r = nav.getBoundingClientRect();
		return r.height >= 44 && nav.textContent.includes('7 Days Free') && nav.textContent.includes('Call the Gym');
	})
);
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await page.waitForTimeout(700);
check(
	'footer legal links visible above sticky bar',
	await page.evaluate(() => {
		const link = [...document.querySelectorAll('footer a')].find((a) => a.textContent.includes('Cookie Policy'));
		if (!link) return false;
		const r = link.getBoundingClientRect();
		const bar = document.querySelector('nav[aria-label="Quick actions"]').getBoundingClientRect();
		return r.bottom <= bar.top;
	})
);

// ---------- reveals fire after scroll ----------
await page.goto(BASE + '/', { waitUntil: 'networkidle' });
await page.waitForTimeout(700);
await scrollThrough();
await page.waitForTimeout(1500);
check(
	'home reveals fire after scroll',
	await page.evaluate(() => {
		const els = [...document.querySelectorAll('[data-reveal]')].filter((el) => el.getBoundingClientRect().width > 0);
		return els.length > 0 && els.every((el) => el.classList.contains('is-in'));
	})
);

// ---------- screenshots ----------
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto(BASE + '/', { waitUntil: 'networkidle' });
await scrollThrough();
await page.screenshot({ path: '/home/hatch/workspace/apex-athletics/verify/home-1440.png', fullPage: true });
await page.goto(BASE + '/membership', { waitUntil: 'networkidle' });
await scrollThrough();
await page.screenshot({ path: '/home/hatch/workspace/apex-athletics/verify/membership-1440.png', fullPage: true });
await page.setViewportSize({ width: 390, height: 844 });
await page.goto(BASE + '/', { waitUntil: 'networkidle' });
await scrollThrough();
await page.screenshot({ path: '/home/hatch/workspace/apex-athletics/verify/home-390.png', fullPage: true });
await page.goto(BASE + '/programs', { waitUntil: 'networkidle' });
await scrollThrough();
await page.screenshot({ path: '/home/hatch/workspace/apex-athletics/verify/programs-390.png', fullPage: true });
await page.goto(BASE + '/coaches', { waitUntil: 'networkidle' });
await scrollThrough();
await page.screenshot({ path: '/home/hatch/workspace/apex-athletics/verify/coaches-390.png', fullPage: true });
await page.goto(BASE + '/schedule', { waitUntil: 'networkidle' });
await scrollThrough();
await page.screenshot({ path: '/home/hatch/workspace/apex-athletics/verify/schedule-390.png', fullPage: true });
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto(BASE + '/coaches', { waitUntil: 'networkidle' });
await scrollThrough();
await page.screenshot({ path: '/home/hatch/workspace/apex-athletics/verify/coaches-1440.png', fullPage: true });
await page.goto(BASE + '/schedule', { waitUntil: 'networkidle' });
await scrollThrough();
await page.screenshot({ path: '/home/hatch/workspace/apex-athletics/verify/schedule-1440.png', fullPage: true });

const realErrors = errors.filter((e) => !e.includes('ERR_'));
check('zero page errors across all routes', realErrors.length === 0, realErrors.slice(0, 3).join(' | '));
await browser.close();

const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} checks passed, ${failed.length} failed`);
process.exit(failed.length ? 1 : 0);
