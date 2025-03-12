import { Link } from 'react-router-dom'
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
                <Link to={'/customers'} className='subLink'>
                    <button className="custData">Customer Data</button>
                </Link>
                <h1>TEA TIME</h1>
                <Link to={'/teas'} className='subLink'>
                    <button className="teaData">Tea Data</button>
                </Link>
            </header>
            <section className="subs">
                    {subs.map(sub => (
                            <div className="subContainer">
                                <h3>{sub.attributes.name}</h3>
                                <Link to={`${sub.id}`} className='subLink'>
                                    <img src={sub.attributes.img} alt={`Glass of ${sub.attributes.name}`} />
                                </Link>
                            </div>
                    ))}
            </section>
        </section>
    )
}

export default Home