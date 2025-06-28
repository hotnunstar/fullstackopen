export interface Diagnoses {
	code: string;
	name: string;
	latin?: string;
}

export enum Gender {
	Male = 'male',
	Female = 'female',
	Other = 'other',
}

export interface Entry {
	id: string;
	description: string;
	date: string;
	specialist: string;
	diagnosisCodes?: Array<Diagnoses['code']>;
	type: 'Hospital' | 'OccupationalHealthcare' | 'HealthCheck';
}

export interface Patient {
	id: string;
	name: string;
	occupation: string;
	gender: Gender;
	ssn?: string;
	dateOfBirth?: string;
	entries: Array<Entry>;
}

export type PatientFormValues = Omit<Patient, 'id' | 'entries'>;
