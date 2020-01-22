import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { CardActions, CardContent, Button, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const CREATE_USER = gql`
	mutation CreateUser($user: CreateUserInput!) {
		createUser(user: $user) {
			name
			age
			email
		}
	}
`

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

const SignUp = ({ onSignUp }) => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [createNewUser] = useMutation(CREATE_USER)
	const { input, cardContent, actions } = useStyles()

	const signUp = () => {
		createNewUser({
			variables: { email, password },
		}).then(() => {
			onSignUp()
		})
	}

	return (
		<React.Fragment>
			<CardContent className={cardContent}>
				<TextField
					value={email}
					onChange={e => setEmail(e.target.value)}
					label='Email'
					type='text'
					className={input}
					required
				/>
				<TextField
					value={password}
					onChange={e => setPassword(e.target.value)}
					label='Password'
					type='password'
					autoComplete='current-password'
					className={input}
					required
				/>
			</CardContent>
			<CardActions className={actions}>
				<Button
					onClick={signUp}
					variant='outlined'
					color='primary'
					size='medium'
				>
					Sign up
				</Button>
			</CardActions>
		</React.Fragment>
	)
}

export default SignUp
