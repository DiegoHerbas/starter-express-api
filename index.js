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
  const { exec } = require('child_process')

  exec('curl ip-adresim.app', function (error, stdout, stderr) {
    if (error)
      return;
    console.log('your ip is :' + stdout);
  })
  res.json({ message: "ok 8:50" });
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
