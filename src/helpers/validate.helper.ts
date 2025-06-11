import { validate } from 'class-validator';

export const Validate = async (entity: object) => {
  const errors = await validate(entity);
  
  if (errors.length > 0) {
    const validationErrors = errors.map(err => ({
      property: err.property,
      constraints: err.constraints,
    }));

    return {
      code: 422,
      message: 'Validation failed',
      errors: validationErrors
    };
  }
  return {
    code: 200,
    message: 'Validation successfully'
  };
};