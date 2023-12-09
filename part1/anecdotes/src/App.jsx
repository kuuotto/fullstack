import { useState } from 'react'

const App = () => {
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
        'The only way to go fast, is to go well.'
    ]

    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

    const handleNextClick = () => {
        // select a random anecdote
        setSelected(getRandomIndex(anecdotes.length))
    }

    const handleVoteClick = () => {
        // increase the votes of the currently selected anecdote by one
        const newVotes = [...votes]
        newVotes[selected] += 1
        setVotes(newVotes)
    }

    // determine the indices of the most popular anecdotes
    const mostPopular = getMaxIndices(votes)

    // determine if there are any votes
    const voted = Math.max(...votes) > 0

    return (
        <div>
            <h1>Anecdote of the Day</h1>
            {anecdotes[selected]}
            <p>This anecdote has {votes[selected]} votes.</p>
            <Button onClick={handleNextClick} text="next anecdote" />
            <Button onClick={handleVoteClick} text="vote" />
            <h2>Anecdote with Most Votes</h2>
            {voted ? mostPopular.map(i => <p key={i}>{anecdotes[i]}</p>) : "No votes."}
        </div>
    )
}

const getRandomIndex = (length) => {
    // Returns a random integer between 0 (inclusive) and length (exclusive)
    return Math.floor(Math.random() * length)
}

const getMaxIndices = (array) => {
    const max = Math.max(...array)
    return array.reduce((currentMaxIndices, value, I, arr) => value === max ? [...currentMaxIndices, I] : currentMaxIndices, [])
}

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>

export default App
