import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import jwt, { JwtPayload } from "jsonwebtoken";
import path from "path";

const JWT_SECRET = "test123";

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  }),
);

app.post("/signup", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  // check if user is alredy present or not
  const token = jwt.sign(
    {
      id: 1,
    },
    JWT_SECRET,
    { expiresIn: "1h" },
  );
  // browser => cookies => token="skdfajwr23r;j43 "
  res.cookie("token", token);
  res.send("Logged in!");
});

app.get("/user", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const token = req.cookies.token;
  console.log(req.cookies);
  const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

  res.send({
    userId: decoded.id,
  });
});

app.post("/signin", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // validate user here

  const token = jwt.sign({ id: 1 }, JWT_SECRET);

  res.cookie("token", token);

  res.send("logged in!");
  // checked
});

app.post("/logout", (req, res) => {
  res.cookie("token", "ads");

  res.json({
    message: "Logged Out!",
  });
});

app.listen(3000);
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzc4OTY4NzkxLCJleHAiOjE3Nzg5NzIzOTF9.nLoZPiEFMEgfE4P__wfkzMFkCpZx052UtP0TUfKIDdE
console.log("Server running on port 3000");
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzc4OTY5NDQ0fQ.Xu2ihB0LybFMVc8m62Dss5nIfJBn2I548UXqrVAXRMo
