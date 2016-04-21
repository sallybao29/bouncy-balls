console.log("loaded");

var svgns = "http://www.w3.org/2000/svg";
var pic = document.getElementById("vimage");

var balls = [];

var makeBall = function(){
    var shape = document.createElementNS(svgns, "circle");
    var x = 25;
    var y = 25;
    var xVel = 3; 
    var yVel = 3;
    shape.setAttribute("cx", x);
    shape.setAttribute("cy", y);
    shape.setAttribute("r",  20);
    shape.setAttribute("fill", "red"); 
    pic.appendChild(shape);
    
    var movef = function(){
	x = x + xVel;
	y = y + yVel;
	shape.setAttribute("cx", x);
	shape.setAttribute("cy", y);
    }
    var setXf = function(X){ x = X; shape.setAttribute("cx", x);};
    var setYf = function(Y){ y = Y; shape.setAttribute("cy", y);};
    var setXVelf = function(X){ xVel = X;};
    var setYVelf = function(Y){ yVel = Y;};

    var obj =  {
	move : movef,
	setX : setXf,
	setY : setYf,
	setXVel : setXVelf,
	setYVel : setYVelf
    }
    balls.push(obj);    
};


var requestId;
var animate = function(){
    for( ball in balls){
	ball.move();
    }
    
    requestId = window.requestAnimationFrame(animate);
};
animate();
