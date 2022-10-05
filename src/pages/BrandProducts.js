import { collection, getDocs, limit, query, startAfter, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import Filter from '../components/Filter'
import Header from '../components/Header'
import Product from '../components/Product'
import { db } from '../firebase-config'

function BrandProducts() {
    const {brand} = useParams()
    const [searchParams] = useSearchParams();
    const [products,setProducts] = useState([])
    const [brandName,setBrandName] = useState("")
    const productsCollectionRef = collection(db,"products")

    useEffect(() => {
        loadProducts()
    },[searchParams])

    const loadProducts = async () => {
        const gender = searchParams.get("gender")
        if (gender === null) {
            const q = query(productsCollectionRef, where("brand_id", "==", `${brand}`),limit(6))
            const data = await getDocs(q)
            setProducts(data.docs)
            setBrandName(data.docs[0].data().brand_name)
        } else {
            const q = query(productsCollectionRef, where("brand_id", "==", `${brand}`),where("gender","==",`${gender}`),limit(6))
            const data = await getDocs(q)
            setProducts(data.docs)
            setBrandName(data.docs[0].data().brand_name)
        }
    }

    const loadMoreProducts = async () => {
        const lastProduct = products[products.length-1]
        const gender = searchParams.get("gender")
        if (gender === null) {
            const q = query(productsCollectionRef, where("brand_id", "==", `${brand}`),limit(6),startAfter(lastProduct))
            const data = await getDocs(q)
            setProducts([...products, ...data.docs])
        } else {
            const q = query(productsCollectionRef, where("brand_id", "==", `${brand}`),where("gender","==",`${gender}`),limit(6),startAfter(lastProduct))
            const data = await getDocs(q)
            setProducts([...products, ...data.docs])
        }
    }

  return (
    <div>
        <Header/>
        <Filter/>
        <h1 className='text-2xl mt-4 mb-4 text-center font-semibold'>{brandName}</h1>  
        <div className='px-1 grid grid-cols-2 lg:grid-cols-3'>
            {products.map(product => (
                <Product
                    key={product.id}
                    product={product}
                />
            ))}
        </div>
        <div className='flex justify-center mb-9 mt-8'>
            <button onClick={loadMoreProducts} className='text-white bg-black px-3 py-1 rounded'>View More</button>
        </div>
    </div>
  )
}

export default BrandProducts
