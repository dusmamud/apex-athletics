// APEX ATHLETICS — site data.
// Photos are Unsplash (images.unsplash.com) — every ID below was verified
// to return HTTP 200 with curl before use. Copy is original, written for
// this site; the reference image's small body text was AI-garbled and was
// NOT copied.

export const u = (id: string, w = 1200) =>
	`https://images.unsplash.com/photo-${id}?q=80&w=${w}&auto=format&fit=crop`;

export const IMAGES = {
	hero: u('1550345332-09e3ac987658', 1600),
	community: u('1517963879433-6ad2b056d712', 1400),
	about: u('1540497077202-7c8a3999166f', 1400),
	about2: u('1534438327276-14e5300c3a48', 1200)
};

export interface Program {
	slug: string;
	name: string;
	tagline: string;
	description: string;
	long: string[];
	image: string;
	duration: string;
	level: string;
	calories: string;
	coach: string;
	schedule: string[];
	benefits: string[];
}

export const programs: Program[] = [
	{
		slug: 'strength-training',
		name: 'Strength Training',
		tagline: 'Build real, lasting strength.',
		description:
			'Barbell-first programming that builds muscle, protects your joints and raises your baseline strength week after week.',
		long: [
			'Our strength program is built around the big compound lifts — squat, hinge, press and pull — coached in small groups so every rep gets eyes on it.',
			'You will follow a structured 12-week cycle with progressive overload, technique work and accessory lifts chosen for your body, not a generic template.',
			'Whether you are lifting for the first time or chasing a new personal best, your coach tracks every set and adjusts the plan as you adapt.'
		],
		image: u('1605296867304-46d5465a13f1', 1200),
		duration: '60 min',
		level: 'All levels',
		calories: '450–600 kcal',
		coach: 'Alex Chen',
		schedule: ['Mon 6:00 AM', 'Wed 6:00 AM', 'Fri 6:00 AM', 'Sat 9:00 AM'],
		benefits: [
			'Structured 12-week progressive cycles',
			'Small-group coaching, max 8 lifters',
			'Technique video review every month',
			'Strength testing and tracking'
		]
	},
	{
		slug: 'personal-training',
		name: 'Personal Training',
		tagline: 'One coach. One plan. All yours.',
		description:
			'One-to-one coaching built entirely around your body, your schedule and your goals — from first session to full transformation.',
		long: [
			'Personal training starts with a full assessment: movement screen, strength baseline, body composition and a honest conversation about your goals.',
			'Your coach then builds a program that fits your life — sessions at times that work for you, nutrition guidance that is realistic, and check-ins that keep you accountable.',
			'Every session is coached one-to-one. No waiting for equipment, no guessing what to do next, no plateaus that go unnoticed.'
		],
		image: u('1574680096145-d05b474e2155', 1200),
		duration: '60 min',
		level: 'All levels',
		calories: '400–550 kcal',
		coach: 'Maria Rodriguez',
		schedule: ['By appointment', 'Mon–Sat, 5:00 AM – 9:00 PM'],
		benefits: [
			'Fully personalised training plan',
			'Nutrition and habit coaching',
			'Flexible scheduling, 7 days a week',
			'Monthly progress reviews'
		]
	},
	{
		slug: 'hiit',
		name: 'HIIT',
		tagline: 'Short. Sharp. Sweaty.',
		description:
			'High-intensity interval training that torches calories, builds engine and keeps burning long after the session ends.',
		long: [
			'HIIT at APEX is 45 minutes of focused work: short, intense intervals on sleds, bikes, rowers and bodyweight stations, with coached recovery between rounds.',
			'Every workout scales to your fitness level. The timer is the same for everyone — the intensity is yours.',
			'It is the fastest way to improve conditioning, and the most fun way to do it. Expect music loud, energy high and a room full of people pushing together.'
		],
		image: u('1541534741688-6078c6bfb5c5', 1200),
		duration: '45 min',
		level: 'Intermediate',
		calories: '600–800 kcal',
		coach: 'Maria Rodriguez',
		schedule: ['Tue 7:00 AM', 'Thu 7:00 AM', 'Tue 6:30 PM', 'Thu 6:30 PM', 'Sat 8:00 AM'],
		benefits: [
			'45-minute sessions, maximum output',
			'Heart-rate zones tracked live',
			'Scales to every fitness level',
			'New workout every single session'
		]
	},
	{
		slug: 'conditioning',
		name: 'Conditioning',
		tagline: 'Move better. Last longer.',
		description:
			'Build the engine behind everything — endurance, agility and work capacity that carries over to sport and everyday life.',
		long: [
			'Conditioning blends running, rowing, sled work, carries and agility drills into sessions that build a bigger engine without beating up your joints.',
			'It is ideal for athletes in-season, for runners and team-sport players, and for anyone who wants to feel fitter walking up stairs, not just in the gym.',
			'We test your conditioning every eight weeks so you can see the numbers move — faster times, lower resting heart rate, more work done in less time.'
		],
		image: u('1534438327276-14e5300c3a48', 1200),
		duration: '50 min',
		level: 'All levels',
		calories: '500–700 kcal',
		coach: 'David Park',
		schedule: ['Mon 7:30 AM', 'Wed 7:30 AM', 'Fri 7:30 AM', 'Sat 10:00 AM'],
		benefits: [
			'Sport-ready endurance and agility',
			'Low-impact options for every session',
			'Conditioning tests every 8 weeks',
			'Pairs perfectly with strength training'
		]
	}
];

