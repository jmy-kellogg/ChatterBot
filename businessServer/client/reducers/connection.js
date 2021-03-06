function connection(state={}, action){
  switch(action.type){
    case 'UPDATE_CONNECTIONS_TO':
      var newState = {...state};
      action.conns.forEach(conn => {
        newState[conn.id].toId = action.nodeId;
      })
      return newState;
    case 'LOAD_CONNECTIONS':
      var newState = {};
      action.connections.forEach(conn => {
        newState[conn.id] = conn;
      })
      return newState;

    case 'REMOVE_CONNECTIONS':
      var newState = {...state}
      action.connections.forEach(connId => {
        delete newState[connId];
      })
      return newState;
      break;

    case 'ADD_PRODUCT':
      var newState = {...state};
      newState[action.id] = {
        answer: action.answer,
        id: action.id,
        fromId: action.fromId,
        businessId: action.businessId,
        price: action.price,
        description: action.description,
        productId: action.productId
      }

      return newState;
      break;

    case 'ADD_ANSWER':
      var newState = {...state};
      newState[action.connId] = {
        answer: action.answer,
        id: action.connId,
        fromId: action.fromId,
        businessId: action.businessId,
        price: action.price,
        description: action.description,
        toId: action.toId
      }
      return newState;
      break;

    case 'ADD_NODE':
      // var newState = [...state];
      if(action.connId){
        var newState = {...state};
        newState[action.connId].toId = action.newNodeId;
        return newState;
      }
      else{
        return state;
      }

      break;
    default:
      return state;
  }
}

export default connection
