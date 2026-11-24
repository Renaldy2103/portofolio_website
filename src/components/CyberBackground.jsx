/**
 * Lightweight, GPU-composited Cyber-Dark Aurora Background.
 * Combines counter-drifting aurora light curtains (cyan, sky-blue, teal, indigo)
 * with a subtle architectural grid — 0 WebGL contexts, silky 60fps on desktop & mobile.
 */
export default function CyberBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-20 overflow-hidden bg-[#04060b]"
    >
      {/* Upper Aurora Curtain Layer 1 — sweeping cyan & royal blue bands */}
      <div className="cyber-aurora-layer cyber-aurora-one" />

      {/* Upper Aurora Curtain Layer 2 — counter-drifting aqua & ice-blue shimmer */}
      <div className="cyber-aurora-layer cyber-aurora-two" />

      {/* Mid/Lower Ambient Aurora Horizon — keeps scrolled sections atmospheric, never plain */}
      <div className="cyber-aurora-layer cyber-aurora-three" />

      {/* Subtle top zenith glow */}
      <div
        className="absolute inset-x-0 top-[-15%] h-[520px]"
        style={{
          background:
            'radial-gradient(62% 52% at 50% 0%, rgba(0, 191, 255, 0.18) 0%, rgba(37, 99, 235, 0.08) 52%, transparent 82%)',
        }}
      />

      {/* Fine cyber grid overlay masked softly */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(0, 191, 255, 0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 191, 255, 0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse 85% 75% at 50% 38%, #000 25%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 85% 75% at 50% 38%, #000 25%, transparent 100%)',
        }}
      />

      <style>{`
        .cyber-aurora-layer {
          position: absolute;
          pointer-events: none;
          will-change: transform, opacity;
        }

        .cyber-aurora-one {
          top: -24%;
          left: -18%;
          width: 136%;
          height: 68vh;
          min-height: 440px;
          filter: blur(54px);
          opacity: 0.85;
          background: linear-gradient(
            114deg,
            transparent 6%,
            rgba(0, 191, 255, 0.28) 20%,
            rgba(125, 211, 252, 0.16) 31%,
            transparent 45%,
            rgba(37, 99, 235, 0.26) 60%,
            rgba(20, 184, 166, 0.2) 74%,
            transparent 90%
          );
          mask-image: radial-gradient(ellipse 78% 72% at 50% 34%, #000 35%, transparent 95%);
          -webkit-mask-image: radial-gradient(ellipse 78% 72% at 50% 34%, #000 35%, transparent 95%);
          animation: auroraWaveOne 16s ease-in-out infinite alternate;
        }

        .cyber-aurora-two {
          top: -18%;
          right: -20%;
          width: 132%;
          height: 62vh;
          min-height: 400px;
          filter: blur(60px);
          opacity: 0.78;
          background: conic-gradient(
            from 202deg at 54% 26%,
            transparent 0deg,
            rgba(0, 191, 255, 0.24) 42deg,
            rgba(186, 230, 253, 0.14) 76deg,
            rgba(59, 130, 246, 0.22) 124deg,
            rgba(16, 185, 129, 0.14) 158deg,
            transparent 205deg
          );
          mask-image: radial-gradient(ellipse 75% 68% at 52% 32%, #000 30%, transparent 92%);
          -webkit-mask-image: radial-gradient(ellipse 75% 68% at 52% 32%, #000 30%, transparent 92%);
          animation: auroraWaveTwo 21s ease-in-out infinite alternate;
        }

        .cyber-aurora-three {
          bottom: -22%;
          left: -10%;
          width: 120%;
          height: 54vh;
          min-height: 340px;
          filter: blur(72px);
          opacity: 0.65;
          background: linear-gradient(
            68deg,
            transparent 12%,
            rgba(37, 99, 235, 0.18) 34%,
            rgba(0, 191, 255, 0.18) 56%,
            rgba(20, 184, 166, 0.12) 74%,
            transparent 92%
          );
          animation: auroraWaveThree 24s ease-in-out infinite alternate;
        }

        @keyframes auroraWaveOne {
          0% {
            transform: translate3d(-3%, 0%, 0) rotate(-4deg) scale(1, 1);
          }
          50% {
            transform: translate3d(2%, 4%, 0) rotate(-1deg) scale(1.05, 1.08);
          }
          100% {
            transform: translate3d(5%, -2%, 0) rotate(2deg) scale(1.02, 0.96);
          }
        }

        @keyframes auroraWaveTwo {
          0% {
            transform: translate3d(4%, 2%, 0) rotate(3deg) scale(1.04, 1);
          }
          50% {
            transform: translate3d(-3%, -3%, 0) rotate(0deg) scale(1, 1.07);
          }
          100% {
            transform: translate3d(-5%, 4%, 0) rotate(-3deg) scale(1.06, 0.98);
          }
        }

        @keyframes auroraWaveThree {
          0% {
            transform: translate3d(-2%, 0, 0) scale(1);
          }
          100% {
            transform: translate3d(4%, -5%, 0) scale(1.08);
          }
        }

        @media (max-width: 640px) {
          .cyber-aurora-one,
          .cyber-aurora-two {
            filter: blur(42px);
          }
          .cyber-aurora-three {
            filter: blur(52px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .cyber-aurora-layer {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
