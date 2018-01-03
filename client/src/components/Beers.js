import React, {Component} from 'react';
import { Segment, Header, Image, Loader, Dimmer, Card, Button, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import beer_image from '../images/beer_image.jpg';
import { fetchBeers } from '../actions/beers';
import InfiniteScroll from 'react-infinite-scroller'
import axios from 'axios';

class Beers extends Component {
state = { page: 1}

componentDidMount() {
  this.props.dispatch(fetchBeers());
}

displayBeers = () => {
  return this.props.beers.map( beer => { 
    return(
      <Card key={beer.name}> 
          {beer.labels ?
          <Image
            centered
            src={beer.labels.medium}
            alt={`${beer.name} logo`}
          />
          :
          <Image
            centered
            src={beer_image}
            alt='Beer placeholder image'
          /> }
          <Card.Content>
            <Card.Header>
              {beer.name}
            </Card.Header>
        </Card.Content>
            <Link to={`/beer/${beer.name}`}>
            <Button> View Description </Button> 
            </Link>
        </Card>
      )
    })
}


loadFunc = () => {
  axios.get(`/api/all_beers?page=${this.state.page + 1}&per_page=10`)
    .then( res => {
      this.props.dispatch({ type: 'MORE_BEERS', beers: res.data.entries});
      this.setState({ page: this.state.page + 1 })
    })
    .catch (err => {
    }) 
}




render() {
  return (
  <Container> 
   <Header as='h1' textAlign='center' style={{color:'white'}} > Beers </Header> 
    <Segment basic style={{height:'700px', overflow:'auto'}}>
      <InfiniteScroll
            pageStart={0}
            loadMore={this.loadFunc}
            hasMore={true || false}
            loader={<div className="loader">Loading ...</div>}
            useWindow={false}
          >
          <Card.Group stackable itemsPerRow={5}> 
            { this.displayBeers() }
          </Card.Group>
       </InfiniteScroll>
    </Segment> 
  </Container> 
    ) 
  }
}

const mapStateToProps = (state) => {
  return { 
    beers: state.beers,
  }
}

export default connect(mapStateToProps)(Beers);