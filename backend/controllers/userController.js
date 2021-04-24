import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

// @desc Auth user & get token
// @route Post /api/user/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: null
        })
    }else{
        // 401 means unauthorized
        res.status(401);
        throw new Error('Invalid Email or Password')
    }
    // for testing
    // res.send({ email, password });
})

export {
    authUser,
}
