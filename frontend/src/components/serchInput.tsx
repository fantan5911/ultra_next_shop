'use client'
import { useState } from "react";
import { Search } from "lucide-react";


export function SearchInput() {
    const [search, setSearch] = useState('');

    return (
        <div className="flex items-center">
        <Search
        className="relative left-10 text-white/60"
        size={18}
        />
        <input type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Поиск..."
        className="w-full border border-solid py-1.5
        font-sans px-12 bg-white/5
      border-white/20 rounded-3xl outline-none
      focus:border-white/60 transition-colors duration-200
        "
        />
    </div>
    )
}