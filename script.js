/*
[KeyCode]
32 : SPACE
37 : ←
38 : ↑
39 : →
40 : ↓ 
*/

var c, keyNum
var p, s, ee, ee_1, enemy_shot

var invadors = [], invadors_1 = []
var shots = []
var enemy_shots = []

var hit = false

var count = 120
var time_count = count

var enemy_attack = 100
var attack = enemy_attack

var enemy_speed = 4
var enemy_move_count = 4


window.onload = function(){
	c = document.getElementById('canvas').getContext('2d')
	init()
	document.addEventListener("keydown", key)
}

function init(){
	p = new Player(200, 350)

	var enemy_start_position = 50

	//敵の描写
	for(var j=0; j<2; j++){
		for(var i=0; i<5; i++){
			ee = new Enemies(enemy_start_position + i * 30, 100, 20, 15, 0)
			ee_1 = new Enemies(enemy_start_position + i * 30, 130, 20, 20, 1)
			invadors.push(ee)
			invadors_1.push(ee_1)
		}
		enemy_start_position = 220
	}

	//ループ
	var loop = function(){
		draw()
		update()
		requestAnimationFrame(loop)
	}

	loop()
}

function draw(){
	c.clearRect(0, 0, 400, 400)
	p.show()

	//弾の描写
	for(var i=0; i<shots.length; i++){
		shots[i].show()
		shots[i].move()
		//画面外に出たら配列から削除する
		if (shots[i].y < 0){
			shots.splice(i, 1)
		}
	}

	time_count -= 1
	attack -= 1
	for(var i=0; i<invadors.length; i++){
		invadors[i].show()
	}
	for(var i=0; i<invadors_1.length; i++){
		invadors_1[i].show()
	}

	for(var i=0; i<shots.length; i++){
		for(var j=0; j<invadors.length; j++){
			if (shots.length != 0){
				//衝突判定用に描写した四角が衝突したら
				if (collision(invadors[j].x, invadors[j].y, invadors[j].w, invadors[j].h, shots[i].x, shots[i].y, shots[i].w, shots[i].h)){
					hit = true
					invadors.splice(j, 1)
					shots.splice(i, 1)
				}				
			}
		}
	}

	//2列目の敵との衝突判定
	for(var i=0; i<shots.length; i++){
		for(var j=0; j<invadors_1.length; j++){
			if (shots.length != 0){
				if (collision(invadors_1[j].x, invadors_1[j].y, invadors_1[j].w, invadors_1[j].h, shots[i].x, shots[i].y, shots[i].w, shots[i].h)){
					hit = true
					invadors_1.splice(j, 1)
					shots.splice(i, 1)
				}				
			}
		}
	}

	//敵がゼロになるとクリア
	if(invadors.length == 0 && invadors_1.length ==0){
		var clear = new Image()
		clear.src = 'img/clear.png'
		c.drawImage(clear, 70, 150)
	}
}

function update(){
	//敵の動き
	if(enemy_move_count == 0){
		enemy_speed *= -1
		enemy_move_count = 4
	}

	if(time_count == 0){
		invadors.forEach(function(element){
			element.x += enemy_speed
		})

		invadors_1.forEach(function(element){
			element.x += enemy_speed
		})

		time_count = count
		enemy_move_count -= 1
	}
}

function key(e){
	//キーボード操作
	keyNum = e.keyCode
	console.log(keyNum)

	if(e.keyCode == 37){
		p.moveLeft()
	}
	if(e.keyCode == 39){		
		p.moveRight()
	}
	if(e.keyCode == 32){
		p.shot()
	}
}

//当たり判定
function collision(ax, ay, aw, ah, bx, by, bw, bh){
	return ax < bx+bw && ay < by+bh && bx < ax+aw && by < ay+ah
}























