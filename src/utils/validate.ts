import Joi from 'joi';

export const validateUser = (email: string, password: string, role: string) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('admin', 'user').required()
  });

  return schema.validate({ email, password, role });
};
