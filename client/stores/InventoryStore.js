import { EventEmitter } from 'events';
import dispatcher from '../dispatcher';

class InventoryStore extends EventEmitter {
  constructor() {
    super();
    this.inventory = [
      {
        id: 1,
        name: 'brood',
        familie: 'voedsel',
        subfamilie: '',
        hoeveelheid: 100,
        max: 200,
        private: false
      },
      {
        id: 2,
        name: 'hout',
        familie: 'bouwmateriaal',
        subfamilie: '',
        hoeveelheid: 10,
        max: 200,
        private: false
      },
      {
        id: 3,
        name: 'kruiden',
        familie: 'grondstoffen',
        subfamilie: '',
        hoeveelheid: 14,
        max: 100,
        private: false
      },
    ];
  }

  createInventoryItem(item) {
    console.log('InventoryStore: create inventory item', item);
    const id = Date.now();
    this.inventory.push({
      id,
      name: item.name,
      hoeveelheid: item.hoeveelheid,
    });
    this.emit("change");
  }

  deleteInventoryItem(id) {
    console.log('InventoryStore: delete inventory item' , id);
  }

  getAll() {
    return this.inventory;
  }

  handleActions(action) {
    switch(action.type) {
      case "CREATE_INVENTORY_ITEM": {
          this.createInventoryItem(action.item);
      }
      case "DELETE_INVENTORY_ITEM": {
          this.deleteInventoryItem(action.id);
      }
    }
  }

}

const inventoryStore = new InventoryStore;
dispatcher.register(inventoryStore.handleActions.bind(inventoryStore));
window.dispatcher = dispatcher;

export default inventoryStore;
