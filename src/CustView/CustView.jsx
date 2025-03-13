import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './CustView.css'

function CustView() {
    const [custData, setCustData] = useState(null)
    const [custSearch, setCustSearch] = useState("")
    const fetchCusts = `http://localhost:3000/api/v1/customers`

    useEffect(() => {
        fetch(fetchCusts, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            setCustData(data.data)
        })
        .catch(error => console.log('message: ', error.message))
    }, [])

    if (!custData) {
        return <div>Loading...</div>
    }

    const customers = custData.filter((cust) => (
		cust.attributes.email.toLowerCase().startsWith(custSearch.toLowerCase())
	))

    return (
        <section>
            <header className='custViewHeader'>
                <Link to={'/'} className='subLink'>
                    <button className='backButton'>Back To Home</button>
                </Link>
                <h1>Customer Data</h1>
                <input
                    className="searchBar"
                    type="text"
                    placeholder="Search Customer Email..."
                    value={custSearch}
                    onChange={(event) => setCustSearch(event.target.value)}
                />
            </header>
            <section className='custView'>
                {customers.map(cust => (
                    <div className='custViewContainer'>
                        <p>First Name: {cust.attributes.first_name}</p>
                        <p>Last Name: {cust.attributes.last_name}</p>
                        <p>Email: {cust.attributes.email}</p>
                        <p>Address: {cust.attributes.address}</p>
                        <p>Subscription(s): 
                            {
                                cust.attributes.subscriptions.length > 0
                                ? cust.attributes.subscriptions.map(subscription => subscription.name).join(', ')
                                : ' None'
                            }
                        </p>
                    </div>
                ))}
            </section>
        </section>
    )
}

export default CustView