// server-enhanced.js - Enhanced Backend with Multi-City Bus Tracking
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const path = require('path');
const config = require('./config');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Configuration
const CONFIG = {
    BUSES_PER_ROUTE: 8,
    UPDATE_INTERVAL: 3000,
    ANALYTICS_INTERVAL: 10000
};

// In-memory database
let buses = [];
let routes = [];
let cities = [];
let notifications = [];

// Initialize comprehensive multi-city data
function initializeData() {
    // Load cities from config
    cities = config.cities;

    // City-specific routes configuration
    const cityRoutesData = {
        1: [ // Delhi
            { cityId: 1, cityName: "Delhi", routeNumber: "101", name: "Railway Station - Airport Express", from: "Railway Station", to: "Airport", distance: 25.5, estimatedTime: 45, fare: 30, stops: [
                { stopId: 1, name: "Railway Station", sequence: 1, lat: 28.6139, lng: 77.2090 },
                { stopId: 2, name: "City Center", sequence: 2, lat: 28.6230, lng: 77.2200 },
                { stopId: 3, name: "Market Square", sequence: 3, lat: 28.6320, lng: 77.2310 },
                { stopId: 4, name: "Tech Park", sequence: 4, lat: 28.6410, lng: 77.2420 },
                { stopId: 5, name: "Airport", sequence: 5, lat: 28.6500, lng: 77.2530 }
            ], operatingHours: { start: "05:00", end: "23:00" }, frequency: 10 },
            { cityId: 1, cityName: "Delhi", routeNumber: "202", name: "Bus Terminal - University Campus", from: "Bus Terminal", to: "University", distance: 18.3, estimatedTime: 35, fare: 25, stops: [
                { stopId: 6, name: "Bus Terminal", sequence: 1, lat: 28.6000, lng: 77.1990 },
                { stopId: 7, name: "Shopping Mall", sequence: 2, lat: 28.6100, lng: 77.2100 },
                { stopId: 8, name: "Hospital", sequence: 3, lat: 28.6200, lng: 77.2210 },
                { stopId: 9, name: "College", sequence: 4, lat: 28.6300, lng: 77.2320 },
                { stopId: 10, name: "University", sequence: 5, lat: 28.6400, lng: 77.2430 }
            ], operatingHours: { start: "06:00", end: "22:00" }, frequency: 15 },
            { cityId: 1, cityName: "Delhi", routeNumber: "303", name: "Industrial Area - Residential Zone", from: "Industrial Area", to: "Residential Complex", distance: 22.0, estimatedTime: 40, fare: 28, stops: [
                { stopId: 11, name: "Industrial Area", sequence: 1, lat: 28.5950, lng: 77.2150 },
                { stopId: 12, name: "Main Road Junction", sequence: 2, lat: 28.6050, lng: 77.2250 },
                { stopId: 13, name: "Park Gate", sequence: 3, lat: 28.6150, lng: 77.2350 },
                { stopId: 14, name: "School", sequence: 4, lat: 28.6250, lng: 77.2450 },
                { stopId: 15, name: "Residential Complex", sequence: 5, lat: 28.6350, lng: 77.2550 }
            ], operatingHours: { start: "05:30", end: "22:30" }, frequency: 12 },
            { cityId: 1, cityName: "Delhi", routeNumber: "404", name: "Metro Station - IT Park Shuttle", from: "Metro Station", to: "IT Park", distance: 15.8, estimatedTime: 30, fare: 20, stops: [
                { stopId: 16, name: "Metro Station", sequence: 1, lat: 28.5850, lng: 77.2050 },
                { stopId: 17, name: "Commercial Complex", sequence: 2, lat: 28.5950, lng: 77.2150 },
                { stopId: 18, name: "Sports Stadium", sequence: 3, lat: 28.6050, lng: 77.2250 },
                { stopId: 19, name: "Business Hub", sequence: 4, lat: 28.6150, lng: 77.2350 },
                { stopId: 20, name: "IT Park", sequence: 5, lat: 28.6250, lng: 77.2450 }
            ], operatingHours: { start: "06:30", end: "21:00" }, frequency: 8 },
            { cityId: 1, cityName: "Delhi", routeNumber: "505", name: "Old City - New Town Connector", from: "Old City Market", to: "New Town Mall", distance: 28.5, estimatedTime: 50, fare: 35, stops: [
                { stopId: 21, name: "Old City Market", sequence: 1, lat: 28.6350, lng: 77.1950 },
                { stopId: 22, name: "Heritage Gate", sequence: 2, lat: 28.6400, lng: 77.2050 },
                { stopId: 23, name: "Central Park", sequence: 3, lat: 28.6450, lng: 77.2150 },
                { stopId: 24, name: "Convention Center", sequence: 4, lat: 28.6500, lng: 77.2250 },
                { stopId: 25, name: "New Town Mall", sequence: 5, lat: 28.6550, lng: 77.2350 }
            ], operatingHours: { start: "05:00", end: "23:30" }, frequency: 20 },
            { cityId: 1, cityName: "Delhi", routeNumber: "606", name: "Hospital - Medical College Route", from: "General Hospital", to: "Medical College", distance: 12.5, estimatedTime: 25, fare: 18, stops: [
                { stopId: 26, name: "General Hospital", sequence: 1, lat: 28.6150, lng: 77.1950 },
                { stopId: 27, name: "Pharmacy Market", sequence: 2, lat: 28.6200, lng: 77.2050 },
                { stopId: 28, name: "Nursing College", sequence: 3, lat: 28.6250, lng: 77.2150 },
                { stopId: 29, name: "Research Center", sequence: 4, lat: 28.6300, lng: 77.2250 },
                { stopId: 30, name: "Medical College", sequence: 5, lat: 28.6350, lng: 77.2350 }
            ], operatingHours: { start: "05:00", end: "22:00" }, frequency: 10 }
        ],
        2: [ // Mumbai
            { cityId: 2, cityName: "Mumbai", routeNumber: "M101", name: "CST - Bandra Express", from: "CST Station", to: "Bandra", distance: 18.0, estimatedTime: 40, fare: 35, stops: [
                { stopId: 52, name: "CST Station", sequence: 1, lat: 19.0760, lng: 72.8777 },
                { stopId: 53, name: "Dadar Circle", sequence: 2, lat: 19.0183, lng: 72.8289 },
                { stopId: 54, name: "Worli Sea Face", sequence: 3, lat: 19.0088, lng: 72.8271 },
                { stopId: 55, name: "Marine Drive", sequence: 4, lat: 18.9650, lng: 72.8285 },
                { stopId: 56, name: "Bandra Station", sequence: 5, lat: 19.0596, lng: 72.8295 }
            ], operatingHours: { start: "05:00", end: "23:00" }, frequency: 15 },
            { cityId: 2, cityName: "Mumbai", routeNumber: "M202", name: "Airport - Andheri Route", from: "Bombay Airport", to: "Andheri", distance: 25.0, estimatedTime: 50, fare: 40, stops: [
                { stopId: 57, name: "Bombay Airport T2", sequence: 1, lat: 19.0886, lng: 72.8679 },
                { stopId: 58, name: "Airport T1", sequence: 2, lat: 19.0960, lng: 72.8680 },
                { stopId: 59, name: "Mahape Junction", sequence: 3, lat: 19.1162, lng: 72.8474 },
                { stopId: 60, name: "Andheri East", sequence: 4, lat: 19.1136, lng: 72.8697 },
                { stopId: 61, name: "Andheri West", sequence: 5, lat: 19.1119, lng: 72.8262 }
            ], operatingHours: { start: "04:00", end: "00:30" }, frequency: 12 },
            { cityId: 2, cityName: "Mumbai", routeNumber: "M303", name: "Borivali - Colaba Loop", from: "Borivali Station", to: "Colaba Causeway", distance: 35.0, estimatedTime: 75, fare: 45, stops: [
                { stopId: 62, name: "Borivali Station", sequence: 1, lat: 19.2183, lng: 72.8009 },
                { stopId: 63, name: "Thane Station", sequence: 2, lat: 19.2183, lng: 72.9781 },
                { stopId: 64, name: "South Mumbai", sequence: 3, lat: 19.0292, lng: 72.8308 },
                { stopId: 65, name: "Flora Fountain", sequence: 4, lat: 18.9673, lng: 72.8320 },
                { stopId: 66, name: "Colaba Causeway", sequence: 5, lat: 18.9456, lng: 72.8326 }
            ], operatingHours: { start: "05:30", end: "22:30" }, frequency: 20 }
        ],
        3: [ // Bangalore
            { cityId: 3, cityName: "Bangalore", routeNumber: "B101", name: "City Center - Tech Park", from: "Vidhana Soudha", to: "Whitefield Tech Park", distance: 28.0, estimatedTime: 50, fare: 32, stops: [
                { stopId: 67, name: "Vidhana Soudha", sequence: 1, lat: 12.9716, lng: 77.5946 },
                { stopId: 68, name: "Indiranagar", sequence: 2, lat: 12.9716, lng: 77.6412 },
                { stopId: 69, name: "Koramangala", sequence: 3, lat: 12.9352, lng: 77.6245 },
                { stopId: 70, name: "Electronic City", sequence: 4, lat: 12.8386, lng: 77.6762 },
                { stopId: 71, name: "Whitefield Tech Park", sequence: 5, lat: 13.0011, lng: 77.7299 }
            ], operatingHours: { start: "06:00", end: "22:00" }, frequency: 18 },
            { cityId: 3, cityName: "Bangalore", routeNumber: "B202", name: "Airport - MG Road Express", from: "Kempegowda Airport", to: "MG Road", distance: 38.0, estimatedTime: 60, fare: 50, stops: [
                { stopId: 72, name: "Kempegowda Airport", sequence: 1, lat: 13.1939, lng: 77.7064 },
                { stopId: 73, name: "Airport Road", sequence: 2, lat: 13.1234, lng: 77.6908 },
                { stopId: 74, name: "Ulsoor", sequence: 3, lat: 13.0362, lng: 77.6245 },
                { stopId: 75, name: "Cubbon Park", sequence: 4, lat: 12.9789, lng: 77.5941 },
                { stopId: 76, name: "MG Road", sequence: 5, lat: 12.9755, lng: 77.6100 }
            ], operatingHours: { start: "05:00", end: "23:30" }, frequency: 14 }
        ],
        4: [ // Pune
            { cityId: 4, cityName: "Pune", routeNumber: "P101", name: "Railway Station - Hinjewadi", from: "Pune Junction", to: "Hinjewadi Tech Park", distance: 25.0, estimatedTime: 45, fare: 28, stops: [
                { stopId: 77, name: "Pune Junction", sequence: 1, lat: 18.5204, lng: 73.8567 },
                { stopId: 78, name: "Camp", sequence: 2, lat: 18.5229, lng: 73.8568 },
                { stopId: 79, name: "Shivaji Nagar", sequence: 3, lat: 18.5314, lng: 73.8486 },
                { stopId: 80, name: "Viman Nagar", sequence: 4, lat: 18.5705, lng: 73.9124 },
                { stopId: 81, name: "Hinjewadi Tech Park", sequence: 5, lat: 18.5919, lng: 73.7997 }
            ], operatingHours: { start: "05:30", end: "22:00" }, frequency: 16 },
            { cityId: 4, cityName: "Pune", routeNumber: "P202", name: "Airport - City Center", from: "Pune Airport", to: "City Center", distance: 35.0, estimatedTime: 60, fare: 38, stops: [
                { stopId: 82, name: "Pune Airport", sequence: 1, lat: 18.5821, lng: 73.9197 },
                { stopId: 83, name: "Aundh", sequence: 2, lat: 18.5631, lng: 73.8005 },
                { stopId: 84, name: "Model Colony", sequence: 3, lat: 18.5550, lng: 73.8481 },
                { stopId: 85, name: "Sadashiv Peth", sequence: 4, lat: 18.5278, lng: 73.8630 },
                { stopId: 86, name: "City Center", sequence: 5, lat: 18.5204, lng: 73.8567 }
            ], operatingHours: { start: "05:00", end: "23:00" }, frequency: 12 }
        ],
        6: [ // Chennai
            { cityId: 6, cityName: "Chennai", routeNumber: "C101", name: "Central Station - Airport", from: "Central Railway Station", to: "Chennai Airport", distance: 16.0, estimatedTime: 40, fare: 28, stops: [
                { stopId: 87, name: "Central Railway Station", sequence: 1, lat: 13.0827, lng: 80.2707 },
                { stopId: 88, name: "Chepauk Palace", sequence: 2, lat: 13.0535, lng: 80.2650 },
                { stopId: 89, name: "IIT Madras", sequence: 3, lat: 12.9918, lng: 80.2316 },
                { stopId: 90, name: "Tirupati Nagar", sequence: 4, lat: 12.9689, lng: 80.2248 },
                { stopId: 91, name: "Chennai Airport", sequence: 5, lat: 12.9940, lng: 80.1608 }
            ], operatingHours: { start: "05:00", end: "23:00" }, frequency: 15 }
        ],
        11: [ // Salem
            { cityId: 11, cityName: "Salem", routeNumber: "S101", name: "Bus Stand - Mettur", from: "Central Bus Stand", to: "Mettur Lake", distance: 35.0, estimatedTime: 50, fare: 22, stops: [
                { stopId: 92, name: "Central Bus Stand", sequence: 1, lat: 11.6643, lng: 78.1460 },
                { stopId: 93, name: "Government Hospital", sequence: 2, lat: 11.6710, lng: 78.1520 },
                { stopId: 94, name: "Gandhi Road", sequence: 3, lat: 11.6780, lng: 78.1590 },
                { stopId: 95, name: "Kumaran Nagar", sequence: 4, lat: 11.6850, lng: 78.1660 },
                { stopId: 96, name: "Mettur Lake", sequence: 5, lat: 11.7400, lng: 78.2100 }
            ], operatingHours: { start: "06:00", end: "21:00" }, frequency: 12 }
        ],
        12: [ // Coimbatore
            { cityId: 12, cityName: "Coimbatore", routeNumber: "CO101", name: "Gandhipuram - Airport", from: "Gandhipuram Bus Stand", to: "Coimbatore Airport", distance: 12.0, estimatedTime: 25, fare: 20, stops: [
                { stopId: 97, name: "Gandhipuram Bus Stand", sequence: 1, lat: 11.0081, lng: 76.9958 },
                { stopId: 98, name: "Race Course", sequence: 2, lat: 11.0150, lng: 76.9885 },
                { stopId: 99, name: "Ukkadam", sequence: 3, lat: 11.0250, lng: 76.9750 },
                { stopId: 100, name: "Peelamedu", sequence: 4, lat: 11.0350, lng: 76.9600 },
                { stopId: 101, name: "Coimbatore Airport", sequence: 5, lat: 11.0420, lng: 76.9300 }
            ], operatingHours: { start: "05:30", end: "22:00" }, frequency: 14 }
        ],
        13: [ // Madurai
            { cityId: 13, cityName: "Madurai", routeNumber: "M101", name: "Arappalayam - Meenakshi Temple", from: "Arappalayam Bus Stand", to: "Meenakshi Temple", distance: 10.0, estimatedTime: 20, fare: 15, stops: [
                { stopId: 102, name: "Arappalayam Bus Stand", sequence: 1, lat: 9.9252, lng: 78.1198 },
                { stopId: 103, name: "Gandhi Museum", sequence: 2, lat: 9.9290, lng: 78.1250 },
                { stopId: 104, name: "Teppakulam", sequence: 3, lat: 9.9350, lng: 78.1350 },
                { stopId: 105, name: "City Center", sequence: 4, lat: 9.9410, lng: 78.1420 },
                { stopId: 106, name: "Meenakshi Temple", sequence: 5, lat: 9.9520, lng: 78.1510 }
            ], operatingHours: { start: "06:00", end: "21:00" }, frequency: 10 }
        ]
    };

    // Build routes with IDs
    let routeId = 1;
    Object.keys(cityRoutesData).forEach(cityId => {
        cityRoutesData[cityId].forEach(route => {
            routes.push({ id: routeId++, ...route });
        });
    });

    // Generate buses
    buses = [];
    const driverNames = config.driverNames;

    routes.forEach((route) => {
        for (let i = 0; i < CONFIG.BUSES_PER_ROUTE; i++) {
            const letterIndex = i % 26;
            const prefix = Math.floor(i / 26) > 0 ? String.fromCharCode(65 + Math.floor(i / 26) - 1) : '';
            const letter = String.fromCharCode(65 + letterIndex);
            const busNumber = `BUS-${route.routeNumber}-${prefix}${letter}`;

            buses.push({
                id: `BUS-${route.id}-${i}`,
                busNumber: busNumber,
                routeId: route.id,
                routeNumber: route.routeNumber,
                cityId: route.cityId,
                cityName: route.cityName,
                capacity: 50,
                currentCapacity: Math.floor(Math.random() * 50),
                driverName: driverNames[Math.floor(Math.random() * driverNames.length)],
                status: Math.random() > 0.2 ? 'active' : 'delayed',
                delay: Math.floor(Math.random() * 15),
                currentStop: route.stops[0].name,
                currentStopIndex: 0,
                location: {
                    lat: route.stops[0].lat,
                    lng: route.stops[0].lng
                },
                lat: route.stops[0].lat,
                lng: route.stops[0].lng,
                hasAC: Math.random() > 0.4,
                hasWiFi: Math.random() > 0.6,
                lastUpdated: new Date()
            });
        }
    });

    console.log(`✓ Initialized ${cities.length} cities`);
    console.log(`✓ Initialized ${routes.length} routes`);
    console.log(`✓ Initialized ${buses.length} buses`);
}

