console.log("loaded");

var svgns = "http://www.w3.org/2000/svg";
var pic = document.getElementById("vimage");

var balls = [];

var makeBall = function(){
    var shape = document.createElementNS(svgns, "circle");
    var x = y = 25;
    var xVel = yVel = 3;
    shape.setAttribute("cx", x);
    shape.setAttribute("cy", y);
    shape.setAttribute("r",  20);
    shape.setAttribute("fill", "green"); 
    pic.appendChild(shape);
    
    var mov = function(){
	x = x + xVel;
	y = y + yVel;
	shape.setAttribute("cx", x);
	shape.setAttribute("cy", y);
    }
    var setX = function(X){ x = X; shape.setAttribute("cx", x);};
    var setY = function(Y){ y = Y; shape.setAttribute("cy", y);};
    var setXVel = function(X){ xVel = X;};
    var setYVel = function(Y){ yVel = Y;};
    balls.push(shape);
    return {
	move : move,
	setX : setX,
	setY : setY,
	setXVel : setXVel,
	setYVel : setYVel
    }
};

