const request = require("supertest");
const mongoose = require("mongoose");
require("dotenv").config();
const baseURL = "http://localhost:5000"

describe('Testing posts', () => {

    // Connecting to the database before each test
    beforeEach(async () => {
        await mongoose.connect(process.env.DB_URL);
    });

    it('should return list of posts suggestions', async () => {
        const res = await request(baseURL)
        .get("/api/posts/suggestions");

        expect(res.statusCode).toBe(200);
        expect(res.body.suggestions).toBeDefined()     
        expect(res.body.suggestions.length).toBe(3);

        //make sure that the returned posts have necessary properties
        expect(res.body.suggestions[0]).toHaveProperty("title")
        expect(res.body.suggestions[0]).toHaveProperty("category")
        expect(res.body.suggestions[0]).toHaveProperty("description")
        expect(res.body.suggestions[0]).toHaveProperty("rating")
    })

    // Closing database connection after each test
    afterEach(async () => {
        await mongoose.connection.close();
    });

});