import React, {Component} from 'react';
import { Segment, Header, Image, Loader, Dimmer, Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import placeholder from '../images/placeholder.png'
import InfiniteScroll from 'react-infinite-scroller'
import axios from 'axios';

class Beers extends Component {
state = { beers: [], loaded: false }


  componentDidMount() {
    axios.get(`/api/all_beers?page=1&per_page=10`)
    .then( res => {
      this.setState({ beers: res.data.entries  });      
    })   
    .catch( err => {
      console.log(err);   
    })
  .then( () => {
    this.setState({ loaded: true });
  });
}

loadFunc = () => {
  axios.get(`/api/all_beers?page=${this.state.page + 1}`)
    .then( res => {
      this.props.dispatch({ type: 'MORE_BEERS', Beers: res.data.entries.beers});
      this.setState({ page: this.state.page + 1, hasMore: res.data.entries.has_more})
    })
    .catch (err => {
    }) 
}
  displayBeers = () => {
    return this.state.beers.map( beer => { 
      return(
       <Card key={beer.id}> 
           {beer.labels ?
            <Image
              centered
              src={beer.labels.medium}
              alt={`${beer.name} logo`}
            />
            :
            <Image
              centered
              src={placeholder}
              alt='Brewery placeholder image'
            /> }
            <Card.Content>
              <Card.Header>
                <Link to={`/beer/${beer.name}`}>
                {beer.name}
              </Link>
              </Card.Header>
            {/* <Card.Description>
                 {beer.description}
            </Card.Description> */}
          </Card.Content>
         </Card>
      )
     })
  }


render() {

  if (this.state.loaded) 
  return (
    <Segment basic>
      <Header style={{ color: 'white', textAlign: 'center'}} > Beers </Header> 
      <InfiniteScroll
            pageStart={0}
            loadMore={this.loadFunc}
            hasMore={this.state.hasMore}
            loader={<div className="loader">Loading ...</div>}
            useWindow={false}
          >
      <Card.Group itemsPerRow={5}>
      {this.displayBeers()}
      </Card.Group> 
      </InfiniteScroll>
    </Segment> 
  )
    else
      return(
        <Dimmer active style={{ height: '100vh' }}>
          <Loader>Loading Beers...</Loader>
        </Dimmer>
    )
  }
}

export default Beers;