const createErr = require('http-errors');

function pageNotFound(req, res, next) {
  next(createErr(404, 'Your requested content not found'));
}

function errorHandler(err, req, res, next) {
  res.locals.error = process.env.NODE_ENV === 'development' ? err : {
    message: err.message
  };
  res.status(err.status || 500);

  if (res.locals.html) {
    res.render('error', {
      tittle: "Error Page"
    });
  } else {
    res.json(res.locals.error);
  }
}

module.exports = {
  pageNotFound,
  errorHandler,
};
