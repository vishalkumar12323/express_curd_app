import "dotenv/config";
import fs from "fs";
import cors from "cors";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import express from "express";
import bodyParser from "body-parser";
import users from "./users.json" assert { type: "json" };
import { logger } from "./logger.js";
import morgan from "morgan";

const morganFormat = ":method :url :status :response-time ms";

// express app
const app = express();
const port = process.env.PORT || 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

// middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(
  morgan(morganFormat, {
    stream: {
      /**
       * A function that processes the message and logs the information.
       *
       * @param {string} message - The message to be processed.
       */
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

// Route for get all users
app.get("/users", (req, res) => {
  res.status(200).json(users);
});

// Route for create new user
app.post("/create-user", (req, res) => {
  const { name, age } = req.body;
  const id = users.length + 1;

  fs.writeFile(
    path.join(__dirname, "users.json"),
    JSON.stringify([...users, { id, name, age }]),
    "utf-8",
    (err) => {
      if (err) console.log(err);
    }
  );

  fs.readFile(path.join(__dirname, "users.json"), "utf-8", (err, data) => {
    if (err) console.log(err);
    if (data) {
      res.status(200).json({ status: "ok", users: JSON.parse(data) });
    }
  });
});

// Route for get single user
app.get("/user/:userId", (req, res) => {
  const { userId } = req.params;
  const user = users.find((user) => user.id === parseInt(userId));

  if (!user) return res.status(404).json({ message: "User not found" });

  res.status(200).json({ user });
});

// Route for update user using userId
app.patch("/update/:userId", (req, res) => {
  const { userId } = req.params;
  const { name, age } = req.body;
  const user = users.find((u) => u.id === parseInt(userId));

  if (!user) return res.status(404).json({ message: "User not found" });

  if (name || age) {
    const newUser = {
      ...user,
      name: name || user.name,
      age: Number(age) || user.age,
    };

    const updatedUsers = users.map((u) => (u.id === newUser.id ? newUser : u));
    if (updatedUsers) {
      fs.writeFile(
        path.join(__dirname, "users.json"),
        JSON.stringify(updatedUsers),
        "utf-8",
        (err) => {
          if (err) console.log(err);
        }
      );

      fs.readFile(path.join(__dirname, "users.json"), "utf-8", (err, data) => {
        if (err) console.log(err);
        if (data) {
          res.status(200).json({ status: "ok", users: JSON.parse(data) });
        }
      });
    }
  } else {
    return res.status(400).json({ message: "Bad request" });
  }
});

// Route for delete user using userId
app.delete("/delete/:userId", (req, res) => {
  const { userId } = req.params;

  const user = users.find((u) => u.id === parseInt(userId));
  if (!user) return res.status(404).json({ message: "User not found" });
  const newUsers = users.filter((u) => u.id !== parseInt(userId));
  fs.writeFile(
    path.join(__dirname, "users.json"),
    JSON.stringify(newUsers),
    "utf-8",
    (err) => {
      if (err) console.log(err);
    }
  );

  fs.readFile(path.join(__dirname, "users.json"), "utf-8", (err, data) => {
    if (err) console.log(err);
    if (data) {
      res.status(200).json({ status: "ok", users: JSON.parse(data) });
    }
  });
});

// server
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
