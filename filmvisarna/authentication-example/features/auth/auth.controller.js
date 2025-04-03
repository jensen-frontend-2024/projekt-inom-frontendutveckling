import { db } from '../../database.js';
import { encrypt } from './auth.utilities.js';

export const whoami = (req, res) => {
  if (!req.session.user) return res.status(401).send('Not logged in');
  res.json(req.session.user);
};

export const login = (req, res) => {
  const { email, password } = req.body;
  const encryptedPassword = encrypt(password);

  const credentials = db.prepare('SELECT * FROM credentials WHERE email = ?').get(email);
  if (!credentials) return res.status(400).send(`Wrong email or password`);

  const passwordsMatch = credentials.password === encryptedPassword;
  if (!passwordsMatch) return res.status(400).send(`Wrong email or password`);

  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(credentials.userId);
  req.session.user = user;

  return res.json({ message: 'Login successfull', user });
};

export const logout = (req, res) => {
  req.session.destroy(() => res.send('Logged out'));
};

export const signup = (req, res) => {
  const { password, email, name, age } = req.body;
  const encryptedPassword = encrypt(password);

  const { lastInsertRowid: userId } = db
    .prepare('INSERT INTO users (name, age) VALUES (?, ?)')
    .run(name, age);

  db.prepare('INSERT INTO credentials (userId, email, password) VALUES (?, ?, ?)').run(
    userId,
    email,
    encryptedPassword
  );

  res.send('Signup successful');
};
