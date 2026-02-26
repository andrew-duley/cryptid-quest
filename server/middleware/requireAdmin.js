export const checkAdminKey = (req, res, next) => {
  const authHeader = req.header('authorization');
  if (!authHeader || typeof authHeader !== "string" || authHeader.trim().length === 0) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (!authHeader.trim().toLowerCase().startsWith('bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const keyValue = authHeader.trim().split(/\s+/)[1];

  if (keyValue === process.env.ADMIN_KEY) {
    next();
  } else {
      return res.status(401).json({ error: 'Unauthorized' });
  }
};  

export function requireAdminSession(req, res, next) {
  if (req.session?.isAdmin === true) return next();
  return res.status(401).json({ error: "Unauthorized" });
}