import React, { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { makeStyles } from '@material-ui/core/styles'
import gql from 'graphql-tag'

import {
	Avatar,
	Container,
	Card,
	CardContent,
	Typography,
	CardActions,
	Button,
	Grid,
	TextField,
	IconButton,
} from '@material-ui/core'
import { Close, CloudUpload, ExitToApp } from '@material-ui/icons'

import { deleteToken } from 'utils'

import './homepage.styles.scss'

const useStyles = makeStyles({
	container: {
		paddingTop: 200,
	},
	card: {
		minWidth: 600,
	},
	cardContent: {
		position: 'relative',
	},
	signOutButton: {
		position: 'absolute',
		top: 16,
		right: 16,
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)',
	},
	title: {
		fontSize: 24,
		fontWeight: 700,
	},
	pos: {
		marginBottom: 12,
	},
	input: {
		width: '100%',
		marginTop: '18px',
	},
	uploadingInput: {
		display: 'none',
	},
	avatarImage: {
		width: '100%',
		height: '100%',
		borderRadius: 6,
	},
	closeImageIcon: {
		position: 'absolute',
		top: 0,
		right: 0,
		zIndex: 2,
		color: '#ffffff',
	},
})

const GET_USER = gql`
	query GetUser {
		me {
			_id
			name
			age
			email
			avatar
		}
	}
`
const UPLOAD_AVATAR = gql`
	mutation UploadAvatar($file: Upload!) {
		singleUpload(file: $file) {
			filename
			mimetype
			encoding
			link
		}
	}
`

const HomePage = ({ history }) => {
	const [username, setUsername] = useState('')
	const [age, setAge] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [avatar, setAvatar] = useState('')

	const { loading, error, data } = useQuery(GET_USER)
	const [uploadAvatar] = useMutation(UPLOAD_AVATAR)

	const {
		avatarImage,
		container,
		card,
		cardContent,
		signOutButton,
		title,
		input,
		uploadingInput,
		closeImageIcon,
	} = useStyles()

	useEffect(
		function() {
			if (data && !email) {
				const { name, age, email, avatar } = data.me
				setUsername(name)
				setEmail(email)
				setAge(age)
				setAvatar(avatar)
			}
		},
		[data, email, error, loading, username]
	)

	const submitInfo = () => {
		console.log(username, password)
	}

	const onUpload = ({ target }) => {
		const file = target.files[0]
		uploadAvatar({ variables: { file } }).then(({ data: { singleUpload } }) => {
			setAvatar(singleUpload.link)
		})
	}

	const signOut = () => {
		deleteToken()
		history.push('/sign-in')
	}

	return (
		<Container maxWidth='md' className={container}>
			<Card className={card} variant='outlined'>
				<CardContent className={cardContent}>
					<Typography className={title} color='primary'>
						User Information
					</Typography>
					<Button
						variant='contained'
						color='secondary'
						component='label'
						className={signOutButton}
						endIcon={<ExitToApp />}
						onClick={signOut}
					>
						Sign out
					</Button>
					<Grid container spacing={3} className='homepage'>
						<Grid item xs={8}>
							<TextField
								value={username}
								onChange={e => setUsername(e.target.value)}
								label='Username'
								type='text'
								className={input}
								required
							/>
							<TextField
								value={email}
								onChange={e => setEmail(e.target.value)}
								label='Email'
								type='text'
								className={input}
							/>
							<TextField
								value={age}
								onChange={e => setAge(e.target.value)}
								label='Age'
								type='text'
								className={input}
							/>
							<TextField
								value={password}
								onChange={e => setPassword(e.target.value)}
								label='Password'
								type='text'
								autoComplete='current-password'
								className={input}
								required
							/>
							<TextField
								value={confirmPassword}
								onChange={e => setConfirmPassword(e.target.value)}
								label='Confirm password'
								type='password'
								className={input}
								required
							/>
						</Grid>
						<Grid item xs={4} className='avatar-container'>
							<div className='avatar'>
								{avatar ? (
									<React.Fragment>
										<Avatar
											alt='Avatar'
											src={avatar}
											variant='square'
											className={avatarImage}
										/>
										<IconButton
											aria-label='upload picture'
											component='span'
											className={closeImageIcon}
											onClick={() => setAvatar('')}
										>
											<Close />
										</IconButton>
									</React.Fragment>
								) : (
									<Button
										variant='contained'
										color='default'
										component='label'
										startIcon={<CloudUpload />}
									>
										Upload
										<input
											accept='image/*'
											className={uploadingInput}
											id='uploading-input'
											onChange={onUpload}
											type='file'
										/>
									</Button>
								)}
							</div>
						</Grid>
					</Grid>
				</CardContent>
				<CardActions>
					<Button
						onClick={submitInfo}
						variant='outlined'
						color='primary'
						size='medium'
					>
						Submit
					</Button>
				</CardActions>
			</Card>
		</Container>
	)
}

export default HomePage
