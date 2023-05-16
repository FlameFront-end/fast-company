import React from 'react'
import PropTypes from 'prop-types'
import Bookmark from './Bookmark'
import QualitiesList from './QualitiesList'
import Table from './Table'
import { Link } from 'react-router-dom'

const UsersTable = ({
	users,
	onSort,
	selectedSort,
	onToggleBookMark,
	onDelete
}) => {
	const columns = {
		name: {
			path: 'name',
			name: 'Имя',
			component: user => <Link to={`/users/${user._id}`}>{user.name}</Link>
		},
		qualities: {
			name: 'Качество',
			component: user => <QualitiesList qualities={user.qualities} />
		},
		profession: { path: 'profession.name', name: 'Профессия' },
		completedMeetings: { path: 'completedMeetings', name: 'Встретился, раз' },
		rate: { path: 'rate', name: 'Оценка' },
		bookmark: {
			path: 'bookmark',
			name: 'Избранное',
			component: user => (
				<Bookmark
					status={user.bookmark}
					onClick={() => onToggleBookMark(user._id)}
				/>
			)
		},
		delete: {
			component: user => (
				<button onClick={() => onDelete(user._id)} className='btn btn-danger'>
					Удалить
				</button>
			)
		}
	}
	return (
		<Table
			onSort={onSort}
			selectedSort={selectedSort}
			columns={columns}
			data={users}
		/>
	)
}

UsersTable.propTypes = {
	users: PropTypes.array.isRequired,
	onSort: PropTypes.func.isRequired,
	selectedSort: PropTypes.object.isRequired,
	onToggleBookMark: PropTypes.func.isRequired,
	onDelete: PropTypes.func.isRequired
}

export default UsersTable
