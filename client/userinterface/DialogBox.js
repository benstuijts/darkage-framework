import React from 'react';
import Header from './DialogBox/Header';

class DialogBox extends React.Component {

    render() {
        
        return (
        
            <div class="DialogBox window-2-640-476">
                <Header title={ this.props.title } icon={ this.props.icon }/>
                
                <div class="panel-body">
                    {this.props.children}
                </div>
                
            </div>
        );    
    }
    
}

export default DialogBox;