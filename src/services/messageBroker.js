import MESSAGE_TYPES from './../messageTypes'

const CLIENT = MESSAGE_TYPES.CLIENT
const BROKER = MESSAGE_TYPES.BROKER
const io = require('socket.io-client')

const messageBroker = {

  init (socketUrl) {
    const socket = io(socketUrl)
    this.socket = socket
    this.messageRecievedHandlers = []
    socket.on('connect', this.onConnect.bind(this))
    socket.on(BROKER.MESSAGE, this.handleIncomingMessage.bind(this))
  },

  onConnect () {
    let visitorId = this.getVisitorId()
    if (!visitorId) {
      visitorId = this.socket.id
      this.setVisitorId(visitorId)
    }
    this.socket.emit(CLIENT.RETURNING_VISITOR, visitorId)
  },

  sendMessage (msg) {
    msg.visitorId = this.getVisitorId()
    msg.teamId = this.getTeamId()
    this.socket.emit(CLIENT.MESSAGE, msg)
  },

  handleIncomingMessage (msg) {
    this.messageRecievedHandlers.forEach(handle => handle(msg))
  },

  onMessageReceived (handler) {
    this.messageRecievedHandlers.push(handler)
  },

  getVisitorId () {
    return localStorage.getItem('CHAT.VISITOR_ID')
  },

  getTeamId () {
    return 1
  },

  getTeamName () {
    return 1
  },

  getImageUrl () {
    return 1
  },

  setVisitorId (visitorId) {
    localStorage.setItem('CHAT.VISITOR_ID', visitorId)
  },
}

export default messageBroker