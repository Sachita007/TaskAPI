const app = require("./app");
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set("strictQuery", false);

// Wait for database to connect, logging an error if there is a problem
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected");
  });
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
