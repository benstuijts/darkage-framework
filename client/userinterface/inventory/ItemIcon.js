import React from 'react';

class ItemIcon extends React.Component {

  render() {
    const c = this.props.icon + " inventoryitem";
    return(
      <div class={c}><span class="badge">{this.props.hoeveelheid}</span></div>
    );
  }
}

export default ItemIcon;
