enum ENEMYTYPE{
	SQUARE_ENEMY,
	UNKNOW_ENEMY
}

class funEnemy extends egret.DisplayObjectContainer {
	timer:egret.Timer;
	public speed:number;
	public size:number;
	public color:number;
	public enemyType:ENEMYTYPE;
	private timeclip:number;

	public constructor(type:ENEMYTYPE) {
		super();
		this.timeclip = 20;
		this.timer = new egret.Timer(this.timeclip, 0);
		this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
		this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
		this.timer.start();
		this.speed = 0;
		this.size = 0;

		this.enemyType = type;
	}

	public setSpeed(speed:number){
		this.speed = speed;
	}

	public setColor(color:number){
		this.color = color;
	}

	public setSize(size:number){
		this.size = size;
	}

	private onAddToStage(event:egret.Event):void{
		if(this.enemyType == ENEMYTYPE.SQUARE_ENEMY){
			this.drawSquareE();
		}else{

		}
	}

	private drawCircleE(){
		var shp:egret.Shape = new egret.Shape();
		shp.graphics.lineStyle( bulletManager.getInstance().bullet_weight, this.color );
		shp.graphics.drawCircle(0, 0, this.size/2);
        this.addChild(shp); 
	}

	private drawSquareE(){
		var shp:egret.Shape = new egret.Shape();
		shp.graphics.lineStyle( bulletManager.getInstance().bullet_weight, this.color );
		shp.graphics.drawRect(-this.size/2, -this.size/2, this.size, this.size);
        this.addChild(shp);

		//console.log("draw my hero");
	}

	private timerFunc(event:egret.Event){
		if(this.outScreen()){
			var index = enemyFactory.getInstance().enemyArray.indexOf(this, 0);
			if (index > -1) {
			var index = enemyFactory.getInstance().enemyArray.indexOf(this, 0);
   				enemyFactory.getInstance().enemyArray.splice(index, 1);
			}
		}
		this.updatebullet();
		//this.collide();
	}

	public stopGo(){
		this.timer.stop();
	}

	public startGo(){
		this.timer.start();
	}
	
	private outScreen(): boolean{
		if(this.y > 1000){
			return true;
		}
		else{
			return false;
		}
	}

	private collide():boolean{
		return false;
	}

	private updatebullet(){
		this.y += (this.speed*this.timeclip)/1000;
	}


}