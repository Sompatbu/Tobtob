var Judgement = cc.Sprite.extend({
    ctor: function() {
        this._super();
		this.score = 0;
    },
	update: function() {
},
	scoring: function(range)
	{
		if(range < 15 || range > 35)
		{
			this.score = 50;
		}
		else
		{
			this.score = 100;
		}
		return this.score;
	}
});

