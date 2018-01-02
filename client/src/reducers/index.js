import { combineReducers } from 'redux';
import breweries from './breweries'
import flash from './flash'

const rootReducer = combineReducers({
  flash,
  breweries,
})

export default rootReducer
