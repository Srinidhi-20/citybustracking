# Quick Start Guide - Multi-City Bus Tracking

## Installation & Setup

### 1. Start the Server
```bash
node server-enhanced.js
```

You should see:
```
====================================
Bus Tracking System Server Started
====================================
Port: 3000
Cities: 10
Routes: 13
Total Buses: 104
Buses per Route: 8
====================================
```

### 2. Open in Browser
```
http://localhost:3000
```

## Using the System

### Select a City
1. Look at the **left sidebar**
2. Find **"Select City:"** dropdown
3. Choose any city:
   - Delhi (Delhi)
   - Mumbai (Maharashtra)
   - Bangalore (Karnataka)
   - Pune (Maharashtra)
   - Or see all cities

### What You'll See

**City Selector**
- Dropdown with all 10 cities
- Shows city name and state
- Select to view city-specific buses

**City Info Panel** (when city selected)
- City name
- Number of routes
- Number of buses

**Map**
- Auto-centers on selected city
- Shows bus locations as blue dots
- Numbers show bus routes

**Bus List**
- Shows buses from selected city
- Click a bus to see details
- Shows status (active/delayed)
- Shows occupancy (% full)

## API Quick Reference

### Get All Cities
```bash
curl http://localhost:3000/api/cities
```

### Get Buses in Delhi
```bash
curl http://localhost:3000/api/cities/1/buses
```

### Get Routes in Mumbai
```bash
curl http://localhost:3000/api/cities/2/routes
```

### Search by City Name
```bash
curl "http://localhost:3000/api/search/location?query=bangalore"
```

## City IDs Reference
- 1 = Delhi
- 2 = Mumbai
- 3 = Bangalore
- 4 = Pune
- 5 = Hyderabad (ready for routes)
- 6 = Chennai (ready for routes)
- 7 = Kolkata (ready for routes)
- 8 = Jaipur (ready for routes)
- 9 = Ahmedabad (ready for routes)
- 10 = Lucknow (ready for routes)

## Example Workflows

### Workflow 1: Find buses in Delhi
1. Open http://localhost:3000
2. Select "Delhi (Delhi)" from dropdown
3. See 48 buses on map
4. Click any bus for details

### Workflow 2: Compare two cities
1. Select Delhi
2. Note number of buses
3. Select Mumbai
4. Compare bus counts

### Workflow 3: Use API to get data
```bash
# Get all cities
curl http://localhost:3000/api/cities | jq

# Get Mumbai buses
curl http://localhost:3000/api/cities/2/buses | jq '.data | length'

# Search for city
curl "http://localhost:3000/api/search/location?query=bangalore" | jq
```

## Features You Can Try

### Search Within City
1. Select a city
2. Use search box to find specific buses/routes
3. Results filtered to selected city

### View Bus Details
1. Click on any bus in the list or map
2. See:
   - Bus number
   - Current location
   - Route details
   - Occupancy
   - Next stops
   - Driver info

### Monitor Real-Time Updates
- Buses move on map every 3 seconds
- Occupancy changes dynamically
- Status updates in real-time

### Check Statistics
- Total buses active
- Number of delayed buses
- Average occupancy
- Routes with most traffic

## Adding New Cities with Routes

### Quick Add Example: Lucknow
1. **Server is ready** - Lucknow (ID: 10) already in config
2. **Add routes** to `server-enhanced.js`:
   ```javascript
   10: [ // Lucknow
       {
           cityId: 10,
           cityName: "Lucknow",
           routeNumber: "L101",
           name: "Station - Tech Park",
           // ... add full route details
       }
   ]
   ```
3. **Restart server**:
   ```bash
   node server-enhanced.js
   ```

## Troubleshooting

### Problem: "Cannot find module 'config'"
**Solution:** Make sure `config.js` is in same directory as `server-enhanced.js`

### Problem: Dropdown shows "All Cities" only
**Solution:** 
1. Check server is running
2. Open browser console (F12)
3. Look for error messages
4. Refresh page

### Problem: Map doesn't center on city
**Solution:**
1. Try a different city
2. Check browser console for errors
3. Clear cache and refresh (Ctrl+Shift+R)

### Problem: Only seeing buses from one city when selecting "All Cities"
**Solution:**
1. Refresh page
2. Check that server shows "Cities: 10" on startup
3. Restart server

## Configuration Tips

### Change Buses Per Route
Edit `config.js`:
```javascript
buses: {
    perRoute: 10  // Change from 8 to 10
}
```
- 8 buses per route = 104 total
- 10 buses per route = 130 total
- 15 buses per route = 195 total

### Add More Routes to a City
Edit `server-enhanced.js`, find the city in `cityRoutesData`:
```javascript
11: [ // Add route ID 11
    {
        cityId: 1,
        cityName: "Delhi",
        routeNumber: "1111",
        // ... add route details
    }
]
```

## Performance

### System Resources
- RAM: ~100MB for 104 buses
- CPU: <5% idle
- Network: ~100KB per update

### Optimal Settings
- Cities: Up to 20
- Routes per city: Up to 10
- Buses per route: 8-15
- Update frequency: 3-5 seconds

## Files to Know

| File | Purpose |
|------|---------|
| `config.js` | City and bus configuration |
| `server-enhanced.js` | Backend server and APIs |
| `bus-tracking-system.html` | Frontend user interface |
| `MULTI-CITY-SETUP.md` | Detailed setup guide |
| `LOCATION-SEARCH-GUIDE.md` | API documentation |
| `IMPLEMENTATION-SUMMARY.md` | Technical overview |

## Support

### Check Logs
1. Look at server console output
2. Open browser DevTools (F12)
3. Check "Console" tab for errors

### Debug in Browser
```javascript
// Type in browser console:
console.log(cities);        // See all cities
console.log(buses);         // See all buses
console.log(selectedCityId); // See selected city
console.log(routes);        // See all routes
```

### API Testing
Use curl or Postman:
```bash
# Test API is working
curl http://localhost:3000/api/cities

# Test city buses
curl http://localhost:3000/api/cities/1/buses

# Test search
curl "http://localhost:3000/api/search/location?query=delhi"
```

## Next Steps

1. **Explore the data:**
   - Select different cities
   - Check occupancy levels
   - Monitor real-time updates

2. **Test the APIs:**
   - Use curl to fetch data
   - Build custom reports
   - Integrate with other systems

3. **Customize:**
   - Add more cities
   - Add more routes
   - Change update frequency
   - Add custom features

4. **Scale up:**
   - Increase buses per route
   - Add more cities
   - Implement database
   - Add authentication

## Resources

- **Setup Guide:** See `MULTI-CITY-SETUP.md`
- **API Docs:** See `LOCATION-SEARCH-GUIDE.md`
- **Technical Details:** See `IMPLEMENTATION-SUMMARY.md`
- **Bus Config:** See `BUS-CONFIGURATION-GUIDE.md`

---

**Happy Tracking! 🚌📍**

For more details, check the documentation files in your project folder.
