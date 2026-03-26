import "dotenv/config";
import { app } from "./src/app.js";
import { connectDb } from "./src/lib/db.js";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDb();
});
