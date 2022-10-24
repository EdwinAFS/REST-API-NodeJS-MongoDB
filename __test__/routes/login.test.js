const app = require("../../server/app");
const supertest = require("supertest");
const request = supertest(app);

describe("/login endpoint", () => {
    it("should return a response", async () => {
        const response = await request.get("/login");
        expect(response.status).toBe(200);
        expect(response.text).toBe("Hello world");
    });
});
