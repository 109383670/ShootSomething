class gameManager {
	private static  _instance:gameManager;
	
	private _hero : myhero;
	public killEnemy:number;

	public beginUI:beginui;
	
	private _gamePause : boolean;

	public gameRuning:boolean;
	public get gamePause() : boolean {
		return this._gamePause;
	}
	public set gamePause(v : boolean) {
		this._gamePause = v;
	}
	
	public get hero() : myhero {
		return this._hero;
	}
	public set hero(v : myhero) {
		this._hero = v;
	}


	
	 constructor() {
		if(gameManager._instance){
		throw new Error("Error: Instantiation failed: Use SingletonClass.getInstance() instead of new.");
		}
		this.initGameManager();
	}
	

	public static getInstance():gameManager{
		if(!gameManager._instance){
			gameManager._instance =   new gameManager();
		}
		return  gameManager._instance;
	}

	private initGameManager(){
		this.gamePause = true;
		this.killEnemy = 0;
		this.gameRuning = false;
	}

	public  pauseGame(){
		enemyFactory.getInstance().stopProductEnemys();
		gameManager.getInstance().hero.stopFire();
		for(let b of bulletManager.getInstance().bulletArray){
			b.stopGo();
		}
		for(let e of enemyFactory.getInstance().enemyArray){
			e.stopGo();
		}
	}

	public  resumeGame(){
		enemyFactory.getInstance().startProductEnemys();
		gameManager.getInstance().hero.fire();
		
		for(let b of bulletManager.getInstance().bulletArray){
			b.startGo();
		}
		for(let e of enemyFactory.getInstance().enemyArray){
			e.startGo();
		}
	}

	public getBoundRect(x:number, y:number, w:number, h:number):egret.Rectangle{
		return  new egret.Rectangle(x, y, w, h);
	}

	public updateLevel()
	{
		 bulletManager.getInstance().bullet_speed = 700 + (this.killEnemy / 5 )*10;  //每秒n像素
		 if(bulletManager.getInstance().bullet_speed > 1000){
			 bulletManager.getInstance().bullet_speed = 1000;
		 }
		 enemyFactory.getInstance().productSpeed = 5 + (this.killEnemy / 5) * 1 ;
		 console.log(enemyFactory.getInstance().productSpeed);
		 if(enemyFactory.getInstance().productSpeed > 100){
			 enemyFactory.getInstance().productSpeed = 100;
		 }
		 this.hero.fireSpeed = 10 + (this.killEnemy / 5) * 0.5;  //每秒发射n个
		 if(this.hero.fireSpeed > 30){
			 this.hero.fireSpeed = 30;
		 }

		 enemyFactory.getInstance().maxSpeed = (this.killEnemy / 5)  * 60;
		 if(enemyFactory.getInstance().maxSpeed > 1000){
			 enemyFactory.getInstance().maxSpeed = 1000;
		 }

	}

}