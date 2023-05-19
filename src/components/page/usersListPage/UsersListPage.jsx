import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { paginate } from '../../../utils/paginate'
import Pagination from '../../common/Pagination'
import api from '../../../api'
import GroupList from '../../common/GroupList'
import SearchStatus from '../../ui/SearchStatus'
import UsersTable from '../../ui/UsersTable'
import _ from 'lodash'
import style from '../loader.module.css'

const UsersListPage = () => {
	const [currentPage, setCurrentPage] = useState(1)
	const [professions, setProfession] = useState()
	const [selectedProf, setSelectedProf] = useState()
	const [searchQuery, setSearchQuery] = useState('')
	const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' })
	const pageSize = 8

	const [users, setUsers] = useState()
	useEffect(() => {
		api.users.fetchAll().then(data => setUsers(data))
		api.users.getById().then()
	}, [])
	const handleDelete = userId => {
		setUsers(users.filter(user => user._id !== userId))
	}
	const handleToggleBookMark = id => {
		const newArray = users.map(user => {
			if (user._id === id) {
				return { ...user, bookmark: !user.bookmark }
			}
			return user
		})
		setUsers(newArray)
	}

	useEffect(() => {
		api.professions.fetchAll().then(data => setProfession(data))
	}, [])

	useEffect(() => {
		setCurrentPage(1)
	}, [selectedProf, searchQuery])

	const handleProfessionSelect = item => {
		if (searchQuery !== '') setSearchQuery('')
		setSelectedProf(item)
	}

	const handlePageChange = pageIndex => {
		setCurrentPage(pageIndex)
	}
	const handleSort = item => {
		setSortBy(item)
	}
	const handleSearchQuery = ({ target }) => {
		setSelectedProf(undefined)
		setSearchQuery(target.value)
	}

	if (users) {
		const filteredUsers = searchQuery
			? users.filter(
					user =>
						user.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1
			  )
			: selectedProf
			? users.filter(
					user =>
						JSON.stringify(user.profession) === JSON.stringify(selectedProf)
			  )
			: users

		const count = filteredUsers.length
		const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order])
		const usersCrop = paginate(sortedUsers, currentPage, pageSize)
		const clearFilter = () => {
			setSelectedProf()
		}

		return (
			<div className='d-flex'>
				{professions && (
					<div className='d-flex flex-column flex-shrink-0 p-3'>
						<GroupList
							selectedItem={selectedProf}
							items={professions}
							onItemSelect={handleProfessionSelect}
						/>
						<button className='btn btn-secondary mt-2' onClick={clearFilter}>
							{' '}
							Очистить
						</button>
					</div>
				)}
				<div className='d-flex flex-column'>
					<SearchStatus length={count} />
					<input
						type='text'
						name='searchQuery'
						placeholder='Поиск...'
						className='form-control'
						onChange={handleSearchQuery}
						value={searchQuery}
					/>
					{count > 0 && (
						<UsersTable
							users={usersCrop}
							onSort={handleSort}
							selectedSort={sortBy}
							onDelete={handleDelete}
							onToggleBookMark={handleToggleBookMark}
						/>
					)}
					<div className='d-flex justify-content-center'>
						<Pagination
							itemsCount={count}
							pageSize={pageSize}
							currentPage={currentPage}
							onPageChange={handlePageChange}
						/>
					</div>
				</div>
			</div>
		)
	}
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
UsersListPage.propTypes = {
	users: PropTypes.array
}

export default UsersListPage
