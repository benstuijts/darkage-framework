import React from 'react';
import InventoryStore from '../stores/InventoryStore';
import * as InventoryActions from '../actions/InventoryActions';


/* components */
import ListGroup from './ListGroup';
import IconGrid from './IconGrid';

class Inventory extends React.Component {
  constructor() {
    super();
    this.getInventory = this.getInventory.bind(this);
    this.state = {
      inventory: InventoryStore.getAll()
    }
  }

  componentWillMount() {
    // eventlisteners stores
    InventoryStore.on("change", this.getInventory );
  }

  componentWillUnmount() {
    // unbind eventlisteners stores
    InventoryStore.removeListener("change", this.getInventory );
  }

  getInventory() {
    this.setState({
      inventory: InventoryStore.getAll()
    });
  }

  createInventoryItem() {
    console.log('button clicked');
    InventoryActions.createInventoryItem({
      id: Date.now(),
      name: 'steen',
      hoeveelheid: Math.round(Math.random()*100),
      max: Math.round(Math.random()*100),

    });
  }

  render() {
    return (
      <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title"><i class={this.props.icon}></i> {this.props.title}</h3>
        </div>

        <div class="panel-body">
          <IconGrid items={this.state.inventory} />
          <ListGroup items={this.state.inventory}/>
        </div>

        <div class="btn-group">
          <button onClick={this.createInventoryItem.bind(this)} class="btn btn-primary">Add one</button>
        </div>

      </div>
    );
  }
}

export default Inventory;
