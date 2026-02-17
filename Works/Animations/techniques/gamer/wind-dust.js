'use strict';
var canvas,ctx,width,height,
  collection = [],
  num_drops = 100, // number of drops
  gravity = 0, // gravity multiplier 
  windforce = 0.1, // yea i'd just leave this
  windmultiplier = 0.001, // this freaks out on large numbers
  maxspeed = 1, // this is so you never run too fast (it is a multiplier not raw)
  gutter = 0.003; // the percentage distance to travel off screen before wrapping
  canvas = cvs;
  ctx = canvas.getContext('2d');
  
var dustImg1 = new Image();
    dustImg1.src = 'img/dust1.png'; 
var dustImg2 = new Image();
    dustImg2.src = 'img/dust2.png';
var dustImg3 = new Image();
    dustImg3.src = 'img/dust3.png';
var dustImg4 = new Image();
    dustImg4.src = 'img/dust4.png';
var dustList = [dustImg1, dustImg2, dustImg3, dustImg4]; 

function Drop() {
  this.x;
  this.y;
  this.radius;
  this.distance;
  this.color;
  this.speed;
  this.vx;
  this.vy;
  this.dustImg = dustList[Math.floor(Math.random() * dustList.length)];
}
Drop.prototype = {
  constructor: Drop,
  
  random_x: function() {
    var n = width * (1 + gutter);
    return (1 - (1 + gutter)) + (Math.random() * n);
  },
  draw: function(ctx) {
    if (this.dustImg.complete) {
        ctx.drawImage(this.dustImg,this.x,this.y,16,16);
    } else {
      this.img.onload = function () {
          ctx.drawImage(this.dustImg,this.x,this.y,16,16);   
      };
    }
  }
};


function draw_frame() {
  ctx.clearRect(0, 0, width, height);
  collection.forEach(function (drop) {
    ctx.globalAlpha = (drop.distance + 1) / 30;
    drop.draw(ctx);
    ctx.globalAlpha = 1;
    drop.x += drop.vx;
    drop.y += drop.vy;
    
    var lx = drop.vx + windforce;
    lx < maxspeed && lx > 1 - maxspeed && (drop.vx = lx);
    if (drop.y > (drop.distance + 1) / 10 * height) {
      drop.y = Math.random() * -drop.radius * (num_drops / 100);
      drop.x = drop.random_x();
    }
    if (drop.x > width * (1 + gutter)) {
      drop.x = 1 - (width * gutter);
    }
    if (drop.x < 1 - (width * gutter)) {
      drop.x = width * (1 + gutter);
    }
  });
}

function animateDust() {
  draw_frame();
}

function windtimer() {
  windforce = Math.random() > 0.5 ? windmultiplier : windmultiplier;
  setTimeout(windtimer, Math.random() * (1000 * 10));
}

function init(cvs,w,h) {
  ctx = canvas.getContext('2d');
  width = canvas.width = w;
  height = canvas.height = h;
  wind_dust()
}

function wind_dust(){
  collection = [];
  while (num_drops--) {
    var drop = new Drop(); 
    // drop.color = Math.random() > 0.5 ? "#fcfbfc" : "#fcfbfc";
    drop.distance = Math.random() * 10 | 7;
    drop.speed = Math.random() * (drop.distance / 100) + gravity;
    drop.vx = 0;
    drop.vy = Math.random() * drop.speed + (drop.speed / 0.4);
    drop.radius =  Math.random() * 2;
    drop.x = drop.random_x();
    drop.y = Math.random() * height;
    collection.push(drop);
  }
  windtimer();
  gsap.ticker.add(animateDust);
}

function unloadCanvas(){
  gsap.ticker.remove(animateDust);
}