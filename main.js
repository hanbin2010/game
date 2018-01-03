//js do not need import


//dirty code
//change paused and blocks to globlal var
window.paused = false


//デバッグ用
var enableDebugMode = function (flg,game) {
  if(!flg){
    return
  }
  // so what is the difference key up vs key down??
  window.addEventListener('keyup',function () {
    //use short var name in the func
    var k = event.key
    //一時停止機能
    if(k === 'p'){
      //change paused
      window.paused = !window.paused
    }else if ('1234567'.includes(k)) {
      // blocks = loadLevel(Number(k),game)
    }

  })

  document.querySelector('#id-input-speed').addEventListener('input',function (event) {
    var input = event.target
    window.fps = Number(input.value)
  })
}

//入り口を一つにする
var __main = function(){

  // log("main start1")

  //define var
  var images = {
    bg: 'img/bird/bg.png',
    ground: 'img/bird/ground.png',
    b1: 'img/bird/b1.png',
    b2: 'img/bird/b2.png',
    b3: 'img/bird/b3.png',
    pipe: 'img/bird/pipe.png',
  }
  var game = GuaGame.instance(30,images,function (g) {
    var s = SceneTitle.new(game)
    g.runWithScene(s)
  })


  enableDebugMode(true,game)
}


__main()
