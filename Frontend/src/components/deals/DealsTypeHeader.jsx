import { useState } from 'react'

const DEAL_TYPES = [
  'All Deals',
  'Cash',
  'Co-Living',
  'Fix & Flip',
  'Furnished',
  'Hybrid',
  'Lease Purchase',
  'MTR',
  'Novation',
  'Seller Finance',
  'STR',
  'Subto',
]

export default function DealsTypeHeader({ activeFilter, onFilterChange, searchQuery, onSearchChange }) {
  return (
    <div className="bg-white/95 border-b border-black/[0.08] sticky top-0 z-40">
      <div className="px-12 pt-6 pb-0">
        {/* Top row: logo + search */}
        <div className="flex items-center justify-between mb-8">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3">
            <div className="w-12 h-12 flex items-center justify-center">
              <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none">
                <rect width="48" height="48" rx="10" fill="#ff5a5f" fillOpacity="0.12" />
                <path d="M24 10L8 22V38H18V28H30V38H40V22L24 10Z" fill="#ff5a5f" />
                <rect x="21" y="31" width="6" height="7" rx="1" fill="white" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span
                className="text-[#ff5a5f] text-2xl leading-none tracking-[-0.6px]"
                style={{ fontFamily: "'Archivo Black', sans-serif" }}
              >
                NexKey
              </span>
              <span
                className="text-[#ff5a5f] text-[11px] tracking-[1.2px] uppercase leading-none mt-0.5"
                style={{ fontFamily: "'Archivo Black', sans-serif" }}
              >
                COLLECTIVE
              </span>
            </div>
          </a>

          {/* Search input */}
          <div className="relative w-[448px] max-w-full">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-5 h-5 text-[#717171]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search by location..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-[#f7f7f7] border border-black/[0.08] rounded-2xl pl-12 pr-4 py-3 text-[16px] text-[#1a1a1a] placeholder:text-[rgba(26,26,26,0.5)] outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand/30 transition-all"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            />
          </div>
        </div>

        {/* Filter tabs — horizontally scrollable */}
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1">
          {DEAL_TYPES.map((type) => {
            const isActive = activeFilter === type
            return (
              <button
                key={type}
                onClick={() => onFilterChange(type)}
                className={[
                  'shrink-0 h-11 px-6 rounded-full border-2 text-[14px] font-medium transition-all duration-150',
                  isActive
                    ? 'bg-brand border-brand text-white shadow-[0_10px_15px_rgba(255,90,95,0.25),0_4px_6px_rgba(255,90,95,0.25)]'
                    : 'bg-white border-black/[0.08] text-[#1a1a1a] hover:border-brand/40 hover:text-brand',
                ].join(' ')}
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {type}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
