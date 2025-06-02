import { validate } from 'class-validator';

export const validateAndThrowIfInvalid = async (entity: object) => {
  const errors = await validate(entity);
  if (errors.length > 0) {
    throw new Error(JSON.stringify(errors.map(err => ({
      property: err.property,
      constraints: err.constraints,
    }))));
  }
};
