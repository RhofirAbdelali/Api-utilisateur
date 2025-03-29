import request from "supertest";
import app from "../app";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

describe("Auth API", () => {
  const email = `user_${Date.now()}@test.com`;
  const password = "test1234";
  let token: string;

  it("should register a user", async () => {
    const res = await request(app).post("/api/auth/signup").send({
      email,
      password,
      nom: "Test",
      prenom: "User",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.email).toBe(email);
  });

  it("should login the user", async () => {
    const res = await request(app).post("/api/auth/signin").send({
      email,
      password,
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
    token = res.body.token;
  });

  it("should return the connected user's profile", async () => {
    const loginRes = await request(app).post("/api/auth/signin").send({
      email,
      password,
    });
  
    const token = loginRes.body.token;
  
    const res = await request(app)
      .get("/api/auth/profile")
      .set("Authorization", `Bearer ${token}`);
  
    expect(res.statusCode).toBe(200);
    expect(res.body.user.email).toBe(email);
  });
  
});
