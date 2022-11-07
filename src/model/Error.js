import isDefined from '../utils/defined';

/**
 * Error message
 *
 * @class Error
 * @public
 *
 * @constructor
 *
 * @property {Object} values Error values
 */
class Error {
  #value;

  /**
   * Add error
   * @param {String} param param
   * @param {String} message message
  */
  add(param, message) {
    this.#value = {
      param,
      message
    };
  }

  /**
   * Validation status
   * @returns {Boolean} valid
   */
  get valid() {
    return isDefined(this.#value);
  }

  /**
   * Validation errors
   * @returns {Object} message
   */
  get message() {
    return {
      valid : this.valid,
      error : this.#value
    };
  }
}

export default Error;
