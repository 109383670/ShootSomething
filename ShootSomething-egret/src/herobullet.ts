class herobullet extends egret.DisplayObjectContainer {

	timer:egret.Timer;
	public speed:number;
	public size:number;
	public bulletType:BULLETTYPE;
	private timeclip:number;

	public constructor(size:number, type:BULLETTYPE) {
		super();
		this.timeclip = 10;
		this.timer = new egret.Timer(this.timeclip, 0);
		this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
		this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
		this.timer.start();
		this.speed = 0;
		this.size = size;
		// this.anchorOffsetX = this.size/2;
		// this.anchorOffsetY = -this.size/2;
		this.bulletType = type;
	}

	public setSpeed(speed:number){
		this.speed = speed;
	}
	private onAddToStage(event:egret.Event):void{
		if(this.bulletType == BULLETTYPE.CIRCLE_BULLET){
			this.drawCircleB();
		}else if(this.bulletType == BULLETTYPE.SQUARE_BULLET){
			this.drawSquareB();
		}else{

		}
	}

	private drawCircleB(){
		var shp:egret.Shape = new egret.Shape();
		shp.graphics.lineStyle( bulletManager.getInstance().bullet_weight, bulletManager.getInstance().bullet_color );
		shp.graphics.drawCircle(0, 0, this.size/2);
        this.addChild(shp); 
	}

	private drawSquareB(){
		var shp:egret.Shape = new egret.Shape();
		shp.graphics.lineStyle( bulletManager.getInstance().bullet_weight, bulletManager.getInstance().bullet_color );
		shp.graphics.drawRect(-this.size/2, -this.size/2, this.size, this.size);
        this.addChild(shp);
		//console.log("draw my hero");
	}

	private timerFunc(event:egret.Event){
		if(this.outScreen()){
			var index = bulletManager.getInstance().bulletArray.indexOf(this, 0);
			if (index > -1) {
   				bulletManager.getInstance().bulletArray.splice(index, 1);
			}
		}
		//console.log(bulletManager.getInstance().bulletArray.length);
		this.updatebullet();
		if(this.collide()){
			if(this.parent){
				this.parent.removeChild(this);
			}
			var index = bulletManager.getInstance().bulletArray.indexOf(this, 0);
			bulletManager.getInstance().bulletArray.splice(index, 1);
		}
	}

	public stopGo(){
		this.timer.stop();
	}

	public startGo(){
		this.timer.start();
	}

	private outScreen(): boolean{
		if(this.y < -this.size){
			return true;
		}
		else{
			return false;
		}
	}

	private collide():boolean{
		var collidArray:funEnemy[] = new Array<funEnemy>();
		for(let e of enemyFactory.getInstance().enemyArray){
			var rrect = gameManager.getInstance().getBoundRect(e.x - e.size/2, e.y - e.size/2, e.getBounds().width, e.getBounds().height);
			var trect = gameManager.getInstance().getBoundRect(this.x - this.size/2, this.y - this.size/2, this.getBounds().width, this.getBounds().height)
			if(trect.intersects(rrect) || trect.containsRect(rrect)){
				collidArray.push(e);
				//console.log(this.getBounds() + "," + e.getBounds());
			}
		}

		for(let collidEnemy of collidArray){
			var index = enemyFactory.getInstance().enemyArray.indexOf(collidEnemy, 0);
    		if (index > -1) {
       			enemyFactory.getInstance().enemyArray.splice(index, 1);
				collidEnemy.parent.removeChild(collidEnemy);
				gameManager.getInstance().killEnemy += 1;
				gameManager.getInstance().beginUI.scoretag.$setText(String(gameManager.getInstance().killEnemy));
				gameManager.getInstance().updateLevel();
				console.log("杀敌数: " + gameManager.getInstance().killEnemy);
    		}
		}
		if(collidArray.length > 0){
			return  true;
		}
		else{
			return  false;
		}
	}

	private updatebullet(){
		this.y -= (this.speed*this.timeclip)/1000;
	}

}