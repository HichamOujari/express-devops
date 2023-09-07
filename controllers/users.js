const { User } = require("../entities/index");

module.exports = {
  getAll: async (req, res) => {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getById: async (req, res) => {
    const userId = req.params.id;
    try {
      const user = await User.findOne({
        where: {
          id: userId,
        },
      });
      if (!user) {
        res.status(404).json({ error: "User not found" });
      } else {
        res.json(user);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  addUser: async (req, res) => {
    const { name, email } = req.body;
    try {
      const newUser = await User.create({ name, email });
      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
