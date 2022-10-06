import { doc, collection, getDoc, getDocs, limit, query, startAfter, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import Filter from '../components/Filter'
import Header from '../components/Header'
import Product from '../components/Product'
import { db } from '../firebase-config'

function BrandProducts() {
    const {brand_id} = useParams()
    const [searchParams] = useSearchParams();
    const [products,setProducts] = useState([])
    const [brand,setBrand] = useState({})
    const productsCollectionRef = collection(db,`products`)
    const brandRef = doc(db,`brands/${brand_id}`)
    
    useEffect(() => {
        const getBrand = async() => {
            const data = await getDoc(brandRef)
            setBrand(data.data())
            console.log(data.data())
        }

        getBrand()
    },[])

    useEffect(() => {
        loadProducts()
    },[searchParams])

    const loadProducts = async () => {
        const gender = searchParams.get("gender")
        if (gender === null) {
            const q = query(productsCollectionRef, where("brand_id", "==", `${brand_id}`),limit(12))
            const data = await getDocs(q)
            setProducts(data.docs)
        } else {
            const q = query(productsCollectionRef, where("brand_id", "==", `${brand_id}`),where("gender","==",`${gender}`),limit(12))
            const data = await getDocs(q)
            setProducts(data.docs)
        }
    }

    const loadMoreProducts = async () => {
        const lastProduct = products[products.length-1]
        const gender = searchParams.get("gender")
        if (gender === null) {
            const q = query(productsCollectionRef, where("brand_id", "==", `${brand_id}`),limit(12),startAfter(lastProduct))
            const data = await getDocs(q)
            setProducts([...products, ...data.docs])
        } else {
            const q = query(productsCollectionRef, where("brand_id", "==", `${brand_id}`),where("gender","==",`${gender}`),limit(12),startAfter(lastProduct))
            const data = await getDocs(q)
            setProducts([...products, ...data.docs])
        }
    }

  return (
    <div>
        <Header/>
        <Filter/>
        <div className='bg-white rounded-lg mx-2 mt-4'>
            <div className='p-6'>
                <div className='flex mb-4 justify-between items-center'>
                    <div className='flex'>
                      <img alt="" className="shadow-lg rounded-full h-12 w-12 mr-3 border" src={brand.icon_url}/>
                      <div>
                        <h3 className='font-medium'>{brand.name}</h3>
                        <h3 className='text-sm text-gray-500'>@{brand.id}</h3>
                      </div>
                    </div>
                    <div>
                      <a className="rounded-lg bg-gray-100 px-3 py-1.5 hover:bg-gray-200 text-sm font-semibold" href={brand.website}>Visit Website</a>
                    </div>
                </div>
                <div className='text-sm mb-3'>
                  {brand.description}
                </div>
            </div>

            <div className='grid grid-cols-2 lg:grid-cols-3'>
                {products.map(product => (
                    <Product
                        key={product.id}
                        product={product}
                    />
                ))}
            </div>
        </div>

        <div className='flex justify-center mb-9 mt-8'>
                <button onClick={loadMoreProducts} className='text-white bg-black px-3 py-1 rounded'>View More</button>
        </div>
        
    </div>
  )
}

export default BrandProducts
