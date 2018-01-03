import React, {Component} from 'react';
import { Image, Item} from 'semantic-ui-react';
import beer_image from '../images/beer_image.jpg'
import axios from 'axios'

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
      <Item.Group> 
        <Item style={{ backgroundColor: 'white', color: 'black', padding: '10%' }}>
           {this.state.beer[0].labels ?
            <Image
              centered
              src={this.state.beer[0].labels.medium}
              alt={`${this.state.beer[0].name} logo`}
            />
            :
            <Image
              centered
              src={beer_image}
              alt='Brewery placeholder image'
            /> }
          <Item.Content>
            <Item.Header> {this.state.beer[0].name} </Item.Header>
            <Item.Meta>
              Organic: {this.state.beer[0].is_organic}
            </Item.Meta>
            <Item.Description>{this.state.beer[0].description} </Item.Description>
          </Item.Content>
       </Item>
            </Item.Group>
        )
    } else {
      return(

        <div>loading</div>
      )
    }
  }
}

export default SingleBeer; 