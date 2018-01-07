class Pipes {
    constructor(game) {
        this.game = game
        this.pipes = []
        this.pipeSpace = 50
        this.guanzi = 160
        this.colOfPipe = 3
        for (var i = 0; i < this.colOfPipe; i++) {
            var p1 = GuaImage.new(game, 'pipe')
            // p1.flipY = false
            p1.flipY = true
            p1.flipX = true
            p1.x = 10 + i * this.guanzi
            var p2 = GuaImage.new(game, 'pipe')
            p2.x = p1.x
            // p2.flipY = false
            p2.flipY = false
            p1.flipX = false
            this.resetPipePosition(p1, p2)
            p1.h = 100
            p2.h = 200
            p2.roatation = 180
            this.pipes.push(p1)
            this.pipes.push(p2)
        }
    }

    static new(game) {
        var pipe = new this(game)
        return pipe
    }

    resetPipePosition(p1, p2) {
        p1.y = randomBetween(-50, 50)
        // p2.y = p1.y + p1.h + this.pipeSpace
        p2.y = this.pipeSpace + p1.y + 150
        log("resetPipePosition p1.y", p1.y)
        log("resetPipePosition p2.y", p2.y)
    }

    debug() {
        this.pipeSpace = config.pipeSpace.value
        this.guanzi = config.guanzi.value

    }

    update() {
        if(window.paused) {
            return
        }
        for (var i = 0; i < this.pipes.length / 2 ; i += 2) {
            var p1 = this.pipes[i]
            var p2 = this.pipes[i + 1]
            p1.x -= 5
            p2.x -= 5
            if(p1.x < -70) {
                p1.x += this.colOfPipe * this.guanzi
                // this.resetPipePosition()
            }
            if(p2.x < -70) {
                p2.x += this.colOfPipe * this.guanzi
                this.resetPipePosition(p1, p2)
            }
        }
        // for (var p of this.pipes) {
        //     log('after update', p)
        // }
        // // p.flipY = !p.flipY
    }

    draw(){

        var ctx = this.game.ctx
        if(window.paused) {
            return
        }
        for (var i = 0; i < this.pipes.length; i++) {
            var p = this.pipes[i]
            ctx.save()
            var w2 = p.w / 2
            var h2 = p.h / 2
            var x = p.x + w2
            var y = p.y + h2
            log("X", x, "Y", y, 'i', i)
            ctx.translate(x, y)
            var scaleX = p.flipX ? -1 : 1
            var scaleY = p.flipY ? -1 : 1
            log("scaleX", scaleX, "scaleY", scaleY)
            ctx.scale(scaleX, scaleY)
            ctx.rotate(p.rotation * Math.PI / 180)
            ctx.translate(-w2, -h2)
            // ctx.translate(-x/2  , 0)
            ctx.drawImage(p.texture, 0, 0)
            ctx.restore()
        }

        // for (var p of this.pipes) {
        //     ctx.save()
        //     var w2 = p.w / 2
        //     var h2 = p.h / 2
        //     var x = p.x + w2
        //     var y = p.y + h2
        //     ctx.translate(x, y)
        //     var scaleX = p.flipX ? -0.9 : 0.9
        //     var scaleY = p.flipY ? -1 : 1
        //     // scaleY = 1
        //     log("scaleX", scaleX, "scaleY", scaleY)
        //     ctx.scale(scaleX, scaleY)
        //     ctx.rotate(p.rotation  * Math.PI / 180)
        //     ctx.translate(-w2, -h2)
        //     // ctx.translate(-w2, -h2)
        //     ctx.drawImage(p.texture, 0, 0)
        //     ctx.restore()
        // }

    }
}

class SceneTitle extends GuaScene{
  constructor(game) {
    super(game)
    var bg = GuaImage.new(game,'bg')
    this.addElement(bg)
    // var label = GuaLabel.new(game,"hello")
    // this.addElement(label)
    this.pipe = Pipes.new(game)
    this.addElement(this.pipe)
    this.grounds = []
    for (var i = 0; i < 40; i++) {
        var g = GuaImage.new(game, 'ground')
        g.x = i * 5
        g.y = 250
        this.addElement(g)
        this.grounds.push(g)

    }
    var bird = GuaAnimation.new(game)
    bird.x = 90
    bird.y = 100
    this.addElement(bird)
    this.bird =  bird
    this.setupInputs()
    this.skipCount = 4
  }

  update() {
      super.update()
      this.skipCount--
      var offset = -3
      if(this.skipCount == 0) {
          this.skipCount = 4
          offset = 9
      }

      for (var i = 0; i < 40; i++) {
          var g = this.grounds[i]
          g.x += offset
      }
  }
  setupInputs() {
    var self = this
    var b = this.bird
    // log("this.bird", b)
    self.game.registerAction('a', function (keyStatus) {
        b.move(-2, keyStatus)
    })
    self.game.registerAction('d', function (keyStatus) {
        b.move(+2, keyStatus)
    })
    self.game.registerAction('j', function (keyStatus) {
        b.jump()
    })
  }

}