export interface Coach {
	slug: string;
	name: string;
	role: string;
	credentials: string;
	bio: string[];
	image: string;
	specialties: string[];
	experience: string;
}

export const coaches: Coach[] = [
	{
		slug: 'alex-chen',
		name: 'Alex Chen',
		role: 'Strength & Conditioning Specialist',
		credentials: 'CSCS, USAW Level 2',
		bio: [
			'Alex has coached strength for over a decade, from first-time lifters to competitive powerlifters. He believes great coaching is mostly great listening — understanding how your body moves before loading it.',
			'Before APEX he spent six years as a strength coach for a collegiate athletics program, where his lifters set 14 school records.',
			'His sessions are calm, precise and quietly demanding. Expect to leave stronger than you arrived — and knowing exactly why.'
		],
		image: u('1567013127542-490d757e51fc', 1000),
		specialties: ['Strength Training', 'Powerlifting', 'Olympic Lifting', 'Movement Screening'],
		experience: '12 years coaching'
	},
	{
		slug: 'maria-rodriguez',
		name: 'Maria Rodriguez',
		role: 'HIIT & Functional Fitness Coach',
		credentials: 'NASM CPT, Precision Nutrition',
		bio: [
			'Maria runs our HIIT floor and our personal training program. Her sessions are famous for two things: the playlist, and the fact that nobody leaves early.',
			'She has helped more than 300 members through their first 90 days — the stretch where most people quit — and her retention rate is the highest in the gym.',
			'Maria coaches the whole person: training, food, sleep and the habits that make results stick after the motivation fades.'
		],
		image: u('1571731956672-f2b94d7dd0cb', 1000),
		specialties: ['HIIT', 'Personal Training', 'Weight Loss', 'Nutrition Coaching'],
		experience: '9 years coaching'
	},
	{
		slug: 'david-park',
		name: 'David Park',
		role: 'Performance Enhancement Coach',
		credentials: 'NSCA CPT, FMS Level 2',
		bio: [
			'David works with athletes who need to be fast, durable and ready on game day — and with everyday members who want to move like athletes again.',
			'His background is in sports performance: speed, agility, conditioning and return-to-training after injury, always in close step with physios.',
			'He runs our conditioning program and our testing days. If you like numbers, targets and measurable progress, David is your coach.'
		],
		image: u('1583864697784-a0efc8379f70', 1000),
		specialties: ['Conditioning', 'Speed & Agility', 'Athletic Performance', 'Injury-Smart Training'],
		experience: '10 years coaching'
	}
];

export interface Plan {
	name: string;
	monthly: number;
	popular?: boolean;
	blurb: string;
	features: string[];
}

export const plans: Plan[] = [
	{
		name: 'Basic',
		monthly: 120,
		blurb: 'Everything you need to train on your own terms.',
		features: [
			'Access to open floor',
			'1 group class per week',
			'Locker room access',
			'Fitness assessment on joining',
			'APEX app access'
		]
	},
	{
		name: 'Premium',
		monthly: 180,
		popular: true,
		blurb: 'Our most popular plan — train without limits.',
		features: [
			'Unlimited gym access',
			'Unlimited group classes',
			'2 personal training sessions / month',
			'Sauna access',
			'Nutrition starter plan',
			'Guest pass every month'
		]
	},
	{
		name: 'Elite',
		monthly: 250,
		blurb: 'The full APEX experience, fully coached.',
		features: [
			'All Premium features',
			'4 personal training sessions / month',
			'Monthly body-composition scan',
			'Priority class booking',
			'Recovery room access',
			'APEX merchandise pack'
		]
	}
];

