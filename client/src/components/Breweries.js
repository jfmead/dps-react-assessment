import React, {Component} from 'react';
import { Segment, Image, Loader, Dimmer, Container, Card, Header, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setHeaders } from '../actions/headers';
import { fetchBreweries } from '../actions/breweries';
import SearchBreweries from './SearchBreweries'
import placeholder from '../images/placeholder.png';
import InfiniteScroll from 'react-infinite-scroller';
import axios from 'axios';

class Breweries extends Component {
state = { page: 1, hasMore: true, loaded: false}

componentDidMount() {
  this.props.dispatch(fetchBreweries(this.state.page));
}


  displayBreweries = () => {
    return this.props.breweries.map( brewery => {
      return(
        <Card key={brewery.id}>
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
          <Card.Content>
            <Card.Header>
              {brewery.name}
            </Card.Header>
          </Card.Content>
          <Link to={`/brewery/${brewery.name}`}>
          <Button> View Description </Button> 
          </Link>
        </Card>
        )
     })
  }

loadFunc = () => {
  axios.get(`/api/all_breweries?page=${this.state.page + 1}&per_page=10`)
    .then( res => {
      this.props.dispatch({ type: 'MORE_BREWERIES', breweries: res.data.entries.breweries});
      this.setState({ page: this.state.page + 1, hasMore: res.data.entries.has_more})
    })
    .catch (err => {
    }) 
}

render() {
  return (
  <Container> 
    <Segment basic style={{height:'700px', overflow:'auto'}}>
      <Header as='h1' textAlign='center' style={{color:'white'}} > Breweries </Header> 
      <InfiniteScroll
            pageStart={0}
            loadMore={this.loadFunc}
            hasMore={this.state.hasMore}
            loader={<div className="loader">Loading ...</div>}
            useWindow={false}
          >
          <Card.Group itemsPerRow={5}> 
            { this.displayBreweries() }
          </Card.Group>
       </InfiniteScroll>
    </Segment> 
  </Container> 
    ) 
  }
}

const mapStateToProps = (state) => {
  return { 
    breweries: state.breweries,
  }
}

export default connect(mapStateToProps)(Breweries);