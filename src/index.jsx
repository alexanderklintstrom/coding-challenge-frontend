import React from 'react'
import ReactDOM from 'react-dom'
import attachFastClick from 'fastclick'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { RestLink } from 'apollo-link-rest'
import { InMemoryCache } from 'apollo-cache-inmemory'
import Root from './components/Root'

const rootEl = document.getElementById('root')
// Remove 300ms tap delay on mobile devices
attachFastClick.attach(document.body)

const client = new ApolloClient({
  link: new RestLink({ uri: process.env.BIKEWISE_API_URL }),
  cache: new InMemoryCache(),
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <Root client={client} />
  </ApolloProvider>,
  rootEl,
)
