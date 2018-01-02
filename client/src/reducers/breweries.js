const breweries = (state = [], action) => {
  switch(action.type) {
    case 'SET_BREWERIES':
      return action.breweries
    case 'MORE_BREWERIES':
      return [...state, ...action.breweries]
    default:
      return state;
  }
}

export default breweries; 