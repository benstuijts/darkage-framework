import React from 'react';
import * as InventoryActions from '../actions/InventoryActions';

class ListGroupItem extends React.Component {

  deleteItem(id) {
    console.log(id);
    InventoryActions.deleteInventoryItem(id);
  }

  render() {
    return (
        <li class="list-group-item">
          {this.props.item.name} {this.props.item.hoeveelheid}
          <button onClick= {this.deleteItem.bind(this, this.props.item.id)} type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        </li>
    );
  }
}

export default ListGroupItem;
