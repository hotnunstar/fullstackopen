import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Patient, Diagnoses } from '../../types';
import patientService from '../../services/patients';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import EntryDetails from './EntryDetails';

interface Props {
	diagnoses: Diagnoses[];
}

const PatientEntryPage = ({ diagnoses }: Props) => {
	const { id } = useParams();
	const [patient, setPatient] = useState<Patient>();

	useEffect(() => {
		const fetchPatient = async () => {
			const patient = await patientService.getById(id!);
			setPatient(patient);
		};
		void fetchPatient();
	}, [id]);

	const genderIcon = (gender: string) => {
		switch (gender) {
			case 'male':
				return <MaleIcon fontSize='medium' />;
			case 'female':
				return <FemaleIcon fontSize='medium' />;
			case 'other':
				return <TransgenderIcon fontSize='medium' />;
			default:
				return null;
		}
	};

	return (
		<div>
			<h1>
				{patient?.name} {patient?.gender && genderIcon(patient.gender)}
			</h1>
			<p>
				<b>ssn: </b>
				{patient?.ssn}
			</p>
			<p>
				<b>occupation: </b>
				{patient?.occupation}
			</p>
			{patient && patient.entries.length > 0 && (
				<>
					<h3>Entries</h3>
					{patient?.entries.map((entry, index) => (
						<EntryDetails key={index} entry={entry} diagnoses={diagnoses} />
					))}
				</>
			)}
		</div>
	);
};

export default PatientEntryPage;
