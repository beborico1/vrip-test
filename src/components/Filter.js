import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom"

function Filter() {
  let [searchParams, setSearchParams] = useSearchParams();
  let [women,setWomen] = useState(false)
  let [men,setMen] = useState(false)
  
  const handleClick = (gender) => {
    if (searchParams.get("gender") === gender){
      setSearchParams({})
    } else {
      setSearchParams({gender: gender})
    }
  }

  useEffect(() => {
    const gender = searchParams.get("gender")
      if (gender === "women") {
        setWomen(true)
        setMen(false)
      } else if (gender === "men") {
        setMen(true)
        setWomen(false)
      }
  },[searchParams])

  return (
    <div className="shadow-sm border-b bg-gray-100 sticky top-0 z-20">
      <div className="flex justify-evenly max-w-6xl mx-5 xl:mx-auto py-1">
          <button onClick={()=>handleClick("men")} className="w-full text-center border-r-2">Men</button>
          <button onClick={()=>handleClick("women")} className="w-full text-center">Women</button>
      </div>
    </div>
  )
}

export default Filter