// API Endpoints

// Get all cities
app.get('/api/cities', (req, res) => {
    res.json({
        success: true,
        data: cities,
        count: cities.length
    });
});

// Get buses by city
app.get('/api/cities/:cityId/buses', (req, res) => {
    const cityId = parseInt(req.params.cityId);
    const cityBuses = buses.filter(b => b.cityId === cityId);
    const city = cities.find(c => c.id === cityId);

    res.json({
        success: true,
        city: city,
        data: cityBuses,
        count: cityBuses.length,
        activeBuses: cityBuses.filter(b => b.status === 'active').length
    });
});

// Get routes by city
app.get('/api/cities/:cityId/routes', (req, res) => {
    const cityId = parseInt(req.params.cityId);
    const cityRoutes = routes.filter(r => r.cityId === cityId);
    const city = cities.find(c => c.id === cityId);

    res.json({
        success: true,
        city: city,
        data: cityRoutes,
        count: cityRoutes.length
    });
});

// Search buses by location/city
app.get('/api/search/location', (req, res) => {
    const { query } = req.query;

    if (!query) {
        return res.status(400).json({ success: false, message: 'Query parameter required' });
    }

    const searchTerm = query.toLowerCase();

    // Search in cities
    const matchingCities = cities.filter(c =>
        c.name.toLowerCase().includes(searchTerm) ||
        c.state.toLowerCase().includes(searchTerm)
    );

    // Get buses from matching cities
    const cityIds = matchingCities.map(c => c.id);
    const busesInLocation = buses.filter(b => cityIds.includes(b.cityId));
    const routesInLocation = routes.filter(r => cityIds.includes(r.cityId));

    res.json({
        success: true,
        data: {
            cities: matchingCities,
            routes: routesInLocation,
            buses: busesInLocation
        },
        count: {
            cities: matchingCities.length,
            routes: routesInLocation.length,
            buses: busesInLocation.length
        }
    });
});

