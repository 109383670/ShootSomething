enum BULLETTYPE {
		CIRCLE_BULLET,
		SQUARE_BULLET,
		UNKNOW_BULLET
	};

class bulletManager {

	public bulletArray:herobullet[];
	private static  _instance:bulletManager;
	public bullet_speed:number;
	public bullet_size:number;
	public bullet_weight:number;
	public bullet_type:number;
	public bullet_color:number;
	
	public constructor() {
		if(bulletManager._instance){
			throw new Error("Error: Instantiation failed: Use SingletonClass.getInstance() instead of new.");
		}
		this.initBulletManager();
	}
	

	public static getInstance():bulletManager{
		if(!bulletManager._instance){
			bulletManager._instance = new bulletManager();
		}
		return  bulletManager._instance;
	}

	private initBulletManager(){
		this.bulletArray = new Array<herobullet>();
		this.bullet_speed = 0;
		this.bullet_size = 15;
		this.bullet_weight = 2;
		this.bullet_color = 0xffffff;
	}
	public createOneBullet(x:number, y:number, type:BULLETTYPE):herobullet{

		var bullet:herobullet = new herobullet(this.bullet_size, type);
		bullet.x = x;
		bullet.y = y;
		bullet.setSpeed(bulletManager.getInstance().bullet_speed);
		this.bulletArray.push(bullet);
		return bullet;
	}
}