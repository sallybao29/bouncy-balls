console.log("loaded");

var svgns = "http://www.w3.org/2000/svg";
var pic = document.getElementById("vimage");

var ball = document.getElementById("ball");
var start = document.getElementById("start");
var stop = document.getElementById("stop");

var width = 1000;
var height = 1000;

var balls = [];

var randomize = function(lower, upper){
		return Math.floor(Math.random() * (upper - lower) + lower);
};

var makeBall = function(){
		balls.push(new Ball());
};

var Ball = function(){
		this.shape = document.createElementNS(svgns, "circle");
		this.r = randomize(30, 50);
		this.x = randomize(this.r, width - this.r);
		this.y = randomize(this.r, height - this.r);
		this.xVel = randomize(1, 10); 
		this.yVel = randomize(1, 10);
		
		this.shape.setAttribute("cx", this.x);
		this.shape.setAttribute("cy", this.y);
		this.shape.setAttribute("r",  this.r);
		this.shape.setAttribute("fill", "red"); 
		pic.appendChild(this.shape);
    
		this.move = function(){
				if (this.x - this.r <= 1 || this.x + this.r >= width){
						this.xVel *= -1;
				}
				if (this.y - this.r <= 1 || this.y + this.r >= height){
						this.yVel *= -1;
				}
				this.x += this.xVel;
				this.y += this.yVel;
				
				this.shape.setAttribute("cx", this.x);
				this.shape.setAttribute("cy", this.y);
		}
		
		this.collidesWith = function(other){
				var dx, dy, d, m1, m2;
				
				dx = this.x - other.x;
				dy = this.y - other.y;
				d = Math.sqrt((dx*dx) + (dy*dy));
				
				if ( d <= (this.r + other.r)){
						m1 = this.r * 10;
						m2 = other.r * 10;
						
						/*momemtum
							this.xVel = Math.floor(((m1 - m2) * this.xVel) / (m1 + m2));
							this.yVel = Math.floor(((m1 - m2) * this.yVel) / (m1 + m2));

							other.xVel = Math.floor(((m2 - m1) * this.xVel) / (m1 + m2));
							other.yVel = Math.floor(((m2 - m1) * this.yVel) / (m1 + m2));
						*/						
	
						this.xVel *= -1;
						this.yVel *= -1;

						other.xVel *= -1;
						other.yVel *= -1;
				} 
		};
};


var requestId;
var animate = function(){
		var i, j;
		for(i = 0; i < balls.length; i++){
				for (j = 0; j < balls.length; j++){
						if (i != j)
								balls[i].collidesWith(balls[j]);
				}
				balls[i].move();
		}
		requestId = window.requestAnimationFrame(animate)
};

var stopAnimation = function(){
		window.cancelAnimationFrame(requestId);
};

ball.addEventListener("click", makeBall);
start.addEventListener("click", animate);
stop.addEventListener("click", stopAnimation);

