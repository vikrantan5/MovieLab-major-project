import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
// ✅ Correct
import {
  Code2, Rocket, Youtube, BrainCircuit, GraduationCap, Briefcase,
  Github, Linkedin, Twitter, Mail, ArrowRight, Sparkles, Trophy, Layers,
} from 'lucide-react';
import PageHeader from './partials/PageHeader';

const ROLES = ['Full Stack Developer', 'YouTuber', 'Problem Solver', 'Open-source Tinkerer'];

const useTypingLoop = (words, speed = 70, pause = 1400) => {
  const [text, setText] = useState('');
  const [i, setI] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = words[i % words.length];
    const t = setTimeout(() => {
      if (!deleting && text === current) { setDeleting(true); return; }
      if (deleting && text === '') { setDeleting(false); setI(i + 1); return; }
      setText(deleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1));
    }, deleting ? speed / 2 : text === current ? pause : speed);
    return () => clearTimeout(t);
  }, [text, deleting, i, words, speed, pause]);
  return text;
};

const useCounter = (target, duration = 1400, start) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf;
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / duration);
      setVal(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return val;
};

const Particles = () => {
  const dots = useMemo(() => Array.from({ length: 36 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    s: Math.random() * 3 + 1,
    d: Math.random() * 8 + 6,
    delay: Math.random() * 4,
  })), []);
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-[#ef3e54]/40"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.s, height: p.s }}
          animate={{ y: [0, -20, 0], opacity: [0.2, 0.9, 0.2] }}
          transition={{ duration: p.d, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
};

const STATS = [
  { label: 'Projects', value: 32, icon: Layers },
  { label: 'Years', value: 4, icon: Trophy, suffix: '+' },
  { label: 'Technologies', value: 18, icon: Code2 },
  { label: 'YouTube subs', value: 2400, icon: Youtube, suffix: '+' },
];

const SKILLS = [
  { name: 'HTML', color: '#e34f26' },
  { name: 'CSS', color: '#1572b6' },
  { name: 'JavaScript', color: '#f7df1e' },
  { name: 'React', color: '#61dafb' },
  { name: 'Next.js', color: '#ffffff' },
  { name: 'Node.js', color: '#68a063' },
  { name: 'Express', color: '#a1a1aa' },
  { name: 'MongoDB', color: '#4db33d' },
  { name: 'Tailwind', color: '#38bdf8' },
  { name: 'Docker', color: '#2496ed' },
  { name: 'Kubernetes', color: '#326ce5' },
  { name: 'TypeScript', color: '#3178c6' },
];

const TIMELINE = [
  { year: '2015', title: 'School', desc: 'Discovered the joy of computers — built my first “Hello World”.', icon: GraduationCap },
  { year: '2019', title: 'Engineering', desc: 'Studied CS fundamentals, algorithms and DSA.', icon: BrainCircuit },
  { year: '2021', title: 'Web Development', desc: 'Fell in love with React and the modern JS ecosystem.', icon: Code2 },
  { year: '2022', title: 'Content Creation', desc: 'Started teaching what I learned on YouTube.', icon: Youtube },
  { year: '2024', title: 'Current Projects', desc: 'Shipping production-grade full-stack apps.', icon: Rocket },
  { year: 'Today', title: 'Tech Stack', desc: 'React · Next.js · Node · Mongo · Docker · K8s.', icon: Briefcase },
];

const FUN_FACTS = [
  { title: 'Coffee → Code', desc: 'Best ideas at 2 AM.' },
  { title: 'Build in public', desc: 'I share what I build.' },
  { title: 'CSS is poetry', desc: 'Pixel-perfect or nothing.' },
  { title: 'Always learning', desc: 'Curiosity > comfort.' },
];

const StatCard = ({ s, start }) => {
  const value = useCounter(s.value, 1500, start);
  const Icon = s.icon;
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 hover:border-[#ef3e54]/40 transition-colors">
      <Icon size={18} className="text-[#ef3e54]" />
      <p className="mt-3 text-3xl font-bold text-white font-mono">{value.toLocaleString()}{s.suffix || ''}</p>
      <p className="text-xs text-zinc-500 uppercase tracking-wider mt-1">{s.label}</p>
    </div>
  );
};

const About = () => {
  document.title = 'MovieLab — About';
  const role = useTypingLoop(ROLES);
  const statsRef = useRef(null);
  const inView = useInView(statsRef, { once: true, amount: 0.4 });

  return (
    <div data-testid="about-page">
      <PageHeader title="About" subtitle="The mind behind MovieLab" />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <Particles />
        <div className="absolute -top-32 -left-20 h-[400px] w-[400px] rounded-full bg-[#ef3e54]/20 blur-[120px]" />
        <div className="absolute -bottom-32 -right-20 h-[400px] w-[400px] rounded-full bg-indigo-500/20 blur-[120px]" />

        <div className="relative px-4 sm:px-6 lg:px-10 py-12 sm:py-20 lg:py-24 grid grid-cols-1 md:grid-cols-[1fr_clamp(220px,28vw,360px)] gap-8 sm:gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ef3e54]/15 border border-[#ef3e54]/30 text-[#ef3e54] text-[10px] sm:text-xs font-semibold uppercase tracking-wider">
              <Sparkles size={12} /> Hello there
            </span>
            <h1 className="mt-4 font-cinema text-glow text-white leading-[0.95]" style={{ fontSize: 'clamp(2.4rem, 8vw, 6rem)' }}>
              Hi, I&apos;m <span className="gradient-text">Vikrant Singh</span>
            </h1>
            <p className="mt-3 text-zinc-300 text-base sm:text-xl">
              <span className="font-mono text-[#ef3e54]">{role}</span>
              <span className="caret">|</span>
            </p>
            <p className="mt-5 text-sm sm:text-base text-zinc-400 max-w-xl">
              Building modern web applications and creating content that educates millions.
              I love crafting interfaces that feel alive and shipping products that solve real problems.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/contact" className="btn-primary text-sm sm:text-base" data-testid="about-cta-contact">
                Let&apos;s Connect <ArrowRight size={16} />
              </Link>
              <a href="https://github.com/vikrantan5" target="_blank" rel="noopener noreferrer" className="btn-secondary text-sm sm:text-base">
                <Github size={16} /> GitHub
              </a>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.1 }} className="mx-auto">
            <div className="relative">
              <div className="absolute -inset-2 rounded-[2rem] bg-gradient-to-tr from-[#ef3e54] via-fuchsia-500 to-amber-400 blur-2xl opacity-40 animate-pulse" />
              <div className="relative rounded-[2rem] overflow-hidden border-2 border-white/10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]">
                <img src="/myi.jpg" alt="Vikrant Singh" className="w-[clamp(220px,32vw,360px)] h-[clamp(280px,40vw,440px)] object-cover" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section ref={statsRef} className="px-4 sm:px-6 lg:px-10 py-8 sm:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {STATS.map((s) => <StatCard key={s.label} s={s} start={inView} />)}
        </div>
      </section>

      {/* SKILLS */}
      <section className="px-4 sm:px-6 lg:px-10 py-10 sm:py-14">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-6 w-1 rounded-full bg-gradient-to-b from-[#ef3e54] to-[#c9304a]" />
          <h2 className="text-xl sm:text-2xl font-bold text-white">Tech I love</h2>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {SKILLS.map((sk, i) => (
            <motion.div
              key={sk.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
              whileHover={{ y: -4 }}
              className="rounded-xl border border-white/10 bg-white/[0.03] hover:border-white/20 px-3 py-4 flex flex-col items-center gap-2 cursor-default"
            >
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: sk.color, boxShadow: `0 0 12px ${sk.color}` }} />
              <span className="text-xs sm:text-sm font-semibold text-zinc-200">{sk.name}</span>
            </motion.div>
          ))}
        </div>

        {/* Marquee row */}
        <div className="mt-8 overflow-hidden border-y border-white/5 py-4">
          <div className="flex gap-10 animate-marquee whitespace-nowrap">
            {[...SKILLS, ...SKILLS].map((s, i) => (
              <span key={i} className="text-zinc-500 text-sm font-mono">{s.name}<span className="text-[#ef3e54] mx-3">·</span></span>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="px-4 sm:px-6 lg:px-10 py-10 sm:py-14">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-6 w-1 rounded-full bg-gradient-to-b from-[#ef3e54] to-[#c9304a]" />
          <h2 className="text-xl sm:text-2xl font-bold text-white">My journey</h2>
        </div>
        <div className="relative pl-6 sm:pl-10">
          <div className="absolute left-2 sm:left-4 top-0 bottom-0 w-px bg-gradient-to-b from-[#ef3e54]/0 via-[#ef3e54]/60 to-[#ef3e54]/0" />
          {TIMELINE.map((t, i) => {
            const Icon = t.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: i * 0.05 }}
                className="relative mb-6 last:mb-0"
              >
                <div className="absolute -left-6 sm:-left-10 top-2 h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-gradient-to-br from-[#ef3e54] to-[#c9304a] flex items-center justify-center shadow-lg shadow-[#ef3e54]/30">
                  <Icon size={14} className="text-white" />
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 sm:p-5">
                  <p className="text-[11px] uppercase tracking-wider text-[#ef3e54] font-mono">{t.year}</p>
                  <h3 className="mt-1 text-base sm:text-lg font-semibold text-white">{t.title}</h3>
                  <p className="mt-1 text-sm text-zinc-400">{t.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* FUN FACTS */}
      <section className="px-4 sm:px-6 lg:px-10 py-10 sm:py-14">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-6 w-1 rounded-full bg-gradient-to-b from-[#ef3e54] to-[#c9304a]" />
          <h2 className="text-xl sm:text-2xl font-bold text-white">Fun facts</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {FUN_FACTS.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 hover:border-[#ef3e54]/40 transition-colors"
            >
              <p className="text-sm font-bold text-white">{f.title}</p>
              <p className="mt-1 text-xs text-zinc-400">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 lg:px-10 pb-16 sm:pb-24">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#ef3e54]/20 via-transparent to-indigo-500/20 p-6 sm:p-10">
          <div className="absolute -top-20 -right-20 h-[300px] w-[300px] rounded-full bg-[#ef3e54]/20 blur-[100px]" />
          <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-6 justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Let&apos;s build something cool.</h2>
              <p className="mt-2 text-sm sm:text-base text-zinc-300 max-w-xl">Have a project, idea, or just want to say hi? My inbox is always open.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/contact" className="btn-primary text-sm sm:text-base" data-testid="about-cta-contact-2">
                <Mail size={16} /> Get in touch
              </Link>
              <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="btn-secondary text-sm sm:text-base">
                <Linkedin size={16} /> LinkedIn
              </a>
              <a href="https://www.x.com/" target="_blank" rel="noopener noreferrer" className="btn-secondary text-sm sm:text-base">
                <Twitter size={16} /> Twitter
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
