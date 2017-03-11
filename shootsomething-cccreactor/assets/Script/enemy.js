var Global = require("global");

cc.Class({
    extends: cc.Component,

    properties: {
        enemysize: 0,
        speedY: 0,
    },

    // use this for initialization
    onLoad: function () {
    },

    initEnemy: function (pos, enemysize, speed) {
        this.enemysize = enemysize;
        this.drawEnemy();

        this.node.x = pos.x;
        this.node.y = pos.y;
        this.speedY = speed;
    },

    drawEnemy: function () {
        var drawBrush = this.node.getComponent(cc.Graphics);
        drawBrush.rect(0, 0, this.enemysize, this.enemysize);
        drawBrush.stroke();
        console.log("good");

    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        this.node.y -= dt * this.speedY;
        this.outScreen();
    },

    outScreen: function () {
        let y = this.node.y;
        if (y < -480 - this.enemysize) {
            let enemyManager = Global.enemyManager;
            enemyManager.enemyPool.put(this.node);
            console.log('当前敌人缓冲池可用数：' + enemyManager.enemyPool.size());
            let index = enemyManager.activeEnemyArray.indexOf(this.node);
            enemyManager.activeEnemyArray.splice(index, 1);
        }
    },
});
