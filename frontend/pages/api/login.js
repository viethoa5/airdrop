import connect from '../../model/DBconnect';
import Users from '../../model/user';
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";
connect();
const secret = "bestSecretKey69";
export default async function handler(req, res) {
  const { username, password } = req.body;
     const user = await Users.findOne({username: username});
     if (user !== null && user.password == password) {
      const token = sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, // 30 days
          username: user.username,
          password: user.password,
        },
        secret
      );
  
      const serialised = serialize("OursiteJWT", token, {
        httpOnly: true,
        secure:  "development",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });
      res.setHeader("Set-Cookie", serialised);
      res.status(200).json({message : "OK"});
    } else {
      res.json({message : "Login Fail"});
    }
} 