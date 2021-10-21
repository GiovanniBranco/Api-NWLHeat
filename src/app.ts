import "dotenv/config";
import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import { router } from "./routes/routes";

const app = express();
app.use(express.json());
//Crio um servidor http usando o App
const serverHttp = http.createServer(app);
app.use(router);
//Habilito o uso do Cors;
app.use(cors);

//Crio o servidor SocketIo passando o cors para aceitar requisição de qualquer origem;
const io = new Server(serverHttp, {
  cors: {
    origin: "*",
  },
});

//Monitoro a conexão no socket
io.on("connection", (socket) => {
  console.log(`Usuário conectado no socket ${socket.id}`);
});

app.get("/github", (request, response) => {
  response.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
  );
});

app.get("/signin/callback", (request, response) => {
  const { code } = request.query;

  return response.json(code);
});

export { serverHttp, io };
