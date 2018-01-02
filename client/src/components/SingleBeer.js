import React, {Component} from 'react';
import { Container, Header } from 'semantic-ui-react';
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
        <div style={{color: 'white'}}> 
          <Container> 
          <p> Here is a beer </p>
          <p> {this.state.beer[0].name} </p> 
          <p> {this.state.beer[0].id} </p> 
          </Container> 
         </div>
        )
    } else {
      return(

        <div>loading</div>
      )
    }
  }
}

export default SingleBeer; 