import { isNotNumber } from './utils';

export interface calculateExerciseValues {
	daily_exercises: number[];
	target: number;
}

export interface ExerciseResult {
	periodLength: number;
	trainingDays: number;
	success: boolean;
	rating: number;
	ratingDescription: string;
	target: number;
	average: number;
}

export function calculateExercises(daily_exercises: number[], target: number): ExerciseResult {
	const periodLength = daily_exercises.length;
	const trainingDays = daily_exercises.filter((day) => day > 0).length;
	const totalHours = daily_exercises.reduce((sum, hour) => sum + hour, 0);
	const average = totalHours / periodLength;
	const success = average >= target;

	let rating: number;
	let ratingDescription: string;

	if (average >= target) {
		rating = 3;
		ratingDescription = 'Excellent! You met your target.';
	} else if (average >= target * 0.75) {
		rating = 2;
		ratingDescription = 'Not too bad but could be better.';
	} else {
		rating = 1;
		ratingDescription = 'You need to train more.';
	}

	return {
		periodLength,
		trainingDays,
		success,
		rating,
		ratingDescription,
		target,
		average,
	};
}

const parseArguments = (args: string[]): calculateExerciseValues => {
	if (args.length < 12) throw new Error('Not enough arguments');
	if (args.length > 12) throw new Error('Too many arguments');

	if (!isNaN(Number(args[2])) && !args.slice(3).some(isNotNumber)) {
		return {
			target: Number(args[2]),
			daily_exercises: args.slice(3).map((n) => Number(n)),
		};
	} else throw new Error('Provided values were not numbers!');
};

if (require.main === module) {
	try {
		const { target, daily_exercises } = parseArguments(process.argv);
		console.log(calculateExercises(daily_exercises, target));
	} catch (error: unknown) {
		let errorMessage = 'Something bad happened.';
		if (error instanceof Error) errorMessage += ' Error: ' + error.message;
		console.log(errorMessage);
	}
}
