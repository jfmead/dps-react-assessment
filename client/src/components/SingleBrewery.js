import React, {Component} from 'react';
import { Image, Item} from 'semantic-ui-react';
import placeholder from '../images/placeholder.png'
import axios from 'axios'

class SingleBrewery extends Component {
  state = { brewery: [], loaded: false }; 

  componentDidMount() { 
    const name = this.props.match.params.name;
    axios.get(`/api/brewery/${name}`)
      .then( res => {
        this.setState({ brewery: res.data.entries, loaded: true });
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
           {this.state.brewery[0].labels ?
            <Image
              centered
              src={this.state.brewery[0].labels.medium}
              alt={`${this.state.brewery[0].name} logo`}
            />
            :
            <Image
              centered
              src={placeholder}
              alt='Brewery placeholder image'
            /> }
          <Item.Content>
            <Item.Header> {this.state.brewery[0].name} </Item.Header>
            <Item.Meta>
              Organic: {this.state.brewery[0].is_organic}
            </Item.Meta>
            <Item.Description>{this.state.brewery[0].description} </Item.Description>
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

export default SingleBrewery; 