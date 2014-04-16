var Note = cc.Sprite.extend({
    ctor: function(layer, dir, judge) {
        this._super();
        this.initWithFile( 'images/SingleNote.png' );
		this.gameLayer = layer;
		this.noteScore = 0;
		this.isHited = false;
		this.judgement = judge;
		if(dir == 1)
		{
			this.direction = Note.DIR.UP;
		}
		else if(dir == 2)
		{
			this.direction = Note.DIR.RIGHT;
		}
		else if(dir == 3)
		{
			this.direction = Note.DIR.DOWN;
		}
		else
		{
			this.direction = Note.DIR.LEFT;
		}
    },
	update: function( dt ) {
	var pos = this.getPosition();
	if(this.direction == Note.DIR.UP)
	{
		if ( pos.y < screenHeight-30) 
		{
			this.setPosition( new cc.Point( pos.x, pos.y + 4) );
		} 
		else 
		{
			this.removeNonActiveNote();
		}
	}
	else if(this.direction == Note.DIR.RIGHT)
	{
		if ( pos.x < screenWidth-170 )
		{
			this.setPosition( new cc.Point( pos.x + 4, pos.y) );
		} 
		else 
		{
			this.removeNonActiveNote();
		}
	}
	else if(this.direction == Note.DIR.DOWN)
	{
		if ( pos.y > 30) 
		{
			this.setPosition( new cc.Point( pos.x, pos.y - 4) );
		} 
		else 
		{
			this.removeNonActiveNote();
		}
	}
	else if(this.direction == Note.DIR.LEFT)
	{
		if ( pos.x > 170) 
		{
			this.setPosition( new cc.Point( pos.x - 4, pos.y) );
		} 
		else 
		{
			this.removeNonActiveNote();
		}
	}
},
	removeNonActiveNote: function() {
		var pos = this.getPosition();
		this.gameLayer.removeChild(this);
		this.gameLayer.combo = 0;
		this.gameLayer.comboLabel.setString('Combo: 0');
		this.gameLayer.noteCount--;
		this.judgement.initWithFile('images/MissJudge.png');
		this.gameLayer.noteSet.shift();
},
	noteCheck: function(button)
	{
		var pos = this.getPosition();
		if(button == 1 && pos.y < screenHeight-30 && pos.y > screenHeight -80 && this.isHited == false)
		{
			this.gameLayer.removeChild(this);
			this.gameLayer.score += this.judgement.scoring(pos.y - (screenHeight - 80));
			this.gameLayer.combo++;
			this.isHited = true;
			this.gameLayer.scoreLabel.setString('Score: '+this.gameLayer.score);
			this.gameLayer.comboLabel.setString('Combo: '+this.gameLayer.combo);
			this.gameLayer.noteCount--;
			this.gameLayer.noteSet.shift();
		}
		else if(button == 2 && pos.x < screenWidth - 170 && pos.x > screenWidth - 220 && this.isHited == false)
		{
			this.gameLayer.removeChild(this);
			this.gameLayer.score += this.judgement.scoring(pos.x - (screenWidth - 220));
			this.gameLayer.combo++;
			this.isHited = true;
			this.gameLayer.scoreLabel.setString('Score: '+this.gameLayer.score);
			this.gameLayer.comboLabel.setString('Combo: '+this.gameLayer.combo);
			this.gameLayer.noteCount--;
			this.gameLayer.noteSet.shift();
		}
		else if(button == 3 && pos.y > 30 && pos.y < 80 && this.isHited == false)
		{
			this.gameLayer.removeChild(this);
			this.gameLayer.score += this.judgement.scoring(pos.y - 30);
			this.gameLayer.combo++;
			this.isHited = true;
			this.gameLayer.scoreLabel.setString('Score: '+this.gameLayer.score);
			this.gameLayer.comboLabel.setString('Combo: '+this.gameLayer.combo);
			this.gameLayer.noteCount--;
			this.gameLayer.noteSet.shift();
		}
		else if(button == 4 && pos.x > 170 && pos.x < 220 && this.isHited == false)
		{
			this.gameLayer.removeChild(this);
			this.gameLayer.score += this.judgement.scoring(pos.x -170);
			this.gameLayer.combo++;
			this.isHited = true;
			this.gameLayer.scoreLabel.setString('Score: '+this.gameLayer.score);
			this.gameLayer.comboLabel.setString('Combo: '+this.gameLayer.combo);
			this.gameLayer.noteCount--;
			this.gameLayer.noteSet.shift();
		}
	},
	isInActiveArea: function()
	{
		
	}
	
});
Note.DIR = {
    UP: 1,
    RIGHT: 2,
	DOWN: 3,
	LEFT: 4
};

