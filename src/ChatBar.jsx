import React, {Component} from 'react';

class Chatbar extends Component {
  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder={this.props.currentUser.currentUser.name}/>
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.props.enter} />
      </footer>
    )
  }
}

export default Chatbar;