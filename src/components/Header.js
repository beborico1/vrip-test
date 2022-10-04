import { Link } from "react-router-dom"

function Header() {
  return (
    <div className="shadow-sm border-b bg-white sticky top-0 z-50">
      {/* Left */}
      <div className="flex justify-center max-w-6xl mx-5 xl:mx-auto py-2">
        <div className="relative lg:inline-grid w-24 cursor-pointer">
            <Link to="/">
                <img
                    src="./images/logo.png"
                    alt="logo"
                />
            </Link>
        </div> 
        </div>
    </div>
  )
}

export default Header
