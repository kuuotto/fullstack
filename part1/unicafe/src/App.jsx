import { useState } from 'react'

const App = () => {
    const [goodCount, setGoodCount] = useState(0)
    const [neutralCount, setNeutralCount] = useState(0)
    const [badCount, setBadCount] = useState(0)

    const clickHandler = (counter) => {
        switch(counter) {
            case "good":
                return () => setGoodCount(goodCount + 1)
            case "neutral":
                return () => setNeutralCount(neutralCount + 1)
            case "bad":
                return () => setBadCount(badCount + 1)
            default:
                throw Error(`${counter} is not a recognised counter`)
        }
    }

    const totalCount = goodCount + neutralCount + badCount
    const average = (1 * goodCount + (-1) * badCount) / totalCount
    const goodProportion = goodCount / totalCount

    return (
        <div>
            <h1>Give Feedback</h1>
            <Button text="good" onClick={clickHandler("good")} />
            <Button text="neutral" onClick={clickHandler("neutral")} />
            <Button text="bad" onClick={clickHandler("bad")} />
            <h2>Statistics</h2>
            <p>good {goodCount}</p>
            <p>neutral {neutralCount}</p>
            <p>bad {badCount}</p>
            <p>all {totalCount}</p>
            <p>average {average}</p>
            {totalCount > 0 && <p>positive {goodProportion * 100}%</p>}
        </div>
    )
}

const Button = ({ text, onClick }) =>  <button onClick={onClick}>{text}</button>

export default App
