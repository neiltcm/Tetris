'use scrict';

function createViewModule() {
	var TetrisView = function(model) {
		var self = this;
		this.model = model;				
		this.width = model.width;
		this.height = model.height;

		document.addEventListener('keydown', function(e) {
			var code = e.keyCode;
			self.clearAll();
			if (code == 37) {				
				self.model.moveBlock(DirectionEnum.LEFT);				
			}
			else if (code == 39) {
				self.model.moveBlock(DirectionEnum.RIGHT);
			}
			self.renderAll();
		});
	};

	TetrisView.prototype = {
		createGrid: function() {
			for (var i = 0; i < this.height; i++) {
				var row = document.createElement('div');				
				$(row).addClass('row');
				for (var j = 0; j < this.width; j++) {
					var cell = document.createElement('div');
					$(cell).addClass('cell').appendTo($(row));
				}
				$(row).appendTo($("#grid"));
			}
		}, 

		setClass: function(cellOnScreen, cellInModel) {
			switch(cellInModel.type) {
				case BlockTypeEnum.None:
					cellOnScreen.className = "cell";
					break;
				case BlockTypeEnum.O:
					cellOnScreen.className = "cell O";
					break;
			}
		},

		renderAll: function() {			
			var cells = $(".cell");
			for (var i = 0; i < this.height; i++) {
				for (var j = 0; j < this.width; j++) {					
					var cell = cells[(this.width * i) + j];
					var c = this.model.grid[i][j];					
					this.setClass(cell, c);
				}
			}
		},

		update: function() {	
			this.clearAll();		
			this.model.update();			
			this.renderAll();
		},

		clearAll: function() {			
			var cells = $(".cell");
			for (var i = 0; i < cells.length; i++) {
				cells[i].className = "cell";
			}
		}		
	};

	return {
		TetrisView : TetrisView
	};
}