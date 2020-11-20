import React, { Component } from 'react'
import './styles'
import Launcher from './components/Launcher'
import messageBroker from './services/messageBroker'
import { render } from 'react-dom'

class App extends Component {

  constructor () {
    super()

    creator()
    if (!localStorage.getItem(
      `${chatConfig.user.phone}:${chatConfig.user.project}`)) {
      this.messageHistory = chatConfig.project.defaultMessage
      localStorage.setItem(
        `${chatConfig.user.phone}:${chatConfig.user.project}`,
        JSON.stringify(this.messageHistory))
    } else {
      this.messageHistory = JSON.parse(localStorage.getItem(
        `${chatConfig.user.phone}:${chatConfig.user.project}`))
    }

    this.state = {
      messageList: this.messageHistory,
      newMessagesCount: 0,
      isOpen: false,
    }

    messageBroker.init(
      chatConfig.development
        ? 'http://localhost:3142'
        : 'https://mss.slg.tools')

    messageBroker.onMessageReceived(this._onMessageWasSent.bind(this))
    this.lastId = this.messageHistory[this.messageHistory.length - 1].id
  }

  _onMessageWasSent (message) {
    const newMessagesCount = this.state.isOpen
      ? this.state.newMessagesCount
      : this.state.newMessagesCount + 1
    const ids = this.lastId + 1
    const list = JSON.parse(localStorage.getItem(
      `${chatConfig.user.phone}:${chatConfig.user.project}`))
    const found = list.find(item => item.id === message.id)
    this.setState({
      newMessagesCount: newMessagesCount,
      messageList: [
        ...this.state.messageList,
        { id: ids, ...message }],
    })
    if (!!found) return
    const history = JSON.parse(localStorage.getItem(`${chatConfig.user.phone}:${chatConfig.user.project}`))
    history.push({ id: this.lastId + 1, ...message })
    localStorage.setItem(`${chatConfig.user.phone}:${chatConfig.user.project}`, JSON.stringify(history))
    this.lastId += 1
  }

  _sendOnSocket (message) {
    if (!message) {
      return
    }
    messageBroker.sendMessage(message)
  }

  _handleClick () {
    this.setState({
      isOpen: !this.state.isOpen,
      newMessagesCount: 0,
    })
  }

  onKeyPress = (userInput) => {

  }

  onDelete = (msg) => {
    this.setState(
      { messageList: this.state.messageList.filter(({ id }) => id !== msg.id) })
    const list = JSON.parse(localStorage.getItem(
      `${chatConfig.user.phone}:${chatConfig.user.project}`))
    const deletedList = list.filter(({ id }) => id !== msg.id)
    localStorage.setItem(`${chatConfig.user.phone}:${chatConfig.user.project}`,
      JSON.stringify(deletedList))
  }

  render () {
    return <div>
      <Launcher
        agentProfile={{
          teamName: chatConfig.project.teamName,
          imageUrl: chatConfig.project.imageUrl,
          user: chatConfig.user,
          agent: chatConfig.agent,
          jwt: chatConfig.jwt,
        }}
        onMessageSend={this._sendOnSocket}
        onMessageWasSent={this._onMessageWasSent.bind(this)}
        messageList={this.state.messageList}
        newMessagesCount={this.state.newMessagesCount}
        handleClick={this._handleClick.bind(this)}
        isOpen={this.state.isOpen}
        onKeyPress={this.onKeyPress}
        onDelete={this.onDelete}
        showEmoji
        showFile
      />
      <div style={{ height: 200 }}/>
    </div>
  }
}

render(<App/>, document.querySelector('#app'))

function creator () {
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = chatConfig.development
    ? 'umd/main.css'
    : `https://chat-spa.slg.tools/main.css?v=${new Date().getTime()}`
  document.getElementsByTagName('head')[0].appendChild(link)
}

