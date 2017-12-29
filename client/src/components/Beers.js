import React, {Component} from 'react';
import { Table, Segment, List, Header} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Beers extends Component {
state = { beers: []}

  componentDidMount() {
    axios.get(`/api/all_beers?page=1&per_page=10`)
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
     <Table.Body > 
       <Table.Row> 
           <Table.Cell width={4} style={{ paddingLeft: '10%'}}>
           <Link to='#'>
           {beer.name}
           </Link> 
           <br />
           </Table.Cell>
           <Table.Cell style={{ paddingRight: '10%'}} width={12}>
           <p> 
           {beer.description}
           </p> 
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