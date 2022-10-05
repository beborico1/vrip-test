import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Header from '../components/Header'
import { db } from '../firebase-config'

function ProductDetail() {
    const {brand_id,product_id} = useParams()
    const [product,setProduct] = useState({})
    const [images,setImages] = useState([])
    
    const productRef = doc(db,`products/${product_id}`)

    const loadProduct = async() => {
        const productSnap = await getDoc(productRef)
        
        if (productSnap.exists()) {
            const product_data=productSnap.data()
            setProduct(product_data)
            setImages(product_data.imgs_1080)
        } else {
            console.log("No such document!");
        }
    }

    useEffect(() => {
        loadProduct()
    },[])
    
    return (
        <div>
            <div className='m-3 p-5 bg-white rounded shadow-md'>
                <Link to={`/${brand_id}`}><b className='hover:text-gray-700'>{"Go back"}</b></Link>
                <div className='flex flex-col items-center space-y-3'>
                    {product.video_src==="" ? (<div></div>):(<div>
                        <iframe autoplay className="aspect-auto h-96 w-48" src={product.video_src}></iframe>
                    </div>)}
                    
                    <h1 className='font-bold'>{product.name}</h1>
                    <p className='mb-5 text-center text-sm text-gray-700'>{product.description}</p>
                </div>
                <br/>

                <div className='grid grid-cols-3'>
                    {images.map(img => (
                        <img className='' src={img}/>
                    ))}
                </div>

                <div className='text-center text-sm text-gray-700 mt-6 mb-5'>
                        <b className=''>By:</b>
                        <span className=''> {product.brand_name}</span>
                        <br/>
                        <b className=''>User:</b>
                        <span className=''> @{product.brand_id}</span>
                        <br/>
                        <b className=''>SKU:</b>
                        <span className=''> {product.inside_sku}</span>
                        <br/>
                        <b className=''>ID:</b>
                        <span className=''> {product.inside_id}</span>
                        <br/>
                        <b className=''>Gender:</b>
                        <span className=''> {product.gender}</span>
                        <br/>
                        <b className=''>Category:</b>
                        <span className=''> {product.category}</span>
                        <br/>
                        <b className=''>Available Online:</b>
                        <span className=''> {product.availabe_online ? "Yes":"No"}</span>
                    </div>
                
                <p className='w-full text-center mb-4 font-medium'>$ {product.price_float} usd</p> 

                <div className='flex justify-center'>
                    <a className='bg-black text-white rounded-lg px-4 py-1' href={product.buy_url}>Buy</a>
                </div>
            </div>
        </div>
  )
}

export default ProductDetail
