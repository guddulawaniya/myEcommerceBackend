const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const connectDB = require('./config/db');
// Routes
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const bannerRoutes = require('./routes/bannerRoutes');
const treadingRoutes = require('./routes/TrendingProductRoutes');
const otpRoutes = require('./routes/otpRoutes');
const cartRoutes = require('./routes/cartRoutes');
const reviewRoutes = require('./routes/reviewsRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes')
const newReleasesRoutes = require('./routes/newReleaseRoutes');
const dealsRoutes = require('./routes/dealsRoutes');
const profileRoutes = require('./routes/profileRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const logoutRoutes = require('./routes/logoutRoutes');
//const { router: logoutRoutes, tokenBlacklist } = require('./routes/logoutRoutes');


dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: '*',
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/treading', treadingRoutes);
app.use('/api/', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/banners', bannerRoutes);
app.use('/api/otp', otpRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/newRelease', newReleasesRoutes);
app.use('/api/deals', dealsRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api',logoutRoutes)


app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));
connectDB();

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
