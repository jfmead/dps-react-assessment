import React, {Component} from 'react';
import { Table, Segment, List, Header, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import placeholder from '../images/placeholder.png'
import ReactPaginate from 'react-paginate';
import axios from 'axios';

class Beers extends Component {
state = { beers: [], data: [], offset: 0 }


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
       <Table.Row key={beer.id}> 
           <Table.Cell width={4} style={{ paddingLeft: '10%'}}>
           {beer.labels ?
            <Image
              centered
              size='medium'
              src={beer.labels.medium}
              alt={`${beer.name} logo`}
            />
            :
            <Image
              centered
              src={placeholder}
              size="medium"
              alt='Brewery placeholder image'
            /> }
           <br />
           </Table.Cell>
           <Table.Cell width={4} style={{ paddingLeft: '10%'}}>
           <Link to={`/beer/${beer.name}`}>
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
      )
     })
  }

  handlePageClick = (data) => {
    let selected = data.selected;
    let offset = Math.ceil(selected * this.props.perPage);

    this.setState({offset: offset}, () => {
      this.displayBeers();
    });
  };

render() {
  return (
    <Segment basic>
    <Header style={{ color: 'white', textAlign: 'center'}} > Beers </Header> 
    <Table> 
    <Table.Body>
    {this.displayBeers()}
    </Table.Body> 
    </Table>
    <ReactPaginate previousLabel={"previous"}
                       nextLabel={"next"}
                       breakLabel={<a href="">...</a>}
                       breakClassName={"break-me"}
                       pageCount={this.state.pageCount}
                       marginPagesDisplayed={2}
                       pageRangeDisplayed={5}
                       onPageChange={this.handlePageClick}
                       containerClassName={"pagination"}
                       subContainerClassName={"pages pagination"}
                       activeClassName={"active"}
                        />
    </Segment> 
  )
}
}

export default Beers;