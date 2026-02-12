# 🌍 Available Cities - Bus Tracking System

## All Cities Configuration (15 Cities)

### Cities with Active Routes & Buses

#### 1. **Delhi** (6 Routes, 48 Buses) ✅
- **State:** Delhi
- **Location:** Center (28.6139°N, 77.2090°E)
- **Routes:**
  - Route 101: Railway Station - Airport Express
  - Route 202: Bus Terminal - University Campus
  - Route 303: Industrial Area - Residential Zone
  - Route 404: Metro Station - IT Park Shuttle
  - Route 505: Old City - New Town Connector
  - Route 606: Hospital - Medical College Route

#### 2. **Mumbai** (3 Routes, 24 Buses) ✅
- **State:** Maharashtra
- **Location:** Center (19.0760°N, 72.8777°E)
- **Routes:**
  - Route M101: CST - Bandra Express
  - Route M202: Airport - Andheri Route
  - Route M303: Borivali - Colaba Loop

#### 3. **Bangalore** (2 Routes, 16 Buses) ✅
- **State:** Karnataka
- **Location:** Center (12.9716°N, 77.5946°E)
- **Routes:**
  - Route B101: City Center - Tech Park
  - Route B202: Airport - MG Road Express

#### 4. **Pune** (2 Routes, 16 Buses) ✅
- **State:** Maharashtra
- **Location:** Center (18.5204°N, 73.8567°E)
- **Routes:**
  - Route P101: Railway Station - Hinjewadi
  - Route P202: Airport - City Center

#### 5. **Chennai** (1 Route, 8 Buses) ✅
- **State:** Tamil Nadu
- **Location:** Center (13.0827°N, 80.2707°E)
- **Route:**
  - Route C101: Central Station - Airport

#### 6. **Salem** (1 Route, 8 Buses) ✅
- **State:** Tamil Nadu
- **Location:** Center (11.6643°N, 78.1460°E)
- **Route:**
  - Route S101: Bus Stand - Mettur

#### 7. **Coimbatore** (1 Route, 8 Buses) ✅
- **State:** Tamil Nadu
- **Location:** Center (11.0081°N, 76.9958°E)
- **Route:**
  - Route CO101: Gandhipuram - Airport

#### 8. **Madurai** (1 Route, 8 Buses) ✅
- **State:** Tamil Nadu
- **Location:** Center (9.9252°N, 78.1198°E)
- **Route:**
  - Route M101: Arappalayam - Meenakshi Temple

### Cities Ready for Routes (Available in Selector)

#### 9. **Hyderabad**
- **State:** Telangana
- **Location:** Center (17.3850°N, 78.4867°E)
- **Status:** City configured, ready for routes

#### 10. **Kolkata**
- **State:** West Bengal
- **Location:** Center (22.5726°N, 88.3639°E)
- **Status:** City configured, ready for routes

#### 11. **Jaipur**
- **State:** Rajasthan
- **Location:** Center (26.9124°N, 75.7873°E)
- **Status:** City configured, ready for routes

#### 12. **Ahmedabad**
- **State:** Gujarat
- **Location:** Center (23.0225°N, 72.5714°E)
- **Status:** City configured, ready for routes

#### 13. **Lucknow**
- **State:** Uttar Pradesh
- **Location:** Center (26.8467°N, 80.9462°E)
- **Status:** City configured, ready for routes

#### 14. **Kochi**
- **State:** Kerala
- **Location:** Center (9.9312°N, 76.2673°E)
- **Status:** City configured, ready for routes

#### 15. **Indore**
- **State:** Madhya Pradesh
- **Location:** Center (22.7196°N, 75.8577°E)
- **Status:** City configured, ready for routes

---

## Summary Statistics

| Metric | Count |
|--------|-------|
| **Total Cities** | 15 |
| **Cities with Active Buses** | 8 |
| **Cities Ready for Routes** | 7 |
| **Total Routes** | 17 |
| **Total Active Buses** | 136 |
| **Buses per Route** | 8 |

---

## How to Add More Routes to Existing Cities

Edit `server-enhanced.js` and add routes to the respective city in `cityRoutesData`:

```javascript
cityId: [ // City Name
    {
        cityId: id,
        cityName: "City Name",
        routeNumber: "ROUTE101",
        name: "From Location - To Location",
        from: "Starting Point",
        to: "Ending Point",
        distance: 25.5,
        estimatedTime: 45,
        fare: 30,
        stops: [
            { stopId: 1, name: "Stop 1", sequence: 1, lat: 13.0827, lng: 80.2707 },
            // ... more stops
        ],
        operatingHours: { start: "05:00", end: "23:00" },
        frequency: 15
    }
]
```

Then restart the server:
```bash
node server-enhanced.js
```

---

## How to Access Cities in Frontend

### Via City Selector Dropdown
- Open `http://localhost:3000`
- Click on the city dropdown
- All 15 cities are displayed with their state names
- Select any city to see buses and routes

### Via Quick Access Buttons
- Below the city dropdown, click on any city tag to quickly switch

### Via API

**Get all cities:**
```bash
curl http://localhost:3000/api/cities
```

**Get buses in a city (e.g., Chennai = id: 6):**
```bash
curl http://localhost:3000/api/cities/6/buses
```

**Get routes in a city:**
```bash
curl http://localhost:3000/api/cities/6/routes
```

**Search by location name:**
```bash
curl "http://localhost:3000/api/search/location?query=salem"
```

---

## City Selection Features

✅ **All Cities Option** - View all buses from all cities at once
✅ **Individual City Selection** - Filter buses by specific city
✅ **Auto Map Centering** - Map automatically zooms to selected city
✅ **City Statistics** - See route count and bus count per city
✅ **Real-time Updates** - Buses update in real-time as they move

---

## Next Steps

1. **To add routes to a city:**
   - Edit `server-enhanced.js`
   - Add route definitions to `cityRoutesData`
   - Restart server

2. **To add more cities:**
   - Add city entry to `config.js` cities array
   - Add route definitions to `server-enhanced.js` cityRoutesData
   - Restart server

3. **To customize city:**
   - Change coordinates, zoom level in `config.js`
   - Add/remove operating hours in routes
   - Adjust fare and distance as needed

---

**Last Updated:** February 10, 2026
**System:** Bus Tracking System v2.0
**Status:** ✅ Production Ready
