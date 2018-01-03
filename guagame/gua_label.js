class GuaLabel {
    //把画lable给抽象了出来
    constructor(game, text) {
        this.game = game
        this.text = text
    }

    //通过把game和text传过来，就可以画出label
    static new(game, text) {
        return new this(game, text)
    }
    draw() {
        // log("draw", this.game, this.text)
        //更高层次的抽象
        this.game.ctx.fillText(this.text, 100, 200)
    }

    update() {

    }
}
