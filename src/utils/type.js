/**
 * isType util
 *
 * @param {Function} type The type constructor
 * @param {Function} value Value to check
 * @returns {Boolean} Returns true if the object is defined, returns false otherwise.
 *
 */
export const isType = (type, value) => type === value.constructor;

/**
 * isType util
 *
 * @param {Function} value Value to check
 * @returns {Boolean} Returns true if the object is defined, returns false otherwise.
 *
 */
export const isValidType = value =>
  isType(String, value) ||
  isType(Number, value) ||
  isType(Boolean, value) ||
  isType(Buffer, value) ||
  isType(Date, value);

// Tipos de mongose ObjectId, Mixed, Decimal128, Map
