import { useEffect, useState } from 'react';
import type { Diary, NewDiary, Visibility, Weather } from './types';
import { getAllDiaries, createDiary } from './services/diaryService';
import type { AxiosError } from 'axios';

const App = () => {
	const [error, setError] = useState<string>('');
	const [diaries, setDiaries] = useState<Diary[]>([]);
	const [newDiary, setNewDiary] = useState<NewDiary>({
		date: '',
		weather: 'sunny',
		visibility: 'great',
		comment: '',
	});

	useEffect(() => {
		getAllDiaries().then((data) => {
			setDiaries(data);
		});
	}, []);

	const diaryCreation = async (event: React.SyntheticEvent) => {
		event.preventDefault();

		try {
			const response = await createDiary(newDiary);
			setDiaries(diaries.concat(response));
			setNewDiary({
				date: '',
				weather: 'sunny',
				visibility: 'great',
				comment: '',
			});
		} catch (e) {
			const error = e as AxiosError;
			if (typeof error.response?.data === 'string') {
				setError(error.response?.data);
				setTimeout(() => {
					setError('');
				}, 2000);
			}
		}
	};

	return (
		<div>
			<h2>Add new entry</h2>
			{error != '' && <p style={{ color: 'red' }}>Error: {error}</p>}
			<form onSubmit={diaryCreation}>
				<div>
					<label>date </label>
					<input type='date' value={newDiary.date} onChange={(event) => setNewDiary({ ...newDiary, date: event.target.value })} />
				</div>
				<div>
					<span>visibility </span>
					<input
						type='radio'
						id='great'
						name='visibility'
						value='great'
						onChange={(e) => setNewDiary({ ...newDiary, visibility: e.target.value as Visibility })}
					/>
					<label>great</label>
					<input
						type='radio'
						id='good'
						name='visibility'
						value='good'
						onChange={(e) => setNewDiary({ ...newDiary, visibility: e.target.value as Visibility })}
					/>
					<label>good</label>
					<input
						type='radio'
						id='ok'
						name='visibility'
						value='ok'
						onChange={(e) => setNewDiary({ ...newDiary, visibility: e.target.value as Visibility })}
					/>
					<label>ok</label>
					<input
						type='radio'
						id='poor'
						name='visibility'
						value='poor'
						onChange={(e) => setNewDiary({ ...newDiary, visibility: e.target.value as Visibility })}
					/>
					<label>poor</label>
				</div>
				<div>
					<span>weather </span>
					<input
						type='radio'
						id='sunny'
						name='weather'
						value='sunny'
						onChange={(e) => setNewDiary({ ...newDiary, weather: e.target.value as Weather })}
					/>
					<label>sunny</label>
					<input
						type='radio'
						id='rainy'
						name='weather'
						value='rainy'
						onChange={(e) => setNewDiary({ ...newDiary, weather: e.target.value as Weather })}
					/>
					<label>rainy</label>
					<input
						type='radio'
						id='cloudy'
						name='weather'
						value='cloudy'
						onChange={(e) => setNewDiary({ ...newDiary, weather: e.target.value as Weather })}
					/>
					<label>cloudy</label>
					<input
						type='radio'
						id='stormy'
						name='weather'
						value='stormy'
						onChange={(e) => setNewDiary({ ...newDiary, weather: e.target.value as Weather })}
					/>
					<label>stormy</label>
					<input
						type='radio'
						id='windy'
						name='weather'
						value='windy'
						onChange={(e) => setNewDiary({ ...newDiary, weather: e.target.value as Weather })}
					/>
					<label>windy</label>
				</div>
				<div>
					<label>comment </label>
					<input value={newDiary?.comment || ''} onChange={(event) => setNewDiary({ ...newDiary, comment: event.target.value })} />
				</div>

				<button type='submit'>add</button>
			</form>

			<h2>Diary entries</h2>
			{diaries.map((diary: Diary) => (
				<div key={diary.id}>
					<h3>{diary.date}</h3>
					<p>visibility: {diary.visibility}</p>
					<p>weather: {diary.weather}</p>
					<p>comment: {diary.comment}</p>
				</div>
			))}
		</div>
	);
};

export default App;
