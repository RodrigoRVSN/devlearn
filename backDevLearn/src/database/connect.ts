import { createConnection } from "typeorm";

createConnection().then(() => console.log("🎲 Database connected in 5432"));
