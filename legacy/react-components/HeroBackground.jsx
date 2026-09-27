import { GravityStarsBackground } from './GravityStarsBackground';

export const GravityStarsBackgroundDemo = () => {
  return (
    <GravityStarsBackground className="absolute inset-0 flex items-center justify-center rounded-xl" />
  );
};

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#fafcff] pointer-events-none">
      <GravityStarsBackground className="absolute inset-0 flex items-center justify-center" />
      
      {/* Subtle Noise Texture overlay to give it a premium matte look */}
      <div 
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '150px 150px'
        }}
      />
      
      {/* Bottom fade for smooth transition to next section */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-slate-50 opacity-100" />
    </div>
  )
}