// Get all routes
app.get('/api/routes', (req, res) => {
    res.json({
        success: true,
        data: routes,
        count: routes.length
    });
});

// Get specific route
app.get('/api/routes/:routeId', (req, res) => {
    const route = routes.find(r => r.id == req.params.routeId);
    if (route) {
        const routeBuses = buses.filter(b => b.routeId == req.params.routeId);
        res.json({ 
            success: true, 
            data: {
                ...route,
                activeBuses: routeBuses.length,
                buses: routeBuses
            }
        });
    } else {
        res.status(404).json({ success: false, message: 'Route not found' });
    }
});

// Get all buses
app.get('/api/buses', (req, res) => {
    const { routeId, status, routeNumber } = req.query;
    let filteredBuses = buses;

    if (routeId) {
        filteredBuses = filteredBuses.filter(b => b.routeId == routeId);
    }

    if (routeNumber) {
        filteredBuses = filteredBuses.filter(b => b.routeNumber === routeNumber);
    }

    if (status) {
        filteredBuses = filteredBuses.filter(b => b.status === status);
    }

    res.json({
        success: true,
        data: filteredBuses,
        count: filteredBuses.length,
        totalBuses: buses.length
    });
});

// Get specific bus
app.get('/api/buses/:busId', (req, res) => {
    const bus = buses.find(b => b.id === req.params.busId || b.busNumber === req.params.busId);
    if (bus) {
        const route = routes.find(r => r.id === bus.routeId);
        res.json({ 
            success: true, 
            data: {
                ...bus,
                routeDetails: route
            }
        });
    } else {
        res.status(404).json({ success: false, message: 'Bus not found' });
    }
});