/** Yearly billing = 10 months for 12 (2 months free). */
export const yearlyPrice = (monthly: number) => ({
	perMonth: Math.round((monthly * 10) / 12),
	total: monthly * 10
});

export const testimonials = [
	{
		quote:
			'I lost 18 kg in nine months and I have kept it off for a year. The coaches here actually notice when you miss a session — and they call you on it.',
		name: 'Marcus Webb',
		detail: 'Member for 2 years',
		initials: 'MW',
		program: 'Personal Training'
	},
	{
		quote:
			'The 6 AM strength class is the best part of my day. Small groups, real coaching, and a room full of people who want you to hit your next PR.',
		name: 'Priya Sharma',
		detail: 'Member for 1 year',
		initials: 'PS',
		program: 'Strength Training'
	},
	{
		quote:
			'I joined for HIIT and stayed for the community. Down two dress sizes, up a huge amount of confidence — and I actually look forward to training.',
		name: 'Daniel Okafor',
		detail: 'Member for 3 years',
		initials: 'DO',
		program: 'HIIT'
	}
];

export const successStories = [
	{
		name: 'Sarah Mitchell',
		age: 34,
		program: 'Personal Training',
		image: u('1583454110551-21f2fa2afe61', 1000),
		quote:
			'I had tried every diet and every gym. What changed at APEX was having a coach who built the plan around my life instead of handing me a printout.',
		stats: [
			{ label: 'Weight lost', value: '18 kg' },
			{ label: 'Time', value: '9 months' },
			{ label: 'Body fat', value: '32% to 21%' }
		]
	},
	{
		name: 'James Turner',
		age: 28,
		program: 'Strength Training',
		image: u('1584735935682-2f2b69dff9d2', 1000),
		quote:
			'My deadlift went from 100 kg to 180 kg in a year. The 12-week cycles work — every block has a purpose, and Alex spots problems before they become injuries.',
		stats: [
			{ label: 'Deadlift', value: '100 to 180 kg' },
			{ label: 'Time', value: '12 months' },
			{ label: 'Muscle gained', value: '7 kg' }
		]
	},
	{
		name: 'Elena Rossi',
		age: 41,
		program: 'HIIT',
		image: u('1599058917212-d750089bc07e', 1000),
		quote:
			'After two kids I thought my athletic days were over. Six months of HIIT and I ran my first 10K — then signed up for a half marathon.',
		stats: [
			{ label: 'First 10K', value: '52 min' },
			{ label: 'Time', value: '6 months' },
			{ label: 'Resting HR', value: '74 to 58 bpm' }
		]
	},
	{
		name: 'Tom Becker',
		age: 52,
		program: 'Conditioning',
		image: u('1552674605-db6ffd4facb5', 1000),
		quote:
			'At 52 I move better than I did at 35. David rebuilt my conditioning from scratch — knees, back and all — and I play football with my son every weekend now.',
		stats: [
			{ label: 'Weight lost', value: '11 kg' },
			{ label: 'Time', value: '8 months' },
			{ label: '5K time', value: '31 to 24 min' }
		]
	}
];

export interface ClassSlot {
	day: string;
	time: string;
	name: string;
	program: string;
	coach: string;
	intensity: 'Low' | 'Moderate' | 'High';
	spots: number;
}

