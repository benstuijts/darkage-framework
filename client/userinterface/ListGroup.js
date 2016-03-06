import React from 'react';
import ListGroupItem from './ListGroupItem';

class ListGroup extends React.Component {
  render() {
    return (
      <ul class="list-group">
        { this.props.items.map((item, index)=>{
          return <ListGroupItem item={item} key={index}/>
        })
        }
      </ul>
    );
  }
}

export default ListGroup;
