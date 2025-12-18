const db = require('../config/db');

class Task {
  static create({ title, description, userId }) {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO tasks (title, description, user_id)
        VALUES (?, ?, ?)
      `;

      db.run(query, [title, description, userId], function (err) {
        if (err) {
          return reject(err);
        }
        resolve({
          id: this.lastID,
          title,
          description,
        });
      });
    });
  }

  static findAllByUser(userId) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT *
        FROM tasks
        WHERE user_id = ?
        ORDER BY created_at DESC
        `;

      db.all(query, [userId], (err, rows) => {
        if (err) {
          return reject(err);
        }
        resolve(rows);
      });
    });
  }

  static findById(id, userId) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT *
        FROM tasks
        WHERE id = ? AND user_id = ?
        `;

      db.get(query, [id, userId], (err, row) => {
        if (err) {
          return reject(err);
        }
        resolve(row);
      });
    });
  }

  static update(id, userId, { title, description, status }) {
    return new Promise((promise, reject) => {
      const query = `
        UPDATE tasks
        SET title = ?, description = ?, status = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ? AND user_id = ?
        `;

      db.run(query, [title, description, status, id, userId], function (err) {
        if (err) {
          return reject(err);
        }
        resolve(this.changes > 0);
      });
    });
  }

  static delete(id, userId) {
    return new Promise((resolve, reject) => {
      const query = `
        DELETE FROM tasks
        WHERE id = ? AND user_id = ?
        `;
      db.run(query, [id, userId], function (err) {
        if (err) {
          return reject(err);
        }
        resolve(this.changes > 0);
      });
    });
  }
}

module.exports = Task;
