import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'
import { createHttpLink } from 'apollo-link-http'
import { getToken } from './utils'

const httpLink = createHttpLink({
	uri: 'http://172.76.10.161:4000/graphql',
})

const authLink = setContext((_, { headers }) => {
	// get the authentication token from local storage if it exists
	const token = getToken()
	// return the headers to the context so httpLink can read them
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : '',
		},
	}
})

const cache = new InMemoryCache()

const client = new ApolloClient({
	cache,
	link: authLink.concat(httpLink),
})

export default client
