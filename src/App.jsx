import React, {Component} from 'react';
import Chatbar from './ChatBar.jsx';
import Navbar from './NavBar.jsx'; 
import Messagelist from './MessageList.jsx'; 

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        currentUser: {
            name: "Mandy"
        },
        messages: [ 
          {
            id: '1',
            username: "Bobby",
            content: "Hello"
          },
          {
            id: '2',
            username: "Wafers",
            content: "Mmmmm"
          }
        ]
        }
      }
    }
    componentDidMount() {
      console.log("componentDidMount <App />");
        setTimeout(() => {
          console.log("Simulating incoming message");
          const newMessage = {id: '3', username: "Michelle", content: "Hello there!"};
          const messages = this.state.data.messages.concat(newMessage);
          this.setState({ data: {
            messages: messages
            }
          })
        }, 3000);
      }

  render() {
    return (
      <div>
      <Navbar />
      <Messagelist data={this.state.data.messages}/>
      <Chatbar data={this.state.data}/>
      </div>
      )
  }
}

export default App;
