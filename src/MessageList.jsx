import React, {Component} from 'react';
import Message from './Message.jsx';

class Messagelist extends Component {
    render() {
    const messages = this.props.data;
    const listMessages = messages.map((message) => (
      <Message indMsg={message}/>)
    )
    return (
      <main className="messages">
        <li> {listMessages} </li>
      <div className="message system">
        Anonymous1 changed their name to nomnom.
      </div>
      </main>
      )
    } 
}


export default Messagelist;