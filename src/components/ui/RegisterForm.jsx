import React, { useEffect, useState } from 'react'
import { validator } from '../../utils/validator'
import TextField from '../common/form/TextField'
import api from '../../api'
import SelectField from '../common/form/SelectField'
import RadioField from '../common/form/RadioField'
import MultiSelectField from '../common/form/MultiSelectField'
import CheckBoxField from '../common/form/checkBoxField'

const RegisterForm = () => {
	const [data, setData] = useState({
		email: '',
		password: '',
		profession: '',
		sex: 'Male',
		qualities: [],
		license: false
	})

	const [qualities, setQualities] = useState({})
	const [errors, setErrors] = useState({})
	const [professions, setProfession] = useState({})

	useEffect(() => {
		api.professions.fetchAll().then(data => setProfession(data))
		api.qualities.fetchAll().then(data => setQualities(data))
	}, [])

	useEffect(() => {}, [professions])

	const handleChange = target => {
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
		},
		license: {
			isRequired: {
				message:
					'Вы не можете использовать наш сервис без подтверждения лицензионного соглашения!'
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
				label='Выберите ваш пол'
			/>
			<MultiSelectField
				options={qualities}
				onChange={handleChange}
				name='qualities'
				label='Выберите ваши качества'
			/>
			<CheckBoxField
				value={data.license}
				onChange={handleChange}
				name='license'
				error={errors.license}
			>
				{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
				Подтвердить{' '}
				<a href='#' className='link-primary'>
					лицензионное соглашение
				</a>
			</CheckBoxField>
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
