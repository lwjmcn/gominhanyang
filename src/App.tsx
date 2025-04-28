import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Counter from './store/pages/Counter'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/counter" element={<Counter />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;