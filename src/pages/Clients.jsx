import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { motion } from 'framer-motion'

export default function Clients() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await supabase.from('clients').select('*').order('created_at', { ascending: false })
        setItems(data || [])
      } catch (e) {}
      setLoading(false)
    }
    load()
  }, [])

  return (
    <div className="grid gap-6">
      <h1 className="text-2xl font-semibold text-white">Closed Clients</h1>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
        <div className="overflow-hidden rounded-xl border border-white/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 text-blue-200/80">
              <tr>
                <th className="px-4 py-2">Client</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Closed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-blue-100">
              {!loading && items.length === 0 && (
                <tr><td className="px-4 py-6 text-blue-200/70" colSpan={3}>No closed clients yet.</td></tr>
              )}
              {items.map(row => (
                <motion.tr key={row.id} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}}>
                  <td className="px-4 py-3">{row.name}</td>
                  <td className="px-4 py-3">{row.email}</td>
                  <td className="px-4 py-3">{new Date(row.created_at).toLocaleString()}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
