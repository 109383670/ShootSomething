class beginui extends eui.Component implements  eui.UIComponent {
	public btn:eui.Button;
	public scoretag:eui.Label;
	public helptag:eui.Label;
	public constructor() {
		super();
		this.skinName = "beginuiSkin";
		gameManager.getInstance().beginUI = this;
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
		this.btn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onClick,this);

	}
	
	private onClick(event:egret.TouchEvent): void{
			console.log("被点击");
			gameManager.getInstance().resumeGame();
			gameManager.getInstance().gameRuning = true;
			this.btn.$setVisible(false);
			this.helptag.$setVisible(false);
	}
	
}