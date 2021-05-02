import jswt from 'jsonwebtoken';

const generateToken = (id) => {
    return jswt.sign({id}, process.env.JWT_SECRET,{
        expiresIn:'30d' // means 30 days
    })
}

export default generateToken;