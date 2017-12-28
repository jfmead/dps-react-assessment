import React, {Component} from 'react';
import { Table, Segment, List} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Breweries extends Component {
state = { breweries: []}

  componentDidMount() {
    axios.get(`/api/all_breweries`)
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



  displayImages = () => {
    {Object.keys(brewery).map(function(key) {
      return <div>Key: {key}, Value: {brewery[medium]}</div>;
       return(
        <Table.Body> 
          <Table.Row> 
              <Table.Cell>
              <Link to='#'> 
              {brewery.images}
              </Link> 
              <br />
              </Table.Cell>
            </Table.Row>
            </Table.Body>
          )
    })}
  }

render() {
  return (
    <Segment basic>
    <Table> 
    {this.displayBreweries()}
    {this.displayImages()}
    </Table>
    </Segment> 
  )
}
}

export default Breweries;