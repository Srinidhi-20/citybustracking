# Bus Configuration Guide
# How to Add More Buses to All Routes

## Current Setup

The enhanced version of the system includes:
- **10 Routes** covering different parts of the city
- **8 Buses per Route** by default (configurable)
- **Total: 80 Buses** running simultaneously

## Quick Configuration

### Option 1: Using server-enhanced.js (Easiest)

Simply change the `BUSES_PER_ROUTE` value in `server-enhanced.js`:

```javascript
// Line 21 in server-enhanced.js
const CONFIG = {
    BUSES_PER_ROUTE: 8,  // ← CHANGE THIS NUMBER
    UPDATE_INTERVAL: 3000,
    ANALYTICS_INTERVAL: 10000
};
```

**Examples:**
- `BUSES_PER_ROUTE: 5` → 50 total buses (5 per route × 10 routes)
- `BUSES_PER_ROUTE: 10` → 100 total buses
- `BUSES_PER_ROUTE: 15` → 150 total buses
- `BUSES_PER_ROUTE: 20` → 200 total buses

### Option 2: Using config.js (More Features)

Use the dedicated configuration file for more control:

```javascript
// In config.js
buses: {
    perRoute: 10,  // ← CHANGE THIS NUMBER
    capacityOptions: [40, 45, 50, 55, 60],
    acProbability: 0.6,
    wifiProbability: 0.4,
    delayProbability: 0.25
}
```

## All Available Routes

The system includes these 10 comprehensive routes:

1. **Route 101** - Railway Station → Airport Express (5 stops)
2. **Route 202** - Bus Terminal → University Campus (5 stops)
3. **Route 303** - Industrial Area → Residential Zone (5 stops)
4. **Route 404** - Metro Station → IT Park Shuttle (5 stops)
5. **Route 505** - Old City → New Town Connector (5 stops)
6. **Route 606** - Hospital → Medical College Route (5 stops)
7. **Route 707** - Airport → Hotel Zone Express (5 stops)
8. **Route 808** - Circular City Route (6 stops)
9. **Route 909** - School → College → University Link (5 stops)
10. **Route 1010** - Industrial Estate → Workers Colony (5 stops)

## Complete Configuration Examples

### Example 1: Small City Setup
```javascript
// 5 buses per route, 3 routes = 15 total buses
const CONFIG = {
    BUSES_PER_ROUTE: 5,
    ACTIVE_ROUTES: [1, 2, 3]  // Only use first 3 routes
};
```

### Example 2: Medium City Setup
```javascript
// 8 buses per route, 7 routes = 56 total buses
const CONFIG = {
    BUSES_PER_ROUTE: 8,
    ACTIVE_ROUTES: [1, 2, 3, 4, 5, 6, 7]
};
```

### Example 3: Large City Setup (Current)
```javascript
// 8 buses per route, 10 routes = 80 total buses
const CONFIG = {
    BUSES_PER_ROUTE: 8,
    ACTIVE_ROUTES: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
};
```

### Example 4: Very Large City Setup
```javascript
// 15 buses per route, 10 routes = 150 total buses
const CONFIG = {
    BUSES_PER_ROUTE: 15,
    ACTIVE_ROUTES: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
};
```

### Example 5: Mega City Setup
```javascript
// 20 buses per route, 10 routes = 200 total buses
const CONFIG = {
    BUSES_PER_ROUTE: 20,
    ACTIVE_ROUTES: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
};
```

## Adding More Routes

If you need more than 10 routes, add them to the `routes` array in `server-enhanced.js`:

```javascript
{
    id: 11,
    routeNumber: "1111",
    name: "Your New Route",
    from: "Starting Point",
    to: "Ending Point",
    distance: 20.0,
    estimatedTime: 40,
    fare: 25,
    stops: [
        { stopId: 52, name: "Stop 1", sequence: 1, lat: 28.6100, lng: 77.2100 },
        { stopId: 53, name: "Stop 2", sequence: 2, lat: 28.6150, lng: 77.2150 },
        { stopId: 54, name: "Stop 3", sequence: 3, lat: 28.6200, lng: 77.2200 },
        { stopId: 55, name: "Stop 4", sequence: 4, lat: 28.6250, lng: 77.2250 },
        { stopId: 56, name: "Stop 5", sequence: 5, lat: 28.6300, lng: 77.2300 }
    ],
    operatingHours: { start: "06:00", end: "22:00" },
    frequency: 15
}
```

## Bus Naming Convention

Buses are automatically named using this pattern:
- `BUS-{ROUTE_NUMBER}-{LETTER}`

Examples:
- Route 101: BUS-101-A, BUS-101-B, BUS-101-C, ... BUS-101-H (8 buses)
- Route 202: BUS-202-A, BUS-202-B, BUS-202-C, ... BUS-202-H (8 buses)

