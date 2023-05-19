import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import api from '../../../api'
import QualitiesList from '../../ui/qualities/QualitiesList'
import { useNavigate } from 'react-router-dom'
import style from '../loader.module.css'

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
	} else
		return (
			<div className={style.loader_wrapper}>
				<svg
					className={style.pl}
					viewBox='0 0 200 200'
					width='200'
					height='200'
					xmlns='http://www.w3.org/2000/svg'
				>
					<defs>
						<linearGradient id='pl-grad1' x1='1' y1='0.5' x2='0' y2='0.5'>
							<stop offset='0%' stop-color='hsl(313,90%,55%)' />
							<stop offset='100%' stop-color='hsl(223,90%,55%)' />
						</linearGradient>
						<linearGradient id='pl-grad2' x1='0' y1='0' x2='0' y2='1'>
							<stop offset='0%' stop-color='hsl(313,90%,55%)' />
							<stop offset='100%' stop-color='hsl(223,90%,55%)' />
						</linearGradient>
					</defs>
					<circle
						className={style.pl__ring}
						cx='100'
						cy='100'
						r='82'
						fill='none'
						stroke='url(#pl-grad1)'
						stroke-width='36'
						stroke-dasharray='0 257 1 257'
						stroke-dashoffset='0.01'
						stroke-linecap='round'
						transform='rotate(-90,100,100)'
					/>
					<line
						className={style.pl__ball}
						stroke='url(#pl-grad2)'
						x1='100'
						y1='18'
						x2='100.01'
						y2='182'
						stroke-width='36'
						stroke-dasharray='1 165'
						stroke-linecap='round'
					/>
				</svg>
			</div>
		)
}

UserPage.propTypes = {
	userId: PropTypes.string.isRequired
}

export default UserPage
