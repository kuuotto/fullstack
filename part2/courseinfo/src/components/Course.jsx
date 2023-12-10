const Header = ({ course }) => <h2>{course}</h2>

const Total = ({ parts }) => {
    // calculate the total number of exercises
    const sum = parts.reduce((partialSum, currentPart) => partialSum + currentPart.exercises, 0)
    return (
        <strong>{sum} exercises in total.</strong>
    )
}

const Part = ({ part }) =>
    <p>
        {part.name} {part.exercises}
    </p>

const Content = ({ parts }) =>
    <>
        {parts.map(part => <Part key={part.name} part={part} />)}
    </>

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course
