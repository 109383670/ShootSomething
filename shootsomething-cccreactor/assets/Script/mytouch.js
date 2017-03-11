var MyHero = require("myhero");

cc.Class({
    extends: cc.Component,

    properties: {
        hero: {
            default: null,
            type: MyHero
        },
    },

    // use this for initialization
    onLoad: function () {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onHeroTouchBegin, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onHeroTouchMove, this);
        console.log("myhero");

    },

    onHeroTouchBegin: function (event) {
    },

    onHeroTouchMove: function (event) {
        var ds = event.getDelta();
        var node = this.hero.node;
        node.x += ds.x;
        //console.log(320 - this.hero.size / 2);
        if ((node.x > (320 - this.hero.size / 2)) ||
            (node.x < (-320 + this.hero.size / 2))) {
            node.x -= ds.x;
        }
        console.log("myhero");

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
