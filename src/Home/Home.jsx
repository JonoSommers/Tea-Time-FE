import { useState, useEffect } from 'react'
import './Home.css'

function Home() {
    const [subs, setSubs] = useState([])
    const fetchSubs = 'http://localhost:3000/api/v1/subscriptions'

    useEffect(() => {
        fetch(fetchSubs, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            setSubs(data.data)
        })
        .catch(error => console.log('message: ', error.message))
    }, [])
    
    return (
        <section>
            <header>
                <h1>Tea Time</h1>
            </header>
        </section>
    )
}

export default Home