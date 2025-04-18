require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

console.log("DB_URL:", process.env.DB_URL);
console.log("PORT:", process.env.PORT || 5000);
console.log("ORIGIN:", process.env.ORIGIN);

app.use(express.json());
app.use(cors({ origin: process.env.ORIGIN, credentials: true }));
app.use(cookieParser());


try { 
    const authRoutes = require('./routes/authRoute.js');
    app.use('/api/v1', authRoutes);

    const bookingRoutes = require('./routes/bookingRoutes.js');
    app.use('/api/v1/bookings', bookingRoutes);

    const userRoutes = require('./routes/UserRoutes');
    app.use('/api/v1/users', userRoutes);

    const eventRoutes = require('./routes/EventRoutes');
    app.use('/api/v1/events', eventRoutes);

    console.log("Routes loaded successfully");
} catch (error) {
    console.error("Error loading routes:", error.message);
    process.exit(1);
}

// Connect to MongoDB Atlas
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((err) => {
        console.error("DB connection error:", err.message);
        process.exit(1);
    });


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;