const express = require("express");
const suscriptionRouter = express.Router();
const suscripcionController = require("../services/suscriptionController");


suscriptionRouter.get("/", async function (req, res, next) {
  try {
    res.json(await suscripcionController.getSuscripcion(req.query.page));
  } catch (err) {
    console.error(`Error while getting programming languages `, err.message);
    next(err);
  }
});


module.exports = suscriptionRouter;
// export { clientRouter };
