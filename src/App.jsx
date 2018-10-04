import React, {Component} from 'react';
import Chatbar from './ChatBar.jsx';
import Navbar from './NavBar.jsx'; 
import Messagelist from './MessageList.jsx'; 

class App extends Component {
  constructor(props) {
    super(props);
    this.socket = new WebSocket('ws://localhost:3001/')
    this.state = {
      currentUser: {name: "Bob"},
      messages: [] 
    };
  }

    componentDidMount() {
      console.log("componentDidMount <App />");
        
        this.socket.onopen = function() {
          console.log('Connected to server');

        }

        console.log(this.state)

        this.socket.onmessage = (e) => {
          const receivedMsg = JSON.parse(e.data);
          console.log(receivedMsg);
          console.log("state", this.state)

          this.setState({messages: this.state.messages.concat(receivedMsg)});
        }
    };
    
      onKeyPress = (event) => {
        if (event.key === 'Enter') { 
          const addingMsg = {
            username: this.state.currentUser.name,
            content: event.target.value,
          };
          this.socket.send(JSON.stringify(addingMsg));
          console.log(JSON.stringify(addingMsg))

          const messages = this.state.messages.concat(addingMsg);
          //this.setState({messages: messages})
          event.target.value = "";
        }
    };

  render() {
    return (
      <div>
      <Navbar />
      <Messagelist messages={this.state.messages}/>
      <Chatbar currentUser={this.state} enter={this.onKeyPress} />
      </div>
      )
  }
}

export default App;
