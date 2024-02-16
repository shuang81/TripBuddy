const request = require("supertest");
const baseURL = "http://localhost:5000"

describe('Testing categories', () => {

    it('should return list of categories', async () => {
        const res = await request(baseURL)
        .get("/api/category/getAll");

        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    })

    test('should return 8 categories', async () => {
        const res = await request(baseURL)
        .get("/api/category/getAll");
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(8);
    }) 

    test('categories should include restaurant, outdoors and attractions', async () => {
        const res = await request(baseURL)
        .get("/api/category/getAll");

        expect(res.statusCode).toBe(200);
        expect(res.body).toContain('Restaurant');
        expect(res.body).toContain('Outdoors');
        expect(res.body).toContain('Attractions');
    }) 
});