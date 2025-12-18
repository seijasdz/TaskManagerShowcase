const AuthService = require('../services/auth.service');

class AuthController {
  static async register(req, res) {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res
          .status(400)
          .json({ error: 'Name, email, and password are required' });
      }

      const user = await AuthService.register({ name, email, password });
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ error: 'Email and password are required' });
      }

      const result = await AuthService.login({ email, password });
      res.status(200).json(result);
    } catch (err) {
      res.status(401).json({ error: err.message });
    }
  }
}

module.exports = AuthController;
