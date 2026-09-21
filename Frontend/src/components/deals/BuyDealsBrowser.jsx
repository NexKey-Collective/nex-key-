import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FilterPanel from './FilterPanel';
import './buy-deals.css';

const TYPES = ['All', 'Seller Finance', 'SubTo', 'Cash', 'Hybrid'];
const VIEWS = ['map', 'grid', 'list', 'compact', 'table'];
const ICONS = {
  search: <><circle cx="10.5" cy="10.5" r="7.5"/><path d="m16 16 5 5"/></>,
  map: <><path d="m3 5 6-2 6 2 6-2v16l-6 2-6-2-6 2Z M9 3v16 M15 5v16"/></>,
  grid: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
  list: <path d="M8 6h13M8 12h13M8 18h13M3 6h1M3 12h1M3 18h1"/>,
  compact: <><rect x="3" y="3" width="18" height="18" rx="1"/><path d="M9 3v18M15 3v18M3 9h18M3 15h18"/></>,
  table: <><rect x="3" y="3" width="18" height="18" rx="1"/><path d="M9 3v18M3 9h18M3 15h18"/></>,
  bookmark: <path d="M6 21V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17l-6-4Z"/>,
  target: <><circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/></>,
  layers: <path d="m2 8 10-5 10 5-10 5ZM2 12l10 5 10-5M2 16l10 5 10-5"/>,
};
function Icon({ name }) { return <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{ICONS[name]}</svg>; }
function Search({ value, onChange, placeholder, className = '' }) {
  return <label className={`bd-search ${className}`}><Icon name="search"/><input type="search" aria-label={placeholder} placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)}/></label>;
}
function PropertyImage({ deal }) {
  const [failed, setFailed] = useState(false);
  return deal.image && !failed ? <img src={deal.image} alt={deal.address} loading="lazy" onError={() => setFailed(true)}/> : <div className="bd-no-image">Photo unavailable</div>;
}
function PropertyCard({ deal, saved, onSave, selected }) {
  return <article id={`property-${deal.id}`} className={`bd-property ${selected ? 'is-selected' : ''}`}>
    <Link className="bd-photo" to={`/deals/${deal.id}`} tabIndex={-1} aria-hidden="true"><PropertyImage deal={deal}/></Link>
    <div className="bd-property-body">
      <h2><Link to={`/deals/${deal.id}`}>{deal.address}</Link></h2>
      <p className="bd-location">{deal.city || 'Location unavailable'}</p>
      {deal.badge && <span className={`bd-badge bd-badge-${deal.badge.toLowerCase().replaceAll(' ', '-')}`}>{deal.badge === 'Subto' ? 'SubTo' : deal.badge}</span>}
      <p className="bd-price">{deal.price}<span>Entry fee</span></p>
    </div>
    <button className={`bd-save ${saved ? 'is-saved' : ''}`} onClick={() => onSave(deal.id)} aria-label={`${saved ? 'Unsave' : 'Save'} ${deal.address}`} aria-pressed={saved}><Icon name="bookmark"/></button>
  </article>;
}
function MapPreview({ deals, onSelect, selected, location, onLocationChange }) {
  const [zoom, setZoom] = useState(1);
  const [terrain, setTerrain] = useState(true);
  return <section className={`bd-map ${terrain ? '' : 'bd-map-simple'}`} aria-label="Illustrative property map preview">
    <div className="bd-map-art" style={{ transform: `scale(${zoom})` }}>
      <div className="bd-park bd-park-one"/><div className="bd-park bd-park-two"/><div className="bd-river"/>
      <div className="bd-blocks"/>
      <i className="bd-road bd-road-one"/><i className="bd-road bd-road-two"/><i className="bd-road bd-road-three"/><i className="bd-road bd-road-four"/><i className="bd-road bd-road-five"/>
      {deals.slice(0, 12).map((deal, index) => <button key={deal.id} className={`bd-pin ${selected === deal.id ? 'is-selected' : ''}`} style={{ left: `${19 + ((index * 23) % 61)}%`, top: `${23 + ((index * 17) % 56)}%` }} onClick={() => onSelect(deal.id)} aria-label={`Show ${deal.address}, entry fee ${deal.price}`}>{deal.price}</button>)}
    </div>
    <Search className="bd-map-search" value={location} onChange={onLocationChange} placeholder="Search city or state"/>
    <div className="bd-map-controls"><div><button aria-label="Zoom in" disabled={zoom >= 1.6} onClick={() => setZoom(z => Math.min(1.6, z + .2))}>+</button><button aria-label="Zoom out" disabled={zoom <= 1} onClick={() => setZoom(z => Math.max(1, z - .2))}>−</button></div><button aria-label="Reset map view" onClick={() => setZoom(1)}><Icon name="target"/></button><button aria-label="Toggle map terrain" aria-pressed={terrain} onClick={() => setTerrain(t => !t)}><Icon name="layers"/></button></div>
    <p className="bd-map-note">Illustrative preview · Pins are not exact locations</p>
  </section>;
}
export default function BuyDealsBrowser({ deals, loading, error, user, activeFilter, onFilterChange, searchQuery, onSearchChange, panelFilters, onPanelFiltersChange, onApplyPanel, onRetry, inlineFilters, onInlineFilters }) {
  const [view, setView] = useState('map');
  const [sort, setSort] = useState('asc');
  const [location, setLocation] = useState('');
  const [selected, setSelected] = useState(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const [saved, setSaved] = useState([]);
  const [notice, setNotice] = useState('');
  const navigate = useNavigate();
  const savedKey = user ? `nexkey-saved-deals:${user.uid}` : null;
  useEffect(() => { try { const value = JSON.parse(localStorage.getItem(savedKey) || '[]'); setSaved(savedKey && Array.isArray(value) ? value : []); } catch { setSaved([]); } }, [savedKey]);
  const results = useMemo(() => deals.filter(d => `${d.city} ${d.address}`.toLowerCase().includes(location.toLowerCase().trim())).sort((a,b) => {
    if (a.amount == null) return b.amount == null ? 0 : 1;
    if (b.amount == null) return -1;
    return sort === 'asc' ? a.amount - b.amount : b.amount - a.amount;
  }), [deals, location, sort]);
  const save = id => {
    if (!user) { navigate('/login'); return; }
    const next = saved.includes(id) ? saved.filter(item => item !== id) : [...saved, id];
    try { localStorage.setItem(savedKey, JSON.stringify(next)); setSaved(next); setNotice('Saved deals updated on this device.'); } catch { setNotice('Unable to save on this device. Browser storage may be full.'); }
  };
  const select = id => { setSelected(id); document.getElementById(`property-${id}`)?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'nearest' }); };
  return <main className="buy-deals">
    <h1>Browse Buy Deals</h1>
    <p className="bd-intro">Explore off-market opportunities. {!user && <><Link to="/login?mode=signup">Create a free account</Link> to unlock match scores, save deals, and AI recommendations.</>}</p>
    <div className="bd-toolbar"><Search value={searchQuery} onChange={onSearchChange} placeholder="Search property, city, or deal type"/>
      <div className="bd-display-controls"><label className="bd-sort"><span>Sort:</span><select aria-label="Sort by entry fee" value={sort} onChange={e => setSort(e.target.value)}><option value="asc">Entry Fee: Low to High</option><option value="desc">Entry Fee: High to Low</option></select></label>
      <div className="bd-views" role="group" aria-label="Property view">{VIEWS.map(item => <button key={item} aria-label={`${item[0].toUpperCase() + item.slice(1)} view`} title={`${item} view`} aria-pressed={view === item} className={view === item ? 'active' : ''} onClick={() => setView(item)}><Icon name={item}/></button>)}</div></div>
    </div>
    <div className="bd-filter-row"><div className="bd-filters">{TYPES.map(type => <button key={type} aria-pressed={activeFilter === type} className={activeFilter === type ? 'active' : ''} onClick={() => onFilterChange(type)}>{type}</button>)}<button onClick={() => setPanelOpen(true)}>More filters</button>
      <label className="bd-beds"><span className="sr-only">Minimum bedrooms</span><select aria-label="Minimum bedrooms" value={inlineFilters.minBeds || ''} onChange={e => onInlineFilters({ ...inlineFilters, minBeds: Number(e.target.value) || undefined })}><option value="">Beds: Any</option>{[1,2,3,4,5].map(n => <option key={n} value={n}>{n}+ beds</option>)}</select></label>
    </div><span className="bd-count" role="status">{loading ? 'Loading properties…' : `${results.length} ${results.length === 1 ? 'property' : 'properties'}`}</span></div>
    {notice && <p className="bd-notice" role="status">{notice}</p>}
    {loading ? <div className="bd-state" role="status"><span className="bd-spinner"/>Loading properties…</div> : error ? <div className="bd-state" role="alert"><p>{error}</p><button onClick={onRetry}>Try again</button></div> : !results.length ? <div className="bd-state"><h2>No properties found</h2><p>Try another location or adjust your filters.</p><button onClick={() => { onSearchChange(''); setLocation(''); onFilterChange('All'); onApplyPanel({}); onInlineFilters({}); onPanelFiltersChange({}); }}>Clear filters</button></div> : <div className={`bd-results bd-view-${view}`}>
      {view === 'map' && <MapPreview deals={results} selected={selected} onSelect={select} location={location} onLocationChange={setLocation}/>}
      {view === 'table' ? <div className="bd-table-wrap"><table><thead><tr><th>Property</th><th>Location</th><th>Deal type</th><th>Entry fee</th><th>Beds / baths</th></tr></thead><tbody>{results.map(deal => <tr key={deal.id}><td><Link to={`/deals/${deal.id}`}>{deal.address}</Link></td><td>{deal.city}</td><td>{deal.badge}</td><td>{deal.price}</td><td>{deal.beds} / {deal.baths}</td></tr>)}</tbody></table></div> : <div className="bd-properties" aria-label="Properties">{results.map(deal => <PropertyCard key={deal.id} deal={deal} selected={selected === deal.id} saved={saved.includes(deal.id)} onSave={save}/>)}</div>}
    </div>}
    {panelOpen && <FilterPanel values={panelFilters} onChange={onPanelFiltersChange} onApply={onApplyPanel} onClose={() => setPanelOpen(false)}/>}
  </main>;
}
