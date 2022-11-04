module.exports = {
  'root' : true,
  'env'  : {
    'node' : true
  },
  'extends' : [
    'eslint:recommended'
  ],
  'parserOptions' : {
    'parser'       : 'babel-eslint',
    'ecmaVersion'  : 2022,
    'sourceType'   : 'module',
    'babelOptions' : {
      'configFile' : './babelrc'
    }
  },
  'rules' : {
    'array-callback-return' : 2,
    'array-bracket-newline' : [2, 'consistent'],
    'arrow-body-style'      : [2, 'as-needed'],
    'arrow-parens'          : [2, 'as-needed'],
    'arrow-spacing'         : 2,
    'block-scoped-var'      : 2,
    'block-spacing'         : [2, 'always'],
    'brace-style'           : [2, 'stroustrup'],
    'camelcase'             : 2,
    'comma-dangle'          : 1,
    'comma-spacing'         : [2,
      {
        'before' : false,
        'after'  : true
      }],
    'comma-style'        : [2, 'last'],
    'complexity'         : [1, 20],
    'consistent-return'  : 2,
    'consistent-this'    : [2, 'self'],
    'no-console'         : 1,
    'curly'              : 2,
    'default-case'       : 2,
    'dot-notation'       : 2,
    'eol-last'           : 2,
    'eqeqeq'             : 2,
    'for-direction'      : 2,
    'func-name-matching' : [
      2,
      'always',
      {
        'includeCommonJSModuleExports' : true
      }
    ],
    'generator-star-spacing' : [2, 'after'],
    'getter-return'          : 2,
    'global-require'         : 2,
    'guard-for-in'           : 2,
    'indent'                 : [
      2,
      2,
      {
        'SwitchCase' : 1
      }
    ],
    'key-spacing' : [2,
      {
        'align'       : 'colon',
        'afterColon'  : true,
        'beforeColon' : true,
        'mode'        : 'strict'
      }],
    'keyword-spacing'             : 2,
    'lines-between-class-members' : 2,
    'max-depth'                   : [2, 4],
    'max-nested-callbacks'        : [2, 4],
    'max-len'                     : [2,
      {
        'code'                   : 120,
        'ignoreRegExpLiterals'   : true,
        'ignoreStrings'          : true,
        'ignoreTemplateLiterals' : true,
        'ignoreUrls'             : true
      }],
    'max-lines' : [1,
      {
        'max'            : 800,
        'skipBlankLines' : true,
        'skipComments'   : true
      }],
    'max-params'              : [2, 5],
    'max-statements'          : [2, 50],
    'max-statements-per-line' : [2,
      {
        'max' : 1
      }],
    'multiline-ternary'        : [2, 'always-multiline'],
    'new-parens'               : 2,
    'newline-per-chained-call' : 2,
    'no-alert'                 : 1,
    'no-array-constructor'     : 2,
    'no-await-in-loop'         : 2,
    'no-buffer-constructor'    : 2,
    'no-caller'                : 2,
    'no-catch-shadow'          : 2,
    'no-continue'              : 2,
    'no-confusing-arrow'       : [2,
      {
        'allowParens' : true
      }],
    'no-duplicate-imports'         : 2,
    'no-eval'                      : 2,
    'no-extend-native'             : 2,
    'no-extra-bind'                : 2,
    'no-floating-decimal'          : 2,
    'no-func-assign'               : 0,
    'no-implied-eval'              : 2,
    'no-inner-declarations'        : 1,
    'no-invalid-this'              : 2,
    'no-iterator'                  : 2,
    'no-label-var'                 : 2,
    'no-labels'                    : 2,
    'no-lone-blocks'               : 2,
    'no-lonely-if'                 : 2,
    'no-loop-func'                 : 2,
    'no-multi-str'                 : 2,
    'no-multiple-empty-lines'      : [ 2, { 'max' : 1 } ],
    'no-multi-spaces'              : [ 2, { 'ignoreEOLComments' : true } ],
    'no-native-reassign'           : 2,
    'no-negated-condition'         : 2,
    'no-negated-in-lhs'            : 2,
    'no-new'                       : 2,
    'no-new-object'                : 2,
    'no-new-require'               : 2,
    'no-new-wrappers'              : 2,
    'no-octal'                     : 0,
    'no-path-concat'               : 2,
    'no-proto'                     : 2,
    'no-redeclare'                 : 1,
    'no-regex-spaces'              : 1,
    'no-reserved-keys'             : 0,
    'no-return-await'              : 2,
    'no-script-url'                : 2,
    'no-self-compare'              : 2,
    'no-sequences'                 : 2,
    'no-shadow-restricted-names'   : 2,
    'no-shadow'                    : 1,
    'no-spaced-func'               : 2,
    'no-tabs'                      : 2,
    'no-template-curly-in-string'  : 2,
    'no-trailing-spaces'           : 2,
    'no-throw-literal'             : 2,
    'no-undef-init'                : 2,
    'no-unmodified-loop-condition' : 2,
    'no-unneeded-ternary'          : 2,
    'no-unused-expressions'        : 2,
    'no-unused-vars'               : [2,
      {
        'args'               : 'after-used',
        'ignoreRestSiblings' : true
      }],
    'no-use-before-define'    : 2,
    'no-useless-call'         : 2,
    'no-useless-computed-key' : 2,
    'no-useless-concat'       : 2,
    'no-useless-constructor'  : 2,
    'no-useless-rename'       : [2,
      {
        'ignoreDestructuring' : false,
        'ignoreExport'        : false,
        'ignoreImport'        : false
      }],
    'no-useless-return'             : 2,
    'no-var'                        : 2,
    'no-void'                       : 2,
    'no-whitespace-before-property' : 2,
    'no-with'                       : 2,
    'object-curly-newline'          : [2,
      {
        'ObjectExpression' : {
          'consistent' : true,
          'multiline'  : true
        },
        'ObjectPattern' : {
          'minProperties' : 5,
          'multiline'     : true
        }
      }],
    'object-curly-spacing' : [
      2,
      'always',
      {
        'arraysInObjects'  : true,
        'objectsInObjects' : true
      }
    ],
    'object-shorthand'                : 2,
    'one-var'                         : [2, 'never'],
    'padding-line-between-statements' : [2,
      {
        'blankLine' : 'always',
        'prev'      : 'class',
        'next'      : '*'
      },
      {
        'blankLine' : 'always',
        'prev'      : '*',
        'next'      : 'class'
      },
      {
        'blankLine' : 'always',
        'prev'      : '*',
        'next'      : 'function'
      },
      {
        'blankLine' : 'always',
        'prev'      : 'function',
        'next'      : '*'
      },
      {
        'blankLine' : 'any',
        'prev'      : '*',
        'next'      : 'return'
      }],
    'prefer-arrow-callback'        : 2,
    'prefer-const'                 : 2,
    'prefer-numeric-literals'      : 2,
    'prefer-promise-reject-errors' : 2,
    'prefer-rest-params'           : 2,
    'prefer-spread'                : 2,
    'prefer-template'              : 2,
    'quotes'                       : [
      1,
      'single',
      {
        'allowTemplateLiterals' : true,
        'avoidEscape'           : true
      }
    ],
    'radix'         : 2,
    'require-await' : 2,
    'require-jsdoc' : [2,
      {
        'require' : {
          'ArrowFunctionExpression' : false,
          'ClassDeclaration'        : true,
          'FunctionDeclaration'     : true,
          'FunctionExpression'      : true,
          'MethodDefinition'        : true
        }
      }],
    'rest-spread-spacing' : 2,
    'semi'                : 2,
    'semi-spacing'        : [2,
      {
        'before' : false,
        'after'  : true
      }],
    'semi-style'   : [2, 'last'],
    'sort-imports' : [2,
      {
        'ignoreCase'            : true,
        'ignoreDeclarationSort' : true
      }],
    'sort-vars'                   : 0,
    'space-before-blocks'         : 2,
    'space-before-function-paren' : [2,
      {
        'anonymous'  : 'always',
        'asyncArrow' : 'always',
        'named'      : 'never'
      }],
    'space-in-brackets' : 0,
    'space-infix-ops'   : 2,
    'space-unary-ops'   : [2,
      {
        'words'    : true,
        'nonwords' : false
      }],
    'spaced-comment'         : 2,
    'strict'                 : [2, 'never'],
    'symbol-description'     : 2,
    'template-curly-spacing' : 2,
    'template-tag-spacing'   : 2,
    'unicode-bom'            : 2,
    'valid-jsdoc'            : [2,
      {
        'preferType' : {
          'array'   : 'Array',
          'boolean' : 'Boolean',
          'number'  : 'Number',
          'object'  : 'Object',
          'string'  : 'String'
        },
        'requireReturn'     : false,
        'requireReturnType' : true,
        'matchDescription'  : '.+'
      }],
    'wrap-iife'          : [2, 'inside'],
    'yield-star-spacing' : [2, 'after'],
    'yoda'               : 2
  },
  'reportUnusedDisableDirectives' : true,
  'overrides'                     : [
    {
      'files' : [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      'env' : {
        'jest' : true
      }
    }
  ]
};
