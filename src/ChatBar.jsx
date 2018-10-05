import React, {Component} from 'react';

class Chatbar extends Component {
  render() {
    const onNameKeyPress = (e) => {
      if (e.key === 'Enter') {
        this.props.onChangeUsername(e.target.value)
      }
    }
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder={this.props.currentUser.username} onKeyPress={onNameKeyPress} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.props.enter} />
      </footer>
    )
  }
}

export default Chatbar;


