// var hasJumped = false;
// function moveUpLeft(board, oldPos) {
// 	board[oldPos - 9] = board[oldPos];
// 	board[oldPos] = WHITE;
// 	changeColor(oldPos,WHITE);
// 	changeColor(oldPos - 9, board[oldPos - 9]);
// }
// function canMoveDownRight(board, oldPos, pieceType) {
// 	// if ((((oldPos%8)|0)+((oldPos/8)|0))%2 == 0) {
// 	// 	return false;
// 	// }
// 	if (pieceType == HUMAN) {
// 		return false;
// 	}
// 	if (oldPos + 9 > 64) {
// 		return false;
// 	}
// 	if (board[oldPos + 9] == WHITE) {
// 		return true;
// 	}
// 	return false;
// }
function makeMoves(parent, parentBoard, friendly, friendlyKing) {
	var moves = new Array();

	for (var i = 0; i < parentBoard.length; i++) {
		if (parentBoard[i] == friendly || parentBoard[i] == friendlyKing) {
			//console.log(parentBoard);
			console.log(i);
			//console.log(parentBoard[i]);
			if (canMoveUpLeft(parentBoard, i, parentBoard[i])) {
				var childBoard = copyBoard(parentBoard);
				moveUpLeft(childBoard, i);
				var len = moves.length;
				moves[len] = new node(childBoard, parent);
			} 
			if (canMoveUpRight(parentBoard, i, parentBoard[i])) {
				var childBoard = copyBoard(parentBoard);
				moveUpRight(childBoard, i);
				var len = moves.length;
				moves[len] = new node(childBoard, parent);
			} 
			if (canMoveDownLeft(parentBoard, i, parentBoard[i])) {
				var childBoard = copyBoard(parentBoard);
				moveDownLeft(childBoard, i);
				var len = moves.length;
				moves[len] = new node(childBoard, parent);
			} 
			if (canMoveDownRight(parentBoard, i, parentBoard[i])) {
				var childBoard = copyBoard(parentBoard);
				moveDownRight(childBoard, i);
				var len = moves.length;
				moves[len] = new node(childBoard, parent);
			} 
		}
	}
	return moves;
}

function makeJumps(jumps, friendly, friendlyKing, enemy, enemyKing) {
	return null;
}

function generateChildren(parent, depth) {
	if (depth%2 == 0) {
		var friendly = AI;
		var enemy = HUMAN;
		var friendlyKing = AIKING;
		var enemyKing = HUMANKING;
	} else {
		var friendly = HUMAN;
		var enemy = AI;
		var friendlyKing = HUMANKING;
		var enemyKing = AIKING;
	}
	var board = parent.board;
	
	// hasJumped = false;
	var id = 0;
	var jumps = new Array();
	var temp = jumps;
	jumps[0] = parent;
	temp = makeJumps(jumps, friendly, friendlyKing, enemy, enemyKing);
		
	while (temp != null) {
		jumps = temp;
		temp = makeJumps(jumps, friendly, friendlyKing);
	}

	var moves = makeMoves(parent, parent.board, friendly, friendlyKing);
	//console.log(parent.children);

	parent.children = moves;
	//console.log(parent.children);
	// if (!hasJumped) {
	// 	// if (depth == 1) {
	// 	// 	console.log("BAAAD");
	// 	// }
	// 	for (var i = 0; i < parent.board.length; i++) {
	// 		if ((((i%8)|0)+((i/8)|0))%2 != 0) {
	// 			if (board[i] == ai || board[i] == ai + 10) {
	// 				// if (board[i] == 11) {
	// 				// 	console.log("1");
	// 				// }
	// 				if (i+7 < 64 && board[i] != 2) {
	// 					// if (board[i] == 11) {
	// 					// 	console.log("2");
	// 					// }
						
	// 					if (board[i+7] == 0) {
	// 						// if (board[i] == 11) {
	// 						// 	console.log("3");
	// 						// }
	// 						var childBoard = copyBoard(parent.board);
	// 						if (i+7 >= 64-8 && board[i] < 10) {
	// 							childBoard[i+7] = ai+10;
	// 						} else {
	// 							childBoard[i+7] = board[i];
	// 						}
						
	// 						childBoard[i] = 0;
	// 						var len = parent.children.length;
	// 						parent.children[len] = new node(childBoard, parent);
	// 					}
	// 				}
	// 				if (i+9 < 64 && board[i] != 2) {
	// 					if (board[i+9] == 0) {
	// 						var childBoard = copyBoard(parent.board);
	// 						if (i+9 >= 64-8 && board[i] < 10) {
	// 							childBoard[i+9] = ai+10;
	// 						} else {
	// 							childBoard[i+9] = board[i];
	// 						}
						
	// 						childBoard[i] = 0;
	// 						var len = parent.children.length;
	// 						parent.children[len] = new node(childBoard, parent);
	// 					}
	// 				}
	// 				if (i-7 > 0 && board[i] != 1) {
	// 					if (board[i-7] == 0) {
	// 						var childBoard = copyBoard(parent.board);
	// 						if (i-7 <= 7 && board[i] < 10) {
	// 							childBoard[i-7] = ai+10;
	// 						} else {
	// 							childBoard[i-7] = board[i];
	// 						}
							
	// 						childBoard[i] = 0;
	// 						var len = parent.children.length;
	// 						parent.children[len] = new node(childBoard, parent);
	// 					}
	// 				}
	// 				if (i-9 > 0 && board[i] != 1) {
	// 					if (board[i-9] == 0) {
	// 						var childBoard = copyBoard(parent.board);
	// 						if (i-9 <= 7 && board[i] < 10) {
	// 							childBoard[i-9] = ai+10;
	// 						} else {
	// 							childBoard[i-9] = board[i];
	// 						}
						
	// 						childBoard[i] = 0;
	// 						var len = parent.children.length;
	// 						parent.children[len] = new node(childBoard, parent);
	// 						// if (depth == 1 && getScore(childBoard) == -1) {
	// 						// 	console.log("Here.");
	// 						// }
	// 					}
	// 				}
	// 			}
	// 		}
	// 	}
	//}
}

