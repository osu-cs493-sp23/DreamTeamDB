const secretKey = process.env.JWT_SECRET

function requireAuthentication (req, res, next) {
  console.log(`[🔒 AUTH] TODO: FINISH FUNCTION`);
  next()
}

export default requireAuthentication;