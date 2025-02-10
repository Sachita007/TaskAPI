const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const Task = require("../Models/task");
const User = require("../Models/user");

describe("Task Management", () => {
    let userToken, userId, taskId;

    beforeAll(async () => {
        await User.deleteMany();
        await Task.deleteMany();

        // Register and log in a user
        await request(app).post("/api/users/register").send({
            username: "testuser",
            email: "test@example.com",
            password: "password123",
            cpassword: "password123",
        });

        const loginRes = await request(app).post("/api/users/signin").send({
            email: "test@example.com",
            password: "password123",
        });

        userToken = loginRes.body.token;
        userId = loginRes.body.user?._id;
    });

    afterEach(async () => {
        await Task.deleteMany(); // Clear tasks after each test
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    test("Should create a task", async () => {

        const res = await request(app)
            .post("/api/tasks/")
            .set("Authorization", `Bearer ${userToken}`)
            .send({
                title: "Test Task",
                description: "This is a test task",
            });


        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        taskId = res.body.data._id;
    });

    test("Should fetch all tasks for the user", async () => {
        await request(app)
            .post("/api/tasks/")
            .set("Authorization", `Bearer ${userToken}`)
            .send({ title: "Task 1", description: "Task description" });

        const res = await request(app)
            .get("/api/tasks/")
            .set("Authorization", `Bearer ${userToken}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.data.length).toBeGreaterThan(0);
    });

    test("Should update a task", async () => {
        const createRes = await request(app)
            .post("/api/tasks/")
            .set("Authorization", `Bearer ${userToken}`)
            .send({
                title: "Original Task",
                description: "Original description",
            });

        taskId = createRes.body.data._id;

        const updateRes = await request(app)
            .put(`/api/tasks/${taskId}`)
            .set("Authorization", `Bearer ${userToken}`)
            .send({
                title: "Updated Task",
                description: "Updated description",
            });

        expect(updateRes.statusCode).toBe(201);
        expect(updateRes.body.data.title).toBe("Updated Task");
    });

    test("Should delete a task", async () => {
        const createRes = await request(app)
            .post("/api/tasks/")
            .set("Authorization", `Bearer ${userToken}`)
            .send({
                title: "Task to Delete",
                description: "This task will be deleted",
            });

        taskId = createRes.body.data._id;

        const deleteRes = await request(app)
            .delete(`/api/tasks/${taskId}`)
            .set("Authorization", `Bearer ${userToken}`);

        expect(deleteRes.statusCode).toBe(201);
        expect(deleteRes.body.success).toBe("true");
    });

    test("Should not allow deleting another user's task", async () => {
        // Register another user
        const secondUserRes = await request(app).post("/api/users/register").send({
            username: "seconduser",
            email: "second@example.com",
            password: "password123",
            cpassword: "password123",
        });

        const secondLoginRes = await request(app).post("/api/users/signin").send({
            email: "second@example.com",
            password: "password123",
        });

        const secondUserToken = secondLoginRes.body.token;

        const createRes = await request(app)
            .post("/api/tasks/")
            .set("Authorization", `Bearer ${userToken}`)
            .send({
                title: "Unauthorized Task",
                description: "This task belongs to first user",
            });

        console.log(createRes.body, secondUserToken)

        taskId = createRes.body.data._id;
        console.log(taskId)

        const deleteRes = await request(app)
            .delete(`/api/tasks/${taskId}`)
            .set("Authorization", `Bearer ${secondUserToken}`);
        console.log(deleteRes.body)

        expect(deleteRes.statusCode).toBe(404);
    });
});
