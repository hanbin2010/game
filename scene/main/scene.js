const config = {
    //singleton
    //global var
    player_speed:10,
    cloud_speed:1,
    enemy_speed:5,
    bullet_speed:5,
    fire_cooldown:9,
}

class Bullet extends GuaImage {
    constructor(game) {
        super(game, 'bullet')
        this.setup()
    }

    setup() {
        this.speed = config.bullet_speed
        // this.speed = 1
    }
    update() {
        // this.speed = config.bullet_speed
        this.y -= this.speed
    }

}

class Player extends GuaImage {
    constructor(game) {
        super(game, 'player')
        this.setup()
    }

    setup() {
        this.speed = 10
        this.cooldown = 0
    }
    // 发射子弹是player个人的操作
// 所以不能放在场景里面，会让场景看上去不紧密
    fire() {
        if(this.cooldown == 0) {
            this.cooldown = config.fire_cooldown
            var x = this.x + this.w / 2
            var y = this.y
            //guaima里面要拿着game
            var b = Bullet.new(this.game)
            b.x = x
            b.y = y
            this.scene.addElement(b)
        }
    }

    update(){
        this.speed = config.player_speed
        if(this.cooldown > 0) {
            this.cooldown --
        }
    }

    moveLeft() {
        this.x -= this.speed
    }
    moveRight() {
        this.x += this.speed
    }
    moveUp() {
        this.y -= this.speed
    }
    moveDown() {
        this.y += this.speed
    }
}
const randomBetween = function(start, end) {
    var n = Math.random() * (end - start + 1)
    return Math.floor(n + start)
}
class Enemy extends GuaImage {
    constructor(game) {
        var type = randomBetween(0, 4)
        var name = 'enemy' + type;
        super(game, name)
        this.setup()
    }

    setup() {
        this.speed = randomBetween(2, 5)
        this.x = randomBetween(0, 350)
        this.y = -randomBetween(0, 200)
    }

    update(){
        this.y += this.speed
        if(this.y > 600) {
            this.setup()
        }
    }
}

class Cloud extends GuaImage {
    constructor(game) {
        super(game, 'cloud')
        this.setup()
    }

    setup() {
        this.speed = 1
        this.x = randomBetween(0, 350)
        this.y = -randomBetween(0, 200)
    }

    update(){
        this.y += this.speed
        if(this.y > 600) {
            this.setup()
        }
    }

    debug(){
        this.speed = config.cloud_speed
    }
}

class Scene extends GuaScene{
    constructor(game) {
        super(game)
        this.setup()
        this.setupInputs()
    }

    // setup(game){
    setup(){
        //guaSceneの中でgameを初期化設定するので
        // this.game = game
        var game = this.game
        this.numberOfEnemies = 10
        this.bg = GuaImage.new(game,'sky')
        this.cloud = Cloud.new(game,'cloud')

        // this.player = GuaImage.new(game,'player')
        // this.player.x = 100
        // this.player.y = 200
        // // this.game.registerAction('a',function () {
        //   this.moveLeft()
        // })
        // this.game.registerAction('d',function () {
        //   this.moveRight()
        // })
        // this.game.registerAction('f',function () {
        //   this .fire()
        // })

        this.player = Player.new(game)
        this.player.x = 100
        this.player.y = 150
        this.addElement(this.bg)
        this.addElement(this.cloud)
        this.addElement(this.player)
        //
        this.addEnemies(this.numberOfEnemies)

        var ps = GuaParticleSystem.new(this.game)
        this.addElement(ps)
    }

    addEnemies(num) {
        var es = []
        for (var i = 0; i < num; i++) {
            var e = Enemy.new(this.game)
            es.push(e)
            this.addElement(e)
        }
        this.enemies = es
    }

    setupInputs() {
        //register 4 action
        var g = this.game
        var s = this
        log(g)
        log("start")
        g.registerAction('d',function () {
            s.player.moveRight()
        })
        g.registerAction('a',function () {
            // console.log("もしキーが押されたら、登録されたactionを実施");
            s.player.moveLeft()
        })
        log("end")
        g.registerAction('w',function () {
            // console.log("もしキーが押されたら、登録されたactionを実施");
            s.player.moveUp()
        })
        g.registerAction('s',function () {
            s.player.moveDown()
        })
        g.registerAction('j',function () {
            s.player.fire()
        })

    }

    update(){
        super.update()
        this.cloud.y += 1
    }


