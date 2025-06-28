import { z } from 'zod';
import { NewPatientSchema, NewPatientEntrySchema } from './utils';

export enum Gender {
	Male = 'male',
	Female = 'female',
	Other = 'other',
}

export interface Diagnoses {
	code: string;
	name: string;
	latin?: string;
}

export enum HealthCheckRating {
	'Healthy' = 0,
	'LowRisk' = 1,
	'HighRisk' = 2,
	'CriticalRisk' = 3,
}

interface BaseEntry {
	id: string;
	description: string;
	date: string;
	specialist: string;
	diagnosisCodes?: Array<Diagnoses['code']>;
}

interface HealthCheckEntry extends BaseEntry {
	type: 'HealthCheck';
	healthCheckRating: HealthCheckRating;
}

interface StickLeave {
	startDate: string;
	endDate: string;
}

interface OccupationalHealthcareEntry extends BaseEntry {
	type: 'OccupationalHealthcare';
	employerName: string;
	sickLeave?: StickLeave;
}

interface Discharge {
	date: string;
	criteria: string;
}

interface HospitalEntry extends BaseEntry {
	type: 'Hospital';
	discharge: Discharge;
}

export type Entry = BaseEntry | HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry;

export interface Patient {
	id: string;
	name: string;
	ssn: string;
	occupation: string;
	gender: Gender;
	dateOfBirth: string;
	entries: Entry[];
}

export type NewPatient = z.infer<typeof NewPatientSchema>;

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

export type NewPatientEntry = z.infer<typeof NewPatientEntrySchema>;
