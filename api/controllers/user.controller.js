import bcryptjs from 'bcryptjs'
import User from '../models/user.model.js';


export const userUpdate = async (req, res, next) => {
    if (req.user.id !== req.params.id)
    
    return res.status(401).json({error:'You are not allowed to update user info! '})
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          profilePicture: req.body.profilePicture,
         firstName: req.body.firstName,
         lastName: req.body.lastName,
         role: req.body.role,
         dob: req.body.dob,
         email: req.body.email,
         password: req.body.password,
         address: req.body.address,
         city: req.body.city,
         state: req.body.state,
         country: req.body.country,
         mobileNumber: req.body.mobileNumber,
      }}, { new: true }
    );
    const { password, ...rest } = updateUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
}