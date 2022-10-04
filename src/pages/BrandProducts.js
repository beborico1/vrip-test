import { collection, getDocs, limit, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import Filter from '../components/Filter'
import Header from '../components/Header'
import { db } from '../firebase-config'

function BrandProducts() {
    const {brand} = useParams()
    const [products,setProducts] = useState([])
    let [searchParams] = useSearchParams();
    const productsCollectionRef = collection(db,"products")

    const getProducts = async(q) => {
        const data = await getDocs(q)
        setProducts(data.docs)
    }

    useEffect(() => {
        const gender = searchParams.get("gender")
        if (gender === null) {
            const q = query(productsCollectionRef, where("brand_id", "==", `${brand}`),limit(6))
            getProducts(q)
        } else {
            console.log(gender)
            const q = query(productsCollectionRef, where("brand_id", "==", `${brand}`),where("gender","==",`${gender}`),limit(6))
            getProducts(q)
        }
    },[searchParams])
  
  return (
    <div>
        <Header/>
        <Filter/>
        <div className='p-5 grid grid-cols-2'>
            {products.map(product => (
                <div key={product.id} className="rounded-lg mr-4 mb-4 bg-white shadow-md px-7 py-5 content-center">
                    <div className='flex justify-center'>
                        <img className="h-60 object-contain" alt="Product" src={product.data().images[0]}/>                    
                    </div>
                    <div>
                        <p className='font-bold text-center'>{product.data().name}</p>
                        <p className='text-center text-sm text-gray-500 line-clamp-2'>{product.data().description}</p>
                    </div>
                </div>
            ))}
        </div>
        <div className='flex justify-center mb-9'>
            <button className='text-white bg-black px-3 py-1 rounded'>View More</button>
        </div>
    </div>
  )
}

export default BrandProducts
