import axios from 'axios';
import { EntryFormValues, Patient, PatientFormValues } from '../types';
import { apiBaseUrl } from '../constants';

const getAll = async () => {
	const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);
	return data;
};

const getById = async (id: string) => {
	const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
	return data;
};

const create = async (object: PatientFormValues) => {
	const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);
	return data;
};

const addEntry = async (patientId: string, entry: Partial<EntryFormValues>) => {
	const { data } = await axios.post<EntryFormValues>(`${apiBaseUrl}/patients/${patientId}/entries`, entry);
	return data;
};

export default {
	getAll,
	create,
	getById,
	addEntry,
};
