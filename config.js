// config.js - Configuration File for Bus Tracking System

module.exports = {
    // Server Configuration
    server: {
        port: process.env.PORT || 3000,
        environment: process.env.NODE_ENV || 'development',
        corsOrigin: process.env.CORS_ORIGIN || '*'
    },

    // Bus Configuration
    buses: {
        perRoute: 8,  // CHANGE THIS VALUE to add more/fewer buses per route
        // Examples:
        // perRoute: 5  -> 5 buses per route (50 total buses for 10 routes)
        // perRoute: 10 -> 10 buses per route (100 total buses for 10 routes)
        // perRoute: 15 -> 15 buses per route (150 total buses for 10 routes)
        
        capacityOptions: [40, 45, 50, 55, 60],  // Different bus sizes
        defaultCapacity: 50,
        
        // Features
        acProbability: 0.6,        // 60% chance a bus has AC
        wifiProbability: 0.4,      // 40% chance a bus has WiFi
        delayProbability: 0.25     // 25% chance a bus is delayed
    },

    // Route Configuration
    routes: {
        // You can add more routes here
        enableAllRoutes: true,      // Set to false to use only selected routes
        selectedRoutes: [1, 2, 3],  // If enableAllRoutes is false, only these routes run
    },

    // Update Intervals (in milliseconds)
    intervals: {
        busUpdate: 3000,           // Update bus positions every 3 seconds
        analyticsUpdate: 10000,    // Update analytics every 10 seconds
        databaseSync: 60000        // Sync with database every 60 seconds
    },

    // Movement Configuration
    movement: {
        speedMin: 20,              // Minimum bus speed (km/h)
        speedMax: 60,              // Maximum bus speed (km/h)
        movementFactor: 0.1,       // How fast buses move toward next stop
        stopThreshold: 0.002       // Distance to consider arrived at stop
    },

    // Occupancy Configuration
    occupancy: {
        changeRate: 5,             // Max passengers boarding/alighting per update
        peakHourMultiplier: 1.5,   // Occupancy multiplier during peak hours
        peakHours: [
            { start: 7, end: 10 },   // Morning peak
            { start: 17, end: 20 }   // Evening peak
        ]
    },

    // Database Configuration
    database: {
        uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/citybus-tracking',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    },

    // Driver Pool
    driverNames: [
        "Rajesh Kumar", "Suresh Singh", "Amit Sharma", "Vijay Patel", "Ravi Verma",
        "Prakash Joshi", "Sandeep Gupta", "Manoj Yadav", "Ashok Tiwari", "Dinesh Mishra",
        "Ramesh Reddy", "Anil Kumar", "Sanjay Nair", "Deepak Mehta", "Rakesh Pandey",
        "Vikas Agarwal", "Sunil Chauhan", "Ajay Malhotra", "Nitin Saxena", "Pankaj Rao",
        "Harish Sinha", "Mohan Pillai", "Kiran Desai", "Gopal Nambiar", "Satish Iyer"
    ],

    // Multiple Cities Configuration
    cities: [
        {
            id: 1,
            name: "Delhi",
            centerLat: 28.6139,
            centerLng: 77.2090,
            defaultZoom: 13,
            state: "Delhi",
            country: "India"
        },
        {
            id: 2,
            name: "Mumbai",
            centerLat: 19.0760,
            centerLng: 72.8777,
            defaultZoom: 12,
            state: "Maharashtra",
            country: "India"
        },
        {
            id: 3,
            name: "Bangalore",
            centerLat: 12.9716,
            centerLng: 77.5946,
            defaultZoom: 13,
            state: "Karnataka",
            country: "India"
        },
        {
            id: 4,
            name: "Pune",
            centerLat: 18.5204,
            centerLng: 73.8567,
            defaultZoom: 13,
            state: "Maharashtra",
            country: "India"
        },
        {
            id: 5,
            name: "Hyderabad",
            centerLat: 17.3850,
            centerLng: 78.4867,
            defaultZoom: 13,
            state: "Telangana",
            country: "India"
        },
        {
            id: 6,
            name: "Chennai",
            centerLat: 13.0827,
            centerLng: 80.2707,
            defaultZoom: 13,
            state: "Tamil Nadu",
            country: "India"
        },
        {
            id: 7,
            name: "Kolkata",
            centerLat: 22.5726,
            centerLng: 88.3639,
            defaultZoom: 13,
            state: "West Bengal",
            country: "India"
        },
        {
            id: 8,
            name: "Jaipur",
            centerLat: 26.9124,
            centerLng: 75.7873,
            defaultZoom: 13,
            state: "Rajasthan",
            country: "India"
        },
        {
            id: 9,
            name: "Ahmedabad",
            centerLat: 23.0225,
            centerLng: 72.5714,
            defaultZoom: 13,
            state: "Gujarat",
            country: "India"
        },
        {
            id: 10,
            name: "Lucknow",
            centerLat: 26.8467,
            centerLng: 80.9462,
            defaultZoom: 13,
            state: "Uttar Pradesh",
            country: "India"
        },
        {
            id: 11,
            name: "Salem",
            centerLat: 11.6643,
            centerLng: 78.1460,
            defaultZoom: 13,
            state: "Tamil Nadu",
            country: "India"
        },
        {
            id: 12,
            name: "Coimbatore",
            centerLat: 11.0081,
            centerLng: 76.9958,
            defaultZoom: 13,
            state: "Tamil Nadu",
            country: "India"
        },
        {
            id: 13,
            name: "Madurai",
            centerLat: 9.9252,
            centerLng: 78.1198,
            defaultZoom: 13,
            state: "Tamil Nadu",
            country: "India"
        },
        {
            id: 14,
            name: "Kochi",
            centerLat: 9.9312,
            centerLng: 76.2673,
            defaultZoom: 13,
            state: "Kerala",
            country: "India"
        },
        {
            id: 15,
            name: "Indore",
            centerLat: 22.7196,
            centerLng: 75.8577,
            defaultZoom: 13,
            state: "Madhya Pradesh",
            country: "India"
        }
    ],
    
    // Default city (when system starts)
    defaultCity: {
        name: "Delhi",
        centerLat: 28.6139,
        centerLng: 77.2090,
        defaultZoom: 13
    },

    // Notification Configuration
    notifications: {
        enabled: true,
        arrivalNotification: true,
        delayNotification: true,
        crowdingNotification: true,
        crowdingThreshold: 85      // Notify when occupancy > 85%
    },

    // API Rate Limiting
    rateLimiting: {
        enabled: true,
        windowMs: 15 * 60 * 1000,  // 15 minutes
        max: 100                    // Max requests per window
    }
};

/* 
 * QUICK SETUP GUIDE:
 * 
 * 1. Change buses.perRoute to set number of buses per route
 * 2. Modify routes in server-enhanced.js to add more routes
 * 3. Update city coordinates for your city
 * 4. Adjust intervals for faster/slower updates
 * 
 * EXAMPLES:
 * 
 * Small city (5 routes, 5 buses each = 25 total):
 *   - buses.perRoute: 5
 *   - Comment out routes 6-10 in server
 * 
 * Medium city (10 routes, 10 buses each = 100 total):
 *   - buses.perRoute: 10
 *   - Keep all routes
 * 
 * Large city (15 routes, 15 buses each = 225 total):
 *   - buses.perRoute: 15
 *   - Add 5 more routes in server
 * 
 */
