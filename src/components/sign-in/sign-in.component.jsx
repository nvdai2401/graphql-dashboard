import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { makeStyles } from '@material-ui/core/styles'

import { setToken } from '../../utils'

import { CardActions, CardContent, Button, TextField } from '@material-ui/core'

import Loader from 'components/loader/loader.component'

const useStyles = makeStyles({
	cardContainer: {
		width: 300,
		margin: '20px auto',
		padding: 16,
	},
	input: {
		width: '100%',
		marginTop: '18px',
	},
	cardContent: {
		padding: 0,
	},
	actions: {
		padding: '16px 0 0',
	},
})

const LOG_IN = gql`
	mutation Login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			token
		}
	}
`

const SignIn = ({ history }) => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const { input, cardContent, actions } = useStyles()

	const [login, authPayload] = useMutation(LOG_IN)

	const signIn = () => {
		login({
			variables: { email, password },
		})
			.then(({ data: { login: token } }) => {
				console.log(token)
				if (token) {
					setToken(token.token)
					history.push('/')
				}
			})
			.catch(err => console.error(err))
		console.log(email, password, authPayload)
	}
	if (authPayload.loading) return <Loader />
	// if (authPayload.error) return <p>{authPayload.error}</p>

	return (
		<React.Fragment>
			<CardContent className={cardContent}>
				<TextField
					value={email}
					onChange={e => setEmail(e.target.value)}
					label='Email'
					type='text'
					autoFocus
					autoComplete='true'
					className={input}
				/>
				<TextField
					value={password}
					onChange={e => setPassword(e.target.value)}
					label='Password'
					type='password'
					autoComplete='true'
					className={input}
				/>
			</CardContent>
			<CardActions className={actions}>
				<Button
					onClick={signIn}
					variant='outlined'
					color='primary'
					size='medium'
				>
					Sign in
				</Button>
			</CardActions>
		</React.Fragment>
	)
}

export default SignIn
