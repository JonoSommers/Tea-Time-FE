import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './TeaView.css'

function TeaView() {
    const [teaData, setTeaData] = useState(null)
    const [teaSearch, setTeaSearch] = useState("")
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

    const teas = teaData.filter((tea) => (
		tea.attributes.name.toLowerCase().includes(teaSearch.toLowerCase())
	))

    return (
        <section>
            <header className='TeaViewHeader'>
                <Link to={'/'} className='subLink'>
                    <button className='backButton'>Back To Home</button>
                </Link>
                <h1>Tea Data</h1>
                <input
                    className="searchBar"
                    type="text"
                    placeholder="Search Tea Name..."
                    value={teaSearch}
                    onChange={(event) => setTeaSearch(event.target.value)}
                />
            </header>
            <section className='teaView'>
                {teas.map(tea => (
                    <div className='teaViewContainer'>
                        <p>Name: {tea.attributes.name}</p>
                        <p>Description: {tea.attributes.description}</p>
                        <p>Recommended Temperature: {tea.attributes.temperature}°F</p>
                        <p>Recommended Brew Time: {tea.attributes.brew_time}min</p>
                    </div>
                ))}
            </section>
        </section>
    )
}

export default TeaView