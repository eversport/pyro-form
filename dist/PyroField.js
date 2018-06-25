'use strict'
var __extends =
  (this && this.__extends) ||
  (function() {
    var extendStatics =
      Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array &&
        function(d, b) {
          d.__proto__ = b
        }) ||
      function(d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]
      }
    return function(d, b) {
      extendStatics(d, b)
      function __() {
        this.constructor = d
      }
      d.prototype = b === null ? Object.create(b) : ((__.prototype = b.prototype), new __())
    }
  })()
var __assign =
  (this && this.__assign) ||
  Object.assign ||
  function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i]
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p]
    }
    return t
  }
Object.defineProperty(exports, '__esModule', { value: true })
var react_1 = require('react')
var PyroContext_1 = require('./PyroContext')
var PyroFieldInner = /** @class */ (function(_super) {
  __extends(PyroFieldInner, _super)
  function PyroFieldInner() {
    var _this = (_super !== null && _super.apply(this, arguments)) || this
    _this.handleChange = function(value) {
      _this.props.handleChange && _this.props.handleChange(_this.props.name, value)
    }
    _this.handleBlur = function() {
      _this.props.handleBlur && _this.props.handleBlur(_this.props.name)
    }
    return _this
  }
  PyroFieldInner.prototype.render = function() {
    if (!this.props.values || !this.props.errors || !this.props.touched) {
      throw new Error('Please use PyroField Components only within a PyroForm')
    }
    return this.props.children({
      core: {
        name: this.props.name,
        value: this.props.values[this.props.name],
        onChange: this.handleChange,
        onBlur: this.handleBlur,
      },
      meta: {
        error: this.props.errors[this.props.name],
        hasError: Boolean(this.props.errors[this.props.name]),
        touched: this.props.touched[this.props.name],
      },
    })
  }
  return PyroFieldInner
})(react_1.default.PureComponent)
var PyroField = /** @class */ (function(_super) {
  __extends(PyroField, _super)
  function PyroField() {
    var _this = (_super !== null && _super.apply(this, arguments)) || this
    _this.PyroConsumer = PyroContext_1.getPyroConsumer()
    return _this
  }
  PyroField.prototype.render = function() {
    var _this = this
    return react_1.default.createElement(this.PyroConsumer, null, function(contextProps) {
      return react_1.default.createElement(PyroFieldInner, __assign({}, _this.props, contextProps))
    })
  }
  return PyroField
})(react_1.default.PureComponent)
exports.PyroField = PyroField
//# sourceMappingURL=PyroField.js.map
