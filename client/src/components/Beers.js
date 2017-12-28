import React, {Component} from 'react';
import { Table, Segment, List, Header} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Beers extends Component {
state = { beers: []}

  componentDidMount() {
    axios.get(`/api/all_beers`)
    .then( res => {
      this.setState({ beers: res.data.entries });
    })
    .catch( err => {
      console.log(err);
  });
  }

  displayBeers = () => {
    return this.state.beers.map( beer => {
      return(
     <Table.Body> 
       <Table.Row> 
           <Table.Cell>
           <Link to='#'> 
           {beer.name}
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
    <Header style={{ color: 'white', textAlign: 'center'}} > Beers </Header> 
    <Table> 
    {this.displayBeers()}
    </Table>
    </Segment> 
  )
}
}

export default Beers;