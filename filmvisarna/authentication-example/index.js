import express from 'express';
import session from 'express-session';
import SQLiteStoreFactory from 'better-sqlite3-session-store';
import { db } from './database.js';
import { authRouter } from './features/auth/auth.router.js';

const app = express();
const SQLiteStore = SQLiteStoreFactory(session);

app.use(express.json());

app.use(
  session({
    secret: 'aSecretThatIsUsedInTheSession',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: 'auto' },
    store: new SQLiteStore({ client: db }),
  })
);

app.get('/', (_req, res) => {
  res.send('Nothing here folks!');
});

app.use('/auth', authRouter);

app.listen(3000, () => {
  console.log('Listening to port 3000...');
});
