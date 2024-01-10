import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import UploadGallery from '../components/UploadGallery'

const Galleries = () => {

    const [modalOpen, setModalOpen] = useState(false)

    const handleModal = () => {
        setModalOpen(!modalOpen)
    }
  return (
    <>
    {modalOpen ? (
        <UploadGallery modalOpen={modalOpen} setModalOpen={setModalOpen} />
    ): (<div className='max-w-6xl mx-auto'>

    <div className='m-10'>
        <div className='float-right'>
            <button onClick={handleModal} className='bg-orange-700 px-4 py-1 rounded-lg text-white'>Add New Gallery</button>
        </div>
   
    </div>
    <div className='text-center'>
        <h1 className='font-semibold text-2xl text-gray-600'>Image Galleries</h1>
    </div>
    <div className='grid grid-cols-3 gap-2'>
    <div className="relative mt-5 m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
          <Link
              className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
              to={`/`}
            >
              <img
                className="object-cover"
                src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(70).webp"
                alt="product image"
              />
              
           </Link>
            <div className="mt-4 px-5 pb-5">
            <Link   to={`/`}>
                <h5 className="text-xl tracking-tight text-center text-slate-900">
                
                 Course Launch Event
                </h5>
             </Link>
             <div className="mt-4 px-5 pb-5">
            <Link
                  to={`/`}
                className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
              >
                
                View All Photos
             </Link>
             
             </div>
            </div>
          </div>
          <div className="relative mt-5 m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
          <Link
              className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
              to={`/`}
            >
              <img
                className="object-cover"
                src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(70).webp"
                alt="product image"
              />
              
           </Link>
            <div className="mt-4 px-5 pb-5">
            <Link   to={`/`}>
                <h5 className="text-xl tracking-tight text-center text-slate-900">
                
                 Course Launch Event
                </h5>
             </Link>
             <div className="mt-4 px-5 pb-5">
            <Link
                  to={`/`}
                className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
              >
                
                View All Photos
             </Link>
             
             </div>
            </div>
          </div>
    </div>
    
</div>) }
    
    </>
  )
}

export default Galleries