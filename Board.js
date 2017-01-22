var DOWNRIGHT = 1;
var DOWNLEFT = 2;
var UPLEFT = 3;
var UPRIGHT = 4;
var MUSTJUMP = false;
function canMoveUpLeft(board, oldPos, pieceType) {
	// if ((((oldPos%8)|0)+((oldPos/8)|0))%2 == 0) {
	// 	return false;
	// }
	if (oldPos%8 == 0) {
		return false;
	}
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
	if (oldPos%8 == 7) {
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
	if (oldPos%8 == 0) {
		return false;
	}
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
	if (oldPos%8 == 7) {
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
	if (prevPos%8 <= 1) {
		
		return false;
	}
	if (board[prevPos] == AI) {
		return false;
	}
	if ((board[prevPos-9] == enemyPiece || board[prevPos-9] == enemyKing) && board[prevPos-18] == WHITE) {
	
		return true;
	}
	return false;
}

function canJumpUpRight(prevPos, board, myPiece, myKing, enemyPiece, enemyKing) {
	var upright = prevPos-14;
	
	if (upright < 0) {
		return false;
	}
	if (prevPos%8 >= 6) {
		return false;
	}
	if (board[prevPos] == AI) {
		return false;
	}
	if ((board[prevPos-7] == enemyPiece || board[prevPos-7] == enemyKing) && board[prevPos-14] == WHITE) {
		
		return true;
	}
	return false;
}

function canJumpDownLeft(prevPos, board, myPiece, myKing, enemyPiece, enemyKing) {
	var upleft = prevPos+14;
	
	if (upleft > 64) {
		return false;
	}
	if (prevPos%8 <= 1) {
		return false;
	}
	if (board[prevPos] == HUMAN) {
		return false;
	}
	if ((board[prevPos+7] == enemyPiece || board[prevPos+7] == enemyKing) && board[prevPos+14] == WHITE) {
		
		return true;
	}
	return false;
}

function canJumpDownRight(prevPos, board, myPiece, myKing, enemyPiece, enemyKing) {
	var upleft = prevPos+18;

	
	if (upleft > 64) {
		return false;
	}
	if (prevPos%8 >= 6) {
		return false;
	}
	if (board[prevPos] == HUMAN) {
		return false;
	}
	if ((board[prevPos+9] == enemyPiece || board[prevPos+9] == enemyKing) && board[prevPos+18] == WHITE) {
		
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
			if (board[i] == AI) {
				count1++;
				score += 1;
				loseCheck = false;
			} else if (board[i] == HUMAN) {
				count2++;
				score -= 1;
				winCheck = false;
			}
			else if (board[i] == HUMANKING) {
				count2++;
				score -= 1.5;
				winCheck = false;
			}
			else if (board[i] == AIKING) {
				count2++;
				score += 1.5;
				loseCheck = false;
			}
		}
	}

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
	if (oldPos - 9 <= 7 && board[oldPos - 9] == HUMAN) {
		board[oldPos - 9] = HUMANKING;
	}
	//changeColor(oldPos,WHITE);
	//changeColor(oldPos - 9, board[oldPos - 9]);
}

function moveUpRight(board, oldPos) {
	board[oldPos - 7] = board[oldPos];
	board[oldPos] = WHITE;
	if (oldPos - 7 <= 7 && board[oldPos - 7] == HUMAN) {
		board[oldPos - 7] = HUMANKING;
	}
	//changeColor(oldPos,WHITE);
	//changeColor(oldPos - 7, board[oldPos - 7]);
}

function moveDownLeft(board, oldPos) {
	board[oldPos + 7] = board[oldPos];
	board[oldPos] = WHITE;
	if (oldPos + 7 >= 56 && board[oldPos + 7] == AI) {
		board[oldPos + 7] = AIKING;
	}
	//changeColor(oldPos,WHITE);
	//changeColor(oldPos + 7, board[oldPos + 7]);
}

function moveDownRight(board, oldPos) {
	board[oldPos + 9] = board[oldPos];
	board[oldPos] = WHITE;
	if (oldPos + 9 >= 56 && board[oldPos + 9] == AI) {
		board[oldPos + 9] = AIKING;
	}
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
var previousJump = -1;
function move(id, board) {
	if (testing) {
		if (select_ai) {
			if(board[id] == AI) {
				board[id] = WHITE;
			} else {
				board[id] = AI;
			}
		} else if (select_human) {
			if(board[id] == HUMAN) {
				board[id] = WHITE;
			} else {
				board[id] = HUMAN;
			}
		} else if (select_human_king) {
			if(board[id] == HUMANKING) {
				board[id] = WHITE;
			} else {
				board[id] = HUMANKING;
			}
		} else if (select_ai_king) {
			if(board[id] == AIKING) {
				board[id] = WHITE;
			} else {
				board[id] = AIKING;
			}
		}
		paintWholeBoard();
		return;
	}


	if (!playerTurn) {
		
		return;
	}
	if (board[id] == HUMAN || board[id] == HUMANKING) {
		previousClick = id;
		waiting = true;
		
		return;
	}
	MUSTJUMP = false;
	for (var i = 0; i < board.length; i++) {
		
		if (board[i] == HUMAN || board[i] == HUMANKING) {
			
			if (canJump(i, board, HUMAN, HUMANKING, AI, AIKING)) {
				MUSTJUMP = true;
				
				break;
			}
		}
	}

	
	paintWholeBoard(); // Debuggin purposes
	if (waiting) {
		
		if (canJump(previousClick, board, HUMAN, HUMANKING, AI, AIKING)) {
			if (previousJump != -1) {
				if (previousJump != previousClick) {
					return;
				}
			}
		
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

			if (id < 7 && board[id] == HUMAN) {	// Test for King after jump
				board[id] = HUMANKING;
			}

			changeColor(id,temp);
			previousJump = -1;
			paintWholeBoard();
			if (canJump(id, board, HUMAN, HUMANKING, AI, AIKING)) { //TODO change this to anyone can jump?
				previousClick = id;
				previousJump = previousClick;
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
			
			if (getMoveType(previousClick, id) == -1) {
				return;
			} else if (getMoveType(previousClick, id) == UPLEFT && canMoveUpLeft(board, previousClick, board[previousClick])) {
				moveUpLeft(board, previousClick);
			} else if (getMoveType(previousClick, id) == UPRIGHT && canMoveUpRight(board, previousClick, board[previousClick])) {
	
				moveUpRight(board, previousClick);

			} else if (getMoveType(previousClick, id) == DOWNLEFT && canMoveDownLeft(board, previousClick, board[previousClick])) {
				moveDownLeft(board, previousClick);
			} else if (getMoveType(previousClick, id) == DOWNRIGHT && canMoveDownRight(board, previousClick, board[previousClick])) {
				moveDownRight(board, previousClick);
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
			return;
		} else {
			return;
		}
	} else {

	}
	if (board[id] != HUMAN && board[id] != HUMANKING) {
		previousClick = id;
		waiting == false;
		return;
	}
}