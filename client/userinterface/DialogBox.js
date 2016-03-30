import React from 'react';

class DialogBox extends React.Component {

    render() {
        return (
        
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h2 class="panel-title"><i class={this.props.icon}></i> {this.props.title}</h2>
                </div>
                <div class="panel-body">
                    {this.props.children}
                </div>
                <div class="panel-footer">
                Panel footer
                </div>
            </div>
        );    
    }
    
}

export default DialogBox;