import React from 'react'
import { Link } from 'react-router-dom'

function Product({product}) {
  return (
    <Link to={`/${product.data().brand_id}/${product.id}`}>
      <div className='h-full'>
        <div className=" bg-white border border-gray-300 content-center h-full">
            <div className='flex justify-center w-full'>
                <img className="object-contain w-full" alt="Product" src={product.data().front_image}/>                    
            </div>
        </div>
      </div>
    </Link>
  )
}

export default Product
