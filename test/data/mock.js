import { requiredSchematics, simplifiedSchematics } from '../schemas';

const testSimplifiedSchematics = [
  {
    name   : '200',
    schema : simplifiedSchematics,
    data   : {
      name    : 'Pepe',
      friends : ['Juan', 'Pablo']
    },
    result : {
      stauts : 200,
      body   : {
        name    : 'Pepe',
        friends : ['Juan', 'Pablo']
      }
    }
  },
  {
    name   : '400',
    schema : simplifiedSchematics,
    data   : {
      name    : 'Pepe',
      friends : ['Juan', 'Pablo'],
      phone   : '635932745'
    },
    result : {
      stauts : 400,
      body   : {
        valid : false,
        error : {
          param   : 'phone',
          message : 'A number was expected and a string was returned'
        }
      }
    }
  }
];

const testRequiredSchematics = [
  {
    name   : '200',
    schema : requiredSchematics,
    data   : {
      id   : '1',
      name : 'Juan'
    },
    result : {
      stauts : 200,
      body   : {
        id   : '1',
        name : 'Juan'
      }
    }
  },
  {
    name   : '400',
    schema : requiredSchematics,
    data   : {
      name : 'Juan'
    },
    result : {
      stauts : 400,
      body   : {
        valid : false,
        error : {
          param   : 'id',
          message : 'Identifier of the required process'
        }
      }
    }
  }
];

export default {
  testSimplifiedSchematics,
  testRequiredSchematics
};
