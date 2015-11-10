"use strict";

function createModelModule() {
	function Cell(row, col) {
		this.row = row;
		this.col = col;
		this.on = false;
		this.type = BlockTypeEnum.None;
	};

	var TetrisModel = function() {
		this.width = 10;
		this.height = 20;
		this.grid = [];
		this.blocks = [];	
		this.createGrid();	
		this.movingBlock = null;		
	};

	TetrisModel.prototype = {
		addBlockFactory: function(blockFactory) {
			this.blockFactory = blockFactory;
			this.blockFactory.addModel(this);
		},

		addBlock: function(block) {
			if (block.moving) this.movingBlock = block;
			this.blocks.push(block);
		},

		deleteBlock: function(block) {
			this.blocks.remove(block);
		},

		createGrid: function() {
			for (var i = 0; i < this.height; i++) {
				var row = [];
				for (var j = 0; j < this.width; j++) {
					var c = new Cell(i, j);
					row.push(c);
				}
				this.grid.push(row);
			}
		},

		update: function() {				
			if (this.movingBlock == null || !this.movingBlock.moving) {
				console.log("creating block");
				var block = this.blockFactory.generateBlock(BlockTypeEnum.O);				
				this.addBlock(block);
				this.updateMovingBlock(block.type);
			}
			else {
				// move movingBlock down by 1 unit
				console.log("moving down");
				this.movingBlock.move(1, 0);
			}
		},

		clearMovingBlock: function() {
			if (this.movingBlock != null && this.movingBlock.moving) {
				var cells = this.movingBlock.cells;
				for (var i = 0; i < cells.length; i++) {
					var cellInGrid = this.grid[cells[i][0]][cells[i][1]];
					cellInGrid.on = false;
					cellInGrid.type = BlockTypeEnum.None;

				}
			}
		},

		updateMovingBlock: function(type) {						
			console.log(this.movingBlock);	
			if (this.movingBlock != null && this.movingBlock.moving) {						
				var cells = this.movingBlock.cells;
				for (var i = 0; i < cells.length; i++) {
					var row = cells[i][0];
					var col = cells[i][1];
					this.grid[row][col].on = true;
					this.grid[row][col].type = type;					

				}
			}
		}
	};

	return {
		TetrisModel: TetrisModel
	};
}