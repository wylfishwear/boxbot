var ImageReader = function () {
  this.image = document.createElement('img')
  this.canvas = document.createElement('canvas').getContext('2d')
  this.reader = new FileReader()
  this.reader.addEventListener('load', proxy(this, this.onLoad))
}

ImageReader.prototype.load = function (file, width, height) {
  this.width = width
  this.height = height
  this.reader.readAsDataURL(file.files[0])
  return new Promise(proxy(this, function (resolve) {
    this.resolve = resolve
  }))
}

ImageReader.prototype.onLoad = function () {
  this.image.src = this.reader.result
  this.canvas.drawImage(this.image, 0, 0, this.width, this.height)
  var data = []
  for (var y = 0; y < this.width; y += 1) {
    data.push([])
    for (var x = 0; x < this.height; x += 1) {
      data[y].push(this.toRGB(this.canvas.getImageData(x, y, 1, 1).data))
    }
  }
  this.resolve(data)
}

ImageReader.prototype.toHex = function (num) {
  var hex = num.toString('16')
  return hex.length == 2 ? hex : '0' + hex
}

ImageReader.prototype.toRGB = function (pixel) {
  return '#' + this.toHex(pixel[0]) + this.toHex(pixel[1]) + this.toHex(pixel[2])
}