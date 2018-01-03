class GuaAnimation {
    constructor(game) {
        this.game = game
        //時間節約のため、ハードコーディングする
        this.animations = {
            bird:[],
            // run:[],
        }
        // log(`this.animations['bird']`, this.animations['bird'])
        // this.frames = []
        //アニメーションは最終的にプロパティファイルに置く
        //ループの中でそれをロードする
        for (var i = 1; i <= 3; i++) {
            var name = `b${i}`
            var t = game.textureByName(name)
            // log("t", t)
            // log("run", name)
            this.animations['bird'].push(t)
            // this.frames.push(t)
        }
        //9と6はアニメーションのsequence number
        // for (var i = 1; i < 10; i++) {
        //     var name = `idle${i}`
        //     // log("idle", name)
        //     var t = game.textureByName(name)
        //     this.animations['idle'].push(t)
        //     // this.frames.push(t)
        // }

        this.animationName = 'bird'
        this.texture = this.frames()[0]
        this.frameIndex = 0
        this.frameCount = 3
        this.w = this.texture.width
        this.h = this.texture.height

        this.flipX = false
        this.gy = 10
        this.vy = 0

        this.rotation = 0

        // this.flipX = false
        this.alpha = 1
    }

    static new(game) {
        return new this(game)
    }

    frames() {
        // log("this.animationName", this.animationName)
        // log("this.animations", this.animations)
        return this.animations[this.animationName]
    }

    jump() {
        this.vy = -10
        this.rotation = -45
    }

    update() {
        // update gravity
        this.y += this.vy
        this.vy += this.gy * 0.2
        this.frameCount -= 1

        var h = 230
        if(this.y > h) {
            this.y = h
        }

        //update degree
        // this.rotation =
        // log("update", this.rotation)
        if(this.rotation < 45) {
            // log("this.rotation < 45 is true")
        //     // log("this.rotation += 5", this.rotation += 5)
            this.rotation += 5
        }

        if(this.alpha > 0) {
            this.alpha -= 0.05
        }
        if (this.frameCount == 0) {
            this.frameCount = 3
            // log('this.frames()', this.frames())
            this.frameIndex = (this.frameIndex + 1) % this.frames().length
            this.texture = this.frames()[this.frameIndex]
        }
    }

    draw() {
        var ctx = this.game.ctx
        // log("GuaAnimation ctx", this.name)
        ctx.save()
        var w2 = this.w / 2
        var h2 = this.h / 2
        // log("this.x", this.x)
        var x = this.x + w2
        var y = this.y + h2
        // log("x", x)
        ctx.translate(x, y)
        if (this.flipX) {
            ctx.scale(-1, 1)
        }

        // var alpha = ctx.globalAlpha
        ctx.globalAlpha = this.alpha
        // log("(this.roatation", this.rotation)
        ctx.rotate(this.rotation  * Math.PI / 180)
        // log("rotate over")
        ctx.translate(-x, 0)

        ctx.drawImage(this.texture, this.x, 0)
        ctx.restore()
    }

    move(x, keyStatus) {
        this.x += x
        this.flipx = x < 0
        // log("keyStatus", keyStatus, "this.flipx", this.flipx)

        var animationNames = {
            down: 'bird',
            up: 'bird',
        }

        var name = animationNames[keyStatus]
        this.changeAnimation(name)
        // if (keyStatus == 'down') {
        // } else if(keyStatus == 'up') {
        //     this.changeAnimation('idle')
        // }
    }

    changeAnimation(name) {
        this.animationName = name
    }
}
