const request = require('supertest');
const app = require('../../app'); // Assuming your Express app is exported from app.js
const mongoose = require('mongoose');
const Task = require('../../Models/task');
const User = require('../../Models/user');
const JWT = require('jsonwebtoken');

let token;
let userId;
let taskId;

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
    });
    userId = user._id;
    token = JWT.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXP,
    });

    // Create a task
    const task = await Task.create({
        title: 'Test Task',
        description: 'Test Task Description',
        user: userId,
    });
    taskId = task._id;
});

afterAll(async () => {
    // Clean up the database
    await Task.deleteMany();
    await User.deleteMany();
    await mongoose.connection.close();
});

describe('Task Controllers', () => {
    test('should get all tasks', async () => {
        const res = await request(app)
            .get('/api/v1/tasks')
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe('Success');
        expect(res.body.data.length).toBeGreaterThan(0);
    });

    test('should get a task by ID', async () => {
        const res = await request(app)
            .get(`/api/v1/tasks/${taskId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.data._id).toBe(taskId.toString());
    });

    test('should add a new task', async () => {
        const newTask = {
            title: 'New Task',
            description: 'New Task Description',
        };

        const res = await request(app)
            .post('/api/v1/tasks')
            .set('Authorization', `Bearer ${token}`)
            .send(newTask);

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.data.title).toBe(newTask.title);
    });

    test('should update a task', async () => {
        const updatedTask = {
            title: 'Updated Task',
            description: 'Updated Task Description',
        };

        const res = await request(app)
            .patch(`/api/v1/tasks/${taskId}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updatedTask);

        expect(res.statusCode).toBe(201);
        expect(res.body.success).toBe('true');
        expect(res.body.data.title).toBe(updatedTask.title);
    });

    test('should delete a task', async () => {
        const res = await request(app)
            .delete(`/api/v1/tasks/${taskId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(201);
        expect(res.body.success).toBe('true');
    });
});