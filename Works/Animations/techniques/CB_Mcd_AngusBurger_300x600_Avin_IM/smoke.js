
function rr(min, max,round)
{
	var r = (Math.random() * (max - min)) + min;
    if(!round) return r;
    else return Math.floor(r); 
}

var Smoke = function(holder,canvasId,imgName,width,height,position,amount)
{
	this.canvas = document.createElement('canvas');

	this.w = this.canvas.width = width,
	this.h = this.canvas.height = height;

	this.c = this.canvas.getContext('2d');
	this.count = 0;
	this.countDelay = 10;
	this.wind = 0;
	this.windObj = {};
	this.windObj.wind = 0;
	this.windFac = 1;
	this.windMax = 5;

	this.img = new Image();
	//this.img.crossOrigin=""
	this.img.src = imgName;
	this.position = position;
	this.holder = holder;
	this.holder.appendChild(this.canvas);
	this.updateCounter=0;
	this.updateMax = 1;
	this.updateMaxFac = this.updateMax;
	this.amount = amount;

	this.particles = [];

    var elem = document.createElement('canvas');
    return !!(elem.getContext && elem.getContext('2d'));
}

Smoke.prototype.setWind = function(wind)
{
		TweenLite.to(this.windObj,.2,{wind:wind})
}

Smoke.prototype.Particle = function(x, y,scope)
{
  this.startX =  this.x = x;
  this.startY =  this.y = y;
  this.velY = rr(0.3,0.6)*scope.updateMaxFac;
  this.velX = rr(0.1,0.2)*scope.updateMaxFac;
  this.velR = (rr(0,1)/100)*scope.updateMaxFac
  if(Math.random()>.5) this.velX = -this.velX;
  if(Math.random()>.5) this.velY = -this.velY;
  if(Math.random()>.5) this.velR = -this.velR;
  this.size = rr(2,4)*2;
  this.alpha = 0;
  this.maxAlpha = rr(.1,.1);
  this.rotation = rr(0,0);
  this.maxSize = rr(8,8)*2;
  this.alphaIncr = .005*scope.updateMaxFac;
  this.sizeIncr = .01*scope.updateMaxFac;

   this.update = function(scope)
   {
	    this.y += this.velY+(scope.windObj.wind);
	    scope.windObj.wind*=scope.windFac;
	    this.x += this.velX;
	    this.rotation +=this.velR;
	    if(this.alpha <  this.maxAlpha)
	    {
	    	 this.alpha +=this.alphaIncr;
	    }
	    var c = scope.c;
	    c.globalAlpha = this.alpha;
	    c.save();
	    c.translate(this.x, this.y);
	    c.scale(this.size, this.size);
	    c.rotate(this.rotation)
	    c.drawImage(scope.img, 0, 0,scope.img.width,scope.img.height,-scope.img.width/2, -scope.img.height/2,scope.img.width,scope.img.height);
	    c.restore();	    
	    if(this.size<this.maxSize) this.size +=this.sizeIncr;


		if(this.x-(this.size*18)>scope.w)
		{
			this.reset = true;
		}
		else if( this.x+(this.size*18)<0) 
		{
			this.reset = true;
		}

		if(this.y-(this.size*18)>scope.h)
		{
			this.reset = true;
		}
		else if( this.y+(this.size*18)<0) 
		{
			this.reset = true;
		}

		if(this.reset) 
		{
			this.x = this.startX;
			this.y = this.startY;
			this.reset=false;
			this.size = rr(2,4)
			this.alpha=0;
		}
 	 }; 
}

Smoke.prototype.draw = function()
{
	  if(!this.amount) this.amount = 10;

	  if(this.particles.length<this.amount && this.count>this.countDelay)
	  {
		  	var randomY = rr(0,0)+this.position.y;
		  	var randomX = rr(0,0)+this.position.x;
		  	var p = new this.Particle(randomX, randomY,this);
		  	this.particles.push(p);
		  	this.count = -1;
	  } 
	  this.count++;

	  if(this.updateCounter==this.updateMax)
	  {
		  this.c.clearRect(0, 0, this.canvas.width, this.canvas.height)
		  var l = this.particles.length;
		  for(var i = 0; i < l; i++)
		  {
		    this.particles[i].update(this);
		  }
		   this.updateCounter = -1;
	  }
	  this.updateCounter++
     
};

Smoke.prototype.start = function(fastforward)
{	
		TweenLite.ticker.fps(60)
		TweenLite.ticker.addEventListener("tick", this.draw,this)

		if(fastforward)
		{
			for(var j=0;j<100;j++)
			  {
			  		this.draw()
			  }
		}
}


Smoke.prototype.stop = function(){
    TweenLite.ticker.removeEventListener("tick", this.draw,this)
}