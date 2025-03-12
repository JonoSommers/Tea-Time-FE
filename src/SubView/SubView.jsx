import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './SubView.css'

function SubView() {
    const [subData, setSubData] = useState(null)
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
            console.log(data.data)
            setSubData(data.data)
        })
        .catch(error => console.log('message: ', error.message))
    }, [subId])

    if (!subData) {
        return <div>Loading...</div>
    }

    return (
        <section>
            <header className='subViewHeader'>
                <Link to={`/${subId}`} className='subLink'>
                    <button className='backButton'>Back To Subscription</button>
                </Link>
                <h1>Subscriber Data</h1>
            </header>
            <section className='subsView'>
                {subData.attributes.customers.map(customer => (
                    <div className='subViewContainer'>
                        <p>Name: {customer.name} </p>
                        <p>Email: {customer.email}</p>
                        <p>Status: {customer.status ? 'Subscribed' : 'Not Subscribed'}</p>
                    </div>
                ))}
            </section>
        </section>
    )
}

export default SubView