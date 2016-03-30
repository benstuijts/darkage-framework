import React from 'react';
import DialogBox from '../DialogBox';
import InputText from '../DialogBox/InputText';

export default class Settings extends React.Component {
    
    render() {
        return(
            <DialogBox title={'Settings'} icon={'fa fa-cogs'}>
                <h1>Hello Settings window</h1>
                <InputText />
                <InputText />
                <InputText />
            </DialogBox>
        );
    }

}