import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// @desc Auth user & get token
// @route Post /api/users/login
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
            token: generateToken(user._id)
        })
    } else {
        // 401 means unauthorized
        res.status(401);
        throw new Error('Invalid Email or Password')
    }
    // for testing
    // res.send({ email, password });
})


// @desc Register a new user
// @route Post /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email: email });
    if (userExists) {
        // Bad request
        res.status(400)
        throw new Error('User Already Exist');
    }
    const user = await User.create({
        name,
        email,
        password
    })

    if (user) {
        // created
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)

        })

    } else {
        res.status(400)
        throw new Error('Invalid User Data');
    }
})


// @desc Get user profile
// @route Post /api/user/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })

    } else {
        res.status(404)
        throw new Error('User Not Found');
    }

    // res.send('Success');

})

export {
    authUser,
    getUserProfile,
    registerUser,
}
