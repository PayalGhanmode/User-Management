import { verify } from 'jsonwebtoken';

export const verifToken = (req, res, next) => {
    try {
        const token = req.header("Authorization")
        console.log(token, '---token ');
        
        const verified = verify(token, "KEY")
        console.log(verified , "dfgfggggh")

        if (!verified) {
            return res.status(404).json({ "message": "Access Denied" })
        }
        req.user=verified;
        next()
    } catch (error) {
        console.log('error in verify Token ', error.message);
        
        res.status(401).json({ "error": error.message })
    }
}


