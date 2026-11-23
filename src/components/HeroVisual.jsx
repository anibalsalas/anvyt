import Image from "next/image";
import Icon from "@/components/icons";

// Cards flotantes: posición y fase propias para que no se muevan al unísono.
const CARD_POS = [
  "left-0 top-[6%] animate-float",
  "left-[-2%] top-[30%] animate-float-slow [animation-delay:-2s]",
  "left-[-4%] top-[54%] animate-float [animation-delay:-4s]",
  "left-[-2%] top-[77%] animate-float-slow [animation-delay:-1s]",
];

const PATHS = [
  "M236 62 C 320 62, 300 150, 360 190",
  "M236 168 C 310 168, 300 200, 350 215",
  "M236 276 C 300 276, 300 250, 350 245",
  "M236 384 C 300 384, 310 320, 380 290",
];

export default function HeroVisual({ visual }) {
  return (
    <div role="img" aria-label={visual.aria} className="relative mx-auto aspect-[5/4] w-full max-w-[640px] select-none">
      {/* resplandores */}
      <div className="absolute inset-[8%] rounded-full bg-brand/20 blur-3xl animate-glow" />
      <div className="absolute -right-[6%] top-[10%] h-[55%] w-[45%] rounded-full bg-violet-500/25 blur-3xl animate-glow [animation-delay:-2.5s]" />

      {/* conectores animados */}
      <svg viewBox="0 0 640 512" className="absolute inset-0 hidden h-full w-full lg:block" aria-hidden="true" fill="none">
        {PATHS.map((d) => (
          <path key={d} d={d} stroke="#00D8DE" strokeOpacity="0.55" strokeWidth="1.5" strokeDasharray="4 8" className="animate-dash" />
        ))}
      </svg>

      {/* portátil */}
      <div className="absolute right-0 top-[6%] w-[78%] animate-float-slow [perspective:1400px]">
        <div className="[transform-style:preserve-3d] [transform:rotateY(-14deg)_rotateX(4deg)_rotateZ(-3deg)]">
          <div className="rounded-[18px] border border-brand/40 bg-gradient-to-br from-[#0b2347] to-[#050f22] p-2 shadow-[0_0_60px_-10px_rgba(0,216,222,0.55)]">
            <div className="rounded-xl bg-navy/90 p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <Image src="/brand/logo.webp" alt="" width={640} height={126} className="h-3 w-auto sm:h-4" />
                <span className="flex gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand/70" />
                  <span className="h-1.5 w-1.5 rounded-full bg-brand/40" />
                  <span className="h-1.5 w-1.5 rounded-full bg-violet-400/70" />
                </span>
              </div>
              <p className="mt-3 text-center font-display text-[10px] font-bold text-white sm:text-sm">{visual.greeting}</p>
              <div className="mx-auto mt-2 flex items-center justify-between gap-2 rounded-lg border border-brand/30 bg-white/5 px-2.5 py-1.5">
                <span className="truncate text-[8px] text-white/50 sm:text-[10px]">{visual.placeholder}</span>
                <Icon name="send" className="h-3 w-3 shrink-0 text-brand sm:h-3.5 sm:w-3.5" />
              </div>
              <div className="mt-3 grid grid-cols-[1.2fr_1fr_1fr] gap-2">
                <div className="flex h-16 items-end gap-1 rounded-lg border border-white/10 bg-white/5 p-2 sm:h-24">
                  {[40, 55, 45, 70, 85, 100].map((h, i) => (
                    <span
                      key={i}
                      style={{ height: `${h}%`, animationDelay: `${-i * 0.35}s` }}
                      className="w-full origin-bottom rounded-sm bg-gradient-to-t from-brand/50 to-brand animate-bars"
                    />
                  ))}
                </div>
                <div className="flex items-center justify-center rounded-lg border border-white/10 bg-white/5 p-2">
                  <svg viewBox="0 0 40 40" className="h-10 w-10 animate-spin-slow sm:h-14 sm:w-14" aria-hidden="true">
                    <circle cx="20" cy="20" r="14" fill="none" stroke="#ffffff22" strokeWidth="6" />
                    <circle cx="20" cy="20" r="14" fill="none" stroke="#00D8DE" strokeWidth="6" strokeLinecap="round" strokeDasharray="62 88" />
                  </svg>
                </div>
                <div className="flex flex-col justify-center gap-2 rounded-lg border border-white/10 bg-white/5 p-2">
                  {[100, 70, 85].map((w, i) => (
                    <span key={i} className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-sm bg-brand" />
                      <span style={{ width: `${w}%` }} className="h-1 rounded-full bg-white/30" />
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="mx-auto h-2.5 w-[108%] -translate-x-[4%] rounded-b-2xl bg-gradient-to-b from-slate-300/80 to-slate-500/40 shadow-[0_18px_40px_-8px_rgba(0,216,222,0.4)]" />
        </div>
      </div>

      {/* cubo AI */}
      <div className="absolute bottom-[12%] left-[44%] animate-float-tilt">
        <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-white/40 bg-gradient-to-br from-brand/80 via-sky-400/70 to-violet-500/80 shadow-[0_0_40px_rgba(0,216,222,0.7)] sm:h-24 sm:w-24">
          <span className="font-display text-2xl font-bold italic text-white sm:text-4xl">AI</span>
          <Icon name="sparkle" className="absolute -right-2 -top-2 h-4 w-4 fill-white text-white sm:h-6 sm:w-6" />
          <Icon name="sparkle" className="absolute -bottom-2 left-1 h-3 w-3 fill-white text-white sm:h-4 sm:w-4" />
        </div>
      </div>

      {/* cards flotantes */}
      {visual.cards.map((card, i) => (
        <div
          key={card.label}
          className={`absolute hidden w-[36%] items-center gap-2.5 rounded-xl border border-brand/30 bg-gradient-to-br from-white/10 to-white/[0.03] px-3 py-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.4)] backdrop-blur-md lg:flex ${CARD_POS[i]}`}
        >
          <Icon name={card.icon} className="h-6 w-6 shrink-0 text-brand" />
          <span className="text-xs font-semibold leading-tight text-white">{card.label}</span>
        </div>
      ))}
    </div>
  );
}
