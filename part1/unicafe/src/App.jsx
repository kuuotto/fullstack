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

    return (
        <div>
            <h1>Give Feedback</h1>
            <Button text="good" onClick={clickHandler("good")} />
            <Button text="neutral" onClick={clickHandler("neutral")} />
            <Button text="bad" onClick={clickHandler("bad")} />
            <Statistics goodCount={goodCount} neutralCount={neutralCount} badCount={badCount} />
        </div>
    )
}

const Button = ({ text, onClick }) =>  <button onClick={onClick}>{text}</button>

const Statistics = ({ goodCount, neutralCount, badCount }) => {
    // calculate the total number of reviews
    const totalCount = goodCount + neutralCount + badCount

    // calculate average score
    const average = (1 * goodCount + (-1) * badCount) / totalCount

    // calculate proportion of good reviews
    const goodProportion = goodCount / totalCount

    return (
        <div>
            <h2>Statistics</h2>
            {totalCount ? (
                <table>
                    <tbody>
                        <StatisticLine text="good" value={goodCount} />
                        <StatisticLine text="neutral" value={neutralCount} />
                        <StatisticLine text="bad" value={badCount} />
                        <StatisticLine text="total" value={totalCount} />
                        <StatisticLine text="average" value={average} />
                        <StatisticLine text="positive" value={goodProportion * 100} unit="%" />
                    </tbody>
                </table>
            ) : (
                <p>No feedback given.</p>
            )}
        </div>
    )
}

const StatisticLine = ({ text, value, unit="" }) => {
    // format number
    let formattedValue = new Intl.NumberFormat('en-UK', 
        { maximumFractionDigits: 2 }
    ).format(value)

    return (
        <tr>
            <th scope="row">{text}</th>
            <td>{formattedValue}{unit}</td>
        </tr>
    ) 
}

export default App
