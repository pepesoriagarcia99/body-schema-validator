import isDefined from '../utils/defined';
import { isValidType } from '../utils/type';

import Error from './Error';

/**
 * JSON object validator
 *
 * @class Validator
 * @public
 *
 * @constructor
 *
 * @property {Object} schema Schema object
 * @property {Object} body Object to validate
 * @property {Object} errorSummary Validation errors
 * @property {Object} dataOutput Result data (ignores parameters not included in the schema)
 */
class Validator {
  #schema;

  #body;

  #errorSummary;

  #dataOutput;

  /**
   * Validator constructor
   * @param {Object} schema body schema
   * @param {Object} body Object to validate
   */
  constructor(schema, body) {
    this.#schema = schema;
    this.#body = body;

    this.#errorSummary = new Error();

    this.#validateSchema(schema, body);
  }

  /**
   * Validation schema process
   * @param {Object} schema body schema
   * @param {Object} body body value
   */
  #validateSchema(schema, body) {
    /**
     * Transform simple schema (key: Constructor) into a default schema (key: { type: Constructor })
     * @param {Object} schemaItem body schema
     * @return {Object} schema
    */
    const getSchema = schemaItem => {
      if (typeof schemaItem === 'function') {
        return {
          type : schemaItem
        };
      }
      else if (Array.isArray(schemaItem) && isValidType(schemaItem[0])) {
        return {
          type : [String]
        };
      }

      return schemaItem;
    };

