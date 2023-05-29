import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import db from "./database/database.js";
import router from "./routes/index.js";
import { createServer } from "http";
import { Server } from "socket.io";
dotenv.config();

const CHAT_BOT = "ChatBot";
let rooms = [];
const app = express();
const httpServer = createServer(app);
const PORT = process.env.PORT || 5000;
const socketIO = new Server(httpServer, {
 cors: {
    origin: "http://localhost:5173/",
  }
});
app.use(function(req, res, next) {
      // res.header("Access-Control-Allow-Origin", "*");
      const allowedOrigins = ['http://localhost:5173'];
      const origin = req.headers.origin;
      if (allowedOrigins.includes(origin)) {
           res.setHeader('Access-Control-Allow-Origin', origin);
      }
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
      res.header("Access-Control-Allow-credentials", true);
      res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
      next();
    });
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(router);


socketIO.on("connection", (socket) => {
  socket.on("render", () => {
    socket.emit("getRooms", rooms);
  });
  socket.on("getRooms", (data) => {
    const { user, topic, room, location } = data;
    const exist = rooms.filter((element) => element.location == location.value);
    if (exist.length < 1) {
      rooms.push({
        location: location.value,
        lat: location.CapitalLatitude,
        long: location.CapitalLongitude,
        rooms: [{ user, topic, room, country: location.value }],
      });
    } else {
      rooms.forEach((el) => {
        if (el.location == location.value) el.rooms.push({ user, topic, room });
        else return;
      });
    }
    socketIO.emit("getRooms", rooms);
  });

  socket.on("joinRoom", (data) => {
    let users = [];
    const { user, topic, room, location } = data;
    socket.name = user;
    socket.join(room);
    let roster = socketIO.sockets.adapter.rooms.get(room);
    for (const clientId of roster) {
      const clientSocket = socketIO.sockets.sockets.get(clientId);
      users.push(clientSocket.name);
    }
    socketIO.in(room).emit("users", {
      users,
    });
    let createdtime = Date.now();
    socket.to(room).emit("receive_message", {
      message: `${user} has joined the chat room`,
      username: CHAT_BOT,
      createdtime,
    });

    socket.to(room).emit("chatroom_info", { topic });
    socket.emit("chatroom_info", { topic });

    socket.on("send_message", (data) => {
      socketIO.in(room).emit("receive_message", data);
    });

    socket.emit("receive_message", {
      message: `Welcome ${user}`,
      username: CHAT_BOT,
      createdtime,
    });
  });

  socket.on("leave_room", (data) => {
    let users = [];
    let createdtime = Date.now();
    const { room, user } = data;

    socket.to(room).emit("receive_message", {
      message: `${user} has disconnected from the chat.`,
      username: CHAT_BOT,
      createdtime,
    });
    socket.leave(room);
    let roster = socketIO.sockets.adapter.rooms.get(room);
    if (roster) {
      for (const clientId of roster) {
        const clientSocket = socketIO.sockets.sockets.get(clientId);
        users.push(clientSocket.name);
      }
    }
    socketIO.in(room).emit("users", {
      users,
    });
    if (
      typeof socketIO.sockets.adapter.rooms.get(room) !== "undefined" &&
      socketIO.sockets.adapter.rooms.get(room) != null
    ) {
    } else {
      rooms = rooms
        .map((element) => {
          const obj = {
            ...element,
            rooms: element.rooms.filter((el) => el.room != room),
          };
          if (obj.rooms.length > 0) {
            return obj;
          } else return;
        })
        .filter((value) => value !== undefined);
    }
    socket.emit("getRooms", rooms);
    socketIO.emit("getRooms", rooms);
  });

  socket.on("deleteRoom", (data) => {
    let createdtime = Date.now();
    rooms = rooms
      .map((element) => {
        const obj = {
          ...element,
          rooms: element.rooms.filter((el) => el.room != data.room.room),
        };
        if (obj.rooms.length > 0) {
          return obj;
        } else return;
      })
      .filter((value) => value !== undefined);
    socketIO.in(data.room.room).emit("receive_message", {
      message: `Room has been deleted.`,
      username: CHAT_BOT,
      createdtime,
    });
    socketIO.socketsLeave(data.room.room);
    socket.emit("getRooms", rooms);
    socketIO.emit("getRooms", rooms);
  });

  socket.on("disconnect", () => {});
});

httpServer.listen(PORT, () => console.log(`Server running at port ${PORT}`));
