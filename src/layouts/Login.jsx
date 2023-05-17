import React, { useEffect, useState } from 'react'
import TextField from '../components/TextField'
import { validator } from '../utils/validator'

const Login = () => {
	const [data, setData] = useState({ email: '', password: '' })
	const [errors, setErrors] = useState({})
	const handleChange = ({ target }) => {
		setData(prevState => ({ ...prevState, [target.name]: target.value }))
	}

	const validatorConfig = {
		email: {
			isRequired: { message: 'Электронная почта обязательная для заполнения!' },
			isEmail: { message: 'Email введён некорректно!' }
		},
		password: {
			isRequired: { message: 'Пароль обязателен для заполнения!' },
			isCapitalSymbol: {
				message: 'Пароль должен содержать хотя бы одну заглавную букву!'
			},
			isContainDigit: {
				message: 'Пароль должен содержать хотя бы одно число!'
			},
			min: {
				message: 'Пароль должен состоять минимум из 8 символов!',
				value: 8
			}
		}
	}

	const validate = () => {
		const errors = validator(data, validatorConfig)
		setErrors(errors)
		return Object.keys(errors).length === 0
	}

	useEffect(() => {
		validate()
	}, [data])

	const handleSubmit = e => {
		e.preventDefault()
		const isValidate = validate()
		if (!isValidate) return
		console.log(data)
	}

	const isValid = Object.keys(errors).length === 0

	return (
		<div className='row'>
			<div className='col-md-6 offset-md-3 p-4 shadow'>
				<h3 className='mb-4'>Логин</h3>
				<form onSubmit={handleSubmit}>
					<TextField
						label='Почта'
						name='email'
						type='text'
						value={data.email}
						error={errors.email}
						onChange={handleChange}
					/>
					<TextField
						label='Пароль'
						name='password'
						type='password'
						value={data.password}
						error={errors.password}
						onChange={handleChange}
					/>
					<button
						type='submit'
						disabled={!isValid}
						className='btn btn-primary w-100 mx-auto'
					>
						Отправить
					</button>
				</form>
			</div>
		</div>
	)
}

export default Login
