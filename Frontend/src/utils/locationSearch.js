const STATES = {
  AL:'Alabama', AK:'Alaska', AZ:'Arizona', AR:'Arkansas', CA:'California', CO:'Colorado', CT:'Connecticut', DE:'Delaware', DC:'District of Columbia', FL:'Florida', GA:'Georgia', HI:'Hawaii', ID:'Idaho', IL:'Illinois', IN:'Indiana', IA:'Iowa', KS:'Kansas', KY:'Kentucky', LA:'Louisiana', ME:'Maine', MD:'Maryland', MA:'Massachusetts', MI:'Michigan', MN:'Minnesota', MS:'Mississippi', MO:'Missouri', MT:'Montana', NE:'Nebraska', NV:'Nevada', NH:'New Hampshire', NJ:'New Jersey', NM:'New Mexico', NY:'New York', NC:'North Carolina', ND:'North Dakota', OH:'Ohio', OK:'Oklahoma', OR:'Oregon', PA:'Pennsylvania', RI:'Rhode Island', SC:'South Carolina', SD:'South Dakota', TN:'Tennessee', TX:'Texas', UT:'Utah', VT:'Vermont', VA:'Virginia', WA:'Washington', WV:'West Virginia', WI:'Wisconsin', WY:'Wyoming', PR:'Puerto Rico', GU:'Guam', VI:'Virgin Islands', AS:'American Samoa', MP:'Northern Mariana Islands',
};
export const normalizeLocation = value => String(value ?? '').normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
const stateEntries = Object.entries(STATES).map(([code,name])=>[code.toLowerCase(),normalizeLocation(name)]);
export function matchesLocation(deal, query) {
  const normalized = normalizeLocation(query);
  if (!normalized) return true;
  const state = normalizeLocation(deal.state);
  const statePair = stateEntries.find(([code,name])=>state===code || state===name);
  const fields = [deal.city,deal.address,deal.fullAddress,deal.zipCode,deal.metroArea,deal.area,deal.neighborhood,state,...(statePair||[])];
  const tokens = fields.flatMap(value => normalizeLocation(value).split(' ')).filter(Boolean);
  // State abbreviations must be whole tokens (IN must not match Irving).
  // ZIP queries match ZIP tokens, not arbitrary street-number substrings.
  const zip = String(deal.zipCode ?? '').trim();
  return normalized.split(' ').every(term => {
    if (/^\d{5}$/.test(term)) return zip ? zip.split('-')[0]===term : tokens.includes(term);
    if (stateEntries.some(([code])=>code===term)) return statePair ? statePair[0]===term : tokens.includes(term);
    return tokens.some(token=>token.startsWith(term));
  });
}
