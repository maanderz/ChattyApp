import React, {Component} from 'react';
import Chatbar from './ChatBar.jsx';
import Navbar from './NavBar.jsx'; 
import Messagelist from './MessageList.jsx'; 

class App extends Component {
  constructor(props) {
    super(props);
    this.socket = new WebSocket('ws://localhost:3001/')
    this.state = {
      currentUser: {username: ''},
      messages: [] 
    };
    this.handleChange = this.handleChange.bind(this);
  }

    componentDidMount() {
      console.log("componentDidMount <App />");
        
        this.socket.onopen = function() {
          console.log('Connected to server');

        }

        this.socket.onmessage = (e) => {
          const receivedMsg = JSON.parse(e.data);
          console.log(receivedMsg);
          console.log("state", this.state)

          this.setState({messages: this.state.messages.concat(receivedMsg)});
        }
      }
      //Works on the Username text Box
      handleChange = (e) => {
        if (e.key === 'Enter') {
  
          let newUser = e.target.value
          this.setState({currentUser:{username:newUser}})
        };
          // console.log("test ",newUser);
          //let username = this.state.currentUser.username
          // this.setState({newUser})
        
      }
      //works on the message Te
      onKeyPress = (event) => {
        if (event.key === 'Enter') { 
          const addingMsg = {
            username: this.state.currentUser.username,
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
      <Chatbar currentUser={this.state.currentUser} enter={this.onKeyPress} handler={this.handleChange}/>
      </div>
      )
  }
}

// class UserForm extends Component {
//   constructor(props){
//     super(props);
//     this.state = {value: ''};

//     this.nameHandler = this.nameHandler.bind(this);
//     this.submitHandler = this.submitHandler.bind(this);
//   }

//   nameHandler(e) {
//     this.setState( {value: e.target.value} );
//   }

//   submitHandler(e) {
//     if (event.key === 'Enter') { 
//       const username = this.state.value;
//     }
//   }
//   render() {
//     <Chatbar username={this.state.value} />
//   }
// }


export default App;

