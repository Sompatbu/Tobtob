var Judgement = cc.Sprite.extend({
    ctor: function(layer) {
        this._super();
		this.gameLayer = layer;
		this.score = 0;
    },
	update: function() {
},
	scoring: function(range, bonus)
	{
		if(range < 15 || range > 35)
		{
			this.score = 50;
			this.gameLayer.greatCount++;
			this.initWithFile( 'images/GreatJudge.png' );
		}
		else
		{
			this.score = 100;
			this.gameLayer.perfectCount++;
			this.initWithFile( 'images/PerfectJudge.png' );
		}
		if(bonus == true)
		{
			this.score *= 2;
		}
		return this.score;
	}
});