// Get buses by route
app.get('/api/routes/:routeId/buses', (req, res) => {
    const routeBuses = buses.filter(b => b.routeId == req.params.routeId);
    const activeBuses = routeBuses.filter(b => b.status === 'active');
    
    res.json({
        success: true,
        data: routeBuses,
        count: routeBuses.length,
        activeBuses: activeBuses.length
    });
});

// Get ETA for a bus at a specific stop
app.get('/api/buses/:busId/eta/:stopId', (req, res) => {
    const bus = buses.find(b => b.id === req.params.busId);
    
    if (!bus) {
        return res.status(404).json({ success: false, message: 'Bus not found' });
    }

    const route = routes.find(r => r.id === bus.routeId);
    const stopIndex = route.stops.findIndex(s => s.stopId == req.params.stopId);
    
    if (stopIndex === -1) {
        return res.status(404).json({ success: false, message: 'Stop not found on this route' });
    }

    const stopsRemaining = stopIndex - bus.currentStopIndex;
    const estimatedMinutes = stopsRemaining > 0 ? stopsRemaining * 3 + bus.delay : 0;

    res.json({
        success: true,
        data: {
            busId: bus.id,
            busNumber: bus.busNumber,
            stopName: route.stops[stopIndex].name,
            eta: estimatedMinutes,
            stopsRemaining: stopsRemaining,
            currentOccupancy: Math.round((bus.currentCapacity / bus.capacity) * 100),
            delay: bus.delay,
            status: bus.status
        }
    });
});

