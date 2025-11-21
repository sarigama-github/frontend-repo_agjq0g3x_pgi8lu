import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { motion } from 'framer-motion'
import { Plus, Search } from 'lucide-react'

export default function Leads() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ name: '', email: '' })
  const [query, setQuery] = useState('')

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await supabase.from('leads').select('*').order('created_at', { ascending: false })
        setItems(data || [])
      } catch (e) {}
      setLoading(false)
    }
    fetch()
  }, [])

  const addLead = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email) return
    const { data } = await supabase.from('leads').insert([{ name: form.name, email: form.email }]).select('*')
    setItems(prev => [ ...(data || []), ...prev ])
    setForm({ name: '', email: '' })
  }

  const filtered = items.filter(i =>
    i.name?.toLowerCase().includes(query.toLowerCase()) ||
    i.email?.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-white">Leads</h1>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-200/60" />
            <input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search leads..." className="h-10 w-64 rounded-xl border border-white/10 bg-white/5 pl-9 pr-3 text-sm text-white placeholder:text-blue-200/60 outline-none" />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
        <form onSubmit={addLead} className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-5">
          <input value={form.name} onChange={(e)=>setForm(f=>({...f,name:e.target.value}))} placeholder="Name" className="sm:col-span-2 h-10 rounded-xl border border-white/10 bg-white/5 px-3 text-sm text-white placeholder:text-blue-200/60 outline-none" />
          <input value={form.email} onChange={(e)=>setForm(f=>({...f,email:e.target.value}))} placeholder="Email" className="sm:col-span-2 h-10 rounded-xl border border-white/10 bg-white/5 px-3 text-sm text-white placeholder:text-blue-200/60 outline-none" />
          <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-gradient-to-br from-blue-500 to-cyan-500 px-4 text-sm font-medium text-white shadow-lg shadow-cyan-500/20 transition-transform active:scale-[.98]">
            <Plus size={16}/> Add
          </button>
        </form>

        <div className="overflow-hidden rounded-xl border border-white/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 text-blue-200/80">
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-blue-100">
              {!loading && filtered.length === 0 && (
                <tr><td className="px-4 py-6 text-blue-200/70" colSpan={3}>No leads yet. Add your first lead above.</td></tr>
              )}
              {filtered.map(lead => (
                <motion.tr key={lead.id} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}}>
                  <td className="px-4 py-3">{lead.name}</td>
                  <td className="px-4 py-3">{lead.email}</td>
                  <td className="px-4 py-3">{new Date(lead.created_at).toLocaleString()}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
