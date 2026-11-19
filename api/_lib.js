const H=()=>({apikey:process.env.SUPABASE_ANON_KEY});
export const brand=()=>process.env.BRAND_NAME||"DBP Links";
export async function getLink(slug){
  if(!/^[a-z0-9-]{2,60}$/.test(slug))return null;
  const r=await fetch(`${process.env.SUPABASE_URL}/rest/v1/links?slug=eq.${slug}&select=*`,{headers:H()});
  return r.ok?(await r.json())[0]||null:null;
}
const BOT=/bot|crawl|spider|slurp|facebookexternalhit|facebot|whatsapp|telegram|twitterbot|slackbot|discord|preview|headless|lighthouse|curl|wget|python|axios|node-fetch|go-http|monitor|uptime|pingdom/i;
export async function logEvent(req,res,link_id,type,platform){
  const ua=req.headers["user-agent"]||"";
  if(!ua||BOT.test(ua))return;
  const name=`s_${type}_${platform||"v"}_${link_id.slice(0,8)}`;
  if(new RegExp("(?:^|;\\s*)"+name+"=").test(req.headers.cookie||""))return;
  res.setHeader("Set-Cookie",[].concat(res.getHeader("Set-Cookie")||[],`${name}=1; Max-Age=${type==="view"?1800:300}; Path=/; HttpOnly; SameSite=Lax; Secure`));
  let ref="";try{ref=new URL(req.headers.referer||"").hostname}catch{}
  const key=process.env.SUPABASE_SECRET_KEY||process.env.SUPABASE_ANON_KEY;
  const p=fetch(`${process.env.SUPABASE_URL}/rest/v1/events`,{method:"POST",
    headers:{apikey:key,"Content-Type":"application/json",Prefer:"return=minimal"},
    body:JSON.stringify({link_id,type,platform:platform||null,country:req.headers["x-vercel-ip-country"]||null,
      device:/mobile|android|iphone/i.test(ua)?"mobile":"desktop",referrer:ref||null})}).catch(()=>{});
  await Promise.race([p,new Promise(r=>setTimeout(r,800))]);
}
