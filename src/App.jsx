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
            username: "Bobby",
            content: "Hello"
          },
          {
            username: "Wafers",
            content: "Mmmmm"
          }
        ]
        }
      };
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
