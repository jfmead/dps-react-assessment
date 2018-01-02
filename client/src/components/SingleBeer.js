import React, {Component} from 'react';
import { Container, Header, Image, Card, Segment, Grid} from 'semantic-ui-react';
import placeholder from '../images/placeholder.png'
import axios from 'axios';

class SingleBeer extends Component {
  state = { beer: [], loaded: false }; 

  componentDidMount() { 
    const name = this.props.match.params.name;
    axios.get(`/api/beer/${name}`)
      .then( res => {
        this.setState({ beer: res.data.entries, loaded: true });
      })
      .catch( err => {
        console.log(err);
    });
  }

  render() {
    if (this.state.loaded){
      return (
        <Segment basic> 
          <Card>
          {this.state.beer[0].labels ?
            <Image
              centered
              src={this.state.beer[0].labels.medium}
              alt={`${this.state.beer[0].name} logo`}
            />
            :
            <Image
              centered
              src={placeholder}
              alt='Brewery placeholder image'
            /> }
              <Card.Content>
              <Card.Header>
                {this.state.beer[0].name}
              </Card.Header>
            <Card.Description>
              {this.state.beer[0].description}
            </Card.Description>
            <Card.Meta>
              Organic: {this.state.beer[0].is_organic}
            </Card.Meta>
          </Card.Content>
          </Card>
        </Segment> 
        )
    } else {
      return(

        <div>loading</div>
      )
    }
  }
}

export default SingleBeer; 