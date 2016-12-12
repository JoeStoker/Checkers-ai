var DOWNRIGHT = 1;
var DOWNLEFT = 2;
var UPLEFT = 3;
var UPRIGHT = 4;
var MUSTJUMP = false;
function canMoveUpLeft(board, oldPos, pieceType) {
	// if ((((oldPos%8)|0)+((oldPos/8)|0))%2 == 0) {
	// 	return false;
	// }
	if (pieceType == AI) {
		return false;
	}
	if (oldPos - 9 < 0) {
		return false;
	}
	if (board[oldPos - 9] == WHITE) {
		return true;
	}
	return false;
}

function canMoveUpRight(board, oldPos, pieceType) {
	// if ((((oldPos%8)|0)+((oldPos/8)|0))%2 == 0) {
	// 	return false;
	// }
	if (pieceType == AI) {
		return false;
	}
	if (oldPos - 7 < 0) {
		return false;
	}
	if (board[oldPos - 7] == WHITE) {
		return true;
	}
	return false;
}

function canMoveDownLeft(board, oldPos, pieceType) {
	// if ((((oldPos%8)|0)+((oldPos/8)|0))%2 == 0) {
	// 	return false;
	// }
	if (pieceType == HUMAN) {
		return false;
	}
	if (oldPos + 7 > 64) {
		return false;
	}
	if (board[oldPos + 7] == WHITE) {
		return true;
	}
	return false;
}

function canMoveDownRight(board, oldPos, pieceType) {
	// if ((((oldPos%8)|0)+((oldPos/8)|0))%2 == 0) {
	// 	return false;
	// }
	if (pieceType == HUMAN) {
		return false;
	}
	if (oldPos + 9 > 64) {
		return false;
	}
	if (board[oldPos + 9] == WHITE) {
		return true;
	}
	return false;
}

function getMoveType(oldPos, newPos) {
	if (newPos - oldPos == 7) { // downleft
		return DOWNLEFT;
	} else if (newPos - oldPos == 9) {
		return DOWNRIGHT;
	} else if (newPos - oldPos == -7) {
		return UPRIGHT;
	} else if (newPos - oldPos == -9) {
		return UPLEFT;
	} else {
		return -1;
	}
}

function canMove(board, oldPos, newPos) {
	// if ((((position%8)|0)+((position/8)|0))%2 == 0) {
	// 	return false;
	// }
	if (canMoveDownLeft(board, oldPos, newPos) || canMoveDownRight(board, oldPos, newPos) || canMoveUpLeft(board, oldPos, newPos) || canMoveUpRight(board, oldPos, newPos))	{
		return true;
	} else {
		return false;
	}
}

function getJump(position, board, myPiece, myKing, enemyPiece, enemyKing) {
	var myID = board[previousClick];
	if (position - previousClick == 14 && canJumpDownLeft(previousClick, board, myPiece, myKing, enemyPiece, enemyKing)) {
		return previousClick + 7;
	} else if (position - previousClick == -14 && canJumpUpRight(previousClick, board, myPiece, myKing, enemyPiece, enemyKing)) {
		return previousClick - 7;
	} else if (position - previousClick == 18 && canJumpDownRight(previousClick, board, myPiece, myKing, enemyPiece, enemyKing)) {
		return previousClick + 9;
	} else if (position - previousClick == -18 && canJumpUpLeft(previousClick, board, myPiece, myKing, enemyPiece, enemyKing)) {
		return previousClick - 9;
	} else {
		return -1;
	}	
}

function canJumpUpLeft(prevPos, board, myPiece, myKing, enemyPiece, enemyKing) {
	var upleft = prevPos-18;

	if (upleft < 0) {
		return false;
	}
	if (board[prevPos] == AI) {
		return false;
	}
	if ((board[prevPos-9] == enemyPiece || board[prevPos-9] == enemyKing) && board[prevPos-18] == WHITE) {
		console.log("can jump up left");
		return true;
	}
	return false;
}