If you have more than 26 buses per route, it cycles through:
- A-Z (26 buses)
- AA-AZ (next 26)
- BA-BZ (next 26)
- etc.

## Performance Considerations

### System Resources

| Total Buses | RAM Usage | CPU Usage | Recommended |
|-------------|-----------|-----------|-------------|
| 50          | ~200 MB   | Low       | Any system  |
| 100         | ~400 MB   | Medium    | 2GB+ RAM    |
| 200         | ~800 MB   | High      | 4GB+ RAM    |
| 500         | ~2 GB     | Very High | 8GB+ RAM    |

### Update Frequency

Adjust update intervals based on number of buses:

```javascript
// For 50-100 buses
UPDATE_INTERVAL: 3000  // 3 seconds

// For 100-200 buses  
UPDATE_INTERVAL: 5000  // 5 seconds

// For 200+ buses
UPDATE_INTERVAL: 10000  // 10 seconds
```

## Testing Your Configuration

After changing the bus count, test it:

1. **Start the server:**
```bash
node server-enhanced.js
```

2. **Check the console output:**
```
====================================
Bus Tracking System Server Started
====================================
Port: 3000
Routes: 10
Buses per Route: 8
Total Buses: 80
====================================
```

3. **Test the API:**
```bash
# Get total bus count
curl http://localhost:3000/api/analytics

# Get buses for a specific route
curl http://localhost:3000/api/routes/1/buses
```

4. **Open the web interface:**
```
http://localhost:3000
```

## Database Considerations

### MongoDB Optimization for Many Buses

If you're running 200+ buses, optimize MongoDB:

```javascript
// Add indexes for better performance
db.buses.createIndex({ "location": "2dsphere" });
db.buses.createIndex({ "routeId": 1, "status": 1 });
db.buses.createIndex({ "busNumber": 1 });
db.buses.createIndex({ "lastUpdated": -1 });
```

### Memory vs Database Storage

For development/testing:
- Use in-memory storage (current setup)
- Fast but data is lost on restart

For production:
- Use MongoDB Atlas or local MongoDB
- Persistent storage
- Better for large fleets

## Real-World Examples

### Tier-2 City (e.g., Jaipur, Indore)
- Routes: 8-10
- Buses per route: 6-8
- Total: 48-80 buses
```javascript
BUSES_PER_ROUTE: 6
```

### Tier-1 City (e.g., Bangalore, Pune)
- Routes: 15-20
- Buses per route: 10-15
- Total: 150-300 buses
```javascript
BUSES_PER_ROUTE: 12
```

### Metropolitan City (e.g., Delhi, Mumbai)
- Routes: 50+
- Buses per route: 15-25
- Total: 750+ buses
```javascript
BUSES_PER_ROUTE: 15
// Add more routes to the routes array
```

## Customizing Individual Routes

You can also assign different numbers of buses to different routes:

```javascript
// Custom bus allocation
const routeBusCount = {
    1: 10,  // Route 101: 10 buses (high demand)
    2: 8,   // Route 202: 8 buses
    3: 6,   // Route 303: 6 buses (lower demand)
    4: 12,  // Route 404: 12 buses (IT park - high demand)
    5: 5,   // Route 505: 5 buses
};

routes.forEach((route) => {
    const busCount = routeBusCount[route.id] || CONFIG.BUSES_PER_ROUTE;
    for (let i = 0; i < busCount; i++) {
        // Generate bus...
    }
});
```

## Monitoring Large Fleets

For large bus fleets (100+ buses), add monitoring:

```javascript
// Add to server-enhanced.js
setInterval(() => {
    console.log(`
    Fleet Status:
    - Total Buses: ${buses.length}
    - Active: ${buses.filter(b => b.status === 'active').length}
    - Delayed: ${buses.filter(b => b.status === 'delayed').length}
    - Avg Occupancy: ${Math.round(buses.reduce((s, b) => s + b.occupancy, 0) / buses.length)}%
    `);
}, 30000); // Every 30 seconds
```

## Common Issues & Solutions

### Issue: Too many buses, system is slow
**Solution:** Increase `UPDATE_INTERVAL` or reduce `BUSES_PER_ROUTE`

### Issue: Buses overlap on map
**Solution:** Increase the random position variation:
```javascript
lat: currentStop.lat + (Math.random() - 0.5) * 0.01  // Increased from 0.005
```

### Issue: Running out of driver names
**Solution:** Add more names to the `driverNames` array or generate random names

### Issue: Memory usage too high
**Solution:** 
- Enable database storage instead of in-memory
- Reduce update frequency
- Implement pagination for API responses

## Need More Help?

- Check the main README.md for full documentation
- See DEPLOYMENT.md for production setup
- Review server-enhanced.js for implementation details

---

**Happy Tracking! 🚌**