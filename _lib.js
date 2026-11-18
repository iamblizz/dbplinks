const H=()=>({apikey:process.env.SUPABASE_ANON_KEY,Authorization:"Bearer "+process.env.SUPABASE_ANON_KEY});
export const brand=()=>process.env.BRAND_NAME||"StackMuz Links";
export async function getLink(slug){
  if(!/^[a-z0-9-]{2,60}$/.test(slug))return null;
  const r=await fetch(`${process.env.SUPABASE_URL}/rest/v1/links?slug=eq.${slug}&select=*`,{headers:H()});
  return r.ok?(await r.json())[0]||null:null;
}
export async function logEvent(req,link_id,type,platform){
  const ua=req.headers["user-agent"]||"";let ref="";try{ref=new URL(req.headers.referer||"").hostname}catch{}
  const p=fetch(`${process.env.SUPABASE_URL}/rest/v1/events`,{method:"POST",
    headers:{...H(),"Content-Type":"application/json",Prefer:"return=minimal"},
    body:JSON.stringify({link_id,type,platform:platform||null,country:req.headers["x-vercel-ip-country"]||null,
      device:/mobile|android|iphone/i.test(ua)?"mobile":"desktop",referrer:ref||null})}).catch(()=>{});
  await Promise.race([p,new Promise(r=>setTimeout(r,800))]);
}
