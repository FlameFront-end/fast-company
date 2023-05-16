import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import Main from './layouts/Main'
import Login from './layouts/Login'
import Users from './layouts/Users'

function App() {
	return (
		<BrowserRouter>
			<NavBar />
			<Routes>
				<Route path='/' element={<Main />} />
				<Route path='/login' element={<Login />} />
				<Route path='/users/:userId?' element={<Users />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
