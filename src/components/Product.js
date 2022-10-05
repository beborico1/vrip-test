import React from 'react'

function Product({product}) {
  return (
    <div className="rounded-lg mr-4 mb-4 bg-white shadow-md px-7 py-5 content-center">
        <div className='flex justify-center'>
            <img className="object-contain" alt="Product" src={product.data().images[0]}/>                    
        </div>
        <div className="mt-3">
            <p className='font-bold text-center line-clamp-1'>{product.data().name}</p>
            <p className='text-center text-sm text-gray-500 line-clamp-3 mt-3'>{product.data().description}</p>
        </div>
    </div>
  )
}

export default Product
