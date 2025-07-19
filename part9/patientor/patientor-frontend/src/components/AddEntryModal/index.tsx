import { Dialog, DialogTitle, DialogContent, Divider, Alert } from '@mui/material';
import AddEntryForm from './AddEntryForm.js';
import { EntryFormValues } from '../../types.js';

interface Props {
	modalOpen: boolean;
	onClose: () => void;
	onSubmit: (values: EntryFormValues) => void; // ajusta tipo depois
	error?: string;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
	<Dialog fullWidth open={modalOpen} onClose={onClose}>
		<DialogTitle>Add a new entry</DialogTitle>
		<Divider />
		<DialogContent>
			{error && <Alert severity='error'>{error}</Alert>}
			<AddEntryForm onSubmit={onSubmit} onCancel={onClose} />
		</DialogContent>
	</Dialog>
);

export default AddEntryModal;
