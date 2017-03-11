class ShapFactory  {
	public constructor() {
	}

	static createCircle(x:number, y:number, size:number): egret.Shape{
		var circle:egret.Shape = new egret.Shape();
		//circle.graphics.beginFill(0x111111, 1);
		circle.graphics.lineStyle(2, 0xffffff);
		circle.graphics.drawCircle(x, y, size);
		//circle.graphics.endFill();
		circle.anchorOffsetX = size/2;
		circle.anchorOffsetY = size/2;
		return circle;
	}
}