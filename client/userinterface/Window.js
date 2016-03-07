import React from 'react';
import ListGroup from './ListGroup';

import InventoryStore from '../stores/InventoryStore';
import * as InventoryActions from '../actions/InventoryActions';

class Window extends React.Component {
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
      name: 'inventory item',
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
          Panel content

          <ListGroup items={this.state.inventory}/>
          <div class="btn-group">
            <button onClick={this.createInventoryItem.bind(this)} class="btn btn-primary">Add one</button>
          </div>

          <table class="table">
            <tbody>
            <tr><td>1</td><td>item</td><td>100</td></tr>
            <tr><td>2</td><td>thing</td><td>670</td></tr>
            </tbody>
          </table>
        </div>

        <ListGroup items={this.state.inventory}/>

        <div class="panel-footer">
          Panel footer
        </div>
      </div>
    );
  }
};

export default Window;
