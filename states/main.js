var main = function(game){
	console.log("Main");

};

main.prototype = {

  preload: function(){
    console.log('preload main');
  },

	player: null,
	items: null,
	collect_sound: null,
	score_text: null,
	anim: null,
	ground: null,
	money: null,
	coins: null,
	speakers: null,
	desalojos: null,
	asaditos: null,
	cañas: null,

	player_speed: 4,
	asadito_audio: null,
  create: function(){

		//game.stage.backgroundColor = '#0072bc';
		game.add.sprite(-150,0,'background');

		this.player = game.add.sprite(100, 400, 'abuela','stand/0000.png');
		this.player.anchor.setTo(0.5, 0.5);
    this.player.animations.add('stand', Phaser.Animation.generateFrameNames('stand/', 1, 30, '.png', 4), 25, true, false);
    this.player.animations.play('stand');
		this.player.animations.add('walk', Phaser.Animation.generateFrameNames('walk/', 1, 30, '.png', 4), 40, true, false);

		this.items = game.add.group();
		this.items.enableBody = true;
		this.items.physicsBodyType = Phaser.Physics.ARCADE;

		this.money = game.add.group();
		this.money.enableBody = true;
		this.money.physicsBodyType = Phaser.Physics.ARCADE;

		this.coins = game.add.group();
		this.coins.enableBody = true;
		this.coins.physicsBodyType = Phaser.Physics.ARCADE;

		this.speakers = game.add.group();
		this.speakers.enableBody = true;
		this.speakers.physicsBodyType = Phaser.Physics.ARCADE;

		this.desalojos = game.add.group();
		this.desalojos.enableBody = true;
		this.desalojos.physicsBodyType = Phaser.Physics.ARCADE;

		this.asaditos = game.add.group();
		this.asaditos.enableBody = true;
		this.asaditos.physicsBodyType = Phaser.Physics.ARCADE;

		this.cañas = game.add.group();
		this.cañas.enableBody = true;
		this.cañas.physicsBodyType = Phaser.Physics.ARCADE;
		

		game.physics.enable([this.player, this.money, this.coins, 
			this.speakers, this.desalojos, this.asaditos, this.cañas], Phaser.Physics.ARCADE);

		this.player.body.collideWorldBounds = true;
		this.player.body.bounce.y = 0.3;

		this.collect_sound = game.add.audio('collect');
		this.asadito_audio = game.add.audio('asadito_audio');
		this.score_text = game.add.text(20,20, 'Score: 0');

		this.ground = game.add.sprite(0,595, 'ground');

		this.ground.enableBody = true;
		this.ground.physicsBodyType = Phaser.Physics.ARCADE;
		game.physics.enable(this.ground, Phaser.Physics.ARCADE);
		this.ground.body.collideWorldBounds = true;

		game.time.events.loop(1000, this._spawnObjects, this);

		console.log(Phaser.Timer.SECOND);
  },

  update: function(){
   
		game.physics.arcade.overlap(this.money, this.player, this._collectMoney, null, this);
		game.physics.arcade.overlap(this.coins, this.player, this._collectCoin, null, this);
		game.physics.arcade.overlap(this.speakers, this.player, this._collectSpeaker, null, this);
		game.physics.arcade.overlap(this.desalojos, this.player, this._collectDesalojo, null, this);
		game.physics.arcade.overlap(this.asaditos, this.player, this._collectAsadito, null, this);
		game.physics.arcade.overlap(this.cañas, this.player, this._collectCaña, null, this);

		game.physics.arcade.overlap(this.money, this.ground, this._hitGround, null, this);
		game.physics.arcade.overlap(this.coins, this.ground, this._hitGround, null, this);
		game.physics.arcade.overlap(this.speakers, this.ground, this._hitGround, null, this);
		game.physics.arcade.overlap(this.desalojos, this.ground, this._hitGround, null, this);
		game.physics.arcade.overlap(this.asaditos, this.ground, this._hitGround, null, this);
		game.physics.arcade.overlap(this.cañas, this.ground, this._hitGround, null, this);

		this.money.forEach(function(money){
			money.rotation += 0.05;
		});
		
		this.coins.forEach(function(coin){
			coin.rotation += 0.05;
		});
		
		this.speakers.forEach(function(speaker){
			speaker.rotation += 0.05;
		});
		
		this.desalojos.forEach(function(desalojo){
			desalojo.rotation += 0.05;
		});

		this.asaditos.forEach(function(asadito){
			asadito.rotation += 0.05;
		});

		this.cañas.forEach(function(caña){
			caña.rotation += 0.05;
		});

		this._playerControls(); //controles del player
 
	},
	
	_playerControls: function(){
		
		console.log(this.player_speed);

		if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){

				this.player.x -= this.player_speed;	
				this.player.animations.play('walk');
				this.player.scale.x = 1;

    } else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){

				this.player.x += this.player_speed;
				this.player.scale.x = -1;
				this.player.animations.play('walk');

    } else {

				this.player.animations.stop('walk');
				this.player.animations.play('stand');

		}

	},

	_hitGround: function(ground,item){ //toco el pizo
		item.kill();
	},

	_spawnObjects: function(){

		var random_number = game.rnd.integerInRange(1, 6);

		switch(random_number) {
    	case 1:

					var money = this.money.create(game.world.randomX, 10, 'money');
					money.body.collideWorldBounds=true;
					money.body.bounce.y = 0.3;
					money.anchor.setTo(0.5, 0.5);
					money.rotation += 0.02;
					game.physics.arcade.collide(money, this.player);

        	break;
    	case 2:
					
					var coin = this.coins.create(game.world.randomX, 10, 'coin');
					coin.body.collideWorldBounds=true;
					coin.body.bounce.y = 0.3;
					coin.anchor.setTo(0.5, 0.5);
					game.physics.arcade.collide(coin, this.player);

        	break;
			case 3:
	
					var speaker = this.speakers.create(game.world.randomX, 10, 'speaker');
					speaker.body.collideWorldBounds=true;
					speaker.body.bounce.y = 0.3;
					speaker.anchor.setTo(0.5, 0.5);
					game.physics.arcade.collide(speaker, this.player);

					break;
			case 4:
			
					var desalojo = this.desalojos.create(game.world.randomX, 10, 'desalojo');
					desalojo.body.collideWorldBounds=true;
					desalojo.body.bounce.y = 0.3;
					desalojo.anchor.setTo(0.5, 0.5);
					game.physics.arcade.collide(desalojo, this.player);

					break;
			case 5:

					var asadito = this.asaditos.create(game.world.randomX, 10, 'asadito');
					asadito.body.collideWorldBounds=true;
					asadito.body.bounce.y = 0.3;
					asadito.anchor.setTo(0.5, 0.5);
					game.physics.arcade.collide(asadito, this.player);

					break;
			case 6:

					var caña = this.cañas.create(game.world.randomX, 10, 'caña');
					caña.body.collideWorldBounds=true;
					caña.body.bounce.y = 0.3;
					caña.anchor.setTo(0.5, 0.5);
					game.physics.arcade.collide(caña, this.player);

					break;

		}


	},

	score: 0,
	_collectMoney: function(player, money){
		
		this.score += 10;
		this.score_text.setText('Score: ' + this.score);
		this.collect_sound.play();
		money.kill();

	},

	_collectCoin: function(player, coin){
		
		this.score += 5;
		this.score_text.setText('Score: ' + this.score);
		this.collect_sound.play();
		coin.kill();

	},

	_collectSpeaker: function(player, speaker){

		this.collect_sound.play();
		speaker.kill();

	},

	_collectDesalojo: function(player, desalojo){
		
		this.collect_sound.play();
		desalojo.kill();

	},

	_collectAsadito: function(player, asadito){

		this.asadito_audio.play();
		this.player_speed = 6;
		var me = this;
		setTimeout(function(){ 
			console.log('time out');
			me.player_speed = 4;
		}, 3000);
		asadito.kill();

	},

	_collectCaña: function(player, caña){

		this.collect_sound.play();
		//game.camera.flash(0xFFFF00, 500);
		game.camera.shake(0.02, 3500);
		caña.kill();

	}

}
