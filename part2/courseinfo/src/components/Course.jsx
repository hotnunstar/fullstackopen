const Header = ({ course }) => <h2>{course}</h2>
const Parts = ({ parts }) => parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)
const Total = ({ parts }) => <strong>Total of {parts.reduce((total, part) => total + part.exercises, 0)} exercises</strong>

const Course = ({ courses }) => {
    return (
        <div>
            <h1>Web development curriculum</h1>
            {courses.map(course =>
                <div key={course.id}>
                    <Header course={course.name}></Header>
                    <Parts parts={course.parts}></Parts>
                    <Total parts={course.parts}></Total>
                </div> 
            )}
        </div>
    )
}

export default Course