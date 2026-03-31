export default function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#fafcff] pointer-events-none">
      {/* Animated Mesh Blobs */}
      <div className="absolute w-full h-full opacity-[0.65]">
        <div 
          className="absolute top-[-15%] left-[-10%] w-[60%] h-[60%] bg-blue-200 rounded-full mix-blend-multiply filter blur-[100px] animate-blob" 
        />
        <div 
          className="absolute top-[10%] right-[-15%] w-[55%] h-[55%] bg-purple-200 rounded-full mix-blend-multiply filter blur-[100px] animate-blob" 
          style={{ animationDelay: '2s' }}
        />
        <div 
          className="absolute bottom-[-20%] left-[10%] w-[65%] h-[65%] bg-emerald-100 rounded-full mix-blend-multiply filter blur-[100px] animate-blob" 
          style={{ animationDelay: '4s' }}
        />
        <div 
          className="absolute bottom-[10%] right-[20%] w-[50%] h-[50%] bg-pink-100 rounded-full mix-blend-multiply filter blur-[100px] animate-blob" 
          style={{ animationDelay: '6s' }}
        />
      </div>
      
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
