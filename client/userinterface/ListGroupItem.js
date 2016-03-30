import React from 'react';
import * as InventoryActions from '../actions/InventoryActions';

import ItemIcon from './inventory/ItemIcon';

class ListGroupItem extends React.Component {

  deleteItem(id) {
    console.log(id);
    InventoryActions.deleteInventoryItem(id);
  }

  render() {
    const item = this.props.item;
    return (
        <li class="list-group-item">
          <ItemIcon icon={item.name} hoeveelheid={item.hoeveelheid}/>
          {this.props.item.name} {this.props.item.hoeveelheid}
          <button onClick= {this.deleteItem.bind(this, this.props.item.id)} type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        </li>
    );
  }
}

export default ListGroupItem;
