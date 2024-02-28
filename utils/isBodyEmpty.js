export function isBodyEmpty(req, res, next) {
  const body = req.body;
  const isEmpty = Object.keys(body).length === 0;

  if (isEmpty) {
    res.status(500).json({
      message: "Body cannot be empty",
    });
  } else {
    next();
  }
}
