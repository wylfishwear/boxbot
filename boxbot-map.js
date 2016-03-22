/**
 * @param selector
 * @param columns
 * @param rows
 * @constructor
 */
var BoxbotMap = function (selector, columns, rows) {
  this.element = document.querySelector(selector)
  this.columns = columns
  this.rows = rows
  this.init()
}

BoxbotMap.prototype.init = function () {
  var html = ''
  for (var y = 0; y <= this.rows; y += 1) {
    html += '<tr>'
    for (var x = 0; x <= this.columns; x += 1) {
      if (x == 0 && y == 0) {
        html += '<td></td>'
      } else {
        if (y == 0) {
          html += '<td class="boxbot-box" data-type="x-axis">' + x + '</td>'
        } else if (x == 0) {
          html += '<td class="boxbot-box" data-type="y-axis">' + y + '</td>'
        } else {
          html += '<td class="boxbot-box" data-type="null"></td>'
        }
      }
    }
    html += '</tr>'
  }
  this.element.innerHTML = html
}

BoxbotMap.prototype.get = function (position) {
  return this.data[position[0]][position[1]]
}

BoxbotMap.prototype.set = function (position, type) {
  this.get(position).dataset.type = type
}
