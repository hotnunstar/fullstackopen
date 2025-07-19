import express, { Request, Response, NextFunction } from 'express';
import patientService from '../services/patientService';
import { NewPatientSchema, NewPatientEntrySchema } from '../utils';
import { z } from 'zod';
import { NewPatient, Patient, NonSensitivePatient, NewPatientEntry, PatientEntry, ErrorResponse } from '../types';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
	res.send(patientService.getNonSensitivePatients());
});

router.get('/:id', (req, res, next) => {
	try {
		const patient = patientService.getPatientById(req.params.id);
		if (!patient) {
			const error = new Error('Patient not found');
			error.name = 'NotFoundError';
			throw error;
		}
		res.json(patient);
	} catch (error) {
		next(error);
	}
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
	try {
		NewPatientSchema.parse(req.body);
		next();
	} catch (error: unknown) {
		next(error);
	}
};

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatient>, res: Response<Patient | ErrorResponse>) => {
	try {
		const addedEntry = patientService.addPatient(req.body);
		res.json(addedEntry);
	} catch (error: unknown) {
		if (error instanceof Error) {
			res.status(400).send({ error: error.message });
		} else {
			res.status(400).send({ error: 'Unknown error' });
		}
	}
});

const newPatientEntryParser = (req: Request, _res: Response, next: NextFunction) => {
	try {
		NewPatientEntrySchema.parse(req.body);
		next();
	} catch (error) {
		next(error);
	}
};

router.post(
	'/:id/entries',
	newPatientEntryParser,
	(req: Request<{ id: string }, unknown, NewPatientEntry>, res: Response<PatientEntry | ErrorResponse>) => {
		try {
			const addedEntry = patientService.addPatientEntry(req.params.id, req.body);
			res.json(addedEntry);
		} catch (error: unknown) {
			if (error instanceof Error) {
				res.status(400).send({ error: error.message });
			} else {
				res.status(400).send({ error: 'Unknown error' });
			}
		}
	}
);

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
	if (error instanceof z.ZodError) res.status(400).send({ error: error.issues });
	else next(error);
};

router.use(errorMiddleware);

export default router;
