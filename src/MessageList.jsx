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
      </main>
      )
    } 
}


export default Messagelist;