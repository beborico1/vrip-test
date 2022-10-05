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
      setWomen(false)
      setMen(false)
      if (gender === "women") {
        setWomen(true)
      } else if (gender === "men") {
        setMen(true)
      }
  },[searchParams])

  return (
    <div className="shadow-sm border-b bg-gray-100 sticky top-0 z-20">
      <div className="flex justify-evenly max-w-6xl xl:mx-auto">
          <div className={`w-full ${men ? "bg-gray-300":""}`}>
            <button onClick={()=>handleClick("men")} className="w-full text-center border-r-2 my-1">Men</button>
          </div>
          <div className={`w-full ${women ? "bg-gray-300":""}`}>
            <button onClick={()=>handleClick("women")} className="w-full text-center my-1">Women</button>
          </div>
      </div>
    </div>
  )
}

export default Filter
