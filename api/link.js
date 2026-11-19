import {renderPage} from "../public/render.js";
import {getLink,logEvent,brand} from "./_lib.js";
export default async function handler(req,res){
  const slug=String(req.query.slug||"").toLowerCase();
  const l=await getLink(slug);
  res.setHeader("Content-Type","text/html; charset=utf-8");
  if(!l||l.published===false){
    return res.status(404).send(`<!DOCTYPE html><meta name="viewport" content="width=device-width,initial-scale=1"><title>Not found</title><body style="margin:0;min-height:100vh;display:grid;place-items:center;background:#0e0d12;color:#fff;font:16px system-ui;text-align:center"><div><h1 style="font-size:28px;margin:0 0 8px">This link isn’t live</h1><p style="opacity:.6">Check the address, or ask the artist for a new link.</p></div>`);
  }
  await logEvent(req,res,l.id,"view");
  res.setHeader("Cache-Control","no-store");
  res.status(200).send(renderPage(l,{brand:brand()}));
}
