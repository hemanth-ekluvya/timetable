// seed/seed.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const { Types } = mongoose;
global.ObjectId = Types.ObjectId; 

mongoose.set("strictQuery", false);

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI); // ① connect
    const db = mongoose.connection.db; // ② native handle

    const clearAndInsert = async (col, docs) => {
      await db.collection(col).deleteMany({});
      await db.collection(col).insertMany(docs);
      console.log(` → ${col}  ✓ ${docs.length} docs`);
    };

    await clearAndInsert("schools", require("./schools.seed"));
    await clearAndInsert("classes", require("./classes.seed"));
    await clearAndInsert("users", require("./users.seed"));

    console.log("\n✔  Database seeded successfully");
    process.exit(0);
  } catch (err) {
    console.error("✖  Seeding failed:", err);
    process.exit(1);
  }
}

seed();
