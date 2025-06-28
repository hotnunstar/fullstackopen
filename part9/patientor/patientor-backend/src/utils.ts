import { NewPatient, Gender } from './types';
import { z } from 'zod';

const PatientBaseEntrySchema = z.object({
	description: z.string(),
	date: z.string().date(),
	specialist: z.string(),
	diagnosisCodes: z.array(z.string()).optional(),
});

const HealthCheckEntrySchema = PatientBaseEntrySchema.extend({
	type: z.literal('HealthCheck'),
	healthCheckRating: z.number(),
});

const OccupationalHealthcareEntrySchema = PatientBaseEntrySchema.extend({
	type: z.literal('OccupationalHealthcare'),
	employerName: z.string(),
	sickLeave: z
		.object({
			startDate: z.string().date(),
			endDate: z.string().date(),
		})
		.optional(),
});

const HospitalEntrySchema = PatientBaseEntrySchema.extend({
	type: z.literal('Hospital'),
	discharge: z.object({
		date: z.string().date(),
		criteria: z.string(),
	}),
});

export const NewPatientEntrySchema = z.discriminatedUnion('type', [HealthCheckEntrySchema, OccupationalHealthcareEntrySchema, HospitalEntrySchema]);

export const NewPatientSchema = z.object({
	name: z.string(),
	dateOfBirth: z.string().date(),
	ssn: z.string(),
	gender: z.nativeEnum(Gender),
	occupation: z.string(),
	entries: z.array(NewPatientEntrySchema).default([]),
});

export const toNewPatient = (object: unknown): NewPatient => {
	return NewPatientSchema.parse(object);
};
