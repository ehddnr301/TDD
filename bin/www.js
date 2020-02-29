const app = require("../index");
const syncDb = require("./sync-db");

syncDb().then(_ => {
  console.log("Sync");
  app.listen(3000, () => {
    console.log("Server On");
  });
});
