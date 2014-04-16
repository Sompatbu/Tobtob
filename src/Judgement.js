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
			this.initWithFile( 'images/GreatJudge.png' );
		}
		else
		{
			this.score = 100;
			this.initWithFile( 'images/PerfectJudge.png' );
		}
		return this.score;
	}
});

