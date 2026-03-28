import { app } from "./src/app.js";
import { connectDb } from "./src/config/db.js";

import { ENV } from "./src/config/env.config.js";

const PORT = ENV.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDb();
});
