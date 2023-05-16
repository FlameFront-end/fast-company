import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
	return (
		<ul className='nav d-flex align-items-center justify-content-center pb-4 gap-3'>
			<li className='nav-item'>
				<Link className='nav-link' to='/'>
					Главная
				</Link>
			</li>
			<li className='nav-item'>
				<Link className='nav-link' to='/login'>
					Логин
				</Link>
			</li>
			<li className='nav-item'>
				<Link className='nav-link' to='/users'>
					Пользователи
				</Link>
			</li>
		</ul>
	)
}

export default NavBar
