import request from "supertest";
import { httpServer as app } from "../../app.js";

export const getAuthToken = async () => {
  const userData = {
    email: "user1@example.com",
    password: "password123",
  };

  const response = await request(app).post("/login").send(userData).expect(200);

  const { accessToken } = response.body;
  return accessToken;
};
