import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const AllGalleries = () => {
    const [allgalleries, setAllGalleries] = useState([]);

  useEffect(() => {
    const fetchAllGAlleries = async (res) => {
      try {
        const res = await fetch("/api/gallery/v1/all-galleries");
        const data = await res.json();
        setAllGalleries(data);
      } catch (error) {
        res.status(500).json(error);
      }
    };
    fetchAllGAlleries();
  }, []);

  console.log(allgalleries);
  return (
    <div className="max-w-6xl mx-auto ">
    <div className="m-10">
      <div className="float-right">
        <Link
          to="/upload-galleries"
          className="bg-orange-700 px-4 py-1 rounded-lg text-white"
        >
          Add New Gallery
        </Link>
      </div>
    </div>
    <div className="text-center">
      <h1 className="font-semibold text-2xl text-gray-600">
        Image Galleries
      </h1>
    </div>
   
      <div className=" grid grid-flow-row-1 gap-2 items-center sm:grid-cols-3" >
      {allgalleries.map((gallery, index) => (
        <div key={index} className="relative mt-5 m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
          <Link
            className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
            to={`/all-media/${gallery._id}`}
          >
            <img
              className="object-cover"
              src={gallery.images[0]}
              alt="product image"
            />
          </Link>
          <div className="mt-4 px-5 pb-5">
            <Link to={`/all-media/${gallery._id}`}>
              <h5 className="text-xl tracking-tight text-center text-slate-900">
                {gallery.title}
              </h5>
              <p>{gallery.description}</p>
              <p>{gallery.date}</p>
            </Link>
            <div className="mt-4 px-5 pb-5">
              <Link
                to={`/all-media/${gallery._id}`}
                className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
              >
                View All Photos
              </Link>
            </div>
          </div>
        </div>
        ))}
      </div>
   
  </div>
  )
}

export default AllGalleries