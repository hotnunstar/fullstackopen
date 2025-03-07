import { useState, useEffect } from 'react'
import axios from 'axios'

export const useField = (type) => {
	const [value, setValue] = useState('')
	const onChange = (event) => {
		setValue(event.target.value)
	}
	const onReset = () => {
		setValue('')
	}

	return { type, value, onChange, onReset }
}

export const useResource = (baseUrl) => {
	const [resources, setResources] = useState([])

	useEffect(() => {
		const fetch = async () => {
			const response = await axios.get(baseUrl)
			setResources(response.data)
		}
		fetch()
	}, [baseUrl])

	const create = async (resource) => {
		const response = await axios.post(baseUrl, resource)
		setResources(resources.concat(response.data))
	}

	const service = { create }

	return [resources, service]
}
