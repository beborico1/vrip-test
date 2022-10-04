import { Route, Routes } from 'react-router-dom';
import BrandList from './pages/BrandList'
import './App.css'
import BrandProducts from './pages/BrandProducts';

function App() {
  return (
    <div className="App">
      <Routes>
          <Route strict exact path="/" element={<BrandList/>}/>
          <Route strict exact path="/:brand" element={<BrandProducts/>}/>
        </Routes>
    </div>
  )
}

export default App