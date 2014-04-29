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
		this.judge.push(new Judgement());
		this.judge[0].setPosition( new cc.Point( 512, 740) );
		this.addChild(this.judge[0]);
		this.judge.push(new Judgement());
		this.judge[1].setPosition( new cc.Point( 860, 400) );
		this.addChild(this.judge[1]);
		this.judge.push(new Judgement());
		this.judge[2].setPosition( new cc.Point( 512, 30) );
		this.addChild(this.judge[2]);
		this.judge.push(new Judgement());
		this.judge[3].setPosition( new cc.Point( 170, 400) );
		this.addChild(this.judge[3]);
		this.noteSet = [];
		this.noteCount = 0;
		this.notePop = 0;
		this.score = 0;
		this.combo = 0;
		this.timer = 0;
		this.limiter = 35;
		this.limiterCheck = 0;
		this.noteRoomCount = 0;
		this.noteDir = 1;
		this.note = new Note(this, 1, this.judge[0]);
		this.note.setPosition( new cc.Point( 512, 384 ) );
		this.noteSet.push(this.note);
		this.addChild(this.noteSet[this.noteCount]);
		this.noteSet[this.noteCount].scheduleUpdate();
		this.scheduleUpdate();
		this.setKeyboardEnabled( true );
        return true;
    },
	onKeyDown: function( e ) {
	if ( e == cc.KEY.up || e == cc.KEY.w) {
		this.noteSet[0].noteCheck(1);
		console.log('time: '+this.timer);
	}
	else if(e == cc.KEY.right || e == cc.KEY.d)
	{
		this.noteSet[0].noteCheck(2);
	}
	else if(e == cc.KEY.down || e == cc.KEY.s)
	{
		this.noteSet[0].noteCheck(3);
	}
	else if(e == cc.KEY.left || e == cc.KEY.a)
	{
		this.noteSet[0].noteCheck(4);
	}
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
			this.note = new Note(this, this.noteDir, this.judge[this.noteDir-1]);
			this.note.setPosition( new cc.Point( 512, 384 ) );
			this.noteSet.push(this.note);
			this.addChild(this.noteSet[this.noteCount+1]);
			this.noteSet[this.noteCount+1].scheduleUpdate();
			this.scheduleUpdate();
			this.noteCount++;
			this.timer = 0;
			this.noteRoomCount++;
		}
	}
});

var StartScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new GameLayer();
        layer.init();
        this.addChild( layer );
    }
});

