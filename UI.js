var board;
var waiting;
var previousClick;
var queue;
var linkCount = -1;
var nodeCount = -1;
var playerTurn = true;
var node_str = '';
var link_str = '';

var WHITE = 0;
var AI = 1;
var HUMAN = 2;
var AIKING = 11;
var HUMANKING = 12;

window.onload = function() {
	board = new Array();
	createButtons();
  	waiting = false;
  	previousClick = -1;
};


function wintime1(board) {
	var count = 0;
	for (var i = 0; i < board.length; i++) {
		if (board[i] == 1 || board[i] == 11 || board[i] == 2 || board[i] == 12) {
			count++;
		}
	}
	return count < 5;
}

function wintime2(board) {
	var count = 0;
	for (var i = 0; i < board.length; i++) {
		if (board[i] == 1 || board[i] == 11 || board[i] == 2 || board[i] == 12) {
			count++;
		}
	}
	return count < 7;
}


function drawD3(str) {
	var width = 740,
    height = 680;

var color = d3.scale.category20();

var force = d3.layout.force()
    .charge(-120)
    .linkDistance(30)
    .size([width, height]);
    //
    //var svg = d3.select("body");
	document.querySelector( '#graph' ).innerHTML = '';


     var svg = d3.select("#graph").append("svg")
    .attr("width", width)
    .attr("height", height);
   
    //console.log(str);
    //d3.json("https://gist.githubusercontent.com/fredbenenson/4212290/raw/38c07e833ba7dd2f5cff1a2316c2559c01b774d4/miserables.json", function(error, graph) {
      graph = JSON.parse(str);
      function update ( graph) {

  force
      .nodes(graph.nodes)
      .links(graph.links)
      .start();

  var link = svg.selectAll(".link")
      .data(graph.links)
    .enter().append("line")
      .attr("class", "link")
      .style("stroke-width", function(d) { return Math.sqrt(d.value); });

  var node = svg.selectAll(".node")
      .data(graph.nodes)
    .enter().append("circle")
      .attr("class", "node")
      .attr("r", 5)
      .style("fill", function(d) { return color(d.group); })
      .call(force.drag);

  node.append("title")
      .text(function(d) { return d.name; });

  force.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
  });
};
update(graph);

}

function printBoard(board) {
	var str = "";
	index = 0;
	for (var i = 0; i < 8; i++) {
		for (var j = 0; j < 8; j++) {
			str = str + board[index].toString() + " ";
			index++;
		}
		str = str + "\n";
	}
	console.log(str);
}



function paintWholeBoard() {
	for (var i = 0; i < 64; i++) {
  		changeColor(i,board[i]);
  	} 
}



function changeColor(position, color) {
	if (color == AI) {
		document.getElementById(position).style.backgroundColor = "red"; // backcolor
		document.getElementById(position).style.color = "red";
	} else if (color == HUMAN) {
		document.getElementById(position).style.backgroundColor = "black"; // backcolor
		document.getElementById(position).style.color = "black";
	}else if (color == AIKING) {
		document.getElementById(position).style.backgroundColor = "red"; // backcolor
		document.getElementById(position).style.color = "white";
	} else if (color == HUMANKING) {
		document.getElementById(position).style.backgroundColor = "black"; // backcolor
		document.getElementById(position).style.color = "white";
	} else if (color == WHITE) {
		document.getElementById(position).style.backgroundColor = "#00e673"; // backcolor
		document.getElementById(position).style.color = "#00e673";
	} else {
		document.getElementById(position).style.backgroundColor = "#00ffff"; // backcolor
		document.getElementById(position).style.color = "#00ffff";
	}

}

function createButtons() {
    var myTable= "";
  	for (var i=0; i<64; i++) {
  		if (i%8==0 && i != 0) {
  			myTable += "</br>"
  		}
	    myTable+="<button id = '"+i+"' class = 'grid_button' type='button' onclick='move("+i+", board);'>K</button>";
  	}  
  	for (var i = 0; i < 64; i++) {
  		if ((((i%8)|0)+((i/8)|0))%2 != 0) {
	  		if (i < 24) {
	  			board[i] = 1;
	  		} else if (i > 39) {
	  			board[i] = 2;
	  		} else {
	  			board[i] = 0;
	  		}
  		} else {
  			board[i] = -5;
  		}
  	}

 	document.getElementById('tablePrint').innerHTML = myTable;
 	paintWholeBoard();
}

