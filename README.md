# NexKeyCollective

### Buy Deals map

The `/deals` map uses Leaflet and OpenStreetMap tiles. The backend's
`GET /api/deals/map-locations` endpoint first uses the `Latitude` and `Longitude`
fields on Airtable deal records. Listings without coordinates remain in the list.

Optional US Census address lookup is enabled with `CENSUS_GEOCODING_ENABLED=true`
in `Backend/.env`. This sends listing street, city, state, and ZIP code to the
Census geocoder when stored coordinates are missing. Results are cached for
30 days in the git-ignored `Backend/.cache/map-locations.json`; persist this
folder across deployments to retain the cache. Without this setting, stored
coordinates still work and no addresses are sent for geocoding.

Run coordinate-parsing checks with `node --test Backend/test/mapService.test.js`.
