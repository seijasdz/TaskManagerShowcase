const db = require('../config/db');

class User {
  static create({ name, email, passwordHash }) {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO users (name, email, password_hash)
        VALUES (?, ?, ?)
      `;

      db.run(query, [name, email, passwordHash], function (err) {
        if (err) {
          return reject(err);
        }

        resolve({
          id: this.lastID,
          name,
          email,
        });
      });
    });
  }

  static findByEmail(email) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT id, name, email, password_hash
        FROM users
        WHERE email = ?
        `;
      db.get(query, [email], (err, row) => {
        if (err) {
          return reject(err);
        }
        resolve(row);
      });
    });
  }

  static findById(id) {
    return new Promise((resolve, reject) => {
      const query = `
          SELECT id, name, email
          FROM users
          WHERE id = ?
        `;

      db.get(query, [id], (err, row) => {
        if (err) {
          return reject(err);
        }
        resolve(row);
      });
    });
  }
}

module.exports = User;
