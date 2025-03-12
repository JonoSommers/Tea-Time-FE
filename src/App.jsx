import { Routes, Route } from 'react-router-dom'
import Home from './Home/Home.jsx'
import DetailView from './DetailView/DetailView.jsx'
import './App.css'

function App() {

  return (
    <section className='Routing'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:subName' element={<DetailView />} />
      </Routes>
    </section>
  )
}

export default App