// Search buses and routes
app.get('/api/search', (req, res) => {
    const { query } = req.query;
    
    if (!query) {
        return res.status(400).json({ success: false, message: 'Query parameter required' });
    }

    const searchTerm = query.toLowerCase();
    const matchingRoutes = routes.filter(r => 
        r.routeNumber.toLowerCase().includes(searchTerm) ||
        r.name.toLowerCase().includes(searchTerm) ||
        r.from.toLowerCase().includes(searchTerm) ||
        r.to.toLowerCase().includes(searchTerm)
    );

    const matchingBuses = buses.filter(b => 
        b.busNumber.toLowerCase().includes(searchTerm) ||
        b.currentStop.toLowerCase().includes(searchTerm)
    );

    res.json({
        success: true,
        data: {
            routes: matchingRoutes,
            buses: matchingBuses
        },
        count: {
            routes: matchingRoutes.length,
            buses: matchingBuses.length
        }
    });
});

// Get analytics/statistics
app.get('/api/analytics', (req, res) => {
    const totalBuses = buses.length;
    const activeBuses = buses.filter(b => b.status === 'active').length;
    const delayedBuses = buses.filter(b => b.status === 'delayed').length;
    const avgOccupancy = buses.reduce((sum, b) => sum + (b.currentCapacity / b.capacity), 0) / totalBuses * 100;
    const avgDelay = buses.reduce((sum, b) => sum + b.delay, 0) / totalBuses;

    // Per route statistics
    const routeStats = routes.map(route => {
        const routeBuses = buses.filter(b => b.routeId === route.id);
        const activeRouteBuses = routeBuses.filter(b => b.status === 'active');
        const avgRouteOccupancy = routeBuses.reduce((sum, b) => sum + (b.currentCapacity / b.capacity), 0) / routeBuses.length * 100;
        
        return {
            routeId: route.id,
            routeNumber: route.routeNumber,
            routeName: route.name,
            totalBuses: routeBuses.length,
            activeBuses: activeRouteBuses.length,
            averageOccupancy: Math.round(avgRouteOccupancy)
        };
    });

    res.json({
        success: true,
        data: {
            totalRoutes: routes.length,
            totalBuses: totalBuses,
            activeBuses: activeBuses,
            delayedBuses: delayedBuses,
            averageOccupancy: Math.round(avgOccupancy),
            averageDelay: Math.round(avgDelay),
            busesPerRoute: CONFIG.BUSES_PER_ROUTE,
            routeStats: routeStats,
            timestamp: new Date()
        }
    });
});

