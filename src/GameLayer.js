var GameLayer = cc.LayerColor.extend({
    init: function() {
		cc.AudioEngine.getInstance().playMusic( 'Songs/Never.mp3');
        this._super( new cc.Color4B( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );
		this.bg = new InFrame();
		this.bg.initWithFile('images/Background.jpg');
		this.bg.setPosition( new cc.Point( 512, 384));
		this.addChild(this.bg);
		this.inframe = new InFrame();
		this.inframe.setPosition( new cc.Point( 512, 384 ) );
		this.addChild(this.inframe);
		this.scoreBg = new InFrame();
		this.scoreBg.initWithFile('images/ScoreBg.png');
		this.scoreBg.setPosition( new cc.Point( 925, 680));
		this.addChild(this.scoreBg);
		this.scoreLabel = cc.LabelTTF.create( 'Score: 0', 'Arial', 30 );
		this.scoreLabel.setPosition( new cc.Point( 925, 700 ) );
		this.addChild(this.scoreLabel);
		this.comboLabel = cc.LabelTTF.create( 'Combo: 0', 'Arial', 30 );
		this.comboLabel.setPosition( new cc.Point( 925, 650 ) );
		this.addChild(this.comboLabel);
		this.judge = [];
		this.judge.push(new Judgement(this));
		this.judge[0].setPosition( new cc.Point( 512, 740) );
		this.addChild(this.judge[0]);
		this.judge.push(new Judgement(this));
		this.judge[1].setPosition( new cc.Point( 860, 400) );
		this.addChild(this.judge[1]);
		this.judge.push(new Judgement(this));
		this.judge[2].setPosition( new cc.Point( 512, 30) );
		this.addChild(this.judge[2]);
		this.judge.push(new Judgement(this));
		this.judge[3].setPosition( new cc.Point( 170, 400) );
		this.addChild(this.judge[3]);
		this.noteSet = [];
		this.noteCount = 0;
		this.musicPlaying = true;
		this.keyHold = false;
		this.score = 0;
		this.combo = 0;
		this.timer = 0;
		this.limiter = 35;
		this.limiterCheck = 0;
		this.noteRoomCount = 0;
		this.noteDir = 1;
		this.noteBonus = false;
		this.perfectCount = 0;
		this.greatCount = 0;
		this.missCount = 0;
		this.maxComboCount = 0;
		this.waitTime = 30;
		this.doubleNote = 0;
		this.note = new Note(this, 1, this.judge[0], this.noteBonus);
		this.note.setPosition( new cc.Point( 512, 384 ) );
		this.noteSet.push(this.note);
		this.addChild(this.noteSet[this.noteCount]);
		this.noteSet[this.noteCount].scheduleUpdate();
		this.scheduleUpdate();
		this.setKeyboardEnabled( true );
        return true;
    },
	onKeyDown: function( e ) {
	if(this.keyHold == false)
	{
		if ( e == cc.KEY.up || e == cc.KEY.w) 
		{
			this.keyHold = true;
			this.noteSet[0].noteCheck(1);
		}
		else if(e == cc.KEY.right || e == cc.KEY.d)
		{
			this.keyHold = true;
			this.noteSet[0].noteCheck(2);
		}
		else if(e == cc.KEY.down || e == cc.KEY.s)
		{
			this.keyHold = true;
			this.noteSet[0].noteCheck(3);
		}
		else if(e == cc.KEY.left || e == cc.KEY.a)
		{
			this.keyHold = true;
			this.noteSet[0].noteCheck(4);
		}
	}	
	if(e == cc.KEY.p)
		{
			if(this.musicPlaying == true)
			{
				console.log('Fucking pause');
				cc.AudioEngine.getInstance().pauseMusic();
				this.musicPlaying = false;
			}
			else if(this.musicPlaying == false)
			{
				cc.AudioEngine.getInstance().resumeMusic();
				this.musicPlaying = true;
			}
		}
    },
	onKeyUp: function( e ) {
	this.keyHold = false;
    },
	update: function()
	{
		this.timer++;
		if(this.timer == this.limiter && this.noteRoomCount < 420)
		{
			for(var i = 0; i < 4; i++)
			{
				this.judge[i].initWithFile( 'images/EmptyJudge.png' );
			}
			this.noteDir = 1 + Math.round(Math.random()*3);
			if(this.noteRoomCount % 20 == 0)
			{
				this.noteBonus = true;
			}
			else
			{
				this.noteBonus = false;
			}
			//this.noteDir++;
			/*if(this.noteDir == 4)
			{
				this.noteDir = 0;
			}*/
			
			this.note = new Note(this, this.noteDir, this.judge[this.noteDir-1], this.noteBonus);
			this.note.setPosition( new cc.Point( 512, 384 ) );
			this.noteSet.push(this.note);
			this.addChild(this.noteSet[this.noteCount+1]);
			this.noteSet[this.noteCount+1].scheduleUpdate();
			this.scheduleUpdate();
			this.noteCount++;
			this.timer = 0;	
			this.noteRoomCount++;
		}
		if(this.noteRoomCount == 420)
		{
			if(this.timer == this.limiter && this.waitTime != 0)
			{
				this.waitTime--;
			}
			else
			{
				for(var i = 0; i < 4; i++)
				{
					this.judge[i].initWithFile( 'images/EmptyJudge.png' );
				}
				this.perfectLabel = cc.LabelTTF.create( 'Perfect: ' + this.perfectCount, 'Arial', 30 );
				this.perfectLabel.setPosition( new cc.Point( 515, 500 ) );
				this.addChild(this.perfectLabel);
				this.greatLabel = cc.LabelTTF.create( 'Great: ' + this.greatCount, 'Arial', 30 );
				this.greatLabel.setPosition( new cc.Point( 515, 450 ) );
				this.addChild(this.greatLabel);
				this.missLabel = cc.LabelTTF.create( 'Miss: ' + this.missCount, 'Arial', 30 );
				this.missLabel.setPosition( new cc.Point( 515, 400 ) );
				this.addChild(this.missLabel);
				this.maxComboLabel = cc.LabelTTF.create( 'Max Combo: ' + this.maxComboCount, 'Arial', 30 );
				this.maxComboLabel.setPosition( new cc.Point( 515, 350 ) );
				this.addChild(this.maxComboLabel);
			}
		}
	}
});

var StartMenu = cc.LayerColor.extend({
	init: function() {
		this._super( new cc.Color4B( 127, 127, 127, 255 ) );
		cc.AudioEngine.getInstance().playMusic( 'Songs/Last.mp3');
		this.setKeyboardEnabled( true );
	},
	onKeyDown: function( e ) {
		console.log('Game Start');
		var layer = new GameLayer();
        layer.init();
        this.addChild( layer );
	}
});

var StartScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new StartMenu();
        layer.init();
        this.addChild( layer );
    }
});

