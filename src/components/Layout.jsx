import { Link, NavLink, Outlet } from 'react-router-dom'
import { Menu, Settings, LayoutDashboard, Users, CheckCircle2 } from 'lucide-react'

export default function Layout() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-950">
      {/* glow gradients */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl" />
      </div>

      {/* glass nav */}
      <header className="sticky top-0 z-20">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 text-white shadow-[0_0_25px_rgba(56,189,248,0.5)]">G</span>
              <Link to="/" className="text-lg font-semibold tracking-tight text-white">GodCRM</Link>
            </div>
            <nav className="hidden md:flex items-center gap-1">
              <NavLink to="/" end className={({isActive}) => `px-3 py-2 rounded-xl text-sm font-medium transition-colors ${isActive ? 'bg-white/10 text-white' : 'text-blue-200/80 hover:text-white hover:bg-white/5'}`}>Dashboard</NavLink>
              <NavLink to="/leads" className={({isActive}) => `px-3 py-2 rounded-xl text-sm font-medium transition-colors ${isActive ? 'bg-white/10 text-white' : 'text-blue-200/80 hover:text-white hover:bg-white/5'}`}>Leads</NavLink>
              <NavLink to="/clients" className={({isActive}) => `px-3 py-2 rounded-xl text-sm font-medium transition-colors ${isActive ? 'bg-white/10 text-white' : 'text-blue-200/80 hover:text-white hover:bg-white/5'}`}>Closed Clients</NavLink>
              <NavLink to="/settings" className={({isActive}) => `px-3 py-2 rounded-xl text-sm font-medium transition-colors ${isActive ? 'bg-white/10 text-white' : 'text-blue-200/80 hover:text-white hover:bg-white/5'}`}>Settings</NavLink>
            </nav>
            <button className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-white/80">
              <Menu size={18} />
            </button>
          </div>
        </div>
      </header>

      <main className="relative mx-auto max-w-7xl px-4 pb-16 pt-6">
        <Outlet />
      </main>

      <footer className="mx-auto max-w-7xl px-4 pb-8 text-center text-sm text-blue-200/60">
        © {new Date().getFullYear()} GodCRM • Glassmorphic, blue, modern
      </footer>
    </div>
  )
}
