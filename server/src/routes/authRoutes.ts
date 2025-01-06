import express from "express";
import { OAuth2 } from "oauth";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const githubOAuth = new OAuth2(
 "Ov23liF48yLloPB2sIV0",
 "ed0e5ecb67dd09ad5384f020be619cba4d33753f",
 "https://github.com/",
 "login/oauth/authorize",
 "login/oauth/access_token",
 undefined
);

router.get("/github", (req, res) => {
 const state = "fwinwiwcw";
 const authURL = githubOAuth.getAuthorizeUrl({
  redirect_uri: "http://localhost:3000",
  scope: "user:email",
  state: state,
 });
 res.redirect(authURL);
});

router.get("/github/callback", (req, res) => {
 const code = req.query.code as String;
 const state = req.query.state as String;

 githubOAuth.getOAuthAccessToken(
  code as string,
  { redirect_uri: "http://localhost:3000" },
  async (err, accessToken, refreshToken, results) => {
   if (err) {
    console.log(err, "error");
    return;
   }

   try {
    const response = await axios.get("https://api.github.com/user", {
     headers: {
      Authorization: `Bearer ${accessToken}`,
     },
    });

    const user = response.data;

    res.json({ user, accessToken });
   } catch (err) {
    console.log(err, "error");
   }
  }
 );
});

export default router;
