import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';

const protect = asyncHandler(async (req, res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        console.log('token found')
        try{
            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // console.log(decoded);
                                                    // by doing this it's not returning the password
            req.user = await User.findById(decoded.id).select('-password');
            next();
        }
        catch(error){
            console.error(error);
            res.status(401)
            throw new Error('Not Authorized, Token Failed');
        }
    }
    if(!token){
        res.status(401)
        throw new Error('Not Authorized, No Token')
    }
})
export { protect};