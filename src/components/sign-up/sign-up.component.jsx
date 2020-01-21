import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { makeStyles } from '@material-ui/core/styles'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

const CREATE_USER = gql`
	mutation CreateUser($user: CreateUserInput!) {
		createUser(user: $user) {
			_id
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

const SignUp = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [createNewUser, payload] = useMutation(CREATE_USER)
	const { input, cardContent, actions } = useStyles()

	const signUp = () => {
		console.log(email, password)
		createNewUser({
			variables: { email, password },
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
				/>
				<TextField
					value={password}
					onChange={e => setPassword(e.target.value)}
					label='Password'
					type='password'
					autoComplete='current-password'
					className={input}
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
