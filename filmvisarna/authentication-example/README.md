# Authentication Example – Express + SQLite + Sessions

This is a basic example of how to build a simple authentication system using `Express.js`, `better-sqlite3`, and `express-session`. The goal is to demonstrate how sessions can be used to manage logged-in users.

The groups are expected to study this code, understand the structure, and build on it in their own applications — with additional features like error handling, validation, and more.

## 📁 Project Structure

This structure is just an example, your are free to use whatever structure you want, as long it makes sense and it's clean.

```
.
├── index.js                 # Main server setup
├── database.js             # SQLite database setup
└── features
    └── auth
        ├── auth.router.js  # Routes for /auth
        ├── auth.controller.js # Handlers for login, signup, logout, whoami
        └── auth.utilities.js  # Utility function to hash passwords
```

## 🔐 Authentication Flow

### 1. **Sign up** – `POST /auth/signup`

- User provides `name`, `age`, `email`, and `password`. _(these attributes are just examples — you can adjust or extend them depending on your app’s needs. See the database schema.)_
- A new record is created in the `users` table (name + age).
- The password is encrypted and saved with the user ID _(that is returned from the insertion into the users table)_ in the `credentials` table.

### 2. **Login** – `POST /auth/login`

- The user provides `email` and `password`.
- The password is encrypted and compared with the stored one.
- If correct, the user is returned and stored in the session: `req.session.user = user`.

### 3. **Check who is logged in** – `GET /auth/whoami`

- Returns the current user from the session.
- If not logged in, returns 401.

### 4. **Logout** – `POST /auth/logout`

- Destroys the session on the server.
- Ends the user's logged-in state.

## 🗄️ Database Schema

The database schema is the one used in this code example but you are free to choose a database scheme that better fits your application.

```sql
-- users table
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  age INTEGER NOT NULL
);

-- credentials table
CREATE TABLE IF NOT EXISTS credentials (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userId INTEGER NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  FOREIGN KEY (userId) REFERENCES users(id)
);
```

- Each user has one credentials record.
- Email is used for login, and must be unique.
- If you want to access `email` in the frontend, you will need to perform a `JOIN` between `users` and `credentials`.

## 🔑 Session Setup

Sessions are configured using `express-session` and `better-sqlite3-session-store`:

```js
app.use(
  session({
    secret: 'aSecretThatIsUsedInTheSession',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: 'auto' },
    store: new SQLiteStore({ client: db }),
  })
);
```

- `secure: 'auto'` ensures HTTPS-only cookies in production.
- `resave: false` prevents the session from being saved back to the store if it wasn't modified.
- `saveUninitialized: false` ensures a session won't be stored unless something is added to it (e.g. a logged-in user).
- Sessions are stored in the same SQLite DB as the rest of the app.

## 🔐 Password Encryption

Passwords are encrypted using Node's built-in `crypto` module:

```js
crypto.createHmac('sha256', 'anySaltYouChoose').update(password).digest('hex');
```

> Note: In production, use per-user salts or a stronger hashing library like `bcrypt`.

## 📌 Tips for Students

- This is a **basic, working example**, not production-ready.
- You should **add error handling**, e.g. when emails already exist.
- Add **form validation** on both frontend and backend.
- You might want to show user feedback when login fails.
- Consider separating session logic or adding middleware like `requireLogin` to routes that ought to be protected. _(advanced feature)_

## ✅ Summary

This example shows how to:

- Set up user login/signup with sessions
- Hash and verify passwords
- Use SQLite with `better-sqlite3`
- Build clean and extendable Express code

The groups should use this as a **starting point** and improve upon it to fit their specific project needs.
