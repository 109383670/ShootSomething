var EnemyManager = require("enemymanager");
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
        size: 10,
        speedY: 0,
        enemyManager: EnemyManager,
    },

    // use this for initialization
    onLoad: function () {
        var drawBrush = this.node.getComponent(cc.Graphics);
        drawBrush.rect(0, 0, this.size, this.size);
        drawBrush.stroke();
    },

    update: function (dt) {

        this.node.y += dt * this.speedY;
        this.outScreen();
        if (this.collide()) {
            Global.bulletManager.bulletPool.put(this.node);
        }
        //console.log(this.speedY);
    },

    outScreen: function () {
        let y = this.node.y;
        if (y > 480 + this.size) {
            let bulletManager = Global.bulletManager;
            bulletManager.bulletPool.put(this.node);
            console.log('当前子弹缓冲池可用数：' + bulletManager.bulletPool.size());
        }
    },

    collide: function () {
        let bulletRect = new cc.rect(this.node.x, this.node.y, this.size, this.size);
        let enemyRect = null;
        let shootedArray = [];
        let length = Global.enemyManager.activeEnemyArray.length;
        for (let i = length - 1; i >= 0; i--) {
            let enemy = Global.enemyManager.activeEnemyArray[i];
            enemyRect = new cc.rect(enemy.x, enemy.y, enemy.getComponent('enemy').enemysize);
            if (cc.rectIntersectsRect(bulletRect, enemyRect)) {
                Global.enemyManager.enemyPool.put(enemy);
                shootedArray.push(enemy);
                Global.enemyManager.activeEnemyArray.splice(i, 1);
                Global.killEnemy += 1;

                Global.myhero.updateParam();
                Global.enemyManager.updateParam();
                console.log("场景中敌人数量：" + Global.enemyManager.activeEnemyArray.length);
                return true;
            }
        }
        return false;
        // for (let i in Global.enemyManager.activeEnemyArray) {
        //     let enemy = Global.enemyManager.activeEnemyArray[i];
        //     enemyRect = new cc.rect(enemy.x, enemy.y, enemy.getComponent('enemy').enemysize);
        //     if (cc.rectIntersectsRect(bulletRect, enemyRect)) {
        //         Global.enemyManager.enemyPool.put(enemy);
        //         shootedArray.push(enemy);
        //     }
        // }


    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
