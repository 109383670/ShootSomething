//var Bullet = require("bullet");
var Global = require("global");

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        bulletPrefab: cc.Prefab,
        bulletPool: cc.NodePool,
    },

    // use this for initialization
    onLoad: function () {
        Global.bulletManager = this;
        this.bulletPool = new cc.NodePool();
        let initCount = 20;
        for (let i = 0; i < initCount; ++i) {
            let bullet = cc.instantiate(this.bulletPrefab);
            this.bulletPool.put(bullet);
        }
    },

    fireOneBullet: function (pos, speed) {
        let bullet = null;
        if (this.bulletPool.size() > 0) {
            bullet = this.bulletPool.get();
        } else {
            bullet = cc.instantiate(this.bulletPrefab);
        }

        bullet.parent = this.node;
        var bulletScript = bullet.getComponent('bullet');

        pos.y += bulletScript.size * 1;
        bulletScript.speedY = speed;
        bullet.setPosition(cc.v2(pos.x + bulletScript.size * 0.3, pos.y + bulletScript.size));
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
