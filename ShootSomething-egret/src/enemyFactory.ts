class enemyFactory {

	private static  _instance:enemyFactory ;

	public enemyArray:funEnemy[];
	private timer:egret.Timer;
	private timeclip:number;
	private dt:number;
	public productSpeed:number;
	public maxSpeed:number;

	public constructor() {
		if(enemyFactory._instance){
		throw new Error("Error: Instantiation failed: Use SingletonClass.getInstance() instead of new.");
		}
		this.initEnemytManager();
	}
	

	public static getInstance():enemyFactory{
		if(!enemyFactory._instance){
			enemyFactory._instance =  new enemyFactory();
		}
		return  enemyFactory._instance;
	}

	private initEnemytManager(){
		this.enemyArray = new Array<funEnemy>();
		this.timeclip = 20;
		this.timer = new egret.Timer(this.timeclip, 0);
		this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
		this.dt = 0;
		this.productSpeed = 20;
		this.maxSpeed = 0;
	}

	public startProductEnemys(){
		if(!this.timer.running){
			this.timer.start();
		}
	}

	public stopProductEnemys(){
		this.timer.stop();
	}

	private timerFunc(event:egret.Event){
		this.dt += this.timer.delay;
		 if(this.dt >= (1000/this.productSpeed)){
			 this.work();
			 this.dt = 0;
		 }
	}


	private work(){
		var em:funEnemy = this.productOneRandomEnemy();
		if(em){
			this.enemyArray.push(em);
			gameManager.getInstance().hero.parent.addChild(em);
		}
	}

	private pauseWork(){
		this.timer.stop();
	}

	private startWork(){
		this.timer.start();
	}
	

	private productOneRandomEnemy():funEnemy{
		var enemy:funEnemy = new funEnemy(ENEMYTYPE.SQUARE_ENEMY);
		var size:number = 25 + Math.floor(Math.random()*50);
		var color:number = 0xff0000 + Math.floor(Math.random() * 100) * (0xffffff / 100);
		var speed:number = 300 + Math.floor(Math.random() * 400) + this.maxSpeed;
		var xPos:number = 40 +  Math.floor(Math.random() * (600 - size));
		var yPos:number = -200;

		var count:number = 0;
		while(this.isCollide(xPos,yPos, size))
		{
			xPos = 40 +  Math.floor(Math.random() * (600 - size));
			size = 25 + Math.floor(Math.random()*80);
			count += 1;
			if(count > 50){
				console.log("生成Enemy失败，没有命中！")
				return null;
			}
		}
		enemy.speed = speed;
		enemy.color = color;
		enemy.x = xPos;
		enemy.y = yPos;
		enemy.size = size;

		return  enemy;
	}

	private isCollide(x:number, y:number, size:number):boolean{
		var rect:egret.Rectangle = new egret.Rectangle(x, y, size, size);
		for(let r of this.enemyArray){
			var rrect = gameManager.getInstance().getBoundRect(r.x, r.y, r.getBounds().width, r.getBounds().height);
			//console.log(rect + "," + rrect);
			if(rect.intersects(rrect) || rect.containsRect(rrect)){
				return  true;
			}
			else{

				return false;
			}
		}
		return  false;
	}
}