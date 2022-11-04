import { badRequest, success } from '../response';

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
 * @property {Object} data Result data (ignores parameters not included in the schema)
 */
export default class Validator {

  #schema;

  #body;

  #errorSummary;

  #data = {};

  /**
    * Validator constructor
    * @param {Object} schema body schema
    * @param {Object} body Object to validate
  */
  constructor(schema, body) {
    this.#schema = schema;
    this.#body = body;

    this.#validateSchema(schema, body);
  }

  // eslint-disable-next-line require-jsdoc
  isDefined(value) {
    return value !== undefined && value !== null;
  }

  // eslint-disable-next-line require-jsdoc
  isType(type) {
    return type === String || type === Number || type === Boolean || type === Buffer || type === Date;
  }

  /**
    * Validation schema process
    * @param {Object} schema body schema
    * @param {Object} body body value
  */
  #validateSchema(schema, body) {
    // recorrer el schema y instanciar los validadores
    // debe ser recursivo, algunos esquemas puesden ser listas de esquema o objetos dentro de objetos

    // conversion de esquemas simplificados a esquemas por defecto
    const getSchema = schemaItem => {
      if (Array.isArray(schema) && this.isType(schemaItem[0])) {
        return {
          type : String
        };
      }
      else if (
        Array.isArray(schemaItem)
          && schemaItem.length === 1
          && Array.isArray(schemaItem[0])
          && this.isType(schemaItem[0][0])
      ) {
        return {
          type : [String]
        };
      }

      return schemaItem;
    };

    const schemaKeys = Object.keys(schema);
    schemaKeys.forEach(key => {
      const schemaItem = getSchema(schema[key]);
      const value = body[key];

      if (typeof schemaItem === 'object') {
        if (schemaItem.type) {
          // estandar schema itemd

          const validation = this.isValid(key, schemaItem, value);
          this.#validHandler(validation, key, value);
        }
        else {
          // es un objeto con esquemas dentro --> recursion
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

  // eslint-disable-next-line require-jsdoc, complexity
  isValid(param, schema, value) {
    console.log(`<----- Validation ${param} ----->`);
    let valid = true;

    if (schema.required) {
      const requiredIsValid = this.#requiredValidation(param, schema, value);

      if (!requiredIsValid) {
        valid = false;
      }

      console.log('requiredIsValid: ', requiredIsValid);
    }

    if (this.isDefined(value)) {
      const typeIsValid = this.#typeValidation(param, schema, value);
      console.log('typeIsValid: ', typeIsValid);
    }

    if (this.isDefined(value) && (schema.enum)) {
      valid &&= this.#enumValidation();
    }

    if (this.isDefined(value) && (schema.minLength || schema.maxLength || schema.min || schema.max)) {
      valid &&= this.#rangeValidation();
    }

    if (this.isDefined(value) && (schema.validate)) {
      valid &&= this.#customValidation();
    }

    if (this.isDefined(value) && (schema.lowercase || schema.uppercase || schema.trim)) {
      valid &&= this.#actionsValue();
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
    if (this.isDefined(schema.required)) {

      let errorsMessage = `${param} is required`;
      // almaceno que valor tiene el requerido si true o false;
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
          // validacion para el tipo array requerido
          condition = Array.isArray(value) && value.length > 0;
        }
        else {
          // validacion de definicion para el tipo requerido
          condition = this.isDefined(value);
        }

        return this.#validatorHandler(condition, param, errorsMessage);
      }
      else {
      // si la configuracion del requerido es falsa, el valor es valido
        return true;
      }
    }
    else {
      // si no existe configuracion de requerido es valido
      return true;
    }
  }

  /**
    * Type validation
    * @param {String} param object key
    * @param {Object} schema schema of a value
    * @param {Object} value value
    * @returns {Boolean} validation result
  */
  #typeValidation(param, schema, value) {
    let condition;
    const errorsMessage = `Type error in the ${param} parameter`;

    if (Array.isArray(schema.type)) {
      condition = value.map(e => e.constructor === schema.typ[0]).filter(Boolean).length === 0;
    }
    else {
      condition = value.constructor === schema.type;
    }

    return this.#validatorHandler(condition, param, errorsMessage);
  }

  /**
    * Enumeration validation
  */
  #enumValidation() {

  }

  /**
    * Range validation
  */
  #rangeValidation() {

  }

  /**
    * Range validation
  */
  #customValidation() {

  }

  /**
    * Actions that modify the value
  */
  #actionsValue() {

  }

  /**
    * Valid Handler
    * @param {Boolean} isValid valid value
    * @param {String} param param
    * @param {String} value value
  */
  #validHandler(isValid, param, value) {
    if (isValid) {
      this.#data[param] = value;
    }
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
      this.#addErrorMessage(param, message);
    }
    return isValid;
  }

  /**
    * Add error message
    * @param {String} param param
    * @param {String} message message
  */
  #addErrorMessage(param, message) {
    if (this.isDefined(this.#errorSummary)) {
      const errorItem = this.#errorSummary.errors.find(e => e.param === param);

      if (errorItem) {
        errorItem.errors.push(message);
      }
    }
    else {
      this.#errorSummary = {
        valid  : false,
        errors : [
          {
            param,
            message : [message]
          }
        ]
      };
    }
  }

  /**
    * Validation status
    * @returns {Object} valid
  */
  get valid() {
    return !this.isDefined(this.#errorSummary);
  }

  /**
    * Validation errors
    * @returns {Boolean} message
  */
  get message() {
    return this.#errorSummary;
  }

  /**
    * Result
    * @returns {Object} data
  */
  get data() {
    return this.#data;
  }

}

// middleware
export const body = (schema = {}) => (req, res) => {
  const { valid, message, data } = new Validator(schema, req.body);

  if (valid) {
    success(res, 200)(data);
  }
  else {
    badRequest(res)(message);
  }
};

// mensaje ejemplo
// {
//   "name": "required",
//   "param": "processId",
//   "required": [
//       true,
//       "Identifier of the required process"
//   ],
//   "valid": false,
//   "message": "processId is required"
// }
