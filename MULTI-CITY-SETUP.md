# Multi-City Bus Tracking System Setup Guide

## Overview

The enhanced bus tracking system now supports **multiple cities** with their own routes and buses. Users can search and filter buses by location/city.

## Features Added

### 1. **City Selection Dropdown**
- Users can select a city from the sidebar dropdown
- All cities with their state information are listed
- Dropdown shows format: "City (State)"

### 2. **Multi-City Database**
Currently configured cities:
- **Delhi** (10 routes, 80 buses)
- **Mumbai** (3 routes, 24 buses)
- **Bangalore** (2 routes, 16 buses)
- **Pune** (2 routes, 16 buses)
- Plus 6 more Indian cities (ready to add routes)

### 3. **Location-Based Search API**
- `/api/search/location?query=delhi` - Search buses by city/state
- `/api/cities/:cityId/buses` - Get all buses in a specific city
- `/api/cities/:cityId/routes` - Get all routes in a specific city

### 4. **Auto-Map Centering**
When a city is selected, the map automatically:
- Centers on the city coordinates
- Sets appropriate zoom level
- Displays only buses from that city

### 5. **City Info Panel**
Shows real-time information:
- City name
- Number of routes in the city
- Number of active buses

## Available Cities

| City | State | Routes | Buses | Coordinates |
|------|-------|--------|-------|-------------|
| Delhi | Delhi | 6 | 48 | 28.6139, 77.2090 |
| Mumbai | Maharashtra | 3 | 24 | 19.0760, 72.8777 |
| Bangalore | Karnataka | 2 | 16 | 12.9716, 77.5946 |
| Pune | Maharashtra | 2 | 16 | 18.5204, 73.8567 |
| Hyderabad | Telangana | 0 | 0 | 17.3850, 78.4867 |
| Chennai | Tamil Nadu | 0 | 0 | 13.0827, 80.2707 |
| Kolkata | West Bengal | 0 | 0 | 22.5726, 88.3639 |
| Jaipur | Rajasthan | 0 | 0 | 26.9124, 75.7873 |
| Ahmedabad | Gujarat | 0 | 0 | 23.0225, 72.5714 |
| Lucknow | Uttar Pradesh | 0 | 0 | 26.8467, 80.9462 |

## API Endpoints

