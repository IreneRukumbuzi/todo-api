import Joi from 'joi';

const authValidate = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(1).trim(),
    email: Joi.string().email().required().min(5).trim(),
    password: Joi.string().required().trim()
  });

  schema.validateAsync(req.body)
    .then(() => {
      next();
    })
    .catch((err) => {
      res.status(400).send({ message: err.details[0].message })
    })
}

export default authValidate;