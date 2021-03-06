import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'
import { createUploadLink } from 'apollo-upload-client'
import { getToken } from './utils'
import localConfigs from './configs.local'
import yourLocalConfigs from './your-configs.local'

const httpLink = createUploadLink({
	uri: localConfigs.APOLLO_SERVER || yourLocalConfigs.APOLLO_SERVER,
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
