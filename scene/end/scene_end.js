// //大文字はobjectって感じ
// var SceneEnd = function (game) {
//   // log("scene start8")
//   //sは空のオブジェクト
//   var s = {
//     game:game,
//     //新しい特性ならOK
//     // game,
//   }
//
//   game.registerAction('r',function () {
//     // var s = new SceneTitle(game)
//     var s = SceneTitle.new(game)
//
//     game.replaceScene(s)
//   })
//
//   s.draw = function () {
//     //draw labels
//     game.context.fillText("Game is over! Press r to replay!", 100, 200)
//   }
//   s.update = function () {
//   }
//
//   return s
// }
class SceneEnd extends GuaScene{
  constructor(game) {
    super(game)
    game.registerAction('r',function () {
      // var s = new SceneTitle(game)
      var s = SceneTitle.new(game)
      game.replaceScene(s)
    })
  }

 // __init(){
 // }
 // static new(game){
 //   var i = new this(game)
 //   // __init()
 //   return i
 // }

//ctrl + shift + k = delete
  draw () {
    this.game.ctx.fillText("Game is over! Press r to replay!", 100, 200)
  }

}
