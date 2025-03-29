import request from "supertest";
import app from "../app";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

describe("User API (Admin only)", () => {
  const adminEmail = "admin2@justicket.com";
  const adminPassword = "admin123";
  let token: string;
  let userId: string;

  beforeAll(async () => {
    const res = await request(app).post("/api/auth/signin").send({
      email: adminEmail,
      password: adminPassword,
    });
    token = res.body.token;
  });

  it("should create a new user", async () => {
    const res = await request(app)
      .post("/api/auth/signup")
      .send({
        email: `test_${Date.now()}@gmail.com`,
        password: "123456",
        nom: "Nouvel",
        prenom: "Utilisateur",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.id).toBeDefined();
    userId = res.body.id;
  });

  it("should get all users", async () => {
    const res = await request(app)
      .get("/api/users")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should get user by ID", async () => {
    const res = await request(app)
      .get(`/api/users/${userId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(userId);
  });

  it("should update user role", async () => {
    const res = await request(app)
      .patch(`/api/users/${userId}/role`)
      .send({ role: "buyer" })
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.role).toBe("buyer");
  });

  it("should delete the user", async () => {
    const res = await request(app)
      .delete(`/api/users/${userId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(204);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });
});
