import Validator from './model/Validator';

/**
 * Middleware
 *
 * @param {Object} schema schema element
 * @returns {Function} Express callback
 */
export const body =
  (schema = {}) =>
    (req, res, next) => {
      const { valid, message, data } = new Validator(schema, req.body);

      if (valid) {
        req.body = data;
        next();
      }
      else {
        res.status(400).json(message)
          .end();
      }
    };

export { default as Validator } from '@/model/Validator';
