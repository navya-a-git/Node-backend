const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(
            'mongodb+srv://contactmanageruser:oZsMi6mj8i0didrK@contact-manager-cluster.rqhomjt.mongodb.net/contactmanager-api?appName=contact-manager-cluster')
        console.log(`MongoDB connected successfully ${connection.connection.host}`);
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
};

module.exports = connectDB;