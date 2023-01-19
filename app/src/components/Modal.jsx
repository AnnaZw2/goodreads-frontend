import "./../index.css"
export function Modal({textModal}){
    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
        <div className="relative bg-white rounded-lg p-6">
          <div className="absolute top-0 right-0">
            <button className="text-black font-medium hover:text-black focus:outline-none focus:text-black">
              X
            </button>
          </div>
          <div className="text-lg font-medium mb-4 "><h4 className="header-4">Confirm</h4></div>
          <div className="text-gray-700 mb-4">{textModal}</div>
          <div className="flex justify-center">
            <button className="text-gray-700 font-medium  hover:text-red  focus:outline-none focus:text-gray-900 mr-2">
              Cancel
            </button>
            <button className="bg-indigo-500  font-medium  hover:text-green p-3 focus:outline-none focus:bg-indigo-600">
              Continue
            </button>
          </div>
        </div>
      </div>
      
    )
}