import jwt from "jsonwebtoken";
const { sign } = jwt;

export const getToken = async (email, user) => {
    
    const token = sign(
        {identifier: user._id},
        ""
    );
    return token;
};

