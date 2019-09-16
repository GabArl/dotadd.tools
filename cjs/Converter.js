"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Converter = exports.ConverterOptions = exports.ConverterOption = exports.ConvertableTextFile = exports.ParseResults = void 0;

var _ADCFormat = require("./ADCFormat");

var _AmbidecodeFormat = _interopRequireDefault(require("./AmbidecodeFormat"));

var _IEMFormat = _interopRequireDefault(require("./IEMFormat"));

var _fastXmlParser = require("fast-xml-parser");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let formats = [_AmbidecodeFormat.default, _IEMFormat.default];

class ParseResults {
  constructor() {
    this.results = [];
  }

}

exports.ParseResults = ParseResults;

class ConvertableTextFile {
  constructor() {
    this.filename = "";
    this.data = "";
  }

}

exports.ConvertableTextFile = ConvertableTextFile;

class ConverterOption {
  constructor(name, value) {
    this.used = false;
    this.name = name;
    this.value = value;
  }

  type() {
    return typeof this.value;
  }

  peek() {
    return this.value;
  }

  wasUsed() {
    return this.used;
  }

  use() {
    this.used = true;
    return this.value;
  }

}

exports.ConverterOption = ConverterOption;

class ConverterOptions {
  constructor(...args) {
    this.options = [];
    this.options = args;
  }

  has(name) {
    return this.options.find(opt => opt.name === name) != undefined;
  }

  get(name) {
    return this.options.find(opt => opt.name === name);
  }

  use(name) {
    let opt = this.get(name);
    if (opt) return opt.use();
  }

  getUnused() {
    return this.options.reduce((carry, current) => {
      !current.used ? carry.push(current) : null;
      return carry;
    }, []);
  }

}

exports.ConverterOptions = ConverterOptions;
const Converter = {
  convert_string(files, options) {
    let results = new ParseResults();

    for (let file of files) {
      let ftype = file.filename.slice((file.filename.lastIndexOf(".") - 1 >>> 0) + 2);

      if (!(ftype === 'xml' || ftype === 'json' || ftype === 'add')) {
        if (file.data.charAt(0) === '<') ftype = 'xml';else if (file.data.charAt(0) === '{' || file.data.charAt(0) === '[') ftype = 'json';
      }

      switch (ftype) {
        case 'json':
          this._do_parse_json(file, results, options);

        case 'xml':
          this._do_parse_json(file, results, options);

        case 'add':
          this._do_parse_add(file, results, options);

      }
    }
  },

  convert_binary(filename, data, options) {},

  list_formats() {},

  _do_parse_json(file, carry, opts) {
    this._do_parse_native(file, carry, opts, JSON.parse(file.data), _ADCFormat.ContainerType.JSON);
  },

  _do_parse_xml(file, carry, opts) {
    this._do_parse_native(file, carry, opts, (0, _fastXmlParser.parse)(file.data, {
      ignoreAttributes: false
    }), _ADCFormat.ContainerType.XML);
  },

  _do_parse_add(file, carry, opts) {},

  _do_parse_native(file, carry, opts, obj, container_type) {
    let parsers_to_try = [];

    for (let format of formats) {
      if (format.container_type() === container_type && format.test(obj)) parsers_to_try.push(format);
    }

    parsers_to_try.forEach(parser => parser.parse(obj, file.filename, carry, opts));
  }

};
exports.Converter = Converter;
//# sourceMappingURL=Converter.js.map