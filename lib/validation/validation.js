function requireValidation(schema) {
  return async (req, res, next) => {
    try {
      await schema.validateAsync(req.body); // Do this instead .validateAsync
      next()
    }
    catch (err) {
      res.status(400).send({ err: err })
    }
  }
}

export default requireValidation