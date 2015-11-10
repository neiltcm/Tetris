'use strict';

window.addEventListener('load', function() {
	var counter = 0;

	var blockModule = createBlockModule();
	var modelModule = createModelModule();	
	var viewModule = createViewModule();	

	var model = new modelModule.TetrisModel();	
	var view = new viewModule.TetrisView(model);
	view.createGrid();

	var blockFactory = new blockModule.BlockFactory();
	model.addBlockFactory(blockFactory);	

	view.update();

	setInterval(function(){		
		view.update();
	}, 1000);
});