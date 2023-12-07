import { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase.js";

const AddCoursePage = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    thumnail: "",
    link: "",
    fees: 1000,
    discount: 500,
    eligibilty: "",
    isActive: true,
    isFeatured: true,
    isOffer: false,
  });
  const [image, setImage] = useState();
  const [isElig, setElig] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageProgress, setImageProgress] = useState(null);

  const handleChange = (e) => {
    if (e.target.id === "isEligi") {
      setElig(!isElig);
    }

    if (
      e.target.id === "isActive" ||
      e.target.id === "isFeatured" ||
      e.target.id === "isOffer"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }
    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  console.log(formData);

  const storeImage =  (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageProgress(Math.round(progress));
      },
      (error) => {
        setError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setImage({ ...formData, thumbnail: downloadUrl });
        });
      }
    );
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      if (formData.thumnail.length < 1)
        return setError("Please upload the image!");
      if (formData.fees < formData.discount)
        return setError("The discount should be less than the fees amount!");
      setLoading(true);
      setError(false);
      const res = await fetch()
    } catch (error) {'/api/course/v1/create-course', {}}
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
            onChange={(e) => setImage(e.target.files)}
          />
          <div
            className="mt-1 text-sm text-gray-500 dark:text-gray-300"
            id="user_avatar_help"
          >
            Upload course thumbail picture
          </div>
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
            required
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
            required
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
              required
              id="discount"
              value={formData.discount}
              onChange={handleChange}
            />
          </div>
        )}

        {isElig && (
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
              required
              id="eligibilty"
              value={formData.eligibilty}
              onChange={handleChange}
            />
          </div>
        )}

        <div className="flex items-start mb-5">
          <div className="flex items-center h-5">
            <input
              id="isActive"
              type="checkbox"
              checked={formData.isActive}
              onChange={handleChange}
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
              required
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
              required
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
              id="isEligi"
              type="checkbox"
              checked={isElig}
              onChange={handleChange}
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
              required
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
              required
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
          type="submit"
          className="text-white bg-orange-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddCoursePage;
