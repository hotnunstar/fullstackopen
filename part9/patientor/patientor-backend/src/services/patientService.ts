import { NonSensitivePatient, Patient, NewPatient, PatientEntry, NewPatientEntry } from '../types';
import patients from '../../data/patients';
import { v1 as uuid } from 'uuid';

const getPatients = (): Patient[] => {
	return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
	return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({ id, name, dateOfBirth, gender, occupation }));
};

const getPatientById = (id: string): Patient | undefined => {
	return patients.find((p) => p.id === id);
};

const addPatient = (entry: NewPatient): Patient => {
	const newPatient = {
		id: uuid(),
		...entry,
		entries: [],
	};

	patients.push(newPatient);
	return newPatient;
};

const addPatientEntry = (patientId: string, entry: NewPatientEntry): PatientEntry => {
	const patient = patients.find((p) => p.id === patientId);
	if (!patient) {
		throw new Error('Patient not found');
	}

	const newEntry: PatientEntry = {
		id: uuid(),
		...entry,
	};

	patient.entries.push(newEntry);
	return newEntry;
};

export default { getPatients, getNonSensitivePatients, getPatientById, addPatient, addPatientEntry };
