export function notfoundError(req, res) {
  res.status(404).send({ error: "Route not found" });
}

export function errorHandler(err, req, res, next) {

  if (res.headersSent) {
    return next(err);
  }

  const status = err.statusCode || err.status || 500;

  if (status >= 500) console.error(err.stack);

  const message = status === 500 ? "Internal Server error" : err.message;
  res.status(status).json({ success: false, error: message });
}