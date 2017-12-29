import React, {Component} from 'react';
import { Table, Segment, List} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import axios from 'axios';

class Breweries extends Component {
state = { breweries: [], images: ''}

  componentDidMount() {
    axios.get(`/api/all_breweries?page=1&per_page=10`)
    .then( res => {
      this.setState({ breweries: res.data.entries });
    })
    .catch( err => {
      console.log(err);
  });
  }

  displayBreweries = () => {
    return this.state.breweries.map( brewery => { 
      return(
     <Table.Body> 
       <Table.Row> 
           <Table.Cell>
           <Link to='#'> 
           {brewery.name}
           </Link> 
           <br />
           </Table.Cell>
         </Table.Row>
         </Table.Body>
      )
     })
  }



render() {
  return (
    <Segment basic>
    <Table> 
    {this.displayBreweries()}
    </Table>
    </Segment> 
  )
}
}

export default Breweries;