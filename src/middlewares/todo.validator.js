import Joi from "joi";

const todoValidate = (req, res, next) => {
  const schema = Joi.object({
    item: Joi.string().required().min(3),
    isCompleted: Joi.boolean(),
  });

  schema
    .validateAsync(req.body)
    .then(() => {
      next();
    })
    .catch((err) => {
      res.status(400).send({ message: err.details[0].message });
    });
};

export default todoValidate;
