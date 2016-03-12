import React from 'react';
import ReactDOM from 'react-dom';
import Window from './userinterface/Window';
import Inventory from './userinterface/Inventory';

console.log('entry point loaded as darkage.min.js __dirname = ' + __dirname);

const message = document.getElementById('message');
message.innerHTML = 'entry point loaded as darkage.min.js';

const listGroupItems = ["first thing", "second thing", "great thing", "special item!!!"];

class App extends React.Component {
  render() {
    return (
      <div>
        <Window title={'Inventory'} icon={'fa fa-shopping-bag'} items={listGroupItems}/>
      </div>
    );
  }
}


//ReactDOM.render(<App />, document.getElementById('app'));
ReactDOM.render(<Inventory
                  title={'Inventory'}
                  icon={'fa fa-shopping-bag'}
                />,
                document.getElementById('app'));
