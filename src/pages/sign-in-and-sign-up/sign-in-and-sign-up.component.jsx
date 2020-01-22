import React, { useState } from 'react'
import Card from '@material-ui/core/Card'
import { makeStyles } from '@material-ui/core/styles'
import { Button, ButtonGroup } from '@material-ui/core'

import SignIn from '../../components/sign-in/sign-in.component'
import SignUp from '../../components/sign-up/sign-up.component'

import './sign-in-and-sign-up.styles.scss'

const useStyles = makeStyles({
	cardContainer: {
		width: 300,
		margin: '0 auto',
		padding: 16,
	},
	title: {
		fontSize: 24,
		fontWeight: 700,
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

const SignInAndSignUpPage = ({ location, history }) => {
	const [currentTab, setcurrentTab] = useState('sign-in')
	const { cardContainer } = useStyles()

	const onSignUp = () => {
		setcurrentTab('sign-in')
	}
	return (
		<div className='sign-in'>
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
				{currentTab === 'sign-in' ? (
					<SignIn history={history} />
				) : (
					<SignUp onSignUp={onSignUp} />
				)}
			</Card>
		</div>
	)
}

export default SignInAndSignUpPage
