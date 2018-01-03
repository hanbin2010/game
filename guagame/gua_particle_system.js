class GuaParticle extends GuaImage{

    constructor(game) {
        // log("game")
        log("game", game)
        // super(game,'fire')
        super(game, 'fire')
        this.game = game
        this.setUp()
    }

    // static new(game) {
    //     return new this(game)
    // }

    setUp() {
        this.life = 10
    }

    init(x, y, vx, vy) {
        this.x = x
        this.y = y
        this.vx = vx
        this.vy = vy
    }

    update() {
        this.life = this.life - 1
        this.x += this.vx
        this.y += this.vy
        //factor也可以添加到配置文件里
        var factor = 0.01
        this.vx += this.vx * factor
        this.vy += this.vy * factor
    }
}
// log("GuaParticle End")


class GuaParticleSystem {
    constructor(game) {
        this.game = game
        this.setUp()
    }

    static new(game) {
        return new this(game)
    }

    setUp() {
        this.duration = 50
        this.x = 150
        this.y = 200
        this.numberOfParticles = 100
        this.particles = []
    }

    update() {
        this.duration -= 1
        //add particle
        // log("update start")
        // log("this.particles",this.particles)
        // log("this.numberOfParticles",this.numberOfParticles)
        if (this.particles.length < this.numberOfParticles) {
            // log("if")
             var p = GuaParticle.new(this.game)
             log("p",p)
             var s = 2
             var vx = randomBetween(-s, s)
             var vy = randomBetween(-s, s)
             p.init(this.x, this.y, vx, vy)
             this.particles.push(p)
        }
        //update all
        for (var p of this.particles) {
            p.update()
        }
        //delete dead
        this.particles = this.particles.filter(p => p.life > 0)
    }

    draw() {
        if (this.duration < 0) {
            return
        }
        for (var p of this.particles) {
            p.draw()
        }
    }
}
