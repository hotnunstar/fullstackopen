import { Diagnoses, Entry } from '../../types';

import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import WorkIcon from '@mui/icons-material/Work';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface Props {
	entry: Entry;
	diagnoses: Diagnoses[];
}

const assertNever = (value: never): never => {
	throw new Error(`Unhandled entry type: ${JSON.stringify(value)}`);
};

const EntryDetails = ({ entry, diagnoses }: Props) => {
	switch (entry.type) {
		case 'Hospital':
			return (
				<div className="entry-details-box">
					<p>{entry.date} <LocalHospitalIcon /></p>
					<i>{entry.description}</i>

					{entry.diagnosisCodes && (
						<ul>
							{entry.diagnosisCodes.map((code) => {
								const diagnosis = diagnoses.find((d) => d.code === code);
								return (
									<li key={code}>
										{code} {diagnosis ? diagnosis.name : ''}
									</li>
								);
							})}
						</ul>
					)}

					<p><b>Discharge:</b> {entry.discharge.date} - {entry.discharge.criteria}</p>
                    <p>diagnose by <b>{entry.specialist}</b></p>
				</div>
			);

		case 'OccupationalHealthcare':
			return (
				<div className="entry-details-box">
					<p>{entry.date} <WorkIcon /> <i>{entry.employerName}</i></p>
					<i>{entry.description}</i>

					{entry.diagnosisCodes && (
						<ul>
							{entry.diagnosisCodes.map((code) => {
								const diagnosis = diagnoses.find((d) => d.code === code);
								return (
									<li key={code}>
										{code} {diagnosis ? diagnosis.name : ''}
									</li>
								);
							})}
						</ul>
					)}

					{entry.sickLeave && (
						<p>
							<b>Sick leave:</b> {entry.sickLeave.startDate} - {entry.sickLeave.endDate}
						</p>
					)}

                    <p>diagnose by <b>{entry.specialist}</b></p>
				</div>
			);

		case 'HealthCheck':
            const heartColor = ['green', 'yellow', 'orange', 'red'][entry.healthCheckRating];
			return (
				<div className="entry-details-box">
					<p>{entry.date} <MedicalServicesIcon /></p>
					<i>{entry.description}</i>
                    {entry.diagnosisCodes && (
						<ul>
							{entry.diagnosisCodes.map((code) => {
								const diagnosis = diagnoses.find((d) => d.code === code);
								return (
									<li key={code}>
										{code} {diagnosis ? diagnosis.name : ''}
									</li>
								);
							})}
						</ul>
					)}
					<p><FavoriteIcon style={{ color: heartColor }} /></p>
                    <p>diagnose by <b>{entry.specialist}</b></p>
				</div>
			);

		default:
			return assertNever(entry);
	}
};

export default EntryDetails;
