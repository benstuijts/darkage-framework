import React from 'react';
import ReactDOM from 'react-dom';
import Window from './userinterface/Window';
<<<<<<< HEAD
import DialogBox from './userinterface/DialogBox';
import Gebouwen from './userinterface/gebouwen/Gebouwen';
import Inventory from './userinterface/inventory/Inventory';

import Settings from './userinterface/Settings/Settings';

=======
import Inventory from './userinterface/Inventory';
>>>>>>> 633865a8adecf38622555dee7a60c073b43c829f

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

<<<<<<< HEAD
//ReactDOM.render(<App />, document.getElementById('app'));
ReactDOM.render(<Settings />, document.getElementById('settings'));
ReactDOM.render(<Gebouwen />, document.getElementById('gebouwen'));
ReactDOM.render(<Inventory/>, document.getElementById('inventory'));
=======

//ReactDOM.render(<App />, document.getElementById('app'));
ReactDOM.render(<Inventory
                  title={'Inventory'}
                  icon={'fa fa-shopping-bag'}
                />,
                document.getElementById('app'));
>>>>>>> 633865a8adecf38622555dee7a60c073b43c829f
