import React from 'react'
import { Link } from 'react-router-dom'
import { LazyLoadImage } from "react-lazy-load-image-component";

function Product({product}) {
  return (
    <Link to={`/${product.data().brand_id}/${product.id}`}>
      <div className='h-full'>
        <div className="p-1 h-full">
            <div className='flex justify-center w-full bg-gray-300'>
                <img loading='lazy' className="object-contain w-full" alt="Product" src={product.data().front_image}/>                    
            </div>
        </div>
      </div>
    </Link>
  )
}

export default Product
