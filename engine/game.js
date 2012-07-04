
g.game = function() {
	var Game = {};
	Game.viewElement = null;
	Game.players = []; // arrage of Player objects
	Game.deck = null;
	Game.curPlayer = 0;
	Game.state = -1;
	
	Game.init = function(players,deck) {
		this.viewElement = document.getElementById('game');
		if(players) {
			for(i=0;i<players.length;i++) {
				var playerID = players[i];
				if(g.player.db.validate(playerID)) {
					this.players.push(new g.player(playerID)); // if player # is valid, add to game
					g.player.db.inform(playerID); // send an update to the server to show player#id is in a game
				}
			}
		} else {
			this.players = [0,1]; // for testing purposes
		}
		if(deck) {
			if(g.deck.db.validate(deck)) {
				this.deck = g.deck.db.getDeck(deck);
			}
		} else {
			this.deck = g.deck.db.getDeck(0); // 0 is default deck
		}
		
	}

	Game.load = function(saveID) {
		if(g.save.validateSave(saveID)) {
			var save = g.save.getSave(saveID);
			this.players = save.getPlayers();
			this.deck = save.getDeck();
			this.curPlayer = save.getCurPlayer();
		} else {
			console.log("SaveID "+saveID+" not found. Creating new Game.");
			// this.init(); // init happens before load anyway
		}
	}

	Game.save = function() {
		var save = new g.save();
		save.players = this.players;
		save.deck = this.deck;
		save.curPlayer = this.curPlayer;
		if(save.commit()) {
			console.log("Save successful");
		} else {
			console.log("Save failed");
		}
	}

	Game.run = function() {
		this.viewElement.innerHTML = "Game is running";
		this.viewElement.onclick = function(e) {
			this.innerHTML = "Game has been clicked";
		}
	}

	return Game;
}