export const schedule: ClassSlot[] = [
	{ day: 'Monday', time: '6:00 AM', name: 'Strength Foundations', program: 'strength-training', coach: 'Alex Chen', intensity: 'Moderate', spots: 8 },
	{ day: 'Monday', time: '7:30 AM', name: 'Conditioning Circuit', program: 'conditioning', coach: 'David Park', intensity: 'High', spots: 12 },
	{ day: 'Monday', time: '12:15 PM', name: 'Lunch Express HIIT', program: 'hiit', coach: 'Maria Rodriguez', intensity: 'High', spots: 16 },
	{ day: 'Monday', time: '6:30 PM', name: 'Strength Foundations', program: 'strength-training', coach: 'Alex Chen', intensity: 'Moderate', spots: 8 },
	{ day: 'Tuesday', time: '7:00 AM', name: 'HIIT Blast', program: 'hiit', coach: 'Maria Rodriguez', intensity: 'High', spots: 16 },
	{ day: 'Tuesday', time: '12:15 PM', name: 'Core & Mobility', program: 'conditioning', coach: 'David Park', intensity: 'Low', spots: 14 },
	{ day: 'Tuesday', time: '6:30 PM', name: 'HIIT Blast', program: 'hiit', coach: 'Maria Rodriguez', intensity: 'High', spots: 16 },
	{ day: 'Wednesday', time: '6:00 AM', name: 'Strength Foundations', program: 'strength-training', coach: 'Alex Chen', intensity: 'Moderate', spots: 8 },
	{ day: 'Wednesday', time: '7:30 AM', name: 'Conditioning Circuit', program: 'conditioning', coach: 'David Park', intensity: 'High', spots: 12 },
	{ day: 'Wednesday', time: '6:30 PM', name: 'Olympic Lifting Club', program: 'strength-training', coach: 'Alex Chen', intensity: 'Moderate', spots: 10 },
	{ day: 'Thursday', time: '7:00 AM', name: 'HIIT Blast', program: 'hiit', coach: 'Maria Rodriguez', intensity: 'High', spots: 16 },
	{ day: 'Thursday', time: '12:15 PM', name: 'Core & Mobility', program: 'conditioning', coach: 'David Park', intensity: 'Low', spots: 14 },
	{ day: 'Thursday', time: '6:30 PM', name: 'HIIT Blast', program: 'hiit', coach: 'Maria Rodriguez', intensity: 'High', spots: 16 },
	{ day: 'Friday', time: '6:00 AM', name: 'Strength Foundations', program: 'strength-training', coach: 'Alex Chen', intensity: 'Moderate', spots: 8 },
	{ day: 'Friday', time: '7:30 AM', name: 'Conditioning Circuit', program: 'conditioning', coach: 'David Park', intensity: 'High', spots: 12 },
	{ day: 'Friday', time: '5:30 PM', name: 'Friday Fight Club HIIT', program: 'hiit', coach: 'Maria Rodriguez', intensity: 'High', spots: 20 },
	{ day: 'Saturday', time: '8:00 AM', name: 'HIIT Blast', program: 'hiit', coach: 'Maria Rodriguez', intensity: 'High', spots: 16 },
	{ day: 'Saturday', time: '9:00 AM', name: 'Strength Foundations', program: 'strength-training', coach: 'Alex Chen', intensity: 'Moderate', spots: 8 },
	{ day: 'Saturday', time: '10:00 AM', name: 'Conditioning Circuit', program: 'conditioning', coach: 'David Park', intensity: 'Moderate', spots: 12 }
];

export const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const faqs = [
	{
		q: 'Do I need experience to join APEX ATHLETICS?',
		a: 'No. Around half of our new members have never trained in a gym before. Every membership starts with a free assessment, and our coaches scale every session to your level. You will never be thrown into a class you are not ready for.'
	},
	{
		q: 'What should I bring to my first session?',
		a: 'Training shoes, a water bottle and a towel. We provide lockers, showers and filtered water stations. If you are coming for a free trial, just bring yourself — your coach will take care of the rest.'
	},
	{
		q: 'Can I freeze or cancel my membership?',
		a: 'Yes. You can freeze your membership for up to 4 weeks per year at no cost, for travel, injury or any other reason. Monthly plans can be cancelled with 30 days notice; yearly plans can be cancelled with a pro-rata refund in the first 60 days.'
	},
	{
		q: 'Is there a free trial?',
		a: 'Yes — every new member gets a 7-day free trial with full gym access, two group classes and a one-to-one assessment with a coach. No card details are taken. Claim it on the Join page.'
	},
	{
		q: 'Do you offer personal training?',
		a: 'Yes. One-to-one coaching is available with Alex, Maria or David, by appointment, seven days a week. Premium members get 2 sessions a month included; Elite members get 4. Extra sessions can be booked any time.'
	},
	{
		q: 'What are the opening hours?',
		a: 'Monday to Saturday, 5:00 AM to 10:00 PM, and Sunday 7:00 AM to 8:00 PM. Staffed hours are 5:00 AM to 9:00 PM on weekdays; Premium and Elite members can train during all open hours.'
	},
	{
		q: 'Is there parking and are the facilities accessible?',
		a: 'Yes. There is free on-site parking, secure bike storage, step-free access throughout the gym, an accessible changing room and shower, and coaches trained to adapt sessions for every body.'
	},
	{
		q: 'Can I bring a guest?',
		a: 'Premium members get one guest pass a month and Elite members get two. Guests train with you, get a full induction from a coach, and can join on the day if they want to.'
	}
];

export interface BlogPost {
	slug: string;
	title: string;
	excerpt: string;
	image: string;
	date: string;
	readTime: string;
	author: string;
	category: string;
	body: string[];
}

