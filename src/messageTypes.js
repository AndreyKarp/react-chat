const MESSAGE_TYPES = {
  CLIENT: {
    NEW_VISITOR: 'chat.client.new_visitor',
    MESSAGE: 'chat.client.message',
    RETURNING_VISITOR: 'chat.client.returning_visitor',
  },
  BROKER: {
    VISITOR_ID: 'chat.broker.visitor_id',
    MESSAGE: 'chat.broker.message',
  },
};

module.exports = MESSAGE_TYPES;
