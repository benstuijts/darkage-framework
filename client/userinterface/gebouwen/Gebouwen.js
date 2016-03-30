import React from 'react';
import DialogBox from '../DialogBox';
import Input from './Gebouwen/Input.js';

export default class Gebouwen extends React.Component {
    constructor() {
        super();
        this.state = { name: "Een mooie naam, vastgelegd in this.state"};
    }
    
    changeName(name) {
        this.setState({name});
    }
    
    render() {
        
        return (
            <DialogBox title={'Gebouwen'} icon={'fa fa-fort-awesome'}>
                {this.state.name}
                <Input changeName={this.changeName.bind(this)} label={'label bij input field'} value={this.state.name} />
            </DialogBox>
        );
    }
}

// State -> this.state, when state changes, react will automatically renders the DOM. (internal value)

// Props -> this.props values that are injected in the component