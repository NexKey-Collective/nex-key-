import DealTypeCard from './DealTypeCard'

export default function DealsTypeGrid({ deals }) {
  return (
    <div className="px-12 py-12">
      {/* Count */}
      <p
        className="text-[#1a1a1a] text-[22px] font-medium mb-6"
        style={{ fontFamily: "'Archivo Black', sans-serif" }}
      >
        {deals.length} Deal{deals.length !== 1 ? 's' : ''} Available
      </p>

      {/* Grid */}
      {deals.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {deals.map((deal) => (
            <DealTypeCard key={deal.id} deal={deal} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <svg className="w-16 h-16 text-gray-200 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <p className="text-[18px] font-semibold text-[#1a1a1a] mb-1">No deals found</p>
          <p className="text-[14px] text-[#717171]">Try a different deal type or search query.</p>
        </div>
      )}
    </div>
  )
}
