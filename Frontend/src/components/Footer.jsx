const logoUrl = 'https://www.figma.com/api/mcp/asset/afafc388-8576-45ef-81b9-fb6064637411'

export default function Footer() {
  return (
    <footer className="bg-dark px-6 pt-16 pb-8">
      <div className="max-w-7xl mx-auto">
        {/* Top row */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <img src={logoUrl} alt="NexKey Collective" className="h-10 w-auto object-contain mb-4" />
            <p className="text-[14px] text-text-faint leading-relaxed">
              Premium real estate investment platform. Data-driven insights for the modern investor.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-white text-[16px] font-bold mb-4">Platform</h4>
            <ul className="flex flex-col gap-2">
              {['Deals', 'Analytics', 'Market Data'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-[14px] text-text-faint hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white text-[16px] font-bold mb-4">Company</h4>
            <ul className="flex flex-col gap-2">
              {['About Us', 'Careers', 'Press'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-[14px] text-text-faint hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Subscribe */}
          <div>
            <h4 className="text-white text-[16px] font-bold mb-4">Subscribe</h4>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email address"
                className="flex-1 bg-dark-2 text-white/50 text-[14px] px-4 py-2 rounded-2xl border-none outline-none focus:ring-2 focus:ring-brand placeholder:text-white/40"
              />
              <button className="bg-brand text-white text-[14px] font-medium px-4 py-2 rounded-2xl hover:bg-brand-dark transition-colors shrink-0">
                Go
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-dark-2 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[12px] text-text-muted">© 2026 NexKey Technologies Inc.</p>
          <div className="flex gap-6">
            <a href="#" className="text-[12px] text-text-muted hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-[12px] text-text-muted hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
