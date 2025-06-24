import type { CoursePart } from '../types';

interface Part {
	parts: Array<CoursePart>;
}

const Content = (props: Part) => {
	const assertNever = (value: never): never => {
		throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
	};

	return (
		<>
			{props.parts.map((part: CoursePart, index: number) => {
				switch (part.kind) {
					case 'basic':
						return (
							<div key={index}>
								<h3>
									{part.name} - {part.exerciseCount}
								</h3>
								<i>{part.description}</i>
							</div>
						);
					case 'group':
						return (
							<div key={index}>
								<h3>
									{part.name} - {part.exerciseCount}
								</h3>
								<p>project exercises {part.groupProjectCount}</p>
							</div>
						);
					case 'background':
						return (
							<div key={index}>
								<h3>
									{part.name} - {part.exerciseCount}
								</h3>
								<p>
									<i>{part.description}</i>
								</p>
								<p>{part.backgroundMaterial}</p>
							</div>
						);
					case 'special':
						return (
							<div key={index}>
								<h3>
									{part.name} - {part.exerciseCount}
								</h3>
								<i>{part.description}</i>
								<p>required skills: {part.requirements.join(', ')}</p>
							</div>
						);
					default:
						return assertNever(part);
				}
			})}
		</>
	);
};

export default Content;
