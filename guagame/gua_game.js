class GuaGame {
    constructor(fps,images,callback) {
        window.fps = fps
        this.images = images
        this.callback = callback
        this.scene = null
        this.actions = {}
        this.keydowns = {}

        this.canvas = document.querySelector('#id-canvas')
        this.ctx = this.canvas.getContext('2d')

        //events
        var self = this
        //アロー関数
        window.addEventListener('keydown', event => {
            //配列
            // this.keydowns[event.key] =true;
            this.keydowns[event.key] = 'down';
        })

        //非同期
        window.addEventListener('keyup',function (event) {
            // self.keydowns[event.key] =false;
            self.keydowns[event.key] = 'up';
        })

        this.init()
    }

    static instance(...args){
        this.i = this.i || new this(...args)
        return this.i
    }

    drawImage(img) {
        // g.context.drawImage()
        this.ctx.drawImage(img.texture,img.x,img.y)
    }

    draw (){
        this.scene.draw()
    }

    update (){
        if(window.paused) {
            return
        }
        this.scene.update()
    }

    registerAction (key,callback){
        this.actions[key] = callback
    }

    runloop () {
        var g = this
        var actions = Object.keys(g.actions)
        for (var i = 0; i < actions.length; i++) {
            var key = actions[i]
            var status = g.keydowns[key]
            if (status == 'down') {
                g.actions[key]('down')
            } else if (status == 'up') {
                g.actions[key]('up')
                //keyの状態を削除する
                g.keydowns[key] = undefined
            }
        }
        g.ctx.clearRect(0, 0, g.canvas.width, g.canvas.height)
        g.draw()
        g.update()
        // next run loop
        setTimeout(function (fps) {
            g.runloop()
        },1000/window.fps)
    }

    init () {
        var g = this
        var loads = []
        var names = Object.keys(g.images)
        for (var i = 0; i < names.length; i++) {
            let name =  names[i]
            let path = g.images[name]
            let img = new Image()
            img.src = path
            img.onload = function () {
                //imgをg.imagesに保存
                g.images[name]=img
                //１回ロードしたら、プラス１回
                loads.push(1)
                //もし図が全部ロードできたら、ゲームを始める
                if(loads.length == names.length){
                    g.run()
                }
            }
        }

    }

    //nameをキーに、その中のimgオブジェクトを取得する
    textureByName (name) {
        // log("textureByName name", name)
        var g = this
        var img = g.images[name]
        // log("img", img)
        return img
    }

    runWithScene (scene) {
        var g = this
        // console.log("runwith");
        this.scene = scene
        setTimeout(function (fps) {
            g.runloop()
        },1000/window.fps)
    }

    replaceScene (scene) {
        log("replace",scene)
        this.scene = scene

    }

    //プログラムがスタート
    run () {
        var g = this
        // log("run in start6")
        this.callback(g)
    }
}
