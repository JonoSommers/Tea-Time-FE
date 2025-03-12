import { Routes, Route } from 'react-router-dom'
import Home from './Home/Home.jsx'
import DetailView from './DetailView/DetailView.jsx'
import SubView from './SubView/SubView.jsx'
import TeaView from './TeaView/TeaView.jsx'
import CustView from './CustView/CustView.jsx'
import './App.css'

function App() {

  return (
    <section className='Routing'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:subId' element={<DetailView />} />
        <Route path='/:subId/subscriber_data' element={<SubView />} />
        <Route path='/teas' element={<TeaView />} />
        <Route path='/customers' element={<CustView />} />
      </Routes>
    </section>
  )
}

export default App
