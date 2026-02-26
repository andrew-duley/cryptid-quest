import session from "express-session";
import connectPgSimple from "connect-pg-simple";

export function createSessionMiddleware(pool) {
  
  const PgSession = connectPgSimple(session);
  const store = new PgSession({ pool, tableName: "session", createTableIfMissing: true });
  
  return session({ store, secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false });
}