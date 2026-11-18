import {getLink,logEvent} from "./_lib.js";
export default async function handler(req,res){
  const l=await getLink(String(req.query.slug||"").toLowerCase());
  const url=l&&l.published!==false&&l.platforms&&l.platforms[req.query.platform];
  if(!url||!/^https?:\/\//i.test(url))return res.status(404).send("Not found");
  await logEvent(req,l.id,"click",req.query.platform);
  res.setHeader("Cache-Control","no-store");
  res.redirect(302,url);
}
