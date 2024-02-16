const request = require("supertest");
const mongoose = require("mongoose");
require("dotenv").config();
const baseURL = "http://localhost:5000"

describe('Testing Frequently asked questions', () => {

    // Connecting to the database before each test
    beforeEach(async () => {
        await mongoose.connect(process.env.DB_URL);
    });

    it('should return list of posts suggestions', async () => {
        const res = await request(baseURL)
        .get("/api/question/getQuestions");

        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(1);

        // test that returned questions have required properties for rendering
        expect(res.body[0]).toHaveProperty("question")
        expect(res.body[0]).toHaveProperty("answer")
    })

    // Closing database connection after each test
    afterEach(async () => {
        await mongoose.connection.close();
    });

});