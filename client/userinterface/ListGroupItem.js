import React from 'react';

class ListGroupItem extends React.Component {
  render() {
    return (
        <li class="list-group-item">{this.props.key} {this.props.item}</li>
    );
  }
}

export default ListGroupItem;
