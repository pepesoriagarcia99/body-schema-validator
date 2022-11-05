
/** Basic schemes */
const simplifiedSchematics = {
  name    : String,
  friends : [String],
  phone   : Number
};

const requiredSchematics = {
  id : {
    type     : String,
    required : [true, 'Identifier of the required process']
  },
  name : {
    type     : String,
    required : true
  }
};

const typeSchematics = {
  id       : String,
  value    : Number,
  status   : Boolean,
  createAt : Date,
  hash     : Buffer
};

const enumSchematics = {
  type : {
    type : String,
    enum : ['small', 'medium', 'large']
  }
};

const stringRangeSchematics = {
  name : {
    type      : String,
    minLength : 5,
    maxLength : 25
  }
};

const numberRangeSchematics = {
  value : {
    type : Number,
    min  : 5,
    max  : 25
  }
};

/** Experimental */
const dateRangeSchematics = {
  value : {
    type : Date,
    min  : '01-01-2020',
    max  : '31-12-2020'
  }
};

const customValidationSchematics = {
  value : {
    type     : String,
    validate : {
      // eslint-disable-next-line require-jsdoc
      validator(value) {
        return value.includes('center');
      },
      message : 'Error msg.'
    }
  }
};

const actionsSchematics = {
  title : {
    type      : String,
    uppercase : true
  },
  description : {
    type      : String,
    lowercase : true
  },
  email : {
    type : String,
    trim : true
  }
};

/** complex schemes */
const schemaList = {
  id : {
    type     : String,
    required : [true, 'Identifier of the required process']
  },
  values : [
    {
      type : {
        type : String,
        enum : ['small', 'medium', 'large']
      },
      value : {
        type : Number,
        min  : 5,
        max  : 25
      }
    }
  ]
};

const childSchemas = {
  name    : String,
  address : {
    postalCode : Number,
    number     : Number,
    street     : String
  }
};

export default {
  simplifiedSchematics,
  requiredSchematics,
  typeSchematics,
  enumSchematics,
  stringRangeSchematics,
  numberRangeSchematics,
  dateRangeSchematics,
  customValidationSchematics,
  actionsSchematics,
  schemaList,
  childSchemas
};
