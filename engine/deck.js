
g.deck = {};

g.deck.db = {};

g.deck.db.getDeck = function(deckID) {
	if(deckID) {
		if(deckID == 0) {
			return {};
		}
	}
}

g.deck.current = function() {
	var Deck = {};
	
	Deck.classes = {};
	Deck.gear = {};
	Deck.weapons = {};
	Deck.consumables = {};
	Deck.monsters = {};

	Deck.loadFromTable = function(t) {
		var cards = t.items;
		var classes = cards.classes;
		var items = cards.items;
		var gear = items.gear;
		var weapons = items.weapons;
		var consumables = items.consumables;
		var monsters = cards.monsters;
		for(item in classes) {
			tihs.classes[item.id] = new g.class(item.id);
		}
		for(item in gear) {
			this.gear[item.id] = new g.gear(item.id);
		}
		for(item in weapons) {
			this.weapons[item.id] = new g.weapon(item.id);
		}
		for(item in consumables) {
			this.consumables[item.id] = new g.consumables(item.id);
		}
		for(item in monsters) {
			this.monsters[item.id] = new g.monsters(item.id);
		}
	}

	return Deck;
}
