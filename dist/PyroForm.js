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
var __awaiter =
  (this && this.__awaiter) ||
  function(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : new P(function(resolve) {
              resolve(result.value)
            }).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
var __generator =
  (this && this.__generator) ||
  function(thisArg, body) {
    var _ = {
        label: 0,
        sent: function() {
          if (t[0] & 1) throw t[1]
          return t[1]
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function() {
          return this
        }),
      g
    )
    function verb(n) {
      return function(v) {
        return step([n, v])
      }
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.')
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y['return']
                  : op[0]
                    ? y['throw'] || ((t = y['return']) && t.call(y), 0)
                    : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t
          if (((y = 0), t)) op = [op[0] & 2, t.value]
          switch (op[0]) {
            case 0:
            case 1:
              t = op
              break
            case 4:
              _.label++
              return { value: op[1], done: false }
            case 5:
              _.label++
              y = op[1]
              op = [0]
              continue
            case 7:
              op = _.ops.pop()
              _.trys.pop()
              continue
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0
                continue
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1]
                break
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1]
                t = op
                break
              }
              if (t && _.label < t[2]) {
                _.label = t[2]
                _.ops.push(op)
                break
              }
              if (t[2]) _.ops.pop()
              _.trys.pop()
              continue
          }
          op = body.call(thisArg, _)
        } catch (e) {
          op = [6, e]
          y = 0
        } finally {
          f = t = 0
        }
      if (op[0] & 5) throw op[1]
      return { value: op[0] ? op[1] : void 0, done: true }
    }
  }
Object.defineProperty(exports, '__esModule', { value: true })
var react_1 = require('react')
var PyroContext_1 = require('./PyroContext')
var isPromise = function(value) {
  return Boolean(value) && typeof value.then === 'function'
}
var PyroForm = /** @class */ (function(_super) {
  __extends(PyroForm, _super)
  function PyroForm() {
    var _this = (_super !== null && _super.apply(this, arguments)) || this
    _this.state = {
      values: _this.props.initialValues,
      touched: Object.keys(_this.props.initialValues).reduce(function(previousValue, currentValue) {
        var _a
        return __assign({}, previousValue, ((_a = {}), (_a[currentValue] = false), _a))
      }, {}),
      errors: {},
      isSubmitting: false,
      submitCount: 0,
    }
    _this.getPyroFormActions = function() {
      return {}
    }
    _this.handleSubmit = function(e) {
      return __awaiter(_this, void 0, void 0, function() {
        var onSubmit, result
        return __generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              if (e) {
                e.preventDefault()
              }
              onSubmit = this.props.onSubmit
              if (!onSubmit) return [3 /*break*/, 2]
              result = onSubmit(this.state.values, this.getPyroFormActions)
              if (!isPromise(result)) return [3 /*break*/, 2]
              this.setState({
                isSubmitting: true,
              })
              return [4 /*yield*/, result]
            case 1:
              _a.sent()
              _a.label = 2
            case 2:
              this.setState(function(state) {
                return {
                  isSubmitting: false,
                  submitCount: state.submitCount + 1,
                }
              })
              return [2 /*return*/]
          }
        })
      })
    }
    // @ts-ignore Since the usage of name and value below is also ignored this will throw an unused parameter error
    _this.handleChange = function(name, value) {
      _this.setState(
        function(state) {
          var _a
          return {
            values: __assign({}, state.values, ((_a = {}), (_a[name] = value), _a)),
          }
        },
        function() {
          _this.handleValidate()
          if (_this.props.onChange) {
            _this.props.onChange(_this.state.values, _this.getPyroFormActions())
          }
        }
      )
    }
    _this.handleBlur = function(name) {
      _this.setTouched(name)
    }
    // @ts-ignore Since the usage of name and value below is also ignored this will throw an unused parameter error
    _this.setTouched = function(name) {
      _this.setState(function(state) {
        var _a
        return {
          touched: __assign({}, state.touched, ((_a = {}), (_a[name] = true), _a)),
        }
      })
    }
    _this.isValid = function() {
      return Object.keys(_this.state.errors).length === 0
    }
    _this.handleValidate = function() {
      var _a = _this.props,
        onValidate = _a.onValidate,
        onValid = _a.onValid,
        onInvalid = _a.onInvalid
      if (!onValidate) return
      _this.setState(
        function(state) {
          return {
            errors: onValidate(state.values, _this.getPyroFormActions()),
          }
        },
        function() {
          if (_this.isValid()) {
            onValid && onValid()
          } else {
            onInvalid && onInvalid()
          }
        }
      )
    }
    return _this
  }
  PyroForm.prototype.componentDidMount = function() {
    this.handleValidate()
  }
  PyroForm.prototype.render = function() {
    // TODO: Add some error handling here if no children are passed
    var contextValue = {
      values: this.state.values,
      errors: this.state.errors,
      touched: this.state.touched,
      handleChange: this.handleChange,
      handleBlur: this.handleBlur,
    }
    return react_1.default.createElement(
      PyroContext_1.PyroProvider,
      { value: contextValue },
      this.props.children({
        handleSubmit: this.handleSubmit,
        values: this.state.values,
        errors: this.state.errors,
        hasErrors: !this.isValid(),
      })
    )
  }
  return PyroForm
})(react_1.default.PureComponent)
exports.default = PyroForm
//# sourceMappingURL=PyroForm.js.map
