import React, {Component} from 'react';
import { Container, Header } from 'semantic-ui-react';
import axios from 'axios';

class SingleBeer extends Component {
  state = { beer: {} }; 

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
    const { beer } = this.state;
    return (
      <div style={{color: 'white'}}> 
        <Container> 
        <p> Here is a beer </p>
        <Header style={{ color: 'white'}}> {beer.description} </Header> 
        <Header> {beer.id} </Header> 
        </Container> 
       </div>
      )
  }
}

export default SingleBeer; 