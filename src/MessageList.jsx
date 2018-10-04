import React, {Component} from 'react';
import Message from './Message.jsx';

class Messagelist extends Component {
    render() {
    const messages = this.props.messages;
    const listMessages = messages.map((message) => (
      <Message key={message.id} indMsg={message}/>)
    )
    return (
      <main className="messages">
        {listMessages} 
      <div className="message system">
        Anonymous1 changed their name to nomnom.
      </div>
      </main>
      )
    } 
}


export default Messagelist;