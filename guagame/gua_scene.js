class GuaScene {
    constructor(game) {
        this.game = game
        this.elements = []
        this.debugModeEnabled = true

    }
    static new(game){
        var i = new this(game)
        return i
    }

    addElement(img){
        //用scene这个变量得到他的父类
        img.scene = this
        this.elements.push(img)
    }

    draw () {
        //空
        // var es = this.elements
        // log(es)
        for (var e of this.elements) {
            // var e = es[i]
            //gua scene的这个draw，固定了draw的方式
            //如果要演出爆炸效应，需要100个烟花
            //所以就要有自己的draw方法
            // this.game.drawImage(e)

            //让元素自己去draw，抽象化
            //这样的话，guaImage必须有自己的draw了
            e.draw()
        }
    }
    update(){
        var es = this.elements
        if(this.debugModeEnabled) {
            for (var i = 0; i < es.length; i++) {
                var e = es[i]
                // log("e",e)
                e.update()
                e.debug && e.debug()
            }
        }

    }
    //継承するために空にする
}
