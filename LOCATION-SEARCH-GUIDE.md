# Bus Tracking System - Location Search Guide

## Overview

The Bus Tracking System now includes **advanced location-based search** allowing users to find all buses available in specific cities/locations.

## Key Features

### 1. **City-Based Filtering**
- Select any city from the dropdown
- Automatically displays all buses in that city
- Map centers on the selected city
- Shows real-time bus count and route count

### 2. **Multi-City Support**
- Support for 10 major Indian cities
- Each city has its own set of routes and buses
- Easy to add more cities

### 3. **Real-Time Location Data**
- All buses show:
  - Current location
  - City they're operating in
  - Route number
  - Occupancy status
  - ETA to stops

## How to Use

### Frontend Usage

#### 1. **Select a City**
- Open the application
- Look at the sidebar on the left
- Find "Select City:" dropdown
- Choose your desired city
- The map and bus list will update automatically

#### 2. **View All Cities**
- Select "All Cities" option to view buses from all cities combined

#### 3. **Search Within City**
- After selecting a city, use the search box
- Search by bus number, route, or stop name
- Results will be filtered to selected city only

### API Usage

#### Get All Available Cities
```bash
curl http://localhost:3000/api/cities
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Delhi",
      "state": "Delhi",
      "centerLat": 28.6139,
      "centerLng": 77.2090,
      "defaultZoom": 13
    },
    {
      "id": 2,
      "name": "Mumbai",
      "state": "Maharashtra",
      "centerLat": 19.0760,
      "centerLng": 72.8777,
      "defaultZoom": 12
    }
  ],
  "count": 10
}
```

#### Get All Buses in a Specific City
```bash
curl http://localhost:3000/api/cities/1/buses
```

**Response:**
```json
{
  "success": true,
  "city": {
    "id": 1,
    "name": "Delhi",
    "state": "Delhi"
  },
  "data": [
    {
      "id": "BUS-1-0",
      "busNumber": "BUS-101-A",
      "routeNumber": "101",
      "cityId": 1,
      "cityName": "Delhi",
      "status": "active",
      "currentStop": "Railway Station",
      "lat": 28.6139,
      "lng": 77.2090
    }
  ],
  "count": 48,
  "activeBuses": 40
}
```

#### Get All Routes in a Specific City
```bash
curl http://localhost:3000/api/cities/2/routes
```

**Response:**
```json
{
  "success": true,
  "city": {
    "id": 2,
    "name": "Mumbai",
    "state": "Maharashtra"
  },
  "data": [
    {
      "id": 11,
      "routeNumber": "M101",
      "name": "CST - Bandra Express",
      "cityName": "Mumbai",
      "from": "CST Station",
      "to": "Bandra",
      "distance": 18.0
    }
  ],
  "count": 3
}
```

#### Search by Location/City Name
```bash
curl "http://localhost:3000/api/search/location?query=delhi"
```

**Parameters:**
- `query` - City name, state name, or partial match

**Response:**
```json
{
  "success": true,
  "data": {
    "cities": [
      {
        "id": 1,
        "name": "Delhi",
        "state": "Delhi"
      }
    ],
    "routes": [
      {
        "id": 1,
        "routeNumber": "101",
        "name": "Railway Station - Airport Express",
        "cityName": "Delhi"
      }
    ],
    "buses": [
      {
        "id": "BUS-1-0",
        "busNumber": "BUS-101-A",
        "cityName": "Delhi",
        "currentStop": "Railway Station"
      }
    ]
  },
  "count": {
    "cities": 1,
    "routes": 6,
    "buses": 48
  }
}
```

## Available Cities with Bus Data

| City ID | City Name | State | Routes | Buses | Map Center |
|---------|-----------|-------|--------|-------|-----------|
| 1 | Delhi | Delhi | 6 | 48 | 28.6139, 77.2090 |
| 2 | Mumbai | Maharashtra | 3 | 24 | 19.0760, 72.8777 |
| 3 | Bangalore | Karnataka | 2 | 16 | 12.9716, 77.5946 |
| 4 | Pune | Maharashtra | 2 | 16 | 18.5204, 73.8567 |
| 5 | Hyderabad | Telangana | 0 | 0 | 17.3850, 78.4867 |
| 6 | Chennai | Tamil Nadu | 0 | 0 | 13.0827, 80.2707 |
| 7 | Kolkata | West Bengal | 0 | 0 | 22.5726, 88.3639 |
| 8 | Jaipur | Rajasthan | 0 | 0 | 26.9124, 75.7873 |
| 9 | Ahmedabad | Gujarat | 0 | 0 | 23.0225, 72.5714 |
| 10 | Lucknow | Uttar Pradesh | 0 | 0 | 26.8467, 80.9462 |

