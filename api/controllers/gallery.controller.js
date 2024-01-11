import Gallery from "../models/gallary.model.js";

export const createGallery = async (req, res, next) => {
  try {
    const gallery = await Gallery.create(req.body);
    return res.status(201).json(gallery);
  } catch (error) {
    next(error);
  }
};

export const getAllGalleries = async (req, res, next) => {
  try {
    const allgalleries = await Gallery.find();
    return res.status(200).json(allgalleries);
  } catch (error) {
    next(error);
  }
};


export const getGallery = async(req, res, next) => {
  try {
    const gallery = await Gallery.findById(req.params.id);
    if(!gallery){
      return res.status(404).json('No items Available')
    }
    res.status(200).json(gallery)
  } catch (error) {
    res.status(500).json(error)
  }
}

export const updateGallery = async(req, res, next) => {
  const gallery = await Gallery.findById(req.params.id);
  if(!gallery){
    return res.status(404).json('No items found!')
  }
  try {
    const updatedGallery = await Gallery.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(updatedGallery)
  } catch (error) {
    res.status(500).json(error)
  }
} 


// {
//   const course = await Course.findById(req.params.id)
//     if(!course){
//       return res.status(404).json('There is no course available!')
//     }
//   try {
//     await Course.findByIdAndDelete(req.params.id)
//     res.status(200).json('Course Deleted!')
//   } catch (error) {
//     res.status(500).json(error)
//   }
// }


export const deleteGallery = async(req, res, next) => {
    const gallery = await Gallery.findById(req.params.id)
    if(!gallery) return res.status(404).json('There is no items available!')
    try {
      await Gallery.findByIdAndDelete(req.params.id)
      res.status(200).json('items has been deleted!')
    } catch (error) {
      res.status(500).json(error)
    }
}