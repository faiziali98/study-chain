// server.js

const express = require('express');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const cors = require('cors');

const app = express();
const port = 3001;
app.use(cors());

// MongoDB model
const User = mongoose.model('User', new mongoose.Schema({
    name: String,
    email: String,
    password: String,
}));

const Course = mongoose.model('Course', new mongoose.Schema({
    amount: Number,
    content: String,
    summary: String,
    title: String,
}));

const addDemoCourse = async () => {
    const demoCourse = new Course({ 
        amount: 10,
        content: "This is a demo course",
        summary: "This is a demo course",
        title: "Demo course", 
    });
    await demoCourse.save();
};

// MongoDB in-memory server setup
async function startServer() {
    const mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    await mongoose.connect(mongoUri);
    await addDemoCourse();

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

    app.get('/courses', async (req, res) => {
        try {
            const courses = await Course.find();
            res.json(courses);
        } catch (error) {
            console.error('Error fetching courses:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    // API route to create a new user
    app.post('/users', async (req, res) => {
        const { name, email, password } = req.body;

        try {
            const newUser = new User({ name, email, password });
            await newUser.save();
            res.status(201).json(newUser);
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    app.post('/courses', async (req, res) => {
        const { amount, content, summary, title } = req.body;

        try {
            const newCourse = new Course({ amount, content, summary, title });
            await newCourse.save();
            res.status(201).json(newCourse);
        } catch (error) {
            console.error('Error creating user:', error);
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
