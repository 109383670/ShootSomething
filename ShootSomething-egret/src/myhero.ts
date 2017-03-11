class myhero extends egret.DisplayObjectContainer{

	public killenemy:number;
	public herosize:number;
	private timer:egret.Timer;
	public updateTime:number;
	public fireSpeed:number;
	public dt:number;
	public constructor(size:number) {
		super();
		this.herosize = size;
		this.killenemy = 0;
		this.anchorOffsetX = size/2;
		this.anchorOffsetY = -size/2;
		this.updateTime = 10;
		this.timer = new egret.Timer(this.updateTime, 0);
		this.fireSpeed = 0;
		this.dt = 0;

		this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
		this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);

		this.fire();
	}

	private onAddToStage(event:egret.Event):void{
		var shp:egret.Shape = new egret.Shape();
        shp.graphics.lineStyle( 2, 0xffffff );
        shp.graphics.moveTo( 0, 0 );
        shp.graphics.lineTo( 0 + this.herosize, 0);
		shp.graphics.lineTo(this.herosize*0.5, -Math.sqrt(3)*this.herosize/2);
		shp.graphics.lineTo( 0 , 0);
        shp.graphics.endFill();
		this.addChild(shp);
		console.log("draw my hero");
	}

	private timerFunc(event:egret.Event){
		 this.dt += this.timer.delay;
		 
		 if(this.dt >= (1000/this.fireSpeed)){
			 this.fireOneBullet();
			 this.dt = 0;
		 }

	}

	public fire(){
		if(!this.timer.running){
			this.timer.start();
		}
	}

	public stopFire(){
		if(this.timer.running){
			this.timer.stop();
		}
	}

	public fireOneBullet(){
		var m:bulletManager = bulletManager.getInstance();
		var bullet:herobullet = m.createOneBullet(this.x, this.y - this.herosize/2 - m.bullet_size , m.bullet_type);
		this.parent.addChild(bullet);
	}

	public collide(){
		if(this.isCollide()){
			console.log("game over!");
			gameManager.getInstance().pauseGame();
		}
	}
	private isCollide():boolean{
		for(let r of enemyFactory.getInstance().enemyArray){
			if(this.getBounds().intersects(r.getBounds())){
				return  true;
			}else{
				return  false;
			}
		}
	}


}