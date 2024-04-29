const app = require("./app");

const db = require("./config/db");

const UserModel = require("./model/userModel");

const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
