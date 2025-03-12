import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './TeaView.css'

function TeaView() {
    const [teaData, setTeaData] = useState(null)
    const fetchTeas = 'http://localhost:3000/api/v1/teas'

    useEffect(() => {
        fetch(fetchTeas, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            setTeaData(data.data)
        })
        .catch(error => console.log('message: ', error.message))
    }, [])

    if (!teaData) {
        return <div>Loading...</div>
    }

    return (
        <section>
            <header className='TeaViewHeader'>
                <Link to={'/'} className='subLink'>
                    <button className='backButton'>Back To Home</button>
                </Link>
                <h1>Tea Data</h1>
            </header>
            <section className='teaView'>
                {teaData.map(tea => (
                    <div className='teaViewContainer'>
                        <p>Name: {tea.attributes.name}</p>
                        <p>Description: {tea.attributes.description}</p>
                        <p>Reccomended Temperature: {tea.attributes.temperature}°F</p>
                        <p>Reccomended Brew Time: {tea.attributes.brew_time}min</p>
                    </div>
                ))}
            </section>
        </section>
    )
}

export default TeaView