import React, {Component} from 'react';
import { Table, Segment, Image, Loader, Dimmer } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setHeaders } from '../actions/headers'
import placeholder from '../images/placeholder.png';
import InfiniteScroll from 'react-infinite-scroller';
import axios from 'axios';

class Breweries extends Component {
state = { breweries: [], loaded: false, page: 1, hasMore: true  }

componentWillMount() { 
  this.fetchBreweries(this.props);
}

componentWillReceiveProps(nextProps) {
  this.setState({ breweries: [], loaded: false, hasMore: true, page: 1 });
  this.fetchBreweries(nextProps, 1);
}

fetchBreweries = (props, page = 1) => {
  const { dispatch } = props;
  axios.get(`/api/all_breweries?page=${page}&per_page=10`)
    .then(res => {
      const { data, headers } = res;
      if(data.page < 5 ) {
        if(data.page === 5)
          this.setState({ hasMore: false });
        this.setState({ breweries: [...this.state.breweries, ...data.entries.breweries], page })
      } else
        this.setState({ breweries: data.entries.breweries, hasMore: false })
      dispatch(setHeaders(headers));
    })
    .catch( err => {
      // dispatch(setFlash('Error Fetching Breweries.', 'red'));
      dispatch(setHeaders(err.headers));
    })
    .then( () => {
      this.setState({ loaded: true });
  });
}


  loadMore = () => {
    this.fetchBreweries(this.props, this.state.page + 1)
  }

  displayBreweries = () => {
    return this.state.breweries.map( brewery => { 
      return(
        <Table.Body> 
          <Table.Row> 
              <Table.Cell>
              <Link to='#' key={brewery.id}> 
              {brewery.name}
              </Link> 
              <br />
              </Table.Cell>
              <Table.Cell>
              {brewery.images ?
                  <Image
                    centered
                    size='medium'
                    src={brewery.images.square_large}
                    alt={`${brewery.name} logo`}
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
            </Table.Row>
         </Table.Body>
        )
     })
  }


render() {
  const { page, loaded, hasMore } = this.state;
  
  if(loaded)
  return (
    <Segment basic>
       <InfiniteScroll
            pageStart={page}
            loadMore={this.loadMore}
            hasMore={hasMore}
            useWindow={false}
          >         
            <Table> 
            {this.displayBreweries()}
            </Table>
         </InfiniteScroll>
    </Segment> 
    ) 
    else
      return(
        <Dimmer active style={{ height: '100vh' }}>
          <Loader>Loading Breweries...</Loader>
        </Dimmer>
     )
  }
}

export default connect()(Breweries);