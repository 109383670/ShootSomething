var BulletManager = require("bulletmanager");
var Global = require("global");

cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },
        // defaults, set visually when attaching this script to the Canvas
        size: 16,  //边长
        fireSpeed: 20,
        bulletSpeed: 300,
        ellapseDt: 0,
        bulletManager: BulletManager,
    },

    // use this for initialization
    onLoad: function () {
        var size = this.size;
        var height = Math.sqrt(3) * size / 2;
        var ctx = this.node.getComponent(cc.Graphics);

        ctx.moveTo(0, 0);
        ctx.lineTo(size, 0);
        ctx.lineTo(size / 2, height);
        ctx.lineTo(0, 0);
        ctx.stroke();
        Global.myhero = this;
        // this.label.string = this.text;
    },

    // called every frame
    update: function (dt) {
        this.ellapseDt += dt;
        //console.log(dt);

        if (this.ellapseDt >= 1 / this.fireSpeed) {
            this.fire();
            this.ellapseDt = 0;

        }
    },

    updateParam: function () {
        this.fireSpeed = 6 + Global.killEnemy * 0.05;
        if (this.fireSpeed > 50) {
            this.fireSpeed = 50;
        }
        console.log(this.fireSpeed);
        this.bulletSpeed = 300 + Global.killEnemy * 1;
        if (this.bulletSpeed > 1000) {
            this.bulletSpeed = 1000;
        }

        this.label.string = Global.killEnemy;
    },

    fire: function () {

        this.bulletManager.fireOneBullet(cc.v2(this.node.x, this.node.y), this.bulletSpeed);
    }
});