function getAiBoard(queue) {
	for (var temp = queue.getMax(); temp.previous.previous != null; temp = temp.previous);
	return temp.board;
}


function AiJump(parent, i, ai, human) {
	var hasJumped = false;
	var board = parent.board;
	if ((((i%8)|0)+((i/8)|0))%2 != 0) {
		if (board[i] == ai || board[i] == ai + 10) {
			if (i+14 < 64 && board[i] != 2) {
				if (board[i+14] == 0) {
					if (board[i+7] == human || board[i+7] == human+10) {
						var childBoard = copyBoard(parent.board);
						if (i+14 >= 64-8 && board[i] < 10) {
							childBoard[i+14] = ai+10;
						} else {
							childBoard[i+14] = board[i];
						}
						childBoard[i] = 0;
						childBoard[i+7] = 0;
						var len = parent.children.length;
						parent.children[len] = new node(childBoard, parent);
						hasJumped = true;
					}
				}
			}
			if (i+18 < 64 && board[i] != 2) {
				if (board[i+18] == 0) {
					if (board[i+9] == human || board[i+9] == human+10) {
						var childBoard = copyBoard(parent.board);
						if (i+18 >= 64-8 && board[i] < 10) {
							childBoard[i+18] = ai+10;
						} else {
							childBoard[i+18] = board[i];
						}

						childBoard[i] = 0;
						childBoard[i+9] = 0;
						// if (getScore(parent.board, depth) == getScore(childBoard, depth)) {
						// 	console.log("REALLY BAD THINGS");
						// 	console.log("The score of parent = "+getScore(parent.board, depth)+ " The score of the child is "+getScore(childBoard, depth));
						// 	console.log("Parent:");
						// 	printBoard(parent.board);
						// 	console.log("Child:");
						// 	printBoard(childBoard);
						// 	console.log("");
						// }
						var len = parent.children.length;
						parent.children[len] = new node(childBoard, parent);
						hasJumped = true;
					}
				}
			}
			if (i-14 > 0 && board[i] != 1) {
				if (board[i-14] == 0) {
					if (board[i-7] == human || board[i-7] == human+10) {
						var childBoard = copyBoard(parent.board);
						if (i-14 <= 7 && board[i] < 10) {
							childBoard[i-14] = ai+10;
						} else {
							childBoard[i-14] = board[i];
						}

						childBoard[i] = 0;
						childBoard[i-7] = 0;
						var len = parent.children.length;
						parent.children[len] = new node(childBoard, parent);
						hasJumped = true;
					}
				}
			}
			if (i-18 > 0 && board[i] != 1) {
				if (board[i-18] == 0) {

					if (board[i-9] == human || board[i-9] == human+10) {
						var childBoard = copyBoard(parent.board);
						if (i-18 <= 7 && board[i] < 10) {
							childBoard[i-18] = ai+10;
						} else {
							childBoard[i-18] = board[i];
						}
						childBoard[i] = 0;
						childBoard[i-9] = 0;
						var len = parent.children.length;
						parent.children[len] = new node(childBoard, parent);
						hasJumped = true;
					}
				}
			}
		}
	}

	return hasJumped;
	
}


