const App = () => {
    const course = {
        name: "Half Stack application development",
        parts: [
            {
                name: "Fundamentals of React",
                exercises: 10,
            },
            {
                name: "Using props to pass data",
                exercises: 7,
            },
            {
                name: "State of a component",
                exercises: 14,
            },
        ]
    }
    
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

const Header = (props) => {
    return (
        <>
            <h1>{props.course}</h1>
        </>
    )
}

const Content = (props) => {
    return (
        <>
            {props.parts.map((data) => (
                <div key={data.name}>
                    <Part name={data.name} exercises={data.exercises} />
                </div>
            ))}
        </>
    )
}

const Total = (props) => {
    let totalExercises = props.parts.reduce(
        (partialSum, x) => partialSum + x.exercises, 0
    )
    return (
        <>
            <p>Number of exercises {totalExercises}</p>
        </>
    )
}

const Part = (props) => {
    return (
        <>
            <p>{props.name} {props.exercises}</p>
        </>
    )
}

export default App
