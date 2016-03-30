import React from 'react';
import ItemIcon from './inventory/ItemIcon';

class IconGrid extends React.Component {
  render() {
    return(
      <div>
        { this.props.items.map((item)=>{

          return <ItemIcon icon={item.name} key={item.id} hoeveelheid={item.hoeveelheid}/>
        })
        }
      </div>
    );
  }
}

export default IconGrid;
