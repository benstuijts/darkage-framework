import React from 'react';
import DialogBox from '../DialogBox';

export default class Inventory extends React.Component {
    
    render() {
        return(
            <DialogBox title={'Inventory'} icon={'fa fa-shopping-bag'}>
                <h1>Hello Inventory window</h1>
            </DialogBox>
        );
    }

}

