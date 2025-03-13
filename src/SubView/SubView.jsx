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
            setSubData(data.data);
        })
        .catch(error => console.log('message: ', error.message))
    }, [subData])

    function updateStatus(joinsId, customerId) {
        fetch(`http://localhost:3000/api/v1/subscriptions/${subId}/subscription_customers/${joinsId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                customer_id: customerId
            })
        })
        .then(response => response.json())
        .catch(error => console.error('message: ', error.message))
    }

    if (!subData) {
        return <div>Loading...</div>
    }

    function findRecord(customerId) {
        const record = subData.attributes.joins_records.find(record => 
            record.customer_id === customerId
        )
        return record ? record.id : null
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
                        <button onClick={() => updateStatus(findRecord(customer.id), customer.id)}>
                            {customer.status ? 'Unsubscribe' : 'Subscribe'}
                        </button>
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