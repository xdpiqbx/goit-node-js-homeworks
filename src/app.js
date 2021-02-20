const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const routerContacts = require("./api/contacts/contactsAPI");
const { HttpCode } = require("./helpers/constants");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(logger("dev"));
app.use(express.json()); //чтоб интерпретировать значение req.body как объект JavaScript

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/contacts", routerContacts);

app.use((err, req, res, next) => {
  err.status = err.status ? err.status : HttpCode.INTERNAL_SERVER_ERROR;
  res.status(err.status).json({
    status: err.status === HttpCode.INTERNAL_SERVER_ERROR ? "fail" : "error",
    code: err.status,
    message: err.message,
    data:
      err.status === HttpCode.INTERNAL_SERVER_ERROR
        ? "INTERNAL SERVER ERROR"
        : err.data,
  });
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