    // debe ser recursivo, algunos esquemas puesden ser listas de esquema o objetos dentro de objetos
    const schemaKeys = Object.keys(schema);
    schemaKeys.forEach(key => {
      const schemaItem = getSchema(schema[key]);
      const value = body[key];

      if (typeof schemaItem === 'object') {
        if (schemaItem.type) {
          // estandar schema item
          // const validation = this.isValid(key, schemaItem, value);
          // this.#validHandler(validation, key, value);
        }
        else {
          // es un objeto con esquemas dentro --> recursion
          // la data tambien debe ser recursiva, para almacenar los resultados
          this.#validateSchema(schema[key], value);
        }
      }
      else if (Array.isArray(schemaItem)) {
        // el item es una lista con un objeto de esquemas
        // comprobar cada uno de los items del value
        // value.forEach(item => {
        //   this.isValid(key, schemaItem, item);
        // });
      }
    });
  }

  /**
   * Element validator
   * @param {String} param object key
   * @param {Object} schema schema of a value
   * @param {Object} value value
   * @returns {Boolean} validation result
   */
  isValid(param, schema, value) {
    console.log(`<----- Validation ${param} ----->`);
    let valid = true;

    if (this.isDefined(schema.required)) {
      const requiredIsValid = this.#requiredValidation(param, schema, value);

      if (!requiredIsValid) {
        valid = false;
      }

      console.log('requiredIsValid: ', requiredIsValid);
    }

    if (this.isDefined(value)) {
      const typeIsValid = this.#typeValidation(param, schema.type, value);

      console.log('typeIsValid: ', typeIsValid);
    }

    if (this.isDefined(value) && schema.enum) {
      this.#enumValidation(param, schema.enum, value);
    }

    if (this.isDefined(value) && (schema.minLength || schema.maxLength || schema.min || schema.max)) {
      this.#rangeValidation(param, schema, value);
    }

    if (this.isDefined(value) && schema.match) {
      this.#matchValidation(param, schema.match, value);
    }

    if (this.isDefined(value) && schema.validate) {
      this.#customValidation(param, schema.validate, value);
    }

    if (this.isDefined(value) && typeof value === 'string' && (schema.lowercase || schema.uppercase || schema.trim)) {
      const transformedValue = this.#actionsValue(schema, value);
      console.log('transformedValue: ', transformedValue);
    }

    console.log(`VALID: ${valid}`);

    return valid;
  }

  /**
   * Required validation
   * @param {String} param object key
   * @param {Object} schema schema of a value
   * @param {Object} value value
   * @returns {Boolean} validation result
   */
  #requiredValidation(param, schema, value) {
    let errorsMessage = `The value is required`;
    let isRequired = false;

    if (Array.isArray(schema.required)) {
      isRequired = schema.required[0];
      errorsMessage = schema.required[1] || errorsMessage;
    }
    else if (typeof schema.required === 'boolean') {
      isRequired = schema.required;
    }

    if (isRequired) {
      let condition;

      if (Array.isArray(schema.type)) {
        condition = Array.isArray(value) && value.length > 0;
      }
      else {
        condition = isDefined(value);
      }

      return this.#validatorHandler(condition, param, errorsMessage);
    }
    else {
      return true;
    }
  }

  /**
   * Type validation
   * @param {String} param object key
   * @param {Object} type schema type
   * @param {Object} value value
   * @returns {Boolean} validation result
   */
  #typeValidation(param, type, value) {
    let condition;
    let errorsMessage;

    if (Array.isArray(type)) {
      errorsMessage = `A list of ${type.constructor.name} was expected and was not received`;
      condition = value.map(e => e.constructor === type[0]).filter(Boolean).length === 0;
    }
    else {
      errorsMessage = `A ${type.constructor.name} was expected and a ${typeof value} was returned`;
      condition = value.constructor === type;
    }

    return this.#validatorHandler(condition, param, errorsMessage);
  }

  /**
   * Enumeration validation
   * @param {String} param object key
   * @param {Array} enumeration schema enumeration
   * @param {Object} value value
   * @returns {Boolean} validation result
   */
  #enumValidation(param, enumeration, value) {
    const condition = enumeration.includes(value);
    const errorsMessage = `The value is not valid, valid values ${enumeration.toString()}`;

    return this.#validatorHandler(condition, param, errorsMessage);
  }

  /**
   * Range validation
   * @param {String} param object key
   * @param {Object} schema schema of a value
   * @param {Object} value value
   * @returns {Boolean} validation result
   */
  #rangeValidation(param, schema, value) {
    let condition;
    let errorsMessage;
    const headerMessage = 'The value must be';

    const validateRange = (val, min, max) => {
      if (min && max) {
        return {
          msg  : `${headerMessage} than ${min} and less than ${max}`,
          cond : value >= min && value <= max
        };
      }
      else if (min) {
        return {
          msg  : `${headerMessage} greater than ${min}`,
          cond : value >= min
        };
      }
      else if (max) {
        return {
          msg  : `${headerMessage} less than ${max}`,
          cond : value <= max
        };
      }
      return undefined;
    };

    if (schema.type.constructor.name === 'Number') {
      const { msg, cond } = validateRange(value, schema.min, schema.max);
      errorsMessage = msg;
      condition = cond;
    }
    else if (schema.type.constructor.name === 'String') {
      const { msg, cond } = validateRange(value.length, schema.minLength, schema.maxLength);
      errorsMessage = msg;
      condition = cond;
    }

    return this.#validatorHandler(condition, param, errorsMessage);
  }

  /**
   * Match validation
   * @param {String} param object key
   * @param {Object} match match schema
   * @param {Object} value value
   * @returns {Boolean} validation result
   */
  #matchValidation(param, match, value) {
    const condition = match.test(value);
    const errorsMessage = 'The value does not match the pattern';

    return this.#validatorHandler(condition, param, errorsMessage);
  }

  /**
   * Range validation
   * @param {String} param object key
   * @param {Object} validate custom validate
   * @param {Object} value value
   * @returns {Boolean} validation result
   */
  #customValidation(param, validate, value) {
    const condition = validate.validator(value);
    const errorsMessage = validate.message || 'The value is not valid';

    return this.#validatorHandler(condition, param, errorsMessage);
  }

  /**
   * Actions that modify the value
   * @param {Object} schema schema of a value
   * @param {Object} value value
   * @returns {String} result
   */
  #actionsValue(schema, value) {
    let result = value;
    if (schema.lowercase) {
      result = result.toLowerCase();
    }

    if (schema.uppercase) {
      result = result.toUpperCase();
    }

    if (schema.trim) {
      result = result.trim();
    }

    return result;
  }

  /**
   * Validator handler
   * @param {Boolean} isValid valid value
   * @param {String} param param
   * @param {String} message message
   * @returns {Boolean} validation result
   */
  #validatorHandler(isValid, param, message) {
    if (!isValid) {
      this.#errorSummary.add(param, message);
      // throw message;
    }
    return isValid;
  }

  /**
   * Validation status
   * @returns {Boolean} valid
   */
  get valid() {
    return this.#errorSummary.valid;
  }

  /**
   * Validation errors
   * @returns {Object | undefined} message
   */
  get message() {
    return this.#errorSummary.message;
  }

  /**
   * Result
   * @returns {Object} data
   */
  get data() {
    return this.#dataOutput;
  }
}

export default Validator;
