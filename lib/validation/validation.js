function requireValidation(schema) {
  return async (req, res, next) => {
    try {
      await schema.validateAsync(req.body); // Do this instead .validateAsync
      return next()
    }
    catch (err) {
      return res.status(400).send({ err: "Field: " + err.message.replace(/"/g, "'").concat(" for this endpoint.") })
    }
  }
}

export default requireValidation