## Example Scenarios

### Scenario 1: Find all buses in Delhi
1. **Frontend:** Select "Delhi (Delhi)" from dropdown
2. **API:** `GET /api/cities/1/buses`
3. **Result:** Shows 48 buses running in Delhi with their current locations

### Scenario 2: Find buses in Mumbai
1. **Frontend:** Select "Mumbai (Maharashtra)" from dropdown
2. **API:** `GET /api/cities/2/buses`
3. **Result:** Shows 24 buses running in Mumbai

### Scenario 3: Search for buses by city name
1. **API:** `GET /api/search/location?query=bangalore`
2. **Result:** Shows all routes and buses in Bangalore city

### Scenario 4: Get all routes in Pune
1. **API:** `GET /api/cities/4/routes`
2. **Result:** Shows all routes running in Pune with details

### Scenario 5: View buses from all cities
1. **Frontend:** Select "All Cities" from dropdown
2. **API:** `GET /api/buses` (without city filter)
3. **Result:** Shows all buses from all cities (136 total)

## Bus Object Structure

```json
{
  "id": "BUS-1-0",
  "busNumber": "BUS-101-A",
  "routeId": 1,
  "routeNumber": "101",
  "cityId": 1,
  "cityName": "Delhi",
  "capacity": 50,
  "currentCapacity": 25,
  "driverName": "Rajesh Kumar",
  "status": "active",
  "delay": 0,
  "currentStop": "Railway Station",
  "currentStopIndex": 0,
  "lat": 28.6139,
  "lng": 77.2090,
  "hasAC": true,
  "hasWiFi": false,
  "lastUpdated": "2024-02-10T10:30:00Z"
}
```

## Route Object Structure

```json
{
  "id": 1,
  "cityId": 1,
  "cityName": "Delhi",
  "routeNumber": "101",
  "name": "Railway Station - Airport Express",
  "from": "Railway Station",
  "to": "Airport",
  "distance": 25.5,
  "estimatedTime": 45,
  "fare": 30,
  "stops": [
    {
      "stopId": 1,
      "name": "Railway Station",
      "sequence": 1,
      "lat": 28.6139,
      "lng": 77.2090
    }
  ],
  "operatingHours": {
    "start": "05:00",
    "end": "23:00"
  },
  "frequency": 10
}
```

## Common API Queries

### Get buses in specific city sorted by status
```bash
curl "http://localhost:3000/api/cities/1/buses" | jq '.data | sort_by(.status)'
```

### Count active buses in each city
```bash
for city_id in {1..4}; do
  count=$(curl -s "http://localhost:3000/api/cities/$city_id/buses" | jq '.activeBuses')
  echo "City $city_id: $count active buses"
done
```

### Get all delayed buses in a city
```bash
curl "http://localhost:3000/api/buses?cityId=1&status=delayed"
```

### Search for buses/routes by name
```bash
curl "http://localhost:3000/api/search?query=airport"
```

## Feature Roadmap

### Phase 1 ✅ (Completed)
- Multi-city support
- City selector dropdown
- Basic location search API

### Phase 2 (Planned)
- Advanced filters (AC/WiFi, fare range)
- Favorite cities/routes
- City comparison dashboard

### Phase 3 (Future)
- Inter-city bus services
- Multi-modal route planning
- Real-time city analytics

## Troubleshooting

### Issue: Dropdown not showing cities
**Solution:**
```bash
# Verify API is working
curl http://localhost:3000/api/cities

# Check server logs
# You should see: "Initialized X cities"
```

### Issue: Buses not loading for selected city
**Solution:**
1. Check that city has routes defined in `server-enhanced.js`
2. Verify `BUSES_PER_ROUTE` is set correctly in config
3. Clear browser cache and refresh

### Issue: Map not centering on city
**Solution:**
Verify city coordinates in `config.js`:
```bash
# Example for Delhi
"centerLat": 28.6139,
"centerLng": 77.2090,
"defaultZoom": 13
```

## Performance Tips

1. **For 100+ buses:** Use city filter to reduce load
2. **For searches:** Use `/api/search/location` instead of fetching all cities
3. **For real-time:** Use WebSocket instead of HTTP polling
4. **For large displays:** Implement pagination (50 buses per page)

## Security Notes

- All endpoints are public (no authentication)
- Consider adding rate limiting for production
- Add authentication for admin operations
- Validate all input parameters

---

**Enjoy finding buses in your city! 🎉**
