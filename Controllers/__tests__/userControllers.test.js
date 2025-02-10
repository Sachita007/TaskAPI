const request = require('supertest');
const app = require('../../app'); // Assuming your Express app is exported from app.js
const mongoose = require('mongoose');
const User = require('../../Models/user');
const JWT = require('jsonwebtoken');

let token;
let userId;

beforeAll(async () => {
    // Connect to the database
    await mongoose.connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    // Create a user and generate a token
    const user = await User.create({
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'password123',
        cpassword: 'password123',
    });
    userId = user._id;
    token = JWT.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXP,
    });
});

afterAll(async () => {
    // Clean up the database
    await User.deleteMany();
    await mongoose.connection.close();
});

describe('User Controllers', () => {
    test('should register a new user', async () => {
        const newUser = {
            username: 'newuser',
            email: 'newuser@example.com',
            password: 'password123',
            cpassword: 'password123',
        };

        const res = await request(app)
            .post('/api/v1/users/register')
            .send(newUser);

        expect(res.statusCode).toBe(201);
        expect(res.body.success).toBe('true');
        expect(res.body.token).toBeDefined();
    });

    test('should not register a user with mismatched passwords', async () => {
        const newUser = {
            username: 'newuser',
            email: 'newuser@example.com',
            password: 'password123',
            cpassword: 'password456',
        };

        const res = await request(app)
            .post('/api/v1/users/register')
            .send(newUser);

        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe('Passwords did not match');
    });

    test('should sign in an existing user', async () => {
        const userCredentials = {
            email: 'testuser@example.com',
            password: 'password123',
        };

        const res = await request(app)
            .post('/api/v1/users/signin')
            .send(userCredentials);

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe('true');
        expect(res.body.token).toBeDefined();
    });

    test('should not sign in with incorrect password', async () => {
        const userCredentials = {
            email: 'testuser@example.com',
            password: 'wrongpassword',
        };

        const res = await request(app)
            .post('/api/v1/users/signin')
            .send(userCredentials);

        expect(res.statusCode).toBe(401);
        expect(res.body.message).toBe('Incorrect email or password');
    });

    test('should protect routes', async () => {
        const res = await request(app)
            .get('/api/v1/protected-route')
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
    });

    test('should not access protected route without token', async () => {
        const res = await request(app)
            .get('/api/v1/protected-route');

        expect(res.statusCode).toBe(401);
        expect(res.body.message).toBe('You are not logged in! Please log in to get access');
    });
});