export const blogPosts: BlogPost[] = [
	{
		slug: 'progressive-overload-explained',
		title: 'Progressive Overload, Explained Simply',
		excerpt:
			'The one principle behind every strength gain you will ever make — and how to apply it without getting injured or bored.',
		image: u('1605296867304-46d5465a13f1', 1200),
		date: 'Nov 10, 2026',
		readTime: '6 min read',
		author: 'Alex Chen',
		category: 'Strength',
		body: [
			'Every strength program that works is built on one idea: do a little more than last time. That is progressive overload, and it is less complicated than the fitness industry makes it sound.',
			'Your body adapts to stress. Lift the same weight for the same reps forever, and it has no reason to change. Add a small amount of weight, one more rep, or one more set, and it is forced to build new muscle and new strength to cope.',
			'The mistake most people make is adding too much, too fast. A good rule: when you can complete all your planned sets and reps with good form, add the smallest increment available — usually 2.5 kg on upper-body lifts and 5 kg on lower-body lifts.',
			'Overload does not have to mean heavier weight. Slower reps, shorter rest, better range of motion and an extra set all count. The best program is the one you can progress on for months without pain.',
			'At APEX we run 12-week cycles for exactly this reason. Weeks 1–4 build volume, weeks 5–8 build intensity, weeks 9–11 peak, and week 12 is a deload. Then we test, record the numbers, and start the next cycle from a higher base.',
			'If you remember one thing: progress is a direction, not a daily event. Some weeks you will add weight. Some weeks you will just move better. Both count.'
		]
	},
	{
		slug: 'hiit-vs-steady-cardio',
		title: 'HIIT vs. Steady Cardio: Which One Actually Works?',
		excerpt:
			'Both burn calories. Only one builds your engine fast. Here is how to choose — and why the honest answer is usually both.',
		image: u('1541534741688-6078c6bfb5c5', 1200),
		date: 'Nov 3, 2026',
		readTime: '5 min read',
		author: 'Maria Rodriguez',
		category: 'Conditioning',
		body: [
			'HIIT gets the headlines and steady cardio gets dismissed as boring. The truth is less exciting and more useful: they do different jobs, and most people need both.',
			'HIIT — short, hard intervals with recovery between — is the fastest way to improve your top-end fitness. It burns a lot of calories in a short session, and the afterburn effect is real, if smaller than the internet claims.',
			'Steady cardio — 30 to 45 minutes at a pace where you can still talk — builds the aerobic base that everything else sits on. It improves recovery between sets, between sessions and between hard weeks. It is also far easier on your joints.',
			'The practical split we use at APEX: two HIIT sessions a week for most members, plus two or three easy steady sessions — walking, cycling, easy rowing — on top. That combination improves fitness faster than either one alone, and people actually stick to it.',
			'One warning: HIIT only works if it is actually hard. If you can hold a conversation during your work interval, it is not HIIT — it is a moderate workout with long rests. Our coaches watch heart-rate zones live in class so the intensity is honest.',
			'Start with the base, add the intensity, and let the two feed each other. That is how conditioning is built to last.'
		]
	},
	{
		slug: 'nutrition-basics-for-training',
		title: 'Nutrition Basics for People Who Actually Train',
		excerpt:
			'You do not need a perfect diet. You need enough protein, enough food, and a plan you can repeat on a busy Tuesday.',
		image: u('1571019613454-1cb2f99b2d8b', 1200),
		date: 'Oct 27, 2026',
		readTime: '7 min read',
		author: 'Maria Rodriguez',
		category: 'Nutrition',
		body: [
			'Most nutrition advice fails for one reason: it is written for people with unlimited time. If you train four times a week, work full-time and have a life, you need rules that survive a busy Tuesday.',
			'Rule one is protein. Aim for roughly 1.6 to 2 grams per kilogram of bodyweight per day, spread across three or four meals. That is the single biggest lever for building muscle and keeping it while you lose fat.',
			'Rule two is: eat enough. People who train hard and under-eat do not get lean — they get tired, weak and injured. If your performance is dropping for two weeks in a row, food is the first thing to check, not your program.',
			'Rule three is the boring one: mostly whole foods, mostly cooked at home, with a plan for the moments that usually break you. Keep a high-protein breakfast you can make in five minutes. Keep a post-training meal you actually like.',
			'Supplements are the last 5 percent. Creatine monohydrate is the one with the strongest evidence behind it. Everything else is optional — and none of it replaces food and sleep.',
			'If you want help, that is what our nutrition starter plan is for. Premium members get one with their membership, and your coach builds it around the food you already eat — not a diet from the internet.'
		]
	}
];

export const allRoutes = [
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
	'/privacy-policy',
	'/terms',
	'/sitemap'
];
