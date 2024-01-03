import { useState, useEffect, useRef } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase.js";
import { AiOutlineCloudUpload, AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const AddCoursePage = () => {
  const [imgs, setImgs] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    thumbnail: [],
    link: "",
    fees: 1000,
    discount: 500,
    eligibility: "",
    isActive: true,
    isFeatured: true,
    isOffer: false,
    isElig: false
  });
  // const [isElig, setElig] = useState(false);
  const [uploadingImg, setUploadingImg] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  console.log(formData);

  const handleUploadImg = () => {
    if (imgs.length > 0 && formData.thumbnail.length < 4) {
      setUploadingImg(true);
      setImgError(false);
      const promises = [];

      for (let i = 0; i < imgs.length; i++) {
        promises.push(storeImages(imgs[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            thumbnail: formData.thumbnail.concat(urls),
          });
          setImgError(false);
          setUploadingImg(false);
        })
        .catch((err) => {
          setImgError("There is an error", err);
          setUploadingImg(false);
        });
    } else {
      setImgError("There is an error you cant upload");
      setUploadingImg(false);
    }
  };
  const storeImages = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`upload is ${progress}% done`);
          setProgress(Math.round(progress));
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      thumbnail: formData.thumbnail.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    // if (e.target.id === "isEligi") {
    //   setElig(!isElig);
    // }

    if (
      e.target.id === "isActive" ||
      e.target.id === "isFeatured" ||
      e.target.id === "isOffer" ||
      e.target.id === "isElig"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }
    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea" ||
      e.target.type === "date"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.thumbnail.length < 0) {
        return setError("you must upload atleast 1 image");
      }
      if (formData.fees < formData.discount) {
        return setError("discount should be less than the fees");
      }
      setLoading(true);
      setError(false);
      const res = await fetch("/api/course/v1/create-course", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
      }
      console.log(data);
      navigate("/manage-course");
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10">
      <form className="max-w-4xl mx-auto p-3" onSubmit={handleSubmit}>
        <div className="mb-5">
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Course Title
          </label>
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            id="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Course Description
          </label>
          <textarea
            type="textarea"
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            id="description"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="mb-5">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="thumbanil"
          >
            Upload Thumnail
          </label>
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            aria-describedby="user_avatar_help"
            type="file"
            id="thumbnail"
            accept="image/*"
            onChange={(e) => setImgs(e.target.files)}
            multiple
            disabled={uploadingImg}
          />

          <div
            className="mt-1 text-sm text-gray-500 dark:text-gray-300 flex justify-between"
            id="user_avatar_help"
          >
            {uploadingImg ? (
              <ul className="max-w-md space-y-2 text-gray-500 list-inside dark:text-gray-400">
                <li className="flex items-center">
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      className="w-4 h-4 me-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                  <p>{`Uploding Image ${progress}%`}</p>
                </li>
              </ul>
            ) : (
              <>
                {" "}
                <p>Upload course thumbail picture</p>
                <AiOutlineCloudUpload
                  onClick={handleUploadImg}
                  className="text-3xl font-bold text-green-700 hover:cursor-pointer"
                />
                <p className="text-red-700 text-sm">{imgError && imgError}</p>
              </>
            )}
          </div>
        </div>
        <div className="mb-5 flex flex-col sm:flex-row">
          {formData.thumbnail.length > 0 &&
            formData.thumbnail.map((url, index) => (
              <div key={url}>
                <AiOutlineClose onClick={() => handleRemoveImage(index)} />
                <img src={url} alt="course" style={{ height: 250 }} />
              </div>
            ))}
        </div>
        <div className="mb-5">
          <label
            htmlFor="link"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Youtube Video Link
          </label>
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            id="link"
            value={formData.link}
            onChange={handleChange}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="fees"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Fees Amount (INR)
          </label>
          <input
            type="number"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            id="fees"
            value={formData.fees}
            onChange={handleChange}
          />
        </div>
        {formData.isOffer && (
          <div className="mb-5">
            <label
              htmlFor="discount"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Enter Discount Amount (INR)
            </label>
            <input
              type="number"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              id="discount"
              value={formData.discount}
              onChange={handleChange}
            />
          </div>
        )}

        {formData.isElig && (
          <div className="mb-5">
            <label
              htmlFor="eligibility"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Eligibility Criteria
            </label>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              id="eligibility"
              value={formData.eligibility}
              onChange={handleChange}
            />
          </div>
        )}
        <div className="relative max-w-full mb-5">
        <label
              htmlFor="atartingdate"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Batch Starts on
            </label>
  <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
      <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
    </svg>
  </div>
  <input id="starts" onChange={handleChange} type="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date" />
</div>
{formData.isOffer && <div className="relative max-w-full mb-5">
        <label
              htmlFor="validity"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Offer Vaild Till
            </label>
  <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
      <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
    </svg>
  </div>
  <input  id="offerVailidity" onChange={handleChange}  type="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date" />
</div> }


        <div className="flex items-start flex-col mb-5 sm:flex-row">
          <div className="flex items-center h-5">
            <input
              id="isActive"
              type="checkbox"
              checked={formData.isActive}
              onChange={handleChange}
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
            />
          </div>
          <label
            htmlFor="isActive"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Active
          </label>
          <div className="flex items-center h-5 mx-2">
            <input
              id="isFeatured"
              type="checkbox"
              checked={formData.isFeatured}
              onChange={handleChange}
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
            />
          </div>
          <label
            htmlFor="isFeatured"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Featured
          </label>
          <div className="flex items-center h-5 mx-2">
            <input
              id="isElig"
              type="checkbox"
              checked={formData.isElig}
              onChange={handleChange}
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
            />
          </div>
          <label
            htmlFor="isOffer"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Required Eligibility ?
          </label>
          <div className="flex items-center h-5 mx-2">
            <input
              id="isOffer"
              type="checkbox"
              checked={formData.isOffer}
              onChange={handleChange}
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
            />
          </div>
          <label
            htmlFor="isOffer"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Offer
          </label>
        </div>
        <button
          disabled={loading || uploadingImg}
          className="text-white bg-orange-700 hover:bg-orange-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          {loading ? "Saving..." : "Save"}
        </button>
        {error && error}
      </form>
    </div>
  );
};

export default AddCoursePage;
