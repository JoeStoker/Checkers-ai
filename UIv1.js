window.onload = function() {
	board = new Array();
	createButtons();
	queue = new maxPriority(new node(board,null));
	queue.printQueue();
  	
};
var board;
var waiting = false;
var previousClick = -1;
var queue;

function move(id) {
	paintWholeBoard(); // Debuggin purposes
	if (waiting) {
		if (board[id] != 0) {
			previousClick = id;
			return;
		}
		var delPosition = canJump(id);
		if (delPosition != -1) {
			board[delPosition] = 0;
			changeColor(delPosition,0);
			temp = board[previousClick];
			board[previousClick] = 0;
			changeColor(previousClick,0);
			board[id] = temp;
			changeColor(id,temp);
		}
		else if (canMove(id)) {
			temp = board[previousClick];
			board[previousClick] = 0;
			changeColor(previousClick,board[previousClick]);
			board[id] = temp;
			changeColor(id,temp);
			waiting = false;
		} else {
			return;
		}
		makeAiMove();
	} else {

		if (board[id] == 0) {
			return;
		}

		previousClick = id;
		waiting = true;
		return;
	}	
	
}

function node(board, previous) {
    this.board = board;
    this.previous = previous;
    this.next = null;
    this.score = getScore(board);
}

function makeAiMove() {
	var depth = 3;
	queue = new maxPriority(new node(board, null));
	var parent;
	for (var i = 0; i < depth; i++) {
		parent = queue.dequeue();
		generateChildren(parent, queue);
		if (queue.getMaxScore() > 950) {
			break;
		}
	}
	//queue.printQueue();
	board = getAiBoard(queue);
	paintWholeBoard();
}

function copyBoard(board) {
	var copy = new Array();
	for (var i = 0; i < board.length; i++) {
		copy[i] = board[i];
	}
	return copy;
}

function generateChildren(parent, queue) {
	var ai = 1;
	var hooman = 2;
	var childBoard;
	for (var i = 0; i < parent.board.length; i++) {
		if ((((i%8)|0)+((i/8)|0))%2 != 0) {
			if (board[i] == ai) {
				if (i+14 < 64) {
					if (board[i+14] == 0) {
						if (board[i+7] == hooman) {
							childBoard = copyBoard(parent.board);
							childBoard[i+14] = ai;
							childBoard[i] = 0;
							childBoard[i+7] = 0;
							queue.enqueue(new node(childBoard,parent));
						}
					}
				}
				if (i+18 < 64) {
					if (board[i+18] == 0) {
						if (board[i+9] == hooman) {
							childBoard = copyBoard(parent.board);
							childBoard[i+18] = ai;
							childBoard[i] = 0;
							childBoard[i+9] = 0;
							queue.enqueue(new node(childBoard,parent));
						}
					}
				}
				if (i-14 > 0) {
					if (board[i-14] == 0) {
						if (board[i-7] == hooman) {
							childBoard = copyBoard(parent.board);
							childBoard[i-14] = ai;
							childBoard[i] = 0;
							childBoard[i-7] = 0;
							queue.enqueue(new node(childBoard,parent));
						}
					}
				}
				if (i-18 > 0) {
					if (board[i-18] == 0) {
						if (board[i-9] == hooman) {
							childBoard = copyBoard(parent.board);
							childBoard[i-18] = ai;
							childBoard[i] = 0;
							childBoard[i-9] = 0;
							queue.enqueue(new node(childBoard,parent));
						}
					}
				}

				if (i+7 < 64) {
					if (board[i+7] == 0) {
						childBoard = copyBoard(parent.board);
						childBoard[i+7] = childBoard[i];
						childBoard[i] = 0;
						queue.enqueue(new node(childBoard,parent));
					}
				}
				if (i+9 < 64) {
					if (board[i+9] == 0) {
						childBoard = copyBoard(parent.board);
						childBoard[i+9] = childBoard[i];
						childBoard[i] = 0;
						queue.enqueue(new node(childBoard,parent));
					}
				}
				if (i-7 > 0) {
					if (board[i-7] == 0) {
						childBoard = copyBoard(parent.board);
						childBoard[i-7] = childBoard[i];
						childBoard[i] = 0;
						queue.enqueue(new node(childBoard,parent));
					}
				}
				if (i-9 > 0) {
					if (board[i-9] == 0) {
						childBoard = copyBoard(parent.board);
						childBoard[i-9] = childBoard[i];
						childBoard[i] = 0;
						queue.enqueue(new node(childBoard,parent));
					}
				}	


				childBoard = copyBoard(parent.board);

			}



		}
	}
}

