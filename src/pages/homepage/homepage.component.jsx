import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'

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
} from '@material-ui/core'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'

import './homepage.styles.scss'

const useStyles = makeStyles({
	container: {
		paddingTop: 200,
	},
	card: {
		minWidth: 600,
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
	cardContent: {
		padding: 0,
	},
	actions: {
		padding: '16px 0 0',
	},
	avatarContainer: {
		border: '1px dashed #000000',
	},
	uploadingInput: {
		display: 'none',
	},
	avatarImage: {
		width: '100%',
		height: '100%',
		borderRadius: 6,
	},
})

const HomePage = () => {
	const [username, setUsername] = useState('Michael')
	const [password, setPassword] = useState('Daiaisd')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [avatar, setAvatar] = useState('')
	const {
		avatarImage,
		container,
		card,
		title,
		input,
		cardContent,
		actions,
		avatarContainer,
		uploadingInput,
	} = useStyles()

	const submitInfo = () => {
		console.log(username, password)
	}

	const onUpload = ({ target }) => {
		const fileReader = new FileReader()
		const name = target.accept.includes('image') ? 'images' : 'videos'

		fileReader.readAsDataURL(target.files[0])
		fileReader.onload = e => {
			console.log(e.target)
			setAvatar(e.target.result)
		}
	}
	return (
		<Container maxWidth='md' className={container}>
			<Card className={card} variant='outlined'>
				<CardContent>
					<Typography className={title} color='primary'>
						User Information
					</Typography>
					<Grid container spacing={3} className='homepage'>
						<Grid item xs={8}>
							<TextField
								id='standard-password-input'
								value={username}
								onChange={e => setUsername(e.target.value)}
								label='Username'
								type='text'
								className={input}
							/>
							<TextField
								id='standard-password-input'
								value={password}
								onChange={e => setPassword(e.target.value)}
								label='Password'
								type='text'
								autoComplete='current-password'
								className={input}
							/>
							<TextField
								id='standard-password-input'
								value={confirmPassword}
								onChange={e => setConfirmPassword(e.target.value)}
								label='Confirm password'
								type='password'
								className={input}
							/>
						</Grid>
						<Grid item xs={4} className='avatar-container'>
							<div className='avatar'>
								{avatar ? (
									<Avatar
										alt='Avatar'
										src={avatar}
										variant='square'
										className={avatarImage}
									/>
								) : (
									<Button
										variant='contained'
										color='default'
										component='label'
										startIcon={<CloudUploadIcon />}
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
