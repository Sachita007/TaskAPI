const request = require("supertest");
const app = require("../app"); // Import your Express app
const mongoose = require("mongoose");
const User = require("../Models/user");

describe("User Authentication", () => {
    beforeEach(async () => {
        await User.deleteMany(); // Clear users before each test
    });

    afterAll(async () => {
        await mongoose.connection.close(); // Cleanup DB after tests
    });

    let userToken;

    test("Should register a new user", async () => {
        const res = await request(app).post("/api/users/register").send({
            username: "testuser",
            email: "test@example.com",
            password: "password123",
            cpassword: "password123",
        });

        expect(res.statusCode).toBe(201);
        expect(res.body.success).toBe("true");
    });

    test("Should login and return a token", async () => {
        await request(app).post("/api/users/register").send({
            username: "testuser",
            email: "test@example.com",
            password: "password123",
            cpassword: "password123",
        });

        const res = await request(app).post("/api/users/signin").send({
            email: "test@example.com",
            password: "password123",
        });

        expect(res.statusCode).toBe(200);
        expect(res.body.token).toBeDefined();
        userToken = res.body.token;
    });

    test("Should not login with wrong password", async () => {
        const res = await request(app).post("/api/users/signin").send({
            email: "test@example.com",
            password: "wrongpassword",
        });

        expect(res.statusCode).toBe(401);
    });
});
