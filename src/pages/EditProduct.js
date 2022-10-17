import { arrayRemove, doc, getDoc, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { db } from '../firebase-config'

function EditProduct() {
    const {brand_id,product_id} = useParams()
    const [product,setProduct] = useState({})
    const [small_images,setSmallImages] = useState([])
    const [medium_images,setMediumImages] = useState([])
    const [large_images,setLargeImages] = useState([])
    const [showImages,setShowImages] = useState(false)
    const [selectedImage,setSelectedImage] = useState("")
    const [selectedImageField,setSelectedImageField] = useState("")

    const productRef = doc(db,`brands/${brand_id}/products/${product_id}`)

    const loadProduct = async() => {
        const productSnap = await getDoc(productRef)
        
        if (productSnap.exists()) {
            const product_data=productSnap.data()
            setProduct(product_data)
            setSmallImages(product_data.imgs_small)
            setMediumImages(product_data.imgs_medium)
            setLargeImages(product_data.imgs_large)
        } else {
            console.log("No such document!");
        }
    }

    useEffect(() => {
        loadProduct()
    },[])

    const changeFrontImage = async() => {
        await updateDoc(productRef, {
            front_image: selectedImage
        })
        setSelectedImage("")
    }

    const deleteImage = async() => {
        var obj = {}

        obj[selectedImageField] = arrayRemove(selectedImage)

        await updateDoc(productRef, obj)

        setSelectedImage("")
    }
    
    
    return (
        <div>
            <div className='m-3 p-5 bg-white rounded shadow-md'>
                <Link to={`/${brand_id}/${product_id}`}>
                    <b>Go Back</b>
                </Link>
                <div className='flex flex-col items-center'>
                    <button onClick={()=>setShowImages(!showImages)} className='text-center text-2xl font-medium'>{showImages ? "Hide Images -":"Show Images +"}</button>
                </div>

                {showImages ? (
                <div>
                <h2 className='font-medium'>Small Images:</h2>
                <div className='grid grid-cols-3 mt-4'>
                    {small_images.map(image => (
                        <img key={image} onClick={() => {setSelectedImage(image);setSelectedImageField("imgs_small")}} className={`object-cover cursor-pointer w-full ${image===selectedImage ? "border border-black border-4":"p-2 "}`} alt="Product Image" src={image}></img>
                    ))}
                </div>
                <h2 className='font-medium'>Medium Images:</h2>
                <div className='grid grid-cols-3 mt-4'>
                    {medium_images.map(image => (
                        <img key={image} onClick={() => {setSelectedImage(image);setSelectedImageField("imgs_medium")}} className={`object-cover cursor-pointer w-full ${image===selectedImage ? "border border-black border-4":"p-2 "}`} alt="Product Image" src={image}></img>
                    ))}
                </div>
                <h2 className='font-medium'>Large Images:</h2>
                <div className='grid grid-cols-3 mt-4'>
                    {large_images.map(image => (
                        <img key={image} onClick={() => {setSelectedImage(image);setSelectedImageField("imgs_large")}} className={`object-cover cursor-pointer w-full ${image===selectedImage ? "border border-black border-4":"p-2 "}`} alt="Product Image" src={image}></img>
                    ))}
                </div>
                <div>
                    {selectedImage!=="" ? (
                    <div className='flex flex-col items-center'>
                        <button onClick={() => changeFrontImage()} className='mt-4 bg-lime-300 rounded-lg font-medium py-1 px-3'>
                            Set Image as Front Image
                        </button>
                        <button onClick={() => deleteImage()} className='mt-4 bg-red-600 text-white rounded-lg font-medium py-1 px-3'>
                            x Remove Image
                        </button>
                    </div>
                    
                    ):(<div></div>)}
                </div>
                </div>):(<div></div>)}
                <div className="text-red-600 font-bold">Delete Product</div>
            </div>
        </div>
  )
}

export default EditProduct
