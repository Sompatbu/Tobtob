var Note = cc.Sprite.extend({
    ctor: function(layer, dir, judge, bonus) {
        this._super();
		this.gameLayer = layer;
		this.dirSet(dir);
		this.judgement = judge;
		this.bonusNote = bonus;
		this.bonusNoteCheck();
		this.noteScore = 0;
		this.isHited = false;
    },
	bonusNoteCheck: function()
	{
		if(this.bonusNote == true)
		{
			this.initWithFile( 'images/BonusNote.png' );
		}
		else
		{
			this.initWithFile( 'images/SingleNote.png' );
		}
	},
	dirSet: function(dir)
	{
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
	this.noteMovement();
},
	noteMovement: function()
	{
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
		if ( pos.y > 40) 
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
		this.maxComboCheck();
		this.gameLayer.missCount++;
		this.gameLayer.combo = 0;
		this.gameLayer.comboLabel.setString('Combo: 0');
		this.gameLayer.noteCount--;
		this.judgement.initWithFile('images/MissJudge.png');
		this.gameLayer.noteSet.shift();
},
	maxComboCheck: function()
	{
		if(this.gameLayer.maxComboCount < this.gameLayer.combo)
		{
			this.gameLayer.maxComboCount = this.gameLayer.combo;
		}
	},
	noteCheck: function()
	{
		var pos = this.getPosition();
		if(this.isHited == false)
		{
			if(this.direction == Note.DIR.UP)
			{
				this.noteUpCheck(pos);
			}
			else if(this.direction == Note.DIR.RIGHT)
			{
				this.noteRightCheck(pos);
			}
			else if(this.direction == Note.DIR.DOWN)
			{
				this.noteDownCheck(pos);
			}
			else if(this.direction == Note.DIR.LEFT)
			{
				this.noteLeftCheck(pos);
			}
		}
	},
	noteUpCheck: function(pos)
	{
		if(pos.y < screenHeight-30 && pos.y > screenHeight -80)
		{
			this.gameLayer.score += this.judgement.scoring(pos.y - (screenHeight - 80), this.bonusNote);
			this.removeNote();
		}
	},
	noteRightCheck: function(pos)
	{
		if(pos.x < screenWidth - 170 && pos.x > screenWidth - 220)
		{
			this.gameLayer.score += this.judgement.scoring(pos.x - (screenWidth - 220), this.bonusNote);
			this.removeNote();
		}
	},
	noteDownCheck: function(pos)
	{
		if(pos.y > 40 && pos.y < 90)
		{
			this.gameLayer.score += this.judgement.scoring(pos.y - 40, this.bonusNote);
			this.removeNote();
		}
	},
	noteLeftCheck: function(pos)
	{
		if(pos.x > 170 && pos.x < 220)
		{
			this.gameLayer.score += this.judgement.scoring(pos.x -170, this.bonusNote);
			this.removeNote();
		}
	},
	removeNote: function()
	{
		this.gameLayer.removeChild(this);
		this.gameLayer.combo++;
		this.isHited = true;
		this.gameLayer.scoreLabel.setString('Score: '+this.gameLayer.score);
		this.gameLayer.comboLabel.setString('Combo: '+this.gameLayer.combo);
		this.gameLayer.noteCount--;
		this.gameLayer.noteSet.shift();
	},
});
Note.DIR = {
    UP: 1,
    RIGHT: 2,
	DOWN: 3,
	LEFT: 4
};

