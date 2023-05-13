import React, { useEffect, useState } from 'react'
import User from './User'
import Pagination from './Pagination'
import { paginate } from '../utils/paginate'
import PropTypes from 'prop-types'
import GroupList from './GroupList'
import api from '../api'

const Users = ({ users: allUsers, ...rest }) => {
	const count = allUsers.length
	const pageSize = 4
	const [currentPage, setCurrentPage] = useState(1)
	const [professions, setProfessions] = useState()
	const [selectedProf, setSelectedProf] = useState()
	useEffect(() => {
		api.professions.fetchAll().then(data => {
			setProfessions(data)
		})
	}, [])

	const handleProfessionSelect = item => {
		setSelectedProf(item)
	}
	const handlePageChange = pageIndex => {
		setCurrentPage(pageIndex)
	}
	const filteredUsers = selectedProf
		? allUsers.filter(user => user.profession === selectedProf)
		: allUsers
	const userCrop = paginate(filteredUsers, currentPage, pageSize)

	const clearFilter = () => {
		setSelectedProf(undefined)
	}

	return (
		<>
			{professions && (
				<>
					<GroupList
						selectedItem={selectedProf}
						items={professions}
						onItemSelect={handleProfessionSelect}
					/>
					<button
						className='btn btn-secondary mt-2'
						onClick={() => clearFilter()}
					>
						Все профессии
					</button>
				</>
			)}
			{count > 0 && (
				<table className='table'>
					<thead>
						<tr>
							<th scope='col'>Имя</th>
							<th scope='col'>Качества</th>
							<th scope='col'>Профессия</th>
							<th scope='col'>Встретился, раз</th>
							<th scope='col'>Оценка</th>
							<th scope='col'>Избранное</th>
							<th />
						</tr>
					</thead>
					<tbody>
						{userCrop.map(user => (
							<User key={user._id} {...rest} {...user} />
						))}
					</tbody>
				</table>
			)}
			<Pagination
				itemsCount={count}
				pageSize={pageSize}
				currentPage={currentPage}
				onPageChange={handlePageChange}
			/>
		</>
	)
}

Users.propTypes = {
	users: PropTypes.array
}
export default Users
