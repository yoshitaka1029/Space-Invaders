/*
ゲーム内で登場するキャラクターたちのクラス。
*/

//自機のクラス
function Player(x, y){
	//自機の最初の座標
	this.x = x 
	this.y = y
	//自機の画像設定してdrawImageするメソッド
	this.show = function(){
		var player = new Image()
		player.src = 'img/main.png'
		c.drawImage(player, this.x, this.y, 21, 10)		
	}
	//キーボードが押されたら呼び出されるメソッド（左右の移動）
	this.moveRight = function(){
		this.x += 7
	}
	this.moveLeft = function(){
		this.x -= 7
	}
	//弾を作ってるShotクラスのインスタンスを作成するメソッド（スペースキーを押すと呼び出される）	
	this.shot = function(){
		s = new Shot(this.x, this.y, 16, 16)
		shots.push(s)
	}
}

//敵クラス
function Enemies(x, y, w, h, img){
	this.x = x
	this.y = y
	this.w = w
	this.h = h
	this.img = img
	//敵の画像を配列で保管
	var invador = ['img/invador_1.png', 'img/invador_2.png','img/invador_3.png']

	this.show = function(){
		//衝突判定用に画像の背面に四角を描写。
		c.fillRect(this.x, this.y, this.w, this.h)
		c.fillStyle = 'black'
		//敵画像の描写
		var enemy = new Image()
		enemy.src = invador[img]
		c.drawImage(enemy, this.x, this.y, 21, 15)	
	}
	this.move = function(){
		this.x += 4
	}
	//敵の攻撃（未実装）
	this.shot = function(){
		enemy_shot = new Shot(this.x, this.y, 16, 16)
		enemy_shots.push(enemy_shot)
	}
}

//弾クラス
function Shot(x, y, w, h){
	this.x = x
	this.y = y
	this.w = w
	this.h = h
	this.show = function(){
		//衝突判定用に画像の後ろに四角を描写	
		c.fillRect(this.x, this.y - 16, this.w, this.h)

		var shot = new Image()
		shot.src = 'img/icon0.png'
		c.drawImage(shot, 0, 16*3, 16, 16, this.x + 2, this.y - 15, 16, 16)
	}
	this.move = function(){
		this.y -= 5
	}
}
















