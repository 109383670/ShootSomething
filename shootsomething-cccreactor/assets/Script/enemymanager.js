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
        enemyPrefab: cc.Prefab,
        enemySize: 0,
        enemySpeed: 0,
        enemyProduceSpeed: 20,
        enemyPool: cc.NodePool,
        dt: 0,
        activeEnemyArray: [],
    },

    // use this for initialization
    onLoad: function () {
        Global.enemyManager = this;
        this.enemyPool = new cc.NodePool();
        let initCount = 20;
        for (let i = 0; i < initCount; ++i) {
            let enemy = cc.instantiate(this.enemyPrefab);
            this.enemyPool.put(enemy);
        }
    },

    fireOneEnemy: function (pos, speed) {
        let enemy = null;
        this.enemyPool = new cc.NodePool();
        if (this.enemyPool.size() > 0) {
            enemy = this.enemyPool.get();
        } else {
            enemy = cc.instantiate(this.enemyPrefab);
        }

        enemy.parent = this.node;
        var enemyScript = enemy.getComponent('enemy');

        enemyScript.initEnemy(pos, this.enemySize, speed);
        return enemy;
        //bullet.setPosition(cc.v2(pos.x - bulletScript.size * 0.3, pos.y + bulletScript.size));
    },

    fireRandomOneEnemy: function () {
        let randomSize = this.randomSize();
        this.enemySize = randomSize;

        let randomPos = this.randomPos();
        let randomSpeed = this.randomSpeed();

        return this.fireOneEnemy(randomPos, randomSpeed);
    },

    updateParam: function () {
        this.enemyProduceSpeed = 5 + Global.killEnemy * 0.05;
        if (this.enemyProduceSpeed > 60) {
            this.enemyProduceSpeed = 60;
        }

    },

    randomSize: function () {
        let size = 40 + Math.random() * (100);
        return size;
    },

    randomPos: function () {
        let y = 960;
        let x = (-320 + this.enemySize / 2) + Math.random() * (640 - this.enemySize);
        return cc.v2(x, y);
    },

    randomSpeed: function () {
        let speed = 300 + Math.random() * (Global.killEnemy * 1);
        return (speed > 1000) ? 1000 : speed;
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        this.dt += dt;
        if (this.dt > 1 / this.enemyProduceSpeed) {
            var enemy = this.fireRandomOneEnemy();
            if (enemy) {
                this.activeEnemyArray.push(enemy);
            }
            this.dt = 0;
        }
    },
});
