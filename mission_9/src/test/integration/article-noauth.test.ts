import { jest } from "@jest/globals";
import requeset from "supertest";
import { httpServer as app } from "../../app.js";

describe("Article Integration Test (No Auth)", () => {
  describe("GET /articles", () => {
    it("should return a list of articles", async () => {
      const response = await requeset(app).get("/articles").expect(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("GET /articles/:id", () => {
    it("should return a specific article by ID", async () => {
      const articleId = 1;
      const response = await requeset(app)
        .get(`/articles/${articleId}`)
        .expect(200);

      expect(response.body).toEqual(expect.objectContaining({ id: articleId }));
    });

    it("should return 404 for non-existing article", async () => {
      const nonExistingId = 9999;
      await requeset(app).get(`/articles/${nonExistingId}`).expect(404);
    });
  });

  describe("GET /articles/:id/comments", () => {
    it("should return comments for a specific article", async () => {
      const articleId = 1; // Example article ID
      const response = await requeset(app)
        .get(`/articles/${articleId}/comments`)
        .expect(200);
      expect(Array.isArray(response.body.comments)).toBe(true);
    });

    it("should return 404 for comments of non-existing article", async () => {
      const nonExistingId = 9999; // Example non-existing article ID
      await requeset(app)
        .get(`/articles/${nonExistingId}/comments`)
        .expect(404);
    });
  });
});
