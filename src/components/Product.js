import React from 'react'

function Product({product}) {
  return (
    <div className="rounded-lg mr-4 mb-4 bg-white shadow-md content-center">
        <div className='flex justify-center w-full'>
            <img className="rounded-lg object-contain w-full" alt="Product" src={image}/>                    
        </div>
        <div className="px-4 mb-4 mt-1">
            <p className='font-bold text-center text-xs'>{product.data().front_image}</p>
        </div>
    </div>
  )
}

export default Product
