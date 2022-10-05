import React from 'react'
import { Link } from 'react-router-dom'

function Product({product}) {
  return (
    <Link to={`/${product.data().brand_id}/${product.id}`}>
      <div className="rounded-lg pb-3 m-1 bg-white shadow-md content-center">
          <div className='flex justify-center w-full'>
              <img className="rounded-lg object-contain w-full" alt="Product" src={product.data().front_image}/>                    
          </div>
          <div className="px-4">
              <p className='font-bold text-center text-xs'>{product.data().name}</p>
          </div>
      </div>
    </Link>
  )
}

export default Product
