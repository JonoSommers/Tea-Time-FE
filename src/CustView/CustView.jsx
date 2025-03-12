import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './CustView.css'

function CustView() {
    const [teaData, setTeaData] = useState(null)
    const subId = useParams().subId
    const fetchCusts = `http://localhost:3000/api/v1/teas`

    useEffect(() => {
        fetch(fetchCusts, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            setTeaData(data.data)
        })
        .catch(error => console.log('message: ', error.message))
    }, [subId])

    if (!teaData) {
        return <div>Loading...</div>
    }

    return (
        <section>
            <header className='CustViewHeader'>
                <Link to={'/'} className='subLink'>
                    <button className='backButton'>Back To Home</button>
                </Link>
                <h1>Tea Data</h1>
            </header>
        </section>
    )
}

export default CustView