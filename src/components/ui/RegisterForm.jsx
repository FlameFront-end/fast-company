import React, { useEffect, useState } from 'react'
import { validator } from '../../utils/validator'
import TextField from '../common/form/TextField'
import api from '../../api'
import SelectField from '../common/form/SelectField'
import RadioField from '../common/form/RadioField'

const RegisterForm = () => {
	const [data, setData] = useState({
		email: '',
		password: '',
		profession: '',
		sex: 'Male'
	})
	const [errors, setErrors] = useState({})
	const [professions, setProfession] = useState()

	useEffect(() => {
		api.professions.fetchAll().then(data => setProfession(data))
	}, [])

	useEffect(() => {
		console.log(professions)
	}, [professions])

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
		},
		profession: {
			isRequired: {
				message: 'Поле обязательно для заполнения!'
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
			<SelectField
				value={data.profession}
				onChange={handleChange}
				options={professions}
				defaultOption='Выберите профессию'
				label='Профессия'
				error={errors.profession}
			/>
			<RadioField
				onChange={handleChange}
				options={[
					{ name: 'Мужчина', value: 'Male' },
					{ name: 'Женщина', value: 'Female' },
					{ name: 'Другое', value: 'Other' }
				]}
				name='sex'
				value={data.sex}
			/>
			<button
				type='submit'
				disabled={!isValid}
				className='btn btn-primary w-100 mx-auto'
			>
				Зарегистрироваться
			</button>
		</form>
	)
}

export default RegisterForm
