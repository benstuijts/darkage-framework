import React from 'react';
import ListGroupItem from './ListGroupItem';

class ListGroup extends React.Component {
  render() {

    return (
      <ul class="list-group">
        { this.props.items.map((item)=>{
          
          return <ListGroupItem item={item} key={item.id}/>
        })
        }
      </ul>
    );
  }
}

export default ListGroup;