function getBestChild(parent, depth) {
	// console.log("We are working at depth "+depth);
	var bestChild = parent.children[0];
	// if (depth%2 == 0) {
	// 	console.log("It is the ai's turn. We have a choice of scores:");
	// } else {
	// 	console.log("It is the human's turn. We have a choice of scores:");
	// }
	for (var i = 1; i < parent.children.length; i++) {
		// console.log(parent.children[i].score);
		if (parent.children[i] == null) {
			break;
		}
		if (depth%2 == 0) {
			if (parent.children[i].score > bestChild.score) {
				bestChild = parent.children[i];
			}
		} else {
			if (parent.children[i].score < bestChild.score) {
				bestChild = parent.children[i];
			}
		}
	}
	// console.log("We therefore choose score : " + bestChild.score);
	// console.log("");
	return bestChild;
}

function prune(parent, depth, j) {
	var count = 0;
	for (var i = j+1; i < parent.children.length; i++) {
		count++;
		parent.children[i] = null;
	}
	//console.log("Pruned "+count);
}

function buildTree(parent, depth, maxDepth, parentNodeNumber) {
	// if (depth == 2) {
		
	// 	if (getScore(parent.board) == -1) {
	// 		console.log("SCORE AT DEPTH 2 = "+getScore(parent.board));
	// 		printBoard(parent.parent.parent.board);
	// 		console.log("");
	// 		printBoard(parent.parent.board);
	// 		console.log("");
	// 		printBoard(parent.board);
	// 		console.log("");
	// 		console.log("");
	// 		console.log("");
	// 	}
	// }

	if (maxDepth != depth) {
		linkCount++;
		nodeCount++;
		var myLink = linkCount;
		var myNode = nodeCount;
		generateChildren(parent, depth);
		if (parent.children.length == 0) {
			parent.score = getScore(parent.board, depth);
			
			return;
		}
		for (var i = 0; i < parent.children.length; i++) {
			buildTree(parent.children[i], depth+1, maxDepth, myNode);

			if (i == 0) {
				parent.score = parent.children[i].score;
			} else {
				if (depth%2 == 0) {
					if (parent.children[i].score > parent.score) {
						parent.score = parent.children[i].score;
					}
				} else {
					if (parent.children[i].score < parent.score) {
						parent.score = parent.children[i].score;
					}
				}
			}
			if (parent.parent != null) {
				if (depth%2 == 0) {
					if (parent.parent.score >= parent.score) {
						prune(parent, depth, i);
						break;
					}
				} else {
					if (parent.parent.score <= parent.score) {
						prune(parent, depth, i);
						break;
					}
				}
		 	}
		}
		
		var val = 15;
		if (parent.score == 1) {
			//console.log("here");
			val = 40;
		} else if (parent.score == -1) {
			val = 1;
		}
		if (parentNodeNumber == -1) {

			link_str = '{"source":0,"target":0,"value":'+val+'}'+link_str;
			node_str = '{"name":"Root","group":0}'+node_str;
		} else {
			//console.log("here");
			link_str = ',{"source":'+myLink+',"target":'+parentNodeNumber+',"value":'+val+'}'+link_str;
			node_str = ',{"name":"Branch","group":'+myNode+'}'+node_str;
		}
		
		//parent.score = getBestChild(parent, depth).score;

		//console.log("Parent chooses score: "+parent.score);
	} else {
		parent.score = getScore(parent.board, depth);
		linkCount++;
		nodeCount++;
		var val = 15;
		if (parent.score == 1) {
			//console.log("here");
			val = 40;
		} else if (parent.score == -1) {
			val = 1;
		}
		link_str = ',{"source":'+linkCount+',"target":'+parentNodeNumber+',"value":'+val+'}'+link_str;
		node_str = ',{"name":"Leaf","group":'+nodeCount+'}'+node_str;
		//console.log("Leaf has score: "+parent.score);
		
			// if (depth%2 == 0) {
			// 	console.log("It is the ai's turn. It's score is :"+ parent.score);
			// } else {
			// 	console.log("It is the human's turn. It's score is :"+ parent.score);
			// }
	}
}


function makeAiMove() {
	node_str = '';
	link_str = '';
	linkCount = -1;
	nodeCount = -1;
	if (wintime1(board)) {
		var maxDepth = 13;
		console.log("depth = 20");

	} else if (wintime2(board)) {
		console.log("depth = 15");

		var maxDepth = 13;
	} else {
		var maxDepth = 10;
	}
	var maxDepth = 4;
	var rootNode = new node(board, null);
	node_str += '],';
	link_str += ']}';
	
	buildTree(rootNode, 0, maxDepth, -1);
	link_str = '"links":['+link_str;
	node_str = '{"nodes":['+node_str;
	
	if (getBestChild(rootNode, 0) == null) {
		console.log("Stalemate!");
	}
	board = getBestChild(rootNode, 0).board;
	console.log("The root has "+rootNode.children.length+" children and a score of "+rootNode.score);

	paintWholeBoard();
	drawD3(node_str + link_str);
}