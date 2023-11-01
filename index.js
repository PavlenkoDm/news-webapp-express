const app = require("./app");
const mongoose = require("mongoose");

const { DB_HOST, PORT } = process.env;

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running... Use API on port: ${PORT}`);
    });
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });
