import React from 'react';

export default class Header extends React.Component {
    render() {
        return(
            <div class="DialogBox-header">
                <h1><i class={ this.props.icon }></i> {this.props.title}</h1>
            </div>
        );
    }
}