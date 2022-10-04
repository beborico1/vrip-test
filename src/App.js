import { useState, useEffect} from 'react'
import './App.css'
import {db} from "./firebase-config"
import {collection,getDocs} from "firebase/firestore"

function App() {
  const [brands,setBrands] = useState([])
  const brandsCollectionRef = collection(db,"brands")

  useEffect(() => {
    
    const getBrands = async() => {
      const data = await getDocs(brandsCollectionRef)

      const arrayData = data.docs.map(doc => ({id: doc.id, ...doc.data()}))
            
      setBrands(data.docs)
    }

    getBrands()
  },[])

  return (
    <div className="App">
      <div className='p-5'>
        <h1 className='text-2xl mb-4 font-semibold'>Brands:</h1>
        {brands.map(brand => (
          <div className="rounded mb-3 items-center bg-white shadow-md px-7 py-5" key={brand.id}>
            <div className='flex mb-4 justify-between items-center'>
              <div className='flex'>
                <img className="shadow-lg rounded-full h-12 w-12 mr-3 border" src={brand.data().icon_url}/>
                <div>
                  <h3 className='font-medium'>{brand.data().name}</h3>
                  <h3 className='text-sm text-gray-500'>@{brand.id}</h3>
                </div>
              </div>
              <div>
                <a className="rounded-lg bg-gray-100 px-3 py-1.5 hover:bg-gray-700 hover:text-white text-sm font-semibold" href={brand.data().website}>Visit Website</a>
              </div>
            </div>
            <div className='text-sm'>
              {brand.data().description}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App