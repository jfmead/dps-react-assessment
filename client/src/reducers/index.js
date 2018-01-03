import { combineReducers } from 'redux';
import breweries from './breweries';
import beers from './beers';
import flash from './flash'

const rootReducer = combineReducers({
  flash,
  breweries,
  beers,
})

export default rootReducer
