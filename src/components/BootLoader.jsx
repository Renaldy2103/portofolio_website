import { useState, useEffect } from 'react';

const BOOT_STEPS = [
  { threshold: 0, text: 'INITIALIZING INTERFACE' },
  { threshold: 30, text: 'LOADING ASSETS & MODELS' },
  { threshold: 70, text: 'CALIBRATING 3D GRAPHICS' },
  { threshold: 95, text: 'READY' },
];

export default function BootLoader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('INITIALIZING INTERFACE');
  const [isExiting, setIsExiting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Lock scroll during boot
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const startTime = Date.now();
    const duration = 1400; // 1.4s smooth duration

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const rawProgress = Math.min(100, Math.floor((elapsed / duration) * 100));

      // Ease out progress curve
      const easedProgress = Math.min(
        100,
        Math.floor(100 * Math.sin((rawProgress / 100) * (Math.PI / 2)))
      );

      setProgress(easedProgress);

      for (let i = BOOT_STEPS.length - 1; i >= 0; i--) {
        if (easedProgress >= BOOT_STEPS[i].threshold) {
          setStatusText(BOOT_STEPS[i].text);
          break;
        }
      }

      if (elapsed >= duration) {
        clearInterval(interval);
        setProgress(100);
        setStatusText('WELCOME');

        // Smooth exit phase
        setTimeout(() => {
          setIsExiting(true);
        }, 220);

        setTimeout(() => {
          setIsFinished(true);
          document.body.style.overflow = originalOverflow;
          if (onComplete) onComplete();
        }, 750);
      }
    }, 25);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = originalOverflow;
    };
  }, [onComplete]);

  if (isFinished) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#050505] select-none transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isExiting ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background Radial Glow */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-[#00bfff]/10 blur-[120px] pointer-events-none -z-10" />

      {/* Subtle Grid Accent */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#00bfff 1px, transparent 1px), linear-gradient(90deg, #00bfff 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative flex flex-col items-center max-w-sm px-6 text-center">
        {/* Monogram / Cyber Badge */}
        <div className="relative mb-6">
          <div className="w-16 h-16 rounded-2xl glass-card border border-[#00bfff]/30 flex items-center justify-center shadow-[0_0_30px_rgba(0,191,255,0.25)] relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#00bfff]/20 via-transparent to-transparent opacity-80" />
            <span className="font-display font-black text-2xl tracking-tighter text-white">
              R<span className="text-[#00bfff]">.</span>
            </span>
            {/* Shimmer line */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"
            />
          </div>
          {/* Pulsing outer ring */}
          <div className="absolute -inset-1 rounded-2xl border border-[#00bfff]/20 animate-ping opacity-30 pointer-events-none" />
        </div>

        {/* Brand Title */}
        <h1 className="text-white font-extrabold text-base sm:text-lg tracking-[0.25em] uppercase mb-1">
          Renaldy Syaputra
        </h1>
        <p className="text-gray-500 text-[11px] font-mono tracking-widest uppercase mb-8">
          AI & Software Developer
        </p>

        {/* Progress Bar Container */}
        <div className="w-64 sm:w-72">
          {/* Progress track */}
          <div className="w-full h-[3px] bg-white/10 rounded-full overflow-hidden relative mb-3">
            <div
              className="h-full bg-gradient-to-r from-[#00bfff] via-[#52d7ff] to-[#9be4ff] rounded-full transition-all duration-75 ease-out shadow-[0_0_12px_rgba(0,191,255,0.8)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Status info bar */}
          <div className="flex items-center justify-between text-[11px] font-mono text-gray-400">
            <span className="text-[#00bfff] tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00bfff] animate-pulse" />
              {statusText}
            </span>
            <span className="font-bold text-gray-300">
              {progress.toString().padStart(2, '0')}%
            </span>
          </div>
        </div>

        {/* Terminal detail footer */}
        <div className="mt-8 text-[10px] font-mono text-gray-600 tracking-widest uppercase">
          SYSTEM_BOOT // INITIALIZING
        </div>
      </div>
    </div>
  );
}
