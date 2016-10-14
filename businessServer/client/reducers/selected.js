function selected(state=[], action){
  switch(action.type){
    case 'LOAD_NODES':
      var newState = [];
      return newState;
    case 'CHANGE_SELECTED':
      var newState = [...state];
      console.log(action.layer);
      var layer = action.layer - 1;

      newState[layer] = action.connection;


      for(var x = layer+1; x < newState.length; x++){
        newState[x] = null;
      }
      console.log(newState);
      return newState;
      break;
    default:
      return state;
      break;
  }

}

export default selected;


