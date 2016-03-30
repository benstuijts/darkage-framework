import React from 'react';
import DialogBox from '../DialogBox';

export default class Settings extends React.Component {
    
    render() {
        return(
            <DialogBox title={'Settings'} icon={'fa fa-cogs'}>
                <h1>Hello Settings window</h1>
            </DialogBox>
        );
    }

}