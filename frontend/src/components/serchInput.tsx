'use client'
import { useState } from "react"


export function SearchInput() {
    const [search, setSearch] = useState('');

    return <input type="text"
    value={search}
    onChange={e => setSearch(e.target.value)}
    placeholder="Поиск..."
    className="w-[45%] border border-solid py-1.5
     font-sans px-7 bg-white/5
     border-white/20 rounded-3xl outline-none
     focus:border-white/60 transition-colors duration-200
     "
    />
}