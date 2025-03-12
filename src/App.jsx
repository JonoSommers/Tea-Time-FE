import { Routes, Route } from 'react-router-dom'
import './App.css'

function App() {

  return (
    <section className='Routing'>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/:subName' element={<DetailView />} />
      </Routes>
    </section>
  )
}

export default App
