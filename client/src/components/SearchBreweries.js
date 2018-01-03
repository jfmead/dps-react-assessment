import _ from 'lodash'
import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import fetchBreweries from '../actions/breweries'
import { Search, Grid, Header } from 'semantic-ui-react'

const source = ( () => ({
  //grab data from 'api/all_breweries'
  //but this isn't a class 

}))

class SearchBreweries extends Component {

  componentWillMount() {
    this.resetComponent()
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

  handleResultSelect = (e, { result }) => this.setState({ value: result.title })

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.title)

      this.setState({
        isLoading: false,
        results: _.filter(source, isMatch),
      })
    }, 500)
  }

  render() {
    const { isLoading, value, results } = this.state

    return (
      <Grid style={{paddingTop: '5%', height: '50px'}}>
        <Grid.Column width={8} >
          <Search
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={this.handleSearchChange}
            results={results}
            value={value}
            {...this.props}
          />
        </Grid.Column>
        {/* <Grid.Column width={8}>
          <Header>State</Header>
          <pre>{JSON.stringify(this.state, null, 2)}</pre>
          <Header>Options</Header>
          <pre>{JSON.stringify(source, null, 2)}</pre>
        </Grid.Column> */}
      </Grid>
    )
  }
}

export default connect()(SearchBreweries);