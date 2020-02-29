const model = require("../model");

module.exports = () => {
  return model.sequelize.sync({ force: true });
};
