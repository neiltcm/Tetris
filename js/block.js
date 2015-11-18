'use sctrict';

var BlockTypeEnum = Object.freeze({
	None: "None",
	O : "O",
	I : "I",
	L : "L",
	J : "J",
	S : "S",
	Z : "Z",
	T : "T"
});

var DirectionEnum = Object.freeze({
	LEFT : "Left",
	RIGHT : "Right",
	DOWN : "Down"
});

function createBlockModule() {
	var BlockFactory = function() {};

	BlockFactory.prototype = {
		addModel: function(model) {
			this.model = model;
		},

		generateBlock: function(type) {
			b = new Block(type);		
			b.addListener(this.model);	
			switch(type) {
				case BlockTypeEnum.O:							
					b.setPosition(1, 4);													
					break;
				case BlockTypeEnum.I:
					b.setPosition(3, 4);													
					break;
				case BlockTypeEnum.J:
				case BlockTypeEnum.L:
					b.setPosition(2, 4);													
					break;
				case BlockTypeEnum.T:
				case BlockTypeEnum.S:
				case BlockTypeEnum.Z:
					b.setPosition(1, 3);													
					break;
			}				
			b.setCells();
			return b;
		},

		generateRandomBlock: function() {
			var num = Math.floor((Math.random() * 7) + 1);
			switch (num) {
				case 1:
					return this.generateBlock(BlockTypeEnum.O);
					break;
				case 2:
					return this.generateBlock(BlockTypeEnum.I);
					break;
				case 3:
					return this.generateBlock(BlockTypeEnum.J);
					break;
				case 4:
					return this.generateBlock(BlockTypeEnum.L);
					break;
				case 5:
					return this.generateBlock(BlockTypeEnum.S);
					break;
				case 6:
					return this.generateBlock(BlockTypeEnum.Z);
					break;
				case 7:
					return this.generateBlock(BlockTypeEnum.T);
					break;
			}
		}
	};

	var Block = function(type) {				
		this.type = type;		
		this.listeners = [];
		this.cells = [];
		this.moving = true;
		this.setWidth(type);
	};

	Block.prototype = {	
		setWidth: function(type) {
			switch (type) {
				case BlockTypeEnum.O:
				case BlockTypeEnum.J:
				case BlockTypeEnum.L:
					this.width = 2;
					break;
				case BlockTypeEnum.I:
					this.wisth = 1;
					break;			
				case BlockTypeEnum.S:
				case BlockTypeEnum.Z:
				case BlockTypeEnum.T:
					this.width = 3;
					break;	
			}
		},

		addListener: function(listener) {
			this.listeners.push(listener);
		},

		removeListener: function(listener) {
			_.without(listeners, listener);
		},

		rotate: function(){

		},

		move: function(row, col) {
			this.notifyClear();
			this.setPosition(this.row+row, this.col+col);
			this.updateCells(row, col);
			this.notifyUpdate();
		},

		setPosition: function(row, col) {				
			this.row = row;
			this.col = col;						
		},

		setCells: function() {
			switch(this.type) {
				case BlockTypeEnum.O:	
					this.cells.push([this.row, this.col]);
					this.cells.push([this.row, this.col + 1]);
					this.cells.push([this.row - 1, this.col]);
					this.cells.push([this.row - 1, this.col + 1]);									
					break;
				case BlockTypeEnum.I:
					this.cells.push([this.row, this.col]);
					this.cells.push([this.row - 1, this.col]);
					this.cells.push([this.row - 2, this.col]);
					this.cells.push([this.row - 3, this.col]);
					break;
				case BlockTypeEnum.J:
					this.cells.push([this.row, this.col]);
					this.cells.push([this.row, this.col + 1]);
					this.cells.push([this.row - 1, this.col + 1]);
					this.cells.push([this.row - 2, this.col + 1]);
					break;
				case BlockTypeEnum.L:
					this.cells.push([this.row, this.col]);
					this.cells.push([this.row, this.col + 1]);
					this.cells.push([this.row - 1, this.col]);
					this.cells.push([this.row - 2, this.col]);
					break;
				case BlockTypeEnum.S:
					this.cells.push([this.row, this.col]);
					this.cells.push([this.row, this.col + 1]);
					this.cells.push([this.row - 1, this.col + 1]);
					this.cells.push([this.row - 1, this.col + 2]);
					break;
				case BlockTypeEnum.Z:
					this.cells.push([this.row - 1, this.col]);
					this.cells.push([this.row - 1, this.col + 1]);
					this.cells.push([this.row, this.col + 1]);
					this.cells.push([this.row, this.col + 2]);
					break;
				case BlockTypeEnum.T:
					this.cells.push([this.row, this.col]);
					this.cells.push([this.row, this.col + 1]);
					this.cells.push([this.row, this.col + 2]);
					this.cells.push([this.row - 1, this.col + 1]);
					break;
			}
		},

		updateCells: function(row, col) {							
			for (var i = 0; i < this.cells.length; i++) {				
				this.cells[i][0] += row;
				this.cells[i][1] += col;				
			}			
		},

		setMoving: function(moving){
			this.moving = moving;
		},

		notifyClear: function() {			
			_.each(this.listeners, function(listener) {
				listener.clearMovingBlock();
			});
		},

		notifyUpdate: function() {			
			var type = this.type;
			_.each(this.listeners, function(listener) {				
				listener.updateMovingBlock(type);
			});
		}
	};

	return {
		BlockFactory : BlockFactory,
		Block: Block
	};
}