    // static new(game){
    //   var i = new this(game)
    //   return i
    // }
    // draw () {
    // this.game.drawImage(this.bg)
    // this.game.drawImage(this.player)
    // }

}

//
// //大文字はobjectって感じ
// var Scene = function (game) {
//   log("scene start8")
//   //sは空のオブジェクト
//   var s = {
//     game:game,
//     //新しい特性ならOK
//     // game,
//   }
//
// //初期化
//   blocks = loadLevel(1,game)
//
//   //gameの初期化は非同期なので、まだイメージができていないんだ
//   //imagesが空のobjectになってしまった
//   var paddle = Paddle(game)
//   // log(paddle.w)
//   // log(paddle)
//   var ball = Ball(game)
//   var score = 0
//
//   // blocks = loadLevel(1,game)
//
//   //gameの初期化は非同期なので、まだイメージができていないんだ
//   //imagesが空のobjectになってしまった
//   // var paddle = Paddle(game)
//   // log("paddle is",paddle)
//   // var ball = Ball(game)
//   // var score = 0
//
//   // window.blocks = loadLevel(1,game)
//
//   //paddleと関係ないことも関数に入れる
//   //canvasを描画する
//   //そうすると、画面がロードされたときに、自動的にcanvasの中に出てくる
//   // console.log("load");
//   // log("onload",paddle.image.onload)
//   // paddle.image.onload = function() {
//   //   log("load image start9")
//   //   game.context.drawImage(paddle.image, paddle.x, paddle.y)
//   //   console.log("load");
//   // }
//   // console.log("regis");
//   //events
//   game.registerAction('a',function () {
//     // console.log("もしキーが押されたら、登録されたactionを実施");
//     paddle.moveLeft()
//   })
//   game.registerAction('d',function () {
//     paddle.moveRight()
//   })
//   game.registerAction('f',function () {
//     ball.fire()
//   })
//
//   game.registerAction('r',function () {
//     var s = SceneTitle(game)
//       game.replaceScene(s)
//       })
//
//   // game.registerAction('p',function () {
//   // })
//   s.draw = function () {
//       //""? ''?
//       //背景を描く
//       game.ctx.fillStyle = "#ffccff";
//       game.ctx.fillRect(0, 0, 400, 300);
//
//       // console.log("draw");
//       // log(paddle,"paddle")
//       game.drawImage(paddle)
//       game.drawImage(ball)
//
//       for (var i = 0; i < blocks.length; i++) {
//         var b = blocks[i]
//         if(b.alive){
//           game.drawImage(b)
//         }
//       }
//       //draw lables
//       game.ctx.fillText("score is "+score, 10, 290)
//   }
//   s.update = function () {
//     if(window.paused){
//       // console.log("stop");
//       return
//     }
//
//     // console.log('update');
//     ball.move()
//
//     //is game over?
//     if(ball.y > paddle.y){
//       log("game over")
//       //game overに遷移する
//       var end = SceneEnd.new(game)
//         game.replaceScene(end)
//         // return
//     }
//     //collide
//     if(paddle.collide(ball)){
//       //ここはball.リバウンド()関数を呼び出すべき　
//       ball.rebound()
//       // ball.speedY *= -1
//     }
//     for (var i = 0; i < blocks.length; i++) {
//       var b = blocks[i]
//       if(b.collide(ball)){
//         og("ball collide");
//         b.kill()
//         ball.rebound()
//         //update score
//         score = score + 100
//       }
//     }
//
//   }
//
//   var enableDrug = false
//
//   //mouse event
//   //マウスが押されたとき
//   game.canvas.addEventListener('mousedown',function (event) {
//     var x = event.offsetX
//     var y = event.offsetY
//     // log("haha",x,y)
//     //ballを選択できているかを判断する
//     if (ball.hasPoint(x,y)) {
//       // log('handan')
//       //drug drop
//       enableDrug = true
//     }
//   })
//
//   //マウスが移動されたとき
//   game.canvas.addEventListener('mousemove',function (event) {
//     var x = event.offsetX
//     var y = event.offsetY
//     if (enableDrug) {
//       // log(x,y,"move")
//       ball.x = x
//       ball.y = y
//     }
//   })
//
//   //マウスが押上されたとき
//   game.canvas.addEventListener('mouseup',function (event) {
//     var x = event.offsetX
//     var y = event.offsetY
//     // log(x,y,"up")
//     //drug drop
//     enableDrug = false
//   })
//
//   return s
// }
