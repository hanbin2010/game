var rectIntersects = function(a,b) {
  var o = a
  if (b.y > o.y && b.y < o.y + o.image.height) {
    if (b.x > o.x && b.x < o.x + o.image.width) {
        // console.log("collide")
        return true
      }
  }
  return false
}

//make a image to canvas
var imageFromPath = function(path) {
  var img = new Image();
  img.src = path
  return img
}

//何でアロー関数を使ったのか？
var e = sel => document.querySelector(sel)

//logを単独で定義することによって、柔軟性を持たせる
const log = console.log.bind(console)
