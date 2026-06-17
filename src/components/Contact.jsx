import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import {
  Mail, MapPin, Phone, Send, Github, Linkedin, Youtube, Twitter,
  Loader2, CheckCircle2, MessageCircle,
} from 'lucide-react';
import PageHeader from './partials/PageHeader';

const schema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(60, 'Name is too long'),
  email: z.string().trim().email('Please enter a valid email'),
  subject: z.string().trim().min(3, 'Subject must be at least 3 characters').max(100, 'Subject is too long'),
  message: z.string().trim().min(10, 'Message must be at least 10 characters').max(1000, 'Message is too long'),
});

const MAX_MSG = 1000;

const InfoCard = ({ icon: Icon, label, value, href, testid }) => {
  const content = (
    <div className="group flex items-center gap-4 p-4 rounded-2xl border border-white/10 bg-white/[0.03] hover:border-[#ef3e54]/40 transition-colors backdrop-blur" data-testid={testid}>
      <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-[#ef3e54] to-[#c9304a] flex items-center justify-center shrink-0">
        <Icon size={18} className="text-white" />
      </div>
      <div className="min-w-0">
        <p className="text-[11px] uppercase tracking-wider text-zinc-500">{label}</p>
        <p className="text-sm font-semibold text-white truncate group-hover:text-[#ef3e54] transition-colors">{value}</p>
      </div>
    </div>
  );
  return href ? <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">{content}</a> : content;
};

const Social = ({ icon: Icon, href, label }) => (
  <a
    href={href}
    aria-label={label}
    target="_blank"
    rel="noopener noreferrer"
    className="group h-11 w-11 rounded-full border border-white/10 bg-white/[0.03] hover:bg-[#ef3e54]/15 hover:border-[#ef3e54]/40 flex items-center justify-center transition-colors"
  >
    <Icon size={16} className="text-zinc-300 group-hover:text-[#ef3e54] transition-colors" />
  </a>
);

const Contact = () => {
  document.title = 'MovieLab — Contact';
  const [sent, setSent] = useState(false);

  const {
    register, handleSubmit, watch, reset, formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema), defaultValues: { name: '', email: '', subject: '', message: '' } });

  const msg = watch('message') || '';

  const onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 900));
    console.log('Contact form submitted:', data);
    toast.success(`Thanks ${data.name}! I'll reply soon.`);
    setSent(true);
    reset();
    setTimeout(() => setSent(false), 3200);
  };

  return (
    <div data-testid="contact-page">
      <PageHeader title="Contact" subtitle="Let's start a conversation" />

      {/* HERO */}
      <section className="relative overflow-hidden px-4 sm:px-6 lg:px-10 py-10 sm:py-14">
        <div className="absolute -top-20 -left-20 h-[300px] w-[300px] rounded-full bg-[#ef3e54]/15 blur-[100px]" />
        <div className="absolute -bottom-20 -right-20 h-[300px] w-[300px] rounded-full bg-indigo-500/15 blur-[100px]" />
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative max-w-3xl">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ef3e54]/15 border border-[#ef3e54]/30 text-[#ef3e54] text-[10px] sm:text-xs font-semibold uppercase tracking-wider">
            <MessageCircle size={12} /> Get in touch
          </span>
          <h1 className="mt-4 font-cinema text-glow text-white leading-[0.95]" style={{ fontSize: 'clamp(2.2rem, 6.5vw, 4.8rem)' }}>
            Say <span className="gradient-text">hello</span>.
          </h1>
          <p className="mt-3 text-sm sm:text-base text-zinc-400 max-w-xl">
            Got a question, a project idea, or just want to chat about movies? Drop me a message — I typically reply within 24 hours.
          </p>
        </motion.div>
      </section>

      <section className="px-4 sm:px-6 lg:px-10 pb-16 sm:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-[clamp(320px,40%,460px)_1fr] gap-6 lg:gap-8">
          {/* LEFT: Info */}
          <motion.aside initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.55 }} className="space-y-4">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur">
              <h2 className="text-lg font-bold text-white mb-1">Contact information</h2>
              <p className="text-xs text-zinc-500 mb-5">Pick your favorite channel.</p>
              <div className="space-y-3">
                <InfoCard icon={Mail} label="Email" value="virantsingan5@gmail.com" href="mailto:virantsingan5@gmail.com" testid="contact-email" />
                <InfoCard icon={MapPin} label="Location" value="India" testid="contact-location" />
                <InfoCard icon={Phone} label="Response time" value="Within 24 hours" testid="contact-response" />
              </div>

              <div className="mt-6">
                <p className="text-[11px] uppercase tracking-wider text-zinc-500 mb-3">Find me online</p>
                <div className="flex items-center gap-3">
                  <Social icon={Github} href="https://github.com/vikrantan5" label="GitHub" />
                  <Social icon={Linkedin} href="https://www.linkedin.com/" label="LinkedIn" />
                  <Social icon={Youtube} href="https://www.youtube.com/" label="YouTube" />
                  <Social icon={Twitter} href="https://www.x.com/" label="Twitter" />
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#ef3e54]/15 via-transparent to-indigo-500/15 p-6">
              <p className="text-sm font-bold text-white">Open to opportunities</p>
              <p className="mt-1 text-xs text-zinc-300">Freelance · Collaborations · Tech talks</p>
            </div>
          </motion.aside>

          {/* RIGHT: Form */}
          <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.55, delay: 0.08 }}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 backdrop-blur"
              data-testid="contact-form"
              noValidate
            >
              <h2 className="text-lg font-bold text-white">Send a message</h2>
              <p className="text-xs text-zinc-500">All fields are required.</p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-[11px] uppercase tracking-wider text-zinc-400 mb-1.5">Name</label>
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    {...register('name')}
                    className="w-full rounded-xl bg-[#14141c] border border-white/10 focus:border-[#ef3e54]/60 outline-none px-3 py-2.5 text-sm text-white placeholder:text-zinc-600 transition-colors"
                    placeholder="Your name"
                    aria-invalid={!!errors.name}
                    data-testid="contact-name"
                  />
                  {errors.name && <p className="mt-1 text-[11px] text-red-400">{errors.name.message}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-[11px] uppercase tracking-wider text-zinc-400 mb-1.5">Email</label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    {...register('email')}
                    className="w-full rounded-xl bg-[#14141c] border border-white/10 focus:border-[#ef3e54]/60 outline-none px-3 py-2.5 text-sm text-white placeholder:text-zinc-600 transition-colors"
                    placeholder="you@example.com"
                    aria-invalid={!!errors.email}
                    data-testid="contact-email-input"
                  />
                  {errors.email && <p className="mt-1 text-[11px] text-red-400">{errors.email.message}</p>}
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="subject" className="block text-[11px] uppercase tracking-wider text-zinc-400 mb-1.5">Subject</label>
                <input
                  id="subject"
                  type="text"
                  {...register('subject')}
                  className="w-full rounded-xl bg-[#14141c] border border-white/10 focus:border-[#ef3e54]/60 outline-none px-3 py-2.5 text-sm text-white placeholder:text-zinc-600 transition-colors"
                  placeholder="What's it about?"
                  data-testid="contact-subject"
                />
                {errors.subject && <p className="mt-1 text-[11px] text-red-400">{errors.subject.message}</p>}
              </div>

              <div className="mt-4">
                <div className="flex items-end justify-between mb-1.5">
                  <label htmlFor="message" className="block text-[11px] uppercase tracking-wider text-zinc-400">Message</label>
                  <span className={`text-[11px] font-mono ${msg.length > MAX_MSG ? 'text-red-400' : 'text-zinc-500'}`}>{msg.length}/{MAX_MSG}</span>
                </div>
                <textarea
                  id="message"
                  rows={6}
                  {...register('message')}
                  className="w-full rounded-xl bg-[#14141c] border border-white/10 focus:border-[#ef3e54]/60 outline-none px-3 py-2.5 text-sm text-white placeholder:text-zinc-600 resize-none transition-colors"
                  placeholder="Tell me a bit about your idea, project, or just say hi…"
                  data-testid="contact-message"
                />
                {errors.message && <p className="mt-1 text-[11px] text-red-400">{errors.message.message}</p>}
              </div>

              <div className="mt-6 flex items-center justify-between gap-4">
                <p className="text-[11px] text-zinc-500">
                  By submitting you agree to be contacted via email.
                </p>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary text-sm sm:text-base"
                  data-testid="contact-submit-btn"
                >
                  {isSubmitting ? <><Loader2 size={16} className="animate-spin" /> Sending…</> :
                    sent ? <><CheckCircle2 size={16} /> Sent!</> :
                      <><Send size={16} /> Send message</>}
                </button>
              </div>

              {sent && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2.5 text-sm text-emerald-300 flex items-center gap-2"
                  data-testid="contact-success"
                >
                  <CheckCircle2 size={16} /> Thanks for reaching out — I&apos;ll reply soon!
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
