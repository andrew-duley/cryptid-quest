import expressSession from "express-session";
import connectPgSimple from "connect-pg-simple";

export function createSessionMiddleware(pool) {
  
  const PgSession = connectPgSimple(expressSessionconnect);
  const store = new PgSession({ pool, tableName: "session", createTableIfMissing: true });
  
  return expressSession({ 
    name: "cq.sid",
    store, 
    secret: process.env.SESSION_SECRET,  
    resave: false, 
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: true,       // required for SameSite=None
      sameSite: "none"    // allows cross-site cookies (cryptid.quest -> onrender.com)
    },
  });
}