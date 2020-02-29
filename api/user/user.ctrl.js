const model = require("../../model");

const getUsers = (req, res) => {
  req.query.limit = req.query.limit || 10;
  const limit = parseInt(req.query.limit, 10);

  if (Number.isNaN(limit)) {
    return res.status(400).end();
  }
  model.User.findAll({
    limit: limit
  }).then(users => {
    res.json(users);
  });
};

const getUser = (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.status(400).end();

  model.User.findOne({
    where: { id }
  }).then(user => {
    if (!user) return res.status(404).end();
    res.json(user);
  });
};

const deleteUser = (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.status(400).end();

  model.User.destroy({
    where: {
      id
    }
  }).then(() => {
    res.status(204).end();
  });
};

const createUser = (req, res) => {
  const name = req.body.name;
  if (!name) return res.status(400).end();

  model.User.create({
    name
  })
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      if (err.name === "SequelizeUniqueConstraintError") {
        return res.status(409).end();
      }
      res.status(500).end();
    });
};

const updateUser = async (req, res) => {
  const id = parseInt(req.params.id);
  if (Number.isNaN(id)) return res.status(400).end();

  const u = await model.User.findOne({ where: { id } });
  if (u === null) return res.status(404).end();

  const name = req.body.name;
  if (!name) return res.status(400).end();

  model.User.findOne({
    where: { id }
  }).then(user => {
    if (!user) return res.status(404).end();

    user.name = name;
    user
      .save()
      .then(_ => {
        res.json(user);
      })
      .catch(err => {
        if (err.name === "SequelizeUniqueConstraintError") {
          return res.status(409).end();
        }
        res.status(500).end();
      });
  });
};

module.exports = { getUsers, getUser, deleteUser, createUser, updateUser };