### Get All Cities
```bash
GET /api/cities
```
Response:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Delhi",
      "state": "Delhi",
      "country": "India",
      "centerLat": 28.6139,
      "centerLng": 77.2090,
      "defaultZoom": 13
    }
  ],
  "count": 10
}
```

### Get Buses by City
```bash
GET /api/cities/:cityId/buses
```
Example: `/api/cities/1/buses` (Get all buses in Delhi)

Response:
```json
{
  "success": true,
  "city": { "id": 1, "name": "Delhi", ... },
  "data": [ { bus objects } ],
  "count": 48,
  "activeBuses": 40
}
```

### Get Routes by City
```bash
GET /api/cities/:cityId/routes
```
Example: `/api/cities/2/routes` (Get all routes in Mumbai)

### Search by Location
```bash
GET /api/search/location?query=delhi
```
Searches for cities matching the query and returns all routes and buses in those cities.

Response:
```json
{
  "success": true,
  "data": {
    "cities": [ { city objects } ],
    "routes": [ { route objects } ],
    "buses": [ { bus objects } ]
  },
  "count": {
    "cities": 1,
    "routes": 6,
    "buses": 48
  }
}
```

## How to Add More Cities

### 1. **Add City to Config**

Edit `config.js` and add to the `cities` array:

```javascript
{
    id: 11,
    name: "Indore",
    centerLat: 22.7196,
    centerLng: 75.8577,
    defaultZoom: 13,
    state: "Madhya Pradesh",
    country: "India"
}
```

### 2. **Add Routes to Server**

Edit `server-enhanced.js` in the `initializeData()` function and add to `cityRoutesData`:

```javascript
11: [ // Indore
    {
        cityId: 11,
        cityName: "Indore",
        routeNumber: "I101",
        name: "Railway Station - Airport",
        from: "Indore Railway Station",
        to: "Indore Airport",
        distance: 8.0,
        estimatedTime: 20,
        fare: 15,
        stops: [
            { stopId: 200, name: "Railway Station", sequence: 1, lat: 22.7196, lng: 75.8577 },
            { stopId: 201, name: "City Center", sequence: 2, lat: 22.7245, lng: 75.8600 },
            { stopId: 202, name: "Airport", sequence: 3, lat: 22.7300, lng: 75.8650 }
        ],
        operatingHours: { start: "05:00", end: "22:00" },
        frequency: 15
    }
]
```

### 3. **Restart Server**

```bash
node server-enhanced.js
```

The new city will be automatically available in the dropdown!

## Frontend Changes

The HTML interface now includes:

1. **City Selector Dropdown**
   - Located at the top of the sidebar
   - Shows all available cities with their states
   - Triggers automatic data refresh when changed

2. **City Info Panel**
   - Displays when a city is selected
   - Shows city name, number of routes, and number of buses
   - Hidden when "All Cities" is selected

3. **Auto-Centering Map**
   - Map automatically zooms to selected city
   - All other cities' buses are hidden until selected

## Usage Examples

### Select Delhi
1. Open the application
2. Select "Delhi (Delhi)" from the city dropdown
3. Map centers on Delhi
4. Only Delhi buses appear on the map and in the list

### Search for Buses in a City
```bash
curl "http://localhost:3000/api/search/location?query=mumbai"
```

This returns all buses, routes, and info for cities matching "mumbai".

### Get All Buses in a Specific City
```bash
curl "http://localhost:3000/api/cities/2/buses"
```

Returns all 24 buses running in Mumbai with their real-time data.

## Performance Considerations

### Total Data at Full Capacity:
- **10 Cities**
- **~20 Routes per city** (average)
- **~200 Total Routes**
- **~1,600 Buses** (at 8 per route)

### Resource Usage:
- **RAM:** ~6 MB per 100 buses
- **Network:** ~500KB per update cycle
- **CPU:** Minimal (event-driven updates)

### Optimization Tips:
1. Limit displayed routes to selected city only
2. Use pagination for bus lists (50 buses per page)
3. Compress map tiles for faster loading
4. Implement WebSocket for real-time updates instead of polling

## Testing the Multi-City Feature

### Test 1: City Selector
```bash
curl http://localhost:3000/api/cities
```
Should return all 10 cities.

### Test 2: Delhi Buses
```bash
curl http://localhost:3000/api/cities/1/buses
```
Should return 48 buses for Delhi.

### Test 3: Mumbai Buses
```bash
curl http://localhost:3000/api/cities/2/buses
```
Should return 24 buses for Mumbai.

### Test 4: Location Search
```bash
curl "http://localhost:3000/api/search/location?query=bangalore"
```
Should return routes and buses for Bangalore.

## Future Enhancements

1. **Real-Time City Analytics**
   - Show live statistics per city
   - Average occupancy by city
   - Peak hours analysis

2. **Cross-City Route Planning**
   - Inter-city bus services
   - Multi-modal transportation

3. **City-Specific Filters**
   - Filter by bus type (AC/Non-AC) within a city
   - Filter by route (specific to selected city)
   - Filter by fare range

4. **Favorite Cities**
   - Save preferred cities
   - Quick access bookmarks

5. **City Comparison**
   - Compare metrics across cities
   - Performance benchmarking

## Troubleshooting

### Problem: City dropdown not showing
**Solution:** Make sure `/api/cities` endpoint is working
```bash
curl http://localhost:3000/api/cities
```

### Problem: Buses not changing when city is selected
**Solution:** Check browser console for errors and ensure server is running with multi-city enabled.

### Problem: Map not centering on city
**Solution:** Verify city has valid `centerLat` and `centerLng` coordinates in config.js

### Problem: No buses showing for a city
**Solution:** 
1. Check that routes are added for that city in `server-enhanced.js`
2. Verify buses are generated (each route should have buses)
3. Check `BUSES_PER_ROUTE` configuration value

## Configuration Reference

### In `config.js`:
```javascript
cities: [
    { id: 1, name: "Delhi", centerLat: 28.6139, centerLng: 77.2090, ... },
    { id: 2, name: "Mumbai", centerLat: 19.0760, centerLng: 72.8777, ... }
]
```

### In `server-enhanced.js`:
```javascript
const cityRoutesData = {
    1: [ /* Delhi routes */ ],
    2: [ /* Mumbai routes */ ],
    ...
}
```

## Support & Debugging

Enable debug logging in the browser console:
```javascript
// Check loaded cities
console.log(cities);

// Check selected city buses
console.log(buses);

// Check city selector value
console.log(document.getElementById('citySelect').value);
```

---

**Happy Multi-City Tracking! 🌍🚌**
