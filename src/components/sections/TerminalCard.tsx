import type { PointerEvent } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { CheckCircle2, GitBranch, User } from 'lucide-react';
import { personalInfo } from '../../data/portfolio';

/** Two tech names per line, e.g. ["React","TypeScript","Python","AI/ML"] -> ["'React', 'TypeScript',", "'Python', 'AI/ML'"]. */
function formatStackLines(stack: string[]): string[] {
  const lines: string[] = [];
  for (let i = 0; i < stack.length; i += 2) {
    const isLast = i + 2 >= stack.length;
    lines.push(stack.slice(i, i + 2).map((tech) => `'${tech}'`).join(', ') + (isLast ? '' : ','));
  }
  return lines;
}

const codeLines = [
  { indent: 0, text: 'const engineer = {' },
  { indent: 1, text: `name: '${personalInfo.name}',` },
  { indent: 1, text: `role: '${personalInfo.roles[0] ?? personalInfo.role}',` },
  { indent: 1, text: 'stack: [' },
  ...formatStackLines(personalInfo.heroStack).map((text) => ({ indent: 2, text })),
  { indent: 1, text: '],' },
  { indent: 1, text: 'passion: 100,' },
  { indent: 0, text: '};' },
];

const MAX_TILT_DEG = 6;

export function TerminalCard() {
  const reduceMotion = useReducedMotion();
  // Pointer position relative to the card centre, in the range -0.5 … 0.5.
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const spring = { stiffness: 150, damping: 18 };
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [MAX_TILT_DEG, -MAX_TILT_DEG]), spring);
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-MAX_TILT_DEG, MAX_TILT_DEG]), spring);

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (reduceMotion || event.pointerType !== 'mouse') return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function resetTilt() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <motion.div
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className="relative mx-auto w-full max-w-md"
    >
      {/* Floating avatar placeholder card */}
      <motion.div
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="glass absolute -right-6 -top-8 z-20 flex w-44 items-center gap-3 rounded-2xl border border-border-subtle p-3 shadow-xl shadow-black/5"
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-accent-500 to-accent2-500 text-white">
          {personalInfo.avatarImage ? (
            <img
              src={personalInfo.avatarImage}
              alt=""
              width={40}
              height={40}
              className="h-full w-full object-cover"
            />
          ) : (
            <User className="h-5 w-5" strokeWidth={1.75} />
          )}
        </div>
        <div className="min-w-0">
          <p className="truncate text-xs font-semibold text-text-primary">
            {personalInfo.initials} · {personalInfo.avatarImage ? 'On track' : 'Photo slot'}
          </p>
          <p className="truncate text-[10px] text-text-tertiary">
            {personalInfo.avatarImage ? personalInfo.role : 'Add your portrait later'}
          </p>
        </div>
      </motion.div>

      {/* Floating status card */}
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="glass absolute -bottom-6 -left-8 z-20 flex items-center gap-2.5 rounded-2xl border border-border-subtle px-4 py-3 shadow-xl shadow-black/5"
      >
        <CheckCircle2 className="h-4 w-4 text-emerald-500" strokeWidth={2} />
        <div>
          <p className="text-xs font-semibold text-text-primary">Build passing</p>
          <p className="font-mono text-[10px] text-text-tertiary">main · 0 errors</p>
        </div>
      </motion.div>

      {/* Glow */}
      <div
        className="absolute inset-6 -z-10 rounded-full opacity-30 blur-3xl"
        style={{
          background:
            'linear-gradient(135deg, var(--color-accent-500), var(--color-accent2-500))',
        }}
      />

      {/* Terminal window */}
      <div className="overflow-hidden rounded-2xl border border-border-subtle bg-[#0d0f16] shadow-2xl shadow-black/20">
        <div className="flex items-center gap-2 border-b border-white/[0.06] bg-white/[0.03] px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <span className="ml-2 flex items-center gap-1.5 font-mono text-[11px] text-white/40">
            <GitBranch className="h-3 w-3" />
            profile.ts
          </span>
        </div>
        <div className="space-y-1.5 p-5 font-mono text-[13px] leading-relaxed">
          {codeLines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 + i * 0.09, duration: 0.4 }}
              style={{ paddingLeft: `${line.indent * 1.1}rem` }}
              className="whitespace-pre text-white/80"
            >
              <SyntaxLine text={line.text} />
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 + codeLines.length * 0.09 + 0.2 }}
            className="flex items-center gap-1.5 pt-2 text-white/50"
          >
            <span className="text-accent2-400">❯</span>
            <span className="inline-block h-4 w-2 animate-blink bg-white/70" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

/** Extremely light hand-rolled syntax highlighting for the fake code snippet. */
function SyntaxLine({ text }: { text: string }) {
  const stringMatch = text.match(/'([^']*)'/g);
  if (!stringMatch) {
    return <span className="text-indigo-300">{text}</span>;
  }

  const parts = text.split(/('[^']*')/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("'") ? (
          <span key={i} className="text-emerald-400">
            {part}
          </span>
        ) : (
          <span key={i} className="text-indigo-300">
            {part}
          </span>
        )
      )}
    </>
  );
}
