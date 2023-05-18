import React, { useState } from 'react'
import LoginForm from '../components/ui/LoginForm'
import { useParams } from 'react-router-dom'
import RegisterForm from '../components/ui/RegisterForm'

const Login = () => {
	const type = useParams()
	const [formType, setFormType] = useState(type === 'register' ? type : 'login')

	const toggleFormType = () => {
		setFormType(prevState => (prevState === 'register' ? 'login' : 'register'))
	}

	return (
		<div className='row'>
			<div className='col-md-6 offset-md-3 p-4 shadow'>
				{formType === 'register' ? (
					<>
						<h3 className='mb-4'>Регистрация</h3>
						<RegisterForm />
						<p className='mt-2'>
							Уже есть аккаунт?
							<span
								onClick={toggleFormType}
								role='button'
								className='link-primary p-lg-1'
							>
								Войти
							</span>
						</p>
					</>
				) : (
					<>
						<h3 className='mb-4'>Вход</h3>
						<LoginForm />
						<p className='mt-2'>
							Ещё нет аккаунта?
							<span
								onClick={toggleFormType}
								role='button'
								className='link-primary p-lg-1'
							>
								Зарегистрироваться
							</span>
						</p>
					</>
				)}
			</div>
		</div>
	)
}

export default Login
