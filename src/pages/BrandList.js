import React from 'react'
import { useState, useEffect} from 'react'
import {db} from "../firebase-config"
import {collection,getDocs} from "firebase/firestore"
import Header from '../components/Header'
import { Link } from 'react-router-dom'

function BrandList() {
    const [brands,setBrands] = useState([])
    const brandsCollectionRef = collection(db,"brands")
    
    useEffect(() => {
        const getBrands = async() => {
            const data = await getDocs(brandsCollectionRef)
            setBrands(data.docs)
        }
        getBrands()
    },[])

  return (
    <div>
      <Header/>
      <div className='p-2 mt-2'>
        {brands.map(brand => (
          <div className="rounded-lg mb-3 items-center bg-white shadow-md px-5 py-5" key={brand.id}>
            <div className='flex mb-4 justify-between items-center'>
              <Link to={`/${brand.id}`}>
                <div className='flex'>
                  <img alt="" className="shadow-lg rounded-full h-12 w-12 mr-3 border" src={brand.data().icon_url}/>
                  <div>
                    <h3 className='font-medium'>{brand.data().name}</h3>
                    <h3 className='text-sm text-gray-500'>@{brand.id}</h3>
                  </div>
                </div>
              </Link>
              <div>
                <a className="rounded-lg bg-gray-100 px-3 py-1.5 hover:bg-gray-200 text-sm font-semibold" href={brand.data().website}>Visit Website</a>
              </div>
            </div>
            <div className='text-sm mb-3'>
              {brand.data().description}
            </div>
            <Link to={`/${brand.id}`}>
              <div>
                <button className='font-semibold w-full py-2 hover:text-gray-800'>Visit</button>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BrandList
