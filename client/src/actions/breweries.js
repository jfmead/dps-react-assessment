import axios from 'axios';
import { setFlash } from './flash';

const setBreweries = (breweries) => {
  return { type: 'SET_BREWERIES', breweries}
}

export const fetchBreweries = () => {
  return dispatch => {
    axios.get(`/api/all_breweries?per_page=10`)
      .then( res => {
        dispatch(setBreweries(res.data.entries))
      })
      .catch(err => {
        dispatch(setFlash('Error fetching breweries. Try again!', 'red'))
      })
  }
}