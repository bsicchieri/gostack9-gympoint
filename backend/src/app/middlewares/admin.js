export default async (req, res, next) => {
  if (req.userEmail !== 'admin@gympoint.com') {
    return res.status(401).json({ error: 'Permission denied!' });
  }

  return next();
};
