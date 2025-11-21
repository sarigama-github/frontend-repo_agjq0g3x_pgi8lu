import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Settings() {
  const [email, setEmail] = useState('founder@godcrm.io')
  const [brand, setBrand] = useState('GodCRM')
  const [theme, setTheme] = useState('blue')

  return (
    <div className="grid gap-6">
      <h1 className="text-2xl font-semibold text-white">Settings</h1>

      <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm text-blue-200/80">Brand name</label>
            <input value={brand} onChange={e=>setBrand(e.target.value)} className="h-10 w-full rounded-xl border border-white/10 bg-white/5 px-3 text-sm text-white outline-none" />
          </div>
          <div>
            <label className="mb-1 block text-sm text-blue-200/80">Notification email</label>
            <input value={email} onChange={e=>setEmail(e.target.value)} className="h-10 w-full rounded-xl border border-white/10 bg-white/5 px-3 text-sm text-white outline-none" />
          </div>
          <div>
            <label className="mb-1 block text-sm text-blue-200/80">Theme</label>
            <select value={theme} onChange={e=>setTheme(e.target.value)} className="h-10 w-full rounded-xl border border-white/10 bg-white/5 px-3 text-sm text-white outline-none">
              <option value="blue">Blue</option>
              <option value="violet">Violet</option>
              <option value="teal">Teal</option>
            </select>
          </div>
        </div>
        <div className="mt-5 text-sm text-blue-200/70">Changes are saved locally for demo purposes.</div>
      </motion.div>
    </div>
  )
}
