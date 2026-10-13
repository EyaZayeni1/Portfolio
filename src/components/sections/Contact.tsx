import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Check, Copy, Info, MapPin, Send } from 'lucide-react';
import { contactText, personalInfo, socialLinks } from '../../data/portfolio';
import { externalLinkProps } from '../../lib/utils';
import { SectionHeading } from '../ui/SectionHeading';
import { SocialIcon } from '../ui/SocialIcon';
import type { SocialLink } from '../../types/portfolio';

/** Keeps the generated mailto: URL within limits that email clients accept. */
const MESSAGE_MAX_LENGTH = 1500;

type FormValues = { name: string; email: string; subject: string; message: string };
const emptyForm: FormValues = { name: '', email: '', subject: '', message: '' };

/** Human-readable value for a social link, e.g. "@EyaZayeni1" or "/in/eya-zayeni". */
function displayValue(link: SocialLink) {
  if (link.icon === 'email') return link.href.replace(/^mailto:/, '');
  try {
    const path = new URL(link.href).pathname.replace(/\/$/, '');
    return link.icon === 'github' ? `@${path.slice(1)}` : path;
  } catch {
    return link.href;
  }
}

export function Contact() {
  const [values, setValues] = useState<FormValues>(emptyForm);
  const [mailtoOpened, setMailtoOpened] = useState(false);
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle');

  useEffect(() => {
    if (copyState === 'idle') return;
    const timeout = window.setTimeout(() => setCopyState('idle'), 2000);
    return () => window.clearTimeout(timeout);
  }, [copyState]);

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // There is no backend: hand the message to the visitor's own email app.
    const body = `${values.message}\n\n— ${values.name} (${values.email})`;
    const href = `mailto:${personalInfo.email}?subject=${encodeURIComponent(values.subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
    setMailtoOpened(true);
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setCopyState('copied');
    } catch {
      setCopyState('failed');
    }
  }

  return (
    <section id="contact" className="section-padding relative">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Contact" title={contactText.title} description={contactText.subtitle} />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex flex-col gap-4"
          >
            <div className="flex items-center gap-2 text-sm capitalize text-text-secondary">
              <MapPin className="h-4 w-4 text-accent-500" aria-hidden="true" />
              {personalInfo.location}
            </div>

            {socialLinks.map((link) => (
              <div key={link.label} className="relative">
                <a
                  href={link.href}
                  {...externalLinkProps(link.href)}
                  className="group flex items-center gap-4 rounded-2xl border border-border-subtle bg-surface-elevated p-4 pr-14 transition-[border-color,transform] hover:-translate-y-0.5 hover:border-accent-500/30"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-500/10 text-accent-500 transition-colors group-hover:bg-accent-500 group-hover:text-white">
                    <SocialIcon icon={link.icon} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-wider text-text-tertiary">
                      {link.label}
                    </p>
                    <p className="truncate text-sm font-medium text-text-primary">{displayValue(link)}</p>
                  </div>
                </a>
                {link.icon === 'email' && (
                  <button
                    type="button"
                    onClick={copyEmail}
                    aria-label="Copy email address"
                    title="Copy email address"
                    className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-text-tertiary transition-colors hover:bg-surface-muted hover:text-text-primary"
                  >
                    {copyState === 'copied' ? (
                      <Check className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                )}
              </div>
            ))}
            <p role="status" aria-live="polite" className="min-h-4 text-xs text-text-tertiary">
              {copyState === 'copied' && 'Email address copied to clipboard.'}
              {copyState === 'failed' && `Couldn't copy automatically — the address is ${personalInfo.email}.`}
            </p>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            className="rounded-3xl border border-border-subtle bg-surface-elevated p-6 sm:p-8"
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field id="name" label="Name" placeholder="Your name" autoComplete="name" value={values.name} onChange={handleChange} />
              <Field id="email" label="Email" type="email" placeholder="you@example.com" autoComplete="email" value={values.email} onChange={handleChange} />
            </div>
            <div className="mt-5">
              <Field id="subject" label="Subject" placeholder="Internship, project, question…" value={values.subject} onChange={handleChange} />
            </div>
            <div className="mt-5">
              <div className="mb-1.5 flex items-baseline justify-between">
                <label htmlFor="message" className="block text-xs font-medium text-text-secondary">
                  Message
                </label>
                <span className="font-mono text-[11px] text-text-tertiary">
                  {values.message.length}/{MESSAGE_MAX_LENGTH}
                </span>
              </div>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                maxLength={MESSAGE_MAX_LENGTH}
                value={values.message}
                onChange={handleChange}
                placeholder="Tell me about your project or opportunity..."
                className="w-full resize-none rounded-xl border border-border-subtle bg-surface-muted px-4 py-3 text-sm text-text-primary outline-none transition-colors placeholder:text-text-tertiary focus:border-accent-500 focus-visible:ring-2 focus-visible:ring-accent-500/30"
              />
            </div>

            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-text-primary px-6 py-3.5 text-sm font-semibold text-surface transition-colors hover:bg-accent-600 hover:text-white dark:bg-white dark:text-black dark:hover:bg-accent-500 dark:hover:text-white sm:w-auto"
              >
                Write in my email app
                <Send className="h-4 w-4" aria-hidden="true" />
              </motion.button>
              <p className="flex items-start gap-1.5 text-xs text-text-tertiary">
                <Info className="mt-px h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                Opens your email app with this message pre-filled — nothing is sent from this site.
              </p>
            </div>

            <p role="status" aria-live="polite" className="mt-4 text-sm text-text-secondary">
              {mailtoOpened && (
                <>
                  Your email app should now be open with the draft — just press send there. Nothing
                  opened? Write to me directly at{' '}
                  <a href={`mailto:${personalInfo.email}`} className="font-medium text-accent-600 underline-offset-4 hover:underline dark:text-accent-300">
                    {personalInfo.email}
                  </a>
                  .
                </>
              )}
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

interface FieldProps {
  id: keyof FormValues;
  label: string;
  placeholder: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  autoComplete?: string;
}

function Field({ id, label, placeholder, value, onChange, type = 'text', autoComplete }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-medium text-text-secondary">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-xl border border-border-subtle bg-surface-muted px-4 py-3 text-sm text-text-primary outline-none transition-colors placeholder:text-text-tertiary focus:border-accent-500 focus-visible:ring-2 focus-visible:ring-accent-500/30"
      />
    </div>
  );
}
