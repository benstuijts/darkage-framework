import React from 'react';

export default class Input extends React.Component {
    
    handleChange(e) {
        const name = e.target.value;
        this.props.changeName(name);
    }
    
    render() {
        return(
            <div class="form-group">
                <label for="">{ this.props.label }</label>
                <input onChange={this.handleChange.bind(this)} type="text" class="form-control" value={this.props.value} />
            </div>
        );
    }
}