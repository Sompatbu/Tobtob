var GameLayer = cc.LayerColor.extend({
    init: function() {
		cc.AudioEngine.getInstance().playMusic( 'Songs/Before.mp3');
        this._super( new cc.Color4B( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );
		this.inframe = new InFrame();
		this.inframe.setPosition( new cc.Point( 400, 300 ) );
		this.addChild(this.inframe);
		this.scoreLabel = cc.LabelTTF.create( 'Score: 0', 'Arial', 30 );
		this.scoreLabel.setPosition( new cc.Point( 700, 550 ) );
		this.addChild(this.scoreLabel);
		this.comboLabel = cc.LabelTTF.create( 'Combo: 0', 'Arial', 30 );
		this.comboLabel.setPosition( new cc.Point( 700, 500 ) );
		this.addChild(this.comboLabel);
		this.noteSet = [];
		this.noteCount = 0;
		this.notePop = 0;
		this.score = 0;
		this.combo = 0;
		
		this.timer = 0;
		this.noteDir = 1;
		/*for(var i = 0; i<4; i++)
		{
			this.note = new Note(this, (i%4)+1);
			this.note.setPosition( new cc.Point( 400, 300 ) );
			this.addChild(this.note);
			this.note.scheduleUpdate();
			this.scheduleUpdate();
			for(var timer = 0; timer < 10000; timer++)
			{
			}
		}*/
		
		
		
		this.note = new Note(this, 1);
		this.note.setPosition( new cc.Point( 400, 300 ) );
		this.noteSet.push(this.note);
		this.addChild(this.noteSet[this.noteCount]);
		this.noteSet[this.noteCount].scheduleUpdate();
		/*this.addChild(this.note);
		this.note.scheduleUpdate();*/
		this.scheduleUpdate();
		this.setKeyboardEnabled( true );
		
		
        return true;
    },
	onKeyDown: function( e ) {
	if ( e == cc.KEY.up) {
		
		//this.removeChild(this.note);
		this.noteSet[this.notePop].noteCheck(1);
	}
	else if(e == cc.KEY.right)
	{
		
		//this.removeChild(this.note);
		this.noteSet[this.notePop].noteCheck(2);
	}
	else if(e == cc.KEY.down)
	{
		
	    //this.removeChild(this.note);
		this.noteSet[this.notePop].noteCheck(3);
	}
	else if(e == cc.KEY.left)
	{
		
		//this.removeChild(this.note);
		this.noteSet[this.notePop].noteCheck(4);
	}
    },
	update: function()
	{
		this.timer++;
		
		/*if(this.notePop >= 6)
		{
			this.notePop = 0;
		}*/
		if(this.notePop >= 1)
			{
				
				this.notePop = 0;
				this.noteCount = 0;
				/*this.noteSet.shift();
				this.noteSet.shift();
				this.noteSet.shift();
				this.noteSet.shift();
				this.noteSet.shift();*/
				
				
				
			}
		if(this.timer == 25)
		{
			
			this.noteDir = Math.round(Math.random()*4+1);
			this.note = new Note(this, this.noteDir);
			this.note.setPosition( new cc.Point( 400, 300 ) );
			this.noteSet.push(this.note);
			this.addChild(this.noteSet[this.noteCount+1]);
			this.noteSet[this.noteCount+1].scheduleUpdate();
			//this.scheduleUpdate();
			this.noteCount++;
			this.timer = 0;
			
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

