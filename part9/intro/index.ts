import { isNotNumber } from './utils';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
import express from 'express';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
	res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
	const { height, weight } = req.query;

	if (!height || !weight || isNaN(Number(height)) || isNaN(Number(weight))) {
		res.status(400).json({ error: 'malformatted parameters' });
		return;
	}

	const bmi = calculateBmi(Number(height), Number(weight));
	res.status(200).json({
		weight,
		height,
		bmi,
	});
});

app.post('/exercises', (req, res) => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const { daily_exercises, target } = req.body;

	if (!daily_exercises || !target) {
		res.status(400).json({ error: 'parameters missing' });
		return;
	}

	if (!Array.isArray(daily_exercises) || daily_exercises.some(isNotNumber) && !isNaN(Number(target))) {
		res.status(400).json({ error: 'malformatted parameters' });
		return;
	}

	const result = calculateExercises(daily_exercises.map(Number), Number(target));
	res.status(200).json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
