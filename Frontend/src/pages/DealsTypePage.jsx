import { useState, useMemo } from 'react'
import DealsTypeHeader from '../components/deals/DealsTypeHeader'
import DealsTypeGrid from '../components/deals/DealsTypeGrid'

const ALL_DEALS = [
  {
    id: 1,
    image: 'https://www.figma.com/api/mcp/asset/271b3ab7-9474-40b0-8772-f59882c257ca',
    badge: null,
    price: '$425,000',
    address: '2847 Maple Grove Drive',
    city: 'Austin, TX',
    beds: '4',
    baths: '3',
    sqft: '2,450 sqft',
    statLabel: 'ARV',
    statValue: '$580,000',
    type: 'Fix & Flip',
  },
  {
    id: 2,
    image: 'https://www.figma.com/api/mcp/asset/f5a8a085-27dc-4fd6-93f1-0dd1c7a1e600',
    badge: null,
    price: '$385,000',
    address: '1523 Ocean View Boulevard',
    city: 'Miami, FL',
    beds: '3',
    baths: '2.5',
    sqft: '1,850 sqft',
    statLabel: 'Monthly Rev',
    statValue: '$6,800',
    type: 'STR',
  },
  {
    id: 3,
    image: 'https://www.figma.com/api/mcp/asset/55d47ed3-7757-4717-b003-f9eb8402ced9',
    badge: null,
    price: '$295,000',
    address: '4192 Summit Ridge Lane',
    city: 'Denver, CO',
    beds: '3',
    baths: '2',
    sqft: '1,650 sqft',
    statLabel: 'Equity',
    statValue: '$85,000',
    type: 'Wholesale',
  },
  {
    id: 4,
    image: 'https://www.figma.com/api/mcp/asset/5cf25eb9-c749-4369-a651-c3ea0715175c',
    badge: null,
    price: '$475,000',
    address: '8634 Parkside Avenue',
    city: 'Seattle, WA',
    beds: '5',
    baths: '3.5',
    sqft: '3,200 sqft',
    statLabel: 'Rooms',
    statValue: '6',
    type: 'Co-Living',
  },
  {
    id: 5,
    image: 'https://www.figma.com/api/mcp/asset/84260035-ad37-4c27-ac19-24d37a99537a',
    badge: null,
    price: '$520,000',
    address: '5721 Riverside Terrace',
    city: 'Portland, OR',
    beds: '4',
    baths: '3',
    sqft: '2,850 sqft',
    statLabel: 'Monthly',
    statValue: '$4,200',
    type: 'MTR',
  },
  {
    id: 6,
    image: 'https://www.figma.com/api/mcp/asset/c5c43d74-3b1b-4293-ba52-5a55a227973f',
    badge: null,
    price: '$625,000',
    address: '3298 Sunset Hills Court',
    city: 'Phoenix, AZ',
    beds: '4',
    baths: '4',
    sqft: '3,450 sqft',
    statLabel: 'Discount',
    statValue: '15%',
    type: 'Cash',
  },
  {
    id: 7,
    image: 'https://www.figma.com/api/mcp/asset/c2155f83-d269-4f3d-9ca1-e8276e0d2f00',
    badge: 'Seller Finance',
    price: '$340,000',
    address: '9145 Heritage Oak Drive',
    city: 'Nashville, TN',
    beds: '3',
    baths: '2',
    sqft: '1,920 sqft',
    statLabel: 'Down',
    statValue: '20%',
    type: 'Seller Finance',
  },
  {
    id: 8,
    image: 'https://www.figma.com/api/mcp/asset/80448209-0068-497b-bb73-d598f8163097',
    badge: 'MTR',
    price: '$410,000',
    address: '6782 Mountain View Circle',
    city: 'Salt Lake City, UT',
    beds: '4',
    baths: '2.5',
    sqft: '2,200 sqft',
    statLabel: 'Monthly',
    statValue: '$3,800',
    type: 'MTR',
  },
  {
    id: 9,
    image: 'https://www.figma.com/api/mcp/asset/a67306f1-a8e3-4240-bd45-f5eb0f39fcdf',
    badge: 'Lease Purchase',
    price: '$365,000',
    address: '2456 Garden Gate Lane',
    city: 'Charlotte, NC',
    beds: '3',
    baths: '2.5',
    sqft: '2,050 sqft',
    statLabel: 'Equity',
    statValue: '$72,000',
    type: 'Lease Purchase',
  },
]

export default function DealsTypePage() {
  const [activeFilter, setActiveFilter] = useState('All Deals')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredDeals = useMemo(() => {
    let deals = ALL_DEALS

    if (activeFilter !== 'All Deals') {
      deals = deals.filter((d) => d.type === activeFilter || d.badge === activeFilter)
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      deals = deals.filter(
        (d) =>
          d.address.toLowerCase().includes(q) ||
          d.city.toLowerCase().includes(q)
      )
    }

    return deals
  }, [activeFilter, searchQuery])

  return (
    <div className="min-h-screen bg-white">
      <DealsTypeHeader
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <DealsTypeGrid deals={filteredDeals} />
    </div>
  )
}
