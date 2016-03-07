import dispatcher from '../dispatcher';

export function createInventoryItem(item) {
  dispatcher.dispatch({
    type: "CREATE_INVENTORY_ITEM",
    item,
  });
}

export function deleteInventoryItem(id) {
  dispatcher.dispatch({
    type: "DELETE_INVENTORY_ITEM",
    id,
  });
}
