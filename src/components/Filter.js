import { useSearchParams } from "react-router-dom"

function Filter() {
  let [searchParams, setSearchParams] = useSearchParams();
  
  const handleClick = (gender) => {
    if (searchParams.get("gender") === gender){
      setSearchParams({})
    } else {
      setSearchParams({gender: gender})
    }
  }
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
