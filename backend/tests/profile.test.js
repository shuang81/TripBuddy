const request = require("supertest");
const mongoose = require("mongoose");
require("dotenv").config();
const baseURL = "http://localhost:5000"

describe('Testing user profile', () => {

    // Connecting to the database before each test
    beforeEach(async () => {
        await mongoose.connect(process.env.DB_URL);
    });

    it('should not return user profile information if not authenticated', async () => {
        const res = await request(baseURL)
        .get("/api/profile");

        expect(res.statusCode).toBe(403); // not authenticated error

        // test that the proper error is returned
        expect(res.body).toHaveProperty("success", false);
        expect(res.body).toHaveProperty("message", 'Token is not provided');
        
    })

    // Closing database connection after each test
    afterEach(async () => {
        await mongoose.connection.close();
    });

});