function canJumpUpRight(prevPos, board, myPiece, myKing, enemyPiece, enemyKing) {
	var upright = prevPos-14;
	
	if (upright < 0) {
		return false;
	}
	if (board[prevPos] == AI) {
		return false;
	}
	if ((board[prevPos-7] == enemyPiece || board[prevPos-7] == enemyKing) && board[prevPos-14] == WHITE) {
		console.log("can jump up right");
		return true;
	}
	return false;
}

function canJumpDownLeft(prevPos, board, myPiece, myKing, enemyPiece, enemyKing) {
	var upleft = prevPos+14;
	
	if (upleft > 64) {
		return false;
	}
	if (board[prevPos] == HUMAN) {
		return false;
	}
	if ((board[prevPos+7] == enemyPiece || board[prevPos+7] == enemyKing) && board[prevPos+14] == WHITE) {
		console.log("can jump down left");
		return true;
	}
	return false;
}

function canJumpDownRight(prevPos, board, myPiece, myKing, enemyPiece, enemyKing) {
	var upleft = prevPos+18;

	
	if (upleft > 64) {
		return false;
	}
	if (board[prevPos] == HUMAN) {
		return false;
	}
	if ((board[prevPos+9] == enemyPiece || board[prevPos+9] == enemyKing) && board[prevPos+18] == WHITE) {
		console.log("can jump down right");
		return true;
	}
	return false;
}

function canJump(prevPos, board, myPiece, myKing, enemyPiece, enemyKing) {
	if (canJumpDownRight(prevPos, board, myPiece, myKing, enemyPiece, enemyKing)
		|| canJumpDownLeft(prevPos, board, myPiece, myKing, enemyPiece, enemyKing)
		|| canJumpUpRight(prevPos, board, myPiece, myKing, enemyPiece, enemyKing)
		|| canJumpUpLeft(prevPos, board, myPiece, myKing, enemyPiece, enemyKing)) {
		return true;
	} else {
		return false;
	}
}


function getScore(board, depth) {
	var score = 0;
	var winCheck = true;
	var loseCheck = true;
	var count1 = 0;
	var count2 = 0;
	for (var i = 1; i < board.length; i++) {
		if ((((i%8)|0)+((i/8)|0))%2 != 0) {
			if (board[i] == 1) {
				count1++;
				score += 1;
				loseCheck = false;
			} else if (board[i] == 2) {
				count2++;
				score -= 1;
				winCheck = false;
			}
			else if (board[i] == 12) {
				count2++;
				score -= 1.5;
				winCheck = false;
			}
			else if (board[i] == 11) {
				count2++;
				score += 1.5;
				loseCheck = false;
			}
		}
	}
		// console.log("Nmber of red = "+count1);
		// console.log("Number of black = "+count2);
	if (loseCheck) {
		score -= 1000+depth;
	} else if (winCheck) {
		score += 1000-depth;
	}
	return score;
}

function moveUpLeft(board, oldPos) {
	board[oldPos - 9] = board[oldPos];
	board[oldPos] = WHITE;
	//changeColor(oldPos,WHITE);
	//changeColor(oldPos - 9, board[oldPos - 9]);
}

function moveUpRight(board, oldPos) {
	board[oldPos - 7] = board[oldPos];
	board[oldPos] = WHITE;
	//changeColor(oldPos,WHITE);
	//changeColor(oldPos - 7, board[oldPos - 7]);
}

function moveDownLeft(board, oldPos) {
	board[oldPos + 7] = board[oldPos];
	board[oldPos] = WHITE;
	//changeColor(oldPos,WHITE);
	//changeColor(oldPos + 7, board[oldPos + 7]);
}

function moveDownRight(board, oldPos) {
	board[oldPos + 9] = board[oldPos];
	board[oldPos] = WHITE;
	//changeColor(oldPos,WHITE);
	//changeColor(oldPos + 9, board[oldPos + 9]);
}

