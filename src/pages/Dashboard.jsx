import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { motion } from 'framer-motion'
import { BarChart2, Calendar, TrendingUp } from 'lucide-react'
import Spline from '@splinetool/react-spline'

export default function Dashboard() {
  const [stats, setStats] = useState({ leads: 0, clients: 0, revenue: 0 })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { count: leads } = await supabase.from('leads').select('*', { count: 'exact', head: true })
        const { count: clients } = await supabase.from('clients').select('*', { count: 'exact', head: true })
        setStats({ leads: leads || 0, clients: clients || 0, revenue: (clients || 0) * 1200 })
      } catch (e) {
        // ignore if tables don't exist yet
      }
    }
    fetchStats()
  }, [])

  return (
    <div className="grid gap-6">
      <div className="relative h-[360px] w-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-blue-500/10 via-transparent to-transparent" />
        <Spline scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        <div className="pointer-events-none absolute inset-0 flex items-end p-6">
          <div className="max-w-lg rounded-2xl bg-slate-900/30 p-5 ring-1 ring-white/10">
            <h1 className="text-2xl font-semibold text-white">Welcome to GodCRM</h1>
            <p className="mt-1 text-blue-200/80">A glassmorphic, blue-tinted CRM with smooth animations and elegant cards. Manage leads, clients, and settings with ease.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard icon={<BarChart2 className="h-5 w-5" />} label="Leads" value={stats.leads} tint="from-blue-500 to-cyan-400" />
        <StatCard icon={<Calendar className="h-5 w-5" />} label="Clients" value={stats.clients} tint="from-indigo-500 to-blue-400" />
        <StatCard icon={<TrendingUp className="h-5 w-5" />} label="Est. Revenue" value={`$${stats.revenue.toLocaleString()}`} tint="from-sky-500 to-teal-400" />
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <h2 className="mb-3 text-lg font-semibold text-white">Recent Activity</h2>
        <div className="text-sm text-blue-200/80">Connected to Supabase. Create tables "leads" and "clients" to see data populate instantly.</div>
      </div>
    </div>
  )
}

function StatCard({ icon, label, value, tint }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
      <div className={`absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${tint} opacity-20 blur-3xl`} />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-blue-100">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white">{icon}</div>
          <span className="text-sm text-blue-200/80">{label}</span>
        </div>
        <div className="text-xl font-semibold text-white">{value}</div>
      </div>
    </motion.div>
  )
}
