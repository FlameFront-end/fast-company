import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NavBar from './components/ui/NavBar'
import Main from './layouts/Main'
import Login from './layouts/Login'
import Users from './layouts/Users'

function App() {
	return (
		<BrowserRouter>
			<NavBar />
			<Routes>
				<Route path='/' element={<Main />} />
				<Route path='/login/:type?' element={<Login />} />
				<Route path='/users/:userId?/:edit?' element={<Users />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
