export default function Footer() {
  return (
    <footer className="bg-dark px-6 py-10">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-4 text-center">
        <div className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-full bg-brand text-white font-bold text-[15px] flex items-center justify-center">
            N
          </span>
          <span className="text-white text-[17px] font-bold tracking-tight">NextKey Collective</span>
        </div>
        <p className="text-[13px] text-text-muted">© 2026 — Strategic real estate investment.</p>
      </div>
    </footer>
  )
}
