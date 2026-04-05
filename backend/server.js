import { setupSocket } from "./src/services/socket.service.js";
import http from "http";
import { app } from "./src/app.js";
import { connectDb } from "./src/config/db.js";
import { ENV } from "./src/config/env.config.js";

const PORT = ENV.PORT || 3000;

const server = http.createServer(app);
const io = setupSocket(server);
app.set("io", io);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDb();
});
