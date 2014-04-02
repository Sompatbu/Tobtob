var Note = cc.Sprite.extend({
    ctor: function(layer, dir) {
        this._super();
        this.initWithFile( 'images/SingleNote.png' );
		this.gameLayer = layer;
		this.mark = 0;
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
		if ( pos.y < screenHeight-20) {
	    this.setPosition( new cc.Point( pos.x, pos.y + 3) );
		} else {
	    this.gameLayer.removeChild(this);
		this.gameLayer.combo = 0;
		this.gameLayer.comboLabel.setString('Combo: 0');
		this.gameLayer.notePop++;
		this.gameLayer.noteSet.shift();
	}
	}
	else if(this.direction == Note.DIR.RIGHT)
	{
		if ( pos.x < screenWidth-120 ){
	    this.setPosition( new cc.Point( pos.x + 3, pos.y) );
		} else {
	    this.gameLayer.removeChild(this);
		this.gameLayer.combo = 0;
		this.gameLayer.comboLabel.setString('Combo: 0');
		this.gameLayer.notePop++;
		this.gameLayer.noteSet.shift();
	}
	}
	else if(this.direction == Note.DIR.DOWN)
	{
		if ( pos.y > 20) {
	    this.setPosition( new cc.Point( pos.x, pos.y - 3) );
		} else {
	    this.gameLayer.removeChild(this);
		this.gameLayer.combo = 0;
		this.gameLayer.comboLabel.setString('Combo: 0');
		this.gameLayer.notePop++;
		this.gameLayer.noteSet.shift();
	}
	}
	else if(this.direction == Note.DIR.LEFT)
	{
		if ( pos.x > 120) {
	    this.setPosition( new cc.Point( pos.x - 3, pos.y) );
		} else {
	    this.gameLayer.removeChild(this);
		this.gameLayer.combo = 0;
		this.gameLayer.comboLabel.setString('Combo: 0');
		this.gameLayer.notePop++;
		this.gameLayer.noteSet.shift();
	}
	}
	
	
},
	noteCheck: function(button)
	{
		var pos = this.getPosition();
		if(button == 1 & pos.y < screenHeight-20 && pos.y > screenHeight -70 && this.mark == 0)
		{
			this.gameLayer.removeChild(this);
			this.gameLayer.score += 100;
			this.gameLayer.combo++;
			this.mark = 1;
			this.gameLayer.scoreLabel.setString('Score: '+this.gameLayer.score);
			this.gameLayer.comboLabel.setString('Combo: '+this.gameLayer.combo);
			this.gameLayer.notePop++;
			this.gameLayer.noteSet.shift();
		}
		else if(button == 2 & pos.x < screenWidth - 120 && pos.x > screenWidth - 170 && this.mark == 0)
		{
			this.gameLayer.removeChild(this);
			this.gameLayer.score += 100;
			this.gameLayer.combo++;
			this.mark = 1;
			this.gameLayer.scoreLabel.setString('Score: '+this.gameLayer.score);
			this.gameLayer.comboLabel.setString('Combo: '+this.gameLayer.combo);
			this.gameLayer.notePop++;
			this.gameLayer.noteSet.shift();
		}
		else if(button == 3 & pos.y > 20 && pos.y < 70 && this.mark == 0)
		{
			this.gameLayer.removeChild(this);
			this.gameLayer.score += 100;
			this.gameLayer.combo++;
			this.mark = 1;
			this.gameLayer.scoreLabel.setString('Score: '+this.gameLayer.score);
			this.gameLayer.comboLabel.setString('Combo: '+this.gameLayer.combo);
			this.gameLayer.notePop++;
			this.gameLayer.noteSet.shift();
		}
		else if(button == 4 & pos.x > 120 && pos.x < 170 && this.mark == 0)
		{
			this.gameLayer.removeChild(this);
			this.gameLayer.score += 100;
			this.gameLayer.combo++;
			this.mark = 1;
			this.gameLayer.scoreLabel.setString('Score: '+this.gameLayer.score);
			this.gameLayer.comboLabel.setString('Combo: '+this.gameLayer.combo);
			this.gameLayer.notePop++;
			this.gameLayer.noteSet.shift();
		}
		
	}
});
Note.DIR = {
    UP: 1,
    RIGHT: 2,
	DOWN: 3,
	LEFT: 4
};

