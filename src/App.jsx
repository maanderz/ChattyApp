import React, {Component} from 'react';
import Chatbar from './ChatBar.jsx';
import Navbar from './NavBar.jsx'; 
import Messagelist from './MessageList.jsx'; 

class App extends Component {
  constructor(props) {
    super(props);
    this.socket = new WebSocket('ws://localhost:3001/')
    this.state = {
      currentUser: {username: 'Anonymous'},
      messages: [], 
      connections: ""
    };
  }

    componentDidMount() {
      //console.log("componentDidMount <App />");
        
        this.socket.onopen = function() {
          console.log('Connected to server');
    
        }

        this.socket.onmessage = (e) => {
          const receivedMsg = JSON.parse(e.data);
          
          switch (receivedMsg.type) {
            //console.log('receivedMsg', receivedMsg);
            case 'incomingMessage':  
            //   this.setState({messages: this.state.messages.concat(receivedMsg)});
            // break; 

            case 'incomingNotification':
              this.setState({messages: this.state.messages.concat(receivedMsg)});
            break;

            case 'connection':
              this.setState({connections: receivedMsg.number});
            break;
          }
        }
      }

      //works on username input box
      changeUsername = (newName) => {
        const newUser = {
          username: newName,
          type: 'postNotification',
          content:`${this.state.currentUser.username} has changed their username to ${newName}`
        }
        this.socket.send(JSON.stringify(newUser))
        console.log('string', JSON.stringify(newUser))
        this.setState({currentUser: newUser})
      }

      //works on the message input box
      onKeyPress = (event) => {
        if (event.key === 'Enter') { 
          const addingMsg = {
            type: 'postMessage',
            username: this.state.currentUser.username,
            content: event.target.value,
          };
          this.socket.send(JSON.stringify(addingMsg));
          console.log(JSON.stringify(addingMsg))

          //const messages = this.state.messages.concat(addingMsg);
          //this.setState({messages: messages})
          event.target.value = "";
        }
    };

  render() {
    return (
      <div>
      <Navbar connected={this.state.connections}/>
      <Messagelist messages={this.state.messages} notifications={this.state.currentUser.username} />
      <Chatbar onChangeUsername={this.changeUsername} currentUser={this.state.currentUser} enter={this.onKeyPress} />
      </div>
      )
  }
}

export default App;

