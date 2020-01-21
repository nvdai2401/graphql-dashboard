import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'

import HomePage from './pages/homepage/homepage.component'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'

import { getToken } from './utils'

import './App.scss'

class App extends React.Component {
	componentDidMount() {
		this.onRouteChanged()
		console.log(this.props)
	}
	componentDidUpdate(prevProps) {
		if (this.props.location !== prevProps.location) {
			this.onRouteChanged()
		}
	}

	onRouteChanged() {
		const authToken = getToken()
		if (!authToken && this.props.location.pathname !== '/sign-in') {
			this.props.history.push('/sign-in')
			return
		}
	}

	render() {
		return (
			<div className='App'>
				<Switch>
					<Route exact path='/' component={HomePage} />
					<Route
						exact
						path='/sign-in'
						component={SignInAndSignUpPage}
						{...this.props}
					/>
					<Route
						exact
						path='/sign-up'
						component={SignInAndSignUpPage}
						{...this.props}
					/>
				</Switch>
			</div>
		)
	}
}

export default withRouter(App)