// WebSocket connection for real-time updates
io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    socket.emit('initial-data', {
        buses: buses,
        routes: routes,
        config: {
            busesPerRoute: CONFIG.BUSES_PER_ROUTE,
            totalBuses: buses.length
        }
    });

    socket.on('subscribe-bus', (busId) => {
        socket.join(`bus-${busId}`);
    });

    socket.on('unsubscribe-bus', (busId) => {
        socket.leave(`bus-${busId}`);
    });

    socket.on('subscribe-route', (routeId) => {
        socket.join(`route-${routeId}`);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});

// Simulate real-time bus movement
function simulateBusMovement() {
    buses.forEach(bus => {
        const route = routes.find(r => r.id === bus.routeId);
        if (!route) return;

        const nextStopIndex = (bus.currentStopIndex + 1) % route.stops.length;
        const currentStop = route.stops[bus.currentStopIndex];
        const nextStop = route.stops[nextStopIndex];

        // Move bus towards next stop
        const latDiff = (nextStop.lat - bus.location.lat) * 0.1;
        const lngDiff = (nextStop.lng - bus.location.lng) * 0.1;
        
        bus.location.lat += latDiff + (Math.random() - 0.5) * 0.001;
        bus.location.lng += lngDiff + (Math.random() - 0.5) * 0.001;

        // Update speed
        bus.speed = Math.max(0, Math.min(60, bus.speed + (Math.random() - 0.5) * 10));

        // Update occupancy
        const occupancyChange = Math.floor((Math.random() - 0.5) * 5);
        bus.currentCapacity = Math.max(0, Math.min(bus.capacity, bus.currentCapacity + occupancyChange));
        bus.occupancy = Math.round((bus.currentCapacity / bus.capacity) * 100);

        // Check if reached next stop
        const distance = Math.sqrt(
            Math.pow(nextStop.lat - bus.location.lat, 2) + 
            Math.pow(nextStop.lng - bus.location.lng, 2)
        );

        if (distance < 0.002) {
            bus.currentStopIndex = nextStopIndex;
            bus.currentStop = nextStop.name;
            bus.currentStopId = nextStop.stopId;
            bus.nextStops = route.stops.slice(nextStopIndex + 1, Math.min(nextStopIndex + 4, route.stops.length));
            
            io.to(`bus-${bus.id}`).emit('bus-stop-arrival', {
                busId: bus.id,
                busNumber: bus.busNumber,
                stopName: nextStop.name,
                stopId: nextStop.stopId,
                occupancy: bus.occupancy,
                timestamp: new Date()
            });
        }

        bus.lastUpdated = new Date();

        // Emit bus location update
        io.emit('bus-update', {
            id: bus.id,
            busNumber: bus.busNumber,
            location: bus.location,
            speed: bus.speed,
            currentCapacity: bus.currentCapacity,
            occupancy: bus.occupancy,
            currentStop: bus.currentStop,
            status: bus.status,
            delay: bus.delay
        });
    });
}

// Update bus positions
setInterval(simulateBusMovement, CONFIG.UPDATE_INTERVAL);

// Periodic analytics broadcast
setInterval(() => {
    const totalBuses = buses.length;
    const activeBuses = buses.filter(b => b.status === 'active').length;
    const avgOccupancy = buses.reduce((sum, b) => sum + (b.currentCapacity / b.capacity), 0) / totalBuses * 100;

    io.emit('analytics-update', {
        totalBuses,
        activeBuses,
        averageOccupancy: Math.round(avgOccupancy),
        timestamp: new Date()
    });
}, CONFIG.ANALYTICS_INTERVAL);

// Initialize data
initializeData();

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`====================================`);
    console.log(`Bus Tracking System Server Started`);
    console.log(`====================================`);
    console.log(`Port: ${PORT}`);
    console.log(`Routes: ${routes.length}`);
    console.log(`Buses per Route: ${CONFIG.BUSES_PER_ROUTE}`);
    console.log(`Total Buses: ${buses.length}`);
    console.log(`API Endpoint: http://localhost:${PORT}/api`);
    console.log(`WebSocket: ws://localhost:${PORT}`);
    console.log(`====================================`);
});

module.exports = { app, server, io };
