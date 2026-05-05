import { Elysia } from "elysia";
import { db } from "./db";
import { users } from "./db/schema";
import { userRoutes } from "./routes/users.route";

const app = new Elysia()
  .use(userRoutes)
  .get("/", () => "Hello World from Elysia + Bun!")
  .get("/users", async () => {
    try {
      // Ini akan gagal jika DB belum running, tapi struktur sudah benar
      return await db.select().from(users);
    } catch (error) {
      return { error: "Database not connected or table not found" };
    }
  })
  .listen(3000);

console.log(
  `🚀 Server is running at ${app.server?.hostname}:${app.server?.port}`
);
