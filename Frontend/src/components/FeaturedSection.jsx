import { Link } from 'react-router-dom'

const card1Img = 'https://www.figma.com/api/mcp/asset/8d84c762-9699-4d35-97a0-30ca62c1bbec'
const card2Img = 'https://www.figma.com/api/mcp/asset/887879ff-1107-43f7-98cc-8fd86010e65b'
const card3Img = 'https://www.figma.com/api/mcp/asset/22a8c883-8682-4334-a967-c2317b605aeb'

const properties = [
  {
    img: card1Img,
    type: 'Wholesale',
    typeColor: 'bg-[rgba(10,77,74,0.9)] text-white',
    discount: '19% Below Market',
    title: 'Modern Downtown Condo',
    address: '123 Main St, New York, NY 10001',
    beds: 2,
    baths: 2,
    sqft: '1,200',
    price: '$425,000',
    originalPrice: '$525,000',
  },
  {
    img: card2Img,
    type: 'Fix & Flip',
    typeColor: 'bg-[rgba(227,242,253,0.9)] text-[#1976d2]',
    discount: '13% Below Market',
    title: 'Suburban Family Home',
    address: '456 Oak Avenue, Brooklyn, NY 11201',
    beds: 4,
    baths: 3,
    sqft: '2,400',
    price: '$650,000',
    originalPrice: '$750,000',
  },
  {
    img: card3Img,
    type: 'Rental',
    typeColor: 'bg-[rgba(243,229,245,0.9)] text-[#9c27b0]',
    discount: '17% Below Market',
    title: 'Luxury Penthouse Suite',
    address: '789 Park Ave, Manhattan, NY 10021',
    beds: 3,
    baths: 3,
    sqft: '3,200',
    price: '$1,250,000',
    originalPrice: '$1,500,000',
  },
]

function BedIcon() {
  return (
    <svg className="w-4 h-4 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  )
}
function BathIcon() {
  return (
    <svg className="w-4 h-4 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 12h16M4 12a2 2 0 01-2-2V6a2 2 0 012-2h4l2 2h8a2 2 0 012 2v4M4 12v6a2 2 0 002 2h12a2 2 0 002-2v-6" />
    </svg>
  )
}
function SqftIcon() {
  return (
    <svg className="w-4 h-4 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
    </svg>
  )
}
function PinIcon() {
  return (
    <svg className="w-3.5 h-3.5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
}
function TrendIcon() {
  return (
    <svg className="w-3 h-3 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  )
}

function PropertyCard({ property }) {
  return (
    <div className="card overflow-hidden group">
      {/* Image */}
      <div className="relative h-[280px] overflow-hidden">
        <img
          src={property.img}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Badges */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className={`text-[11px] font-medium px-3 py-1 rounded-full uppercase tracking-wide ${property.typeColor}`}>
            {property.type}
          </span>
          <span className="flex items-center gap-1 bg-[rgba(255,237,237,0.9)] text-brand text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wide">
            <TrendIcon />
            {property.discount}
          </span>
        </div>
        {/* Wishlist */}
        <button className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center hover:bg-white/40 transition-colors">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col gap-3">
        <div>
          <h3 className="text-[20px] font-bold text-dark mb-1">{property.title}</h3>
          <div className="flex items-center gap-1.5 text-text-muted text-[14px]">
            <PinIcon />
            <span>{property.address}</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-[14px] text-text-muted">
          <span className="flex items-center gap-1.5"><BedIcon /> {property.beds}</span>
          <span className="flex items-center gap-1.5"><BathIcon /> {property.baths}</span>
          <span className="flex items-center gap-1.5"><SqftIcon /> {property.sqft} sqft</span>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div>
            <p className="text-[24px] font-bold text-brand leading-tight">{property.price}</p>
            <p className="text-[14px] text-text-faint line-through">{property.originalPrice}</p>
          </div>
          <button className="bg-gray-100 hover:bg-brand hover:text-white text-dark text-[14px] font-semibold px-4 py-2 rounded transition-colors duration-200">
            View Deal
          </button>
        </div>
      </div>
    </div>
  )
}

export default function FeaturedSection() {
  return (
    <section id="deals" className="bg-bg-light py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-[36px] font-bold text-dark tracking-tight">Featured Opportunities</h2>
            <p className="text-text-muted text-[16px] mt-1">Hand-picked investment opportunities with exceptional potential returns.</p>
          </div>
          <Link to="/deals" className="hidden sm:flex items-center gap-2 border border-gray-200 text-text-body text-[14px] font-semibold px-4 py-2 rounded hover:bg-white transition-colors shrink-0">
            View All Deals
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((p) => <PropertyCard key={p.title} property={p} />)}
        </div>
      </div>
    </section>
  )
}
