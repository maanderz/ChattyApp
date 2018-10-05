import React, {Component} from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx';

class Messagelist extends Component {
    render() {
    const messages = this.props.messages;
    
    const listMessages = messages.map((message) => {
      if (message.type === 'incomingMessage') {
        return < Message key={message.id} indMsg={message}/>
      } else {
        return < Notification key={message.id} indMsg={message.content}/>
      }
    })
    return (
      <main className='messages'>
        {listMessages} 
      </main>
      )
    } 
}


export default Messagelist;