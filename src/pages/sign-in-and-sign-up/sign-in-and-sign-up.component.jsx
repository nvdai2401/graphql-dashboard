import React, { useState } from 'react'
import Card from '@material-ui/core/Card'
import { makeStyles } from '@material-ui/core/styles'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'

import SignIn from '../../components/sign-in/sign-in.component'
import SignUp from '../../components/sign-up/sign-up.component'

import './sign-in-and-sign-up.styles.scss'

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

const SignInAndSignUpPage = () => {
	const [currentTab, setcurrentTab] = useState('sign-in')
	const { cardContainer, input, cardContent, actions } = useStyles()
	return (
		<div className='sign-in'>
			<h2>Sign in page</h2>

			<Card className={cardContainer}>
				<ButtonGroup variant='text' color='primary'>
					<Button
						className={`${currentTab === 'sign-in' ? '' : 'in-active'}`}
						onClick={() => setcurrentTab('sign-in')}
					>
						Sign in
					</Button>
					<Button
						className={`${currentTab === 'sign-up' ? '' : 'in-active'}`}
						onClick={() => setcurrentTab('sign-up')}
					>
						Sign up
					</Button>
				</ButtonGroup>
				{currentTab === 'sign-in' ? <SignIn /> : <SignUp />}
			</Card>
		</div>
	)
}

export default SignInAndSignUpPage
