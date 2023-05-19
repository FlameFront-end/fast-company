import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import api from '../../../api'
import QualitiesList from '../../ui/qualities/QualitiesList'
import { useNavigate } from 'react-router-dom'
import Loader from '../../common/Loader/Loader'

const UserPage = ({ userId }) => {
	const navigate = useNavigate()
	const [user, setUser] = useState()
	useEffect(() => {
		api.users.getById(userId).then(data => setUser(data))
	})

	const handleClick = () => {
		navigate('/users')
	}

	if (user) {
		return (
			<div className='d-flex align-items-center flex-column gap-3'>
				<h1>{user.name}</h1>
				<h3>Профессия: {user.profession.name}</h3>
				<h3>Завершенные встречи: {user.completedMeetings}</h3>
				<h3>Рейтинг: {user.rate}</h3>
				<div>{<QualitiesList qualities={user.qualities} />}</div>
				<button className='btn btn-primary' onClick={() => handleClick()}>
					Все пользователи
				</button>
			</div>
		)
	} else return <Loader />
}

UserPage.propTypes = {
	userId: PropTypes.string.isRequired
}

export default UserPage
