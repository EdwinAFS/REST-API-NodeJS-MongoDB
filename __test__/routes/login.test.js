const app = require("../../server/app");
const supertest = require("supertest");
const request = supertest(app);

describe("/login endpoint", () => {
    it("should return a response", async () => {
        const response = await request.get("/login");
        expect(response.status).toBe(200);
        expect(response.type).toBe("application/json");
        expect(response.body).toEqual({
            ok: true,
            saludo: "Hola con CI/CD",
        });
    });
});
