export function validator(data, config) {
	const errors = {}
	function validate(validatedMethod, data, config) {
		let statusValidate
		switch (validatedMethod) {
			case 'isRequired':
				if (typeof data === 'boolean') {
					statusValidate = !data
				} else {
					statusValidate = data.trim() === ''
				}
				break
			case 'isEmail': {
				const emailRegExp = /^\S+@\S+\.\S+$/g
				statusValidate = !emailRegExp.test(data)
				break
			}
			case 'isCapitalSymbol': {
				const capitalRegExp = /[A-Z]+/g
				statusValidate = !capitalRegExp.test(data)
				break
			}
			case 'isContainDigit': {
				const digitRegExp = /\d+/g
				statusValidate = !digitRegExp.test(data)
				break
			}
			case 'min': {
				statusValidate = data.length < config.value
				break
			}
			default:
				break
		}
		if (statusValidate) return config.message
	}
	for (const fieldName in data) {
		for (const validatedMethod in config[fieldName]) {
			const error = validate(
				validatedMethod,
				data[fieldName],
				config[fieldName][validatedMethod]
			)
			if (error && !errors[fieldName]) {
				errors[fieldName] = error
			}
		}
	}
	return errors
}
