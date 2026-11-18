import {brand} from "./_lib.js";
export default function handler(req,res){
  res.setHeader("Cache-Control","public, max-age=300");
  res.status(200).json({url:process.env.SUPABASE_URL,key:process.env.SUPABASE_ANON_KEY,brand:brand()});
}
