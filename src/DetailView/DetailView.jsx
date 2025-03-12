import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './DetailView.css'

function DetailView() {
    const [sub, setSub] = useState(null)
    const subId = useParams().subId
    const fetchSub = `http://localhost:3000/api/v1/subscriptions/${subId}`

    useEffect(() => {
        fetch(fetchSub, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            setSub(data.data)
        })
        .catch(error => console.log('message: ', error.message))
    }, [subId])

    if (!sub) {
        return <div>Loading...</div>
    }
    return(
        <section>
            <header className='detailHeader'>
                <Link to={'/'} className='subLink'>
                    <button className='backButton'>Back To Home</button>
                </Link>
                <h1>{sub.attributes.name}</h1>
                <Link to={`/${subId}/subscriber_data`} className='subLink'>
                    <button className='subData'>Subscriber Data</button>
                </Link>    
            </header>
            <section className='teas'>
                {sub.attributes.teas.map(tea => (
                    <div className='teaContainer'>
                        <h3>{tea.name}</h3>
                        <img src={sub.attributes.img} alt={`Glass of ${sub.attributes.name}`} />
                        <p>Description: {tea.description}</p>
                        <p>Recomnended Temperatire: {tea.temperature}</p>
                        <p>Recomnended Brew Time: {tea.brew_time}</p>
                    </div>
                ))}
            </section>
            <section className='subDetails'>
                <p>Description: {sub.attributes.description}</p>
                <p>Price: ${sub.attributes.price}.00</p>
                <p>Users Subscribed: {sub.attributes.users_subscribed}</p>
            </section>
        </section>
    )
}

export default DetailView