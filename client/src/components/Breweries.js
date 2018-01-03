import React, {Component} from 'react';
import { Segment, Image, Container, Card, Header, Button, Dimmer, Loader } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchBreweries } from '../actions/breweries';
import placeholder from '../images/placeholder.png';
import InfiniteScroll from 'react-infinite-scroller';
import axios from 'axios';
import SearchBreweries from './SearchBreweries';

class Breweries extends Component {
state = { page: 1, loaded: false }

componentDidMount() {
  this.props.dispatch(fetchBreweries());
  this.setState({loaded: true}) 
}

displayBreweries = () => {
  return this.props.breweries.map( brewery => {
    return(
      <Card key={brewery.name}>
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
      this.props.dispatch({ type: 'MORE_BREWERIES', breweries: res.data.entries});
      this.setState({ page: this.state.page + 1 })
    })
    .catch (err => {
    }) 
}

render() {
  if (this.state.loaded)
  return (
  <Container> 
  <div> 
      <SearchBreweries />
   <Header as='h1' textAlign='center' style={{color:'white', paddingTop: '5%'}} > Breweries </Header> 
    </div>
    <Segment basic style={{height:'700px', overflow:'auto'}}>
      <InfiniteScroll
            pageStart={0}
            loadMore={this.loadFunc}
            hasMore={ true || false }
            loader={<div className="loader">Loading ...</div>}
            useWindow={false}
          >
          <Card.Group stackable itemsPerRow={5}> 
            { this.displayBreweries() }
          </Card.Group>
       </InfiniteScroll>
    </Segment> 
  </Container> 
    ) 
   else
    return(
      <Dimmer active style={{ height: '100vh' }}>
        <Loader>Loading Breweries...</Loader>
      </Dimmer>
  )
  }
}

const mapStateToProps = (state) => {
  return { 
    breweries: state.breweries,
  }
}

export default connect(mapStateToProps)(Breweries);