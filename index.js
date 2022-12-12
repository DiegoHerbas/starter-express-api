const express = require("express");
const app = express();
const port = 3000;
const suscriptionRouter = require("./routes/suscriptionRoute");
const userRouter = require("./routes/userRoute");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  const { execSync } = require("child_process");

  const cmd = `curl -s http://checkip.amazonaws.com || printf "0.0.0.0"`;
  const pubIp = execSync(cmd).toString().trim();

  console.log(`My public IP address is: ${pubIp}`);



  const axios = require('axios');

  (async () => {
    const url = 'https://checkip.amazonaws.com/';
    const response = await axios(url);
    console.log(`My public IP address is: ${response.data.trim()}`);
  })();

  res.json({ message: "ok 8:55" });
});

app.use("/suscription", suscriptionRouter);
app.use("/user", userRouter);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });

  return;
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
