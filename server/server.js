// server.js

const express = require('express');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const cors = require('cors');

const app = express();
const port = 3001;
app.use(cors());

// MongoDB in-memory server setup
async function startServer() {
    const mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    // MongoDB model
    const User = mongoose.model('User', new mongoose.Schema({
        name: String,
        email: String,
        password: String,
        walletAddress: String,
    }));

    await mongoose.connect(mongoUri);

    // Middleware to parse JSON in the request body
    app.use(express.json());

    // API route to get all users
    app.get('/users', async (req, res) => {
        try {
            const users = await User.find();
            res.json(users);
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    // API route to create a new user
    app.post('/users', async (req, res) => {
        const { name, email, password } = req.body;

        try {
            const newUser = new User({ name, email, password, walletAddress: "" });
            await newUser.save();
            res.status(201).json(newUser);
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    // API route to update a user by ID
    app.put('/users/:id', async (req, res) => {
        const userId = req.params.id;
        const { name, email, password, walletAddress } = req.body;

        try {
            // Check if the user with the given ID exists
            const existingUser = await User.findById(userId);

            if (!existingUser) {
                return res.status(404).json({ error: 'User not found' });
            }

            // Update user properties
            existingUser.name = name || existingUser.name;
            existingUser.email = email || existingUser.email;
            existingUser.password = password || existingUser.password;
            existingUser.walletAddress = walletAddress || existingUser.walletAddress;

            // Save the updated user
            await existingUser.save();

            res.json(existingUser);
        } catch (error) {
            console.error('Error updating user:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    // API route to handle login
    app.post('/login', async (req, res) => {
        const { email, password } = req.body;

        try {
            // Check if the user exists
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            // In a real application, you should use a secure password hashing library
            // For simplicity, we're comparing the plaintext password in this example
            if (user.password === password) {
                // Passwords match, login successful
                return res.json({ message: 'Login successful', user });
            } else {
                // Passwords don't match, login failed
                return res.status(401).json({ error: 'Invalid credentials' });
            }
        } catch (error) {
            console.error('Error during login:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}

startServer();
