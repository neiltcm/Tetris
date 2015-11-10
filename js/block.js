'use sctrict';

var BlockTypeEnum = Object.freeze({
	None: "None",
	O : "O"
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
					b.setCells();					
					break;
			}				
			return b;
		}
	};

	var Block = function(type) {				
		this.type = type;		
		this.listeners = [];
		this.cells = [];
		this.moving = true;
	};

	Block.prototype = {		
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
			console.log("notify update");
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
