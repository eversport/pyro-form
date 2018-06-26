export var getValueFromEvent = function(event) {
  return event.currentTarget.value
}
export var isEvent = function(event) {
  return event && event.target && event.target.value && typeof event.target.value === 'string'
}
//# sourceMappingURL=helper.js.map
