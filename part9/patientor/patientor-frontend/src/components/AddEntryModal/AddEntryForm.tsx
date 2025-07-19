import { useState, SyntheticEvent } from 'react';
import { TextField, Button, Grid, Select, MenuItem, InputLabel } from '@mui/material';
import { EntryFormValues, EntryTypeValues, EntryType } from '../../types';

interface Props {
	onSubmit: (values: EntryFormValues) => void;
	onCancel: () => void;
}

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
	const [type, setType] = useState<EntryType>('HealthCheck');
	const [description, setDescription] = useState('');
	const [date, setDate] = useState('');
	const [specialist, setSpecialist] = useState('');

	// HealthCheck
	const [healthCheckRating, setHealthCheckRating] = useState<number>(0);

	// Hospital
	const [dischargeDate, setDischargeDate] = useState('');
	const [dischargeCriteria, setDischargeCriteria] = useState('');

	// OccupationalHealthcare
	const [employerName, setEmployerName] = useState('');
	const [sickLeaveStartDate, setSickLeaveStartDate] = useState('');
	const [sickLeaveEndDate, setSickLeaveEndDate] = useState('');

	const submit = (e: SyntheticEvent) => {
		e.preventDefault();

		let entry: Partial<EntryFormValues> = {
			type,
			description,
			date,
			specialist,
		};

		if (type === 'HealthCheck') {
			entry = { ...entry, healthCheckRating };
		} else if (type === 'Hospital') {
			entry = {
				...entry,
				discharge: {
					date: dischargeDate,
					criteria: dischargeCriteria,
				},
			};
		} else if (type === 'OccupationalHealthcare') {
			entry = {
				...entry,
				employerName,
				sickLeave: sickLeaveStartDate && sickLeaveEndDate ? { startDate: sickLeaveStartDate, endDate: sickLeaveEndDate } : undefined,
			};
		}

		onSubmit(entry as EntryFormValues);
	};

	return (
		<form onSubmit={submit}>
			<InputLabel>Type</InputLabel>
			<Select fullWidth value={type} onChange={(e) => setType(e.target.value as EntryType)}>
				{EntryTypeValues.map((t) => (
					<MenuItem key={t} value={t}>
						{t}
					</MenuItem>
				))}
			</Select>

			<TextField label='Description' fullWidth value={description} onChange={(e) => setDescription(e.target.value)} margin='normal' />
			<TextField label='Date' placeholder='YYYY-MM-DD' fullWidth value={date} onChange={(e) => setDate(e.target.value)} margin='normal' />
			<TextField label='Specialist' fullWidth value={specialist} onChange={(e) => setSpecialist(e.target.value)} margin='normal' />

			{/* Campos por tipo */}
			{type === 'HealthCheck' && (
				<TextField
					label='Health Check Rating (0-3)'
					type='number'
					inputProps={{ min: 0, max: 3 }}
					fullWidth
					value={healthCheckRating}
					onChange={(e) => setHealthCheckRating(Number(e.target.value))}
					margin='normal'
				/>
			)}

			{type === 'Hospital' && (
				<>
					<TextField
						label='Discharge Date'
						placeholder='YYYY-MM-DD'
						fullWidth
						value={dischargeDate}
						onChange={(e) => setDischargeDate(e.target.value)}
						margin='normal'
					/>
					<TextField
						label='Discharge Criteria'
						fullWidth
						value={dischargeCriteria}
						onChange={(e) => setDischargeCriteria(e.target.value)}
						margin='normal'
					/>
				</>
			)}

			{type === 'OccupationalHealthcare' && (
				<>
					<TextField label='Employer Name' fullWidth value={employerName} onChange={(e) => setEmployerName(e.target.value)} margin='normal' />
					<TextField
						label='Sick Leave Start Date'
						placeholder='YYYY-MM-DD'
						fullWidth
						value={sickLeaveStartDate}
						onChange={(e) => setSickLeaveStartDate(e.target.value)}
						margin='normal'
					/>
					<TextField
						label='Sick Leave End Date'
						placeholder='YYYY-MM-DD'
						fullWidth
						value={sickLeaveEndDate}
						onChange={(e) => setSickLeaveEndDate(e.target.value)}
						margin='normal'
					/>
				</>
			)}

			<Grid container spacing={2} style={{ marginTop: 10 }}>
				<Grid item>
					<Button variant='contained' color='secondary' onClick={onCancel}>
						Cancel
					</Button>
				</Grid>
				<Grid item>
					<Button type='submit' variant='contained' color='primary'>
						Add
					</Button>
				</Grid>
			</Grid>
		</form>
	);
};

export default AddEntryForm;
