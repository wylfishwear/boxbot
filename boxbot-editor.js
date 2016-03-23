/**
 * @param {string} selector
 * @constructor
 */
var BoxbotEditor = function (selector) {
  this.element = document.querySelector(selector)
  this.$lines = this.element.querySelector('.commander-lines')
  this.$textarea = this.element.querySelector('.commander-editor')
  this.$textarea.addEventListener('input', proxy(this, this.updateLines))
  this.$textarea.addEventListener('scroll', proxy(this, function (event) {
    this.$lines.style.top = -event.target.scrollTop + 'px'
  }))
}

BoxbotEditor.prototype.updateLines = function () {
  var html = ''
  var codes = this.$textarea.value
  var lines = codes.match(/\n/g)
  lines = lines ? lines.length + 1 : 1

  for (var l = 1; l <= lines; l++) {
    html += '<div class="commander-lines-item">' + l + '</div>'
  }

  this.$lines.innerHTML = html
  console.log(this.getCodes())
}

BoxbotEditor.prototype.getCodes = function () {
  var codes = []
  this.$textarea.value.split('\n').forEach(function (code) {
    code = code.trim()
    if (code) {
      codes.push(code)
    }
  })
  return codes
}