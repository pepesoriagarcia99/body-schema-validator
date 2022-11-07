# body-schema-validator

## Install

```sh
npm install --save body-schema-validator
```

## Usage

Bodymen allows you to define a schema to control the fields sent through the request body.
```js
import { body } from "body-schema-validator"

app.post('/posts', body({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
  },
  content: {
    type: String,
    required: true,
    minlength: 32
  },
  tags: [String]
}), 
(req, res) => {
  console.log(req.bodymen.body) // will contain the parsed body
})
```

## License

MIT © [Jose Eduardo Soria](https://github.com/pepesoriagarcia99)

[npm-url]: https://www.npmjs.com/package/body-schema-validator