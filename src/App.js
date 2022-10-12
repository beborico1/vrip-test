import { Route, Routes } from 'react-router-dom';
import BrandList from './pages/BrandList'
import './App.css'
import BrandProducts from './pages/BrandProducts';
import ProductDetail from './pages/ProductDetail';
import EditProduct from './pages/EditProduct';

function App() {
  return (
    <div className="App">
      <Routes>
          <Route strict exact path="/" element={<BrandList/>}/>
          <Route strict exact path="/:brand_id" element={<BrandProducts/>}/>
          <Route strict exact path="/:brand_id/:product_id" element={<ProductDetail/>}/>
          <Route strict exact path="/:brand_id/:product_id/edit" element={<EditProduct/>}/>
      </Routes>
    </div>
  )
}

export default App