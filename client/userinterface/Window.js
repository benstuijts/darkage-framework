import React from 'react';
import ListGroup from './ListGroup';

class Window extends React.Component {
  render() {
    return (
      <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title"><i class={this.props.icon}></i> {this.props.title}</h3>
        </div>
        <div class="panel-body">
          Panel content
          
          <ListGroup items={this.props.items}/>

          <table class="table">
            <tbody>
            <tr><td>1</td><td>item</td><td>100</td></tr>
            <tr><td>2</td><td>thing</td><td>670</td></tr>
            </tbody>
          </table>
        </div>

        <ListGroup items={this.props.items}/>

        <div class="panel-footer">
          Panel footer
        </div>
      </div>
    );
  }
};

export default Window;
