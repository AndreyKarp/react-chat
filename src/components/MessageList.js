import React, { Component } from 'react'
import Message from './Messages'

class MessageList extends Component {

  componentDidUpdate (prevProps, prevState) {
    this.scrollList.scrollTop = this.scrollList.scrollHeight
  }

  render () {
    return (
      <div className="sc-message-list" ref={el => this.scrollList = el}>
        {this.props.messages.map((message, i) => {
          return <Message
            message={message} key={i}
            onDelete={this.props.onDelete}
            imageUrl={this.props.agent.imageUrl}
            fistName={this.props.agent.name}
            lastName={this.props.agent.lastName}
          />
        })}
      </div>)
  }
}

export default MessageList