function copyBoard(board) {
	var copy = new Array();
	for (var i = 0; i < board.length; i++) {
		copy[i] = board[i];
	}
	return copy;
}

function node(board, parent) {
	this.children = new Array();
    this.board = board;
    this.parent = parent;
    this.score = 0;
}

function move(id, board) {
	if (!playerTurn) {
		console.log("Not the players turn!");
		return;
	}
	if (board[id] == HUMAN || board[id] == HUMANKING) {
		previousClick = id;
		waiting = true;
		console.log("Ready to wait");
		return;
	}
	MUSTJUMP = false;
	for (var i = 0; i < board.length; i++) {
		
		if (board[i] == HUMAN || board[i] == HUMANKING) {
			
			if (canJump(i, board, HUMAN, HUMANKING, AI, AIKING)) {
				MUSTJUMP = true;
				console.log("Someone can jump!");
				break;
			}
		}
	}
	if (!MUSTJUMP) {
		console.log("No one can jump!");
	} else {
		console.log("Someone can jump!");
	}
	
	paintWholeBoard(); // Debuggin purposes
	if (waiting) {
		
		if (canJump(previousClick, board, HUMAN, HUMANKING, AI, AIKING)) {
			console.log("Can jump");
			var delPosition = getJump(id, board, HUMAN, HUMANKING, AI, AIKING);
			if (delPosition == -1) {
				return;
			}
			board[delPosition] = WHITE;
			changeColor(delPosition, WHITE);
			temp = board[previousClick];
			board[previousClick] = WHITE;
			changeColor(previousClick, WHITE);
			board[id] = temp;
			changeColor(id,temp);
			paintWholeBoard();
			if (canJump(id, board, HUMAN, HUMANKING, AI, AIKING)) { //TODO change this to anyone can jump?
				previousClick = id;
				MUSTJUMP = true;
				return;
			} else {
				MUSTJUMP = false;
				var delay=500; //1 second
				playerTurn = false;
				setTimeout(function() {
				  makeAiMove();
				  playerTurn = true;
				}, delay);
				return;
			}
		} else if (canMove(board, previousClick, id) && !MUSTJUMP) {
			console.log("can't jump")
			console.log(getMoveType(previousClick, id));
			if (getMoveType(previousClick, id) == -1) {
				return;
			} else if (getMoveType(previousClick, id) == UPLEFT && canMoveUpLeft(board, previousClick, board[previousClick])) {
				moveUpLeft(board, previousClick);
			} else if (getMoveType(previousClick, id) == UPRIGHT && canMoveUpRight(board, previousClick, board[previousClick])) {
				console.log("moving up right");
				moveUpRight(board, previousClick);

			} else if (getMoveType(previousClick, id) == DOWNLEFT && canMoveDownLeft(board, previousClick, board[previousClick])) {
				moveDownLeft(board, previousClick);
			} else if (getMoveType(previousClick, id) == DOWNRIGHT && canMoveDownRight(board, previousClick, board[previousClick])) {
				moveUpRight(board, previousClick);
			} else {
				return;
			}	
			// board[previousClick] = 0;					//TODO figure out why changeColour is needed?
			// changeColor(previousClick,board[previousClick]);
			// board[id] = temp;
			// changeColor(id,temp);
			waiting = false;
			paintWholeBoard();
			var delay=500; //1 second
			playerTurn = false;
			MUSTJUMP = false;
			
			setTimeout(function() {
			  makeAiMove();
			  playerTurn = true;
			}, delay);

			return;
		} else if (MUSTJUMP) {
			console.log("Must jump!");
			return;
		} else {
			console.log("Can't jump or move");
			return;
		}
	} else {
		console.log("Not waiting");
	}
	if (board[id] != HUMAN && board[id] != HUMANKING) {
		previousClick = id;
		waiting == false;
		return;
	}
}