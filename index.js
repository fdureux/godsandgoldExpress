const express = require("express");
const routes = require("./routes");
const cors = require("cors");

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", routes);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