function getAiBoard(queue) {
	for (var temp = queue.getMax(); temp.previous.previous != null; temp = temp.previous);
	return temp.board;
}

function getScore(board) {
	var score = 0;
	var winCheck = true;
	var loseCheck = true;
	for (var i = 1; i < board.length; i++) {
		if ((((i%8)|0)+((i/8)|0))%2 != 0) {
			if (board[i] == 1) {
				score += 1;
				loseCheck = false;
			} else if (board[i] == 2) {
				score -= 1;
				winCheck = false;
			}
		}
	}
	if (loseCheck) {
		score -= 1000;
	} else if (winCheck) {
		score += 1000;
	}
	return score;
}
// var myFather = new person("John", "Doe", 50, "blue");

function maxPriority(root) {
	this.max = root;
	this.begin = root;
	this.end = root;
	this.size = 1;

	this.enqueue = function (child) {
        if (this.size == 0) {
        	this.max = child;
			this.begin = child;
			this.end = child;
			this.size = 1;
        	return;
        }
        this.size ++;
        
        this.end.next = child;
        this.end = child;
        if (child.score > this.max.score) {
        	this.max = child;
        }
    }

    this.getMaxScore = function() {
    	return this.max.score;
    }

    this.printQueue = function () {
    	console.log("The size of the queue is : " + this.size);
    	var temp = this.max;
    	for (temp = this.max; temp; temp = temp.next) {
    		console.log("Score is " + temp.score);
    	}
    }

    this.getMax = function () {
    	return this.max;
    }

    function reCalculateMax() {
    	this.max = this.begin;
    	for (var temp = this.begin; temp; temp = temp.next) {
    		if (temp.score > this.max.score) {
    			this.max = temp;
    		}
    	}
    }

    this.dequeue = function () {
    	this.size --;
    	var temp = this.begin;
    	this.begin = this.begin.next;
    	temp.next = null;
    	if (temp.score == this.max.score) {
    		reCalculateMax();
    	}
    	return temp;
    }
}

function canJump(position) {
	var myID = board[previousClick];
	if (position - previousClick == 14) {
		if (myID+board[previousClick + 7] == 3) {
			return previousClick + 7;
		} else {
			return -1;
		}
	} else if (position - previousClick == -14) {
		if (myID+board[previousClick - 7] == 3) {
			return previousClick - 7;
		} else {
			return -1;
		}
	}
	else if (position - previousClick == 18) {
		if (myID+board[previousClick + 9] == 3) {
			return previousClick + 9;
		} else {
			return -1;
		}
	}
	else if (position - previousClick == -18) {
		if (myID+board[previousClick - 9] == 3) {
			return previousClick - 9;
		} else {
			return -1;
		}
	}
	return -1;
}

function paintWholeBoard() {
	for (var i = 0; i < 64; i++) {
  		changeColor(i,board[i]);
  	} 
}

function canMove(position) {
	if ((((position%8)|0)+((position/8)|0))%2 == 0) {
		return false;
	}
	if (!(position == previousClick + 7 || position == previousClick + 9 || position == previousClick - 7 || position == previousClick - 9)) {
		return false;
	} else {

	}
	return true;
}

function changeColor(position, color) {
	if ((((position%8)|0)+((position/8)|0))%2 == 0) {	
		document.getElementById(position).style.backgroundColor = "#00ffff"; // backcolor
	} else {
		if (color == 1) {
			document.getElementById(position).style.backgroundColor = "red"; // backcolor
		} else if (color == 2) {
			document.getElementById(position).style.backgroundColor = "black"; // backcolor
		} else {
			document.getElementById(position).style.backgroundColor = "#00e673"; // backcolor
		}
	}

}

function createButtons() {
    var myTable= "";
  	for (var i=0; i<64; i++) {
  		if (i%8==0 && i != 0) {
  			myTable += "</br>"
  		}
	    myTable+="<button id = '"+i+"' class = 'grid_button' type='button' onclick='move("+i+");'></button>";
  	}  
  	for (var i = 0; i < 64; i++) {

  		// Simple jump
  		// if (i < 16) {
  		// 	board[i] = 1;
  		// } else if (i > 47) {
  		// 	board[i] = 2;
  		// } else {
  		// 	board[i] = 0;
  		// }

  		// Double jump
  		if (i < 16) {
  			board[i] = 1;
  		} else if (i > 47) {
  			board[i] = 2;
  		} else {
  			board[i] = 0;
  		}
  	}

 	document.getElementById('tablePrint').innerHTML = myTable;
 	paintWholeBoard();
}

