# 🎯 City Selector - User Guide

## Overview

The City Selector dropdown now displays **all 15 Indian cities** with real-time bus tracking capability.

---

## What's New

### ✨ 15 Cities Available

**Active with Buses:**
- 🚌 **Delhi** - 6 routes, 48 buses
- 🚌 **Mumbai** - 3 routes, 24 buses
- 🚌 **Bangalore** - 2 routes, 16 buses
- 🚌 **Pune** - 2 routes, 16 buses
- 🚌 **Chennai** - 1 route, 8 buses
- 🚌 **Salem** - 1 route, 8 buses
- 🚌 **Coimbatore** - 1 route, 8 buses
- 🚌 **Madurai** - 1 route, 8 buses

**Ready for Routes (No Buses Yet):**
- Hyderabad, Kolkata, Jaipur, Ahmedabad, Lucknow, Kochi, Indore

---

## How to Use the City Selector

### Method 1: Dropdown Selection
1. Look at the left sidebar
2. Click on "🌍 Select City:" dropdown
3. Choose from:
   - **🌍 All Cities** - View buses from all cities
   - Individual cities with state names (e.g., "Chennai - Tamil Nadu")

### Method 2: Quick Access Buttons
1. Below the dropdown, see city tags
2. Click any city name directly to select it instantly
3. Tags highlight on hover for easy selection

### What Happens When You Select a City

✅ **Map Updates**
- Map automatically centers on the selected city
- Zoom level adjusts for best view
- City boundaries/highlights shown

✅ **Buses Display**
- Only buses from selected city shown on map
- Bus markers update in real-time
- Bus details show city name

✅ **Statistics Update**
- City info panel appears showing:
  - Selected city name
  - Number of routes in that city
  - Number of active buses

✅ **Real-time Tracking**
- Buses continue moving and updating
- Position updates every 3 seconds
- Delays and status shown

---

## City Information Display

### City Info Panel
When you select a city, a panel appears showing:
```
City: [City Name]
Routes: [Number of routes]
Buses: [Number of active buses]
```

### Available Statistics
- **Active Buses** - Currently operational buses
- **Total Buses** - All buses in system
- **Average Occupancy** - Passenger load percentage
- **Routes** - Number of routes per city

---

## Cities in Detail

### Tamil Nadu Cities (Most Routes)
- **Chennai** - State capital, 8 buses
  - Central Station to Airport connection
  - Major transportation hub
  
- **Salem** - Industrial city, 8 buses
  - Bus Stand to Mettur Lake route
  - Tourism connection
  
- **Coimbatore** - Tech hub, 8 buses
  - Gandhipuram to Airport
  - Business district
  
- **Madurai** - Temple city, 8 buses
  - City tour routes
  - Tourist attractions

### Metropolitan Cities
- **Delhi** - Most routes (6), 48 buses
  - Railway to Airport
  - Metro connections
  - Business districts
  
- **Mumbai** - 3 major routes, 24 buses
  - Airport connectivity
  - Tourist areas
  
- **Bangalore** - Tech capital, 16 buses
  - Tech parks
  - Airport connections
  
- **Pune** - IT hub, 16 buses
  - Hinjewadi Tech Park
  - Airport routes

---

## API Access to Cities

### Get All Cities
```bash
curl http://localhost:3000/api/cities
```
Returns all 15 cities with coordinates and details.

### Select Specific City
```bash
# Get buses in Chennai (id: 6)
curl http://localhost:3000/api/cities/6/buses

# Get routes in Salem (id: 11)
curl http://localhost:3000/api/cities/11/routes
```

### Search by City Name
```bash
# Search for a city
curl "http://localhost:3000/api/search/location?query=salem"

# Returns cities, routes, and buses matching search
```

---

## Features

| Feature | Status | Details |
|---------|--------|---------|
| City Dropdown | ✅ | All 15 cities listed |
| Quick Select Tags | ✅ | Click city names below dropdown |
| Auto Map Center | ✅ | Map zooms to city automatically |
| City Info Panel | ✅ | Shows stats for selected city |
| Real-time Updates | ✅ | Buses update every 3 seconds |
| All Cities View | ✅ | Select empty option to see all |
| City Search | ✅ | Search by city or state name |

---

## Display Format

### In Dropdown
```
🌍 All Cities
Chennai - Tamil Nadu
Salem - Tamil Nadu
Coimbatore - Tamil Nadu
Madurai - Tamil Nadu
Delhi - Delhi
Mumbai - Maharashtra
Bangalore - Karnataka
Pune - Maharashtra
Hyderabad - Telangana
Kolkata - West Bengal
Jaipur - Rajasthan
Ahmedabad - Gujarat
Lucknow - Uttar Pradesh
Kochi - Kerala
Indore - Madhya Pradesh
```

### As Quick Select Tags
Each city below dropdown shows:
- **Bold city name**
- State name in smaller text
- Hover effect for visual feedback
- Click to instant select

---

## City Coordinates & Zoom

Each city has been configured with:
- **Latitude & Longitude** - Exact center point
- **Default Zoom** - Optimal map view
- **Boundaries** - City limits information

Example:
```
Chennai:
- Latitude: 13.0827°N
- Longitude: 80.2707°E
- Default Zoom: 13
```

---

## Tips & Tricks

### Quick Navigation
- Use dropdown for precise selection
- Use quick tags for fast switching
- Type city name to search dropdown

### Monitor Multiple Cities
1. Select city
2. Note the routes and buses
3. Switch to next city
4. Compare statistics

### Real-time Monitoring
- Watch buses move in real-time
- See occupancy changes
- Track delays per city
- Monitor all routes simultaneously

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Dropdown not showing cities | Refresh page - wait for API load |
| City not on map | Ensure city has routes in system |
| Buses not visible | Check "All Cities" first |
| Map not centering | Try selecting city again |

---

## Future Enhancements

- 🔲 Add routes to all 15 cities
- 🔲 Multi-city viewing (select multiple)
- 🔲 City comparison dashboard
- 🔲 Favorites/bookmarks
- 🔲 Geolocation auto-select
- 🔲 City service ratings

---

## System Status

```
Total Cities: 15
Active Cities: 8 (with buses)
Ready Cities: 7 (waiting for routes)

Total Routes: 17
Total Buses: 136
Buses per Route: 8

Server: http://localhost:3000
API: http://localhost:3000/api
```

---

**Last Updated:** February 10, 2026  
**Version:** 2.0  
**Cities:** All 15 Indian Metro & Tier-1 Cities  
**Status:** ✅ Production Ready
