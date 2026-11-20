export const PLATS={presave:["Pre-save link","#5B3DF5","P"],spotify:["Spotify","#1DB954","S"],apple:["Apple Music","#FA243C","A"],youtubemusic:["YouTube Music","#E5173F","YM"],youtube:["YouTube","#FF0000","YT"],audiomack:["Audiomack","#F59E0B","Au"],boomplay:["Boomplay","#2B6CFF","Bo"],amazon:["Amazon Music","#1BA8B5","Am"],deezer:["Deezer","#9333EA","D"],tidal:["Tidal","#111111","T"],soundcloud:["SoundCloud","#FF5500","SC"]};
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
export function renderPage(l,{preview=false,brand="StackMuz Links"}={}){
  const color=/^#[0-9a-f]{6}$/i.test(l.color||"")?l.color:"#5b3df5";
  const u=l.art_url||"";
  const art=(/^https?:\/\//.test(u)||(preview&&/^data:image\//.test(u)))?esc(u):"";
  const pixel=preview?"":String(l.pixel_id||"").replace(/\D/g,"");
  const artist=l.artist||"Artist name",title=l.title||"Release title";
  const today=new Date().toISOString().slice(0,10);
  const upcoming=!!l.release_date&&l.release_date>today;
  const days=upcoming?Math.round((new Date(l.release_date+"T00:00:00Z")-new Date(today+"T00:00:00Z"))/864e5):0;
  const badge=upcoming?`<p class="d">${days===1?"Out tomorrow":"Out in "+days+" days"}</p>`:"";
  let when="";
  if(l.release_date){try{when=new Date(l.release_date+"T00:00:00").toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"})}catch{}}
  const kind=esc(l.kind||"Single")+(when?", "+esc(when):"");
  const cover=art?`background:url("${art}") center/cover`:`background:linear-gradient(135deg,${color},#1b1530)`;
  const keys=Object.keys(PLATS).filter(k=>l.platforms&&l.platforms[k]&&(k!=="presave"||upcoming));
  const rows=keys.map(k=>{const[n,c,m]=PLATS[k],pre=k==="presave";
    return `<a class="b${pre?" pre":""}" href="${preview?"#":"/go/"+esc(l.slug)+"/"+k}"><span class="m" style="background:${c}">${m}</span><span class="n">${pre?"Pre-save now":n}</span><span class="p">${pre?"Pre-save":"Play"}</span></a>`}).join("")
    ||`<p class="e">${upcoming?"Links go live on release day.":"Add a streaming link and it appears here."}</p>`;
  const px=pixel?`<script>!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version="2.0";n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,"script","https://connect.facebook.net/en_US/fbevents.js");fbq("init","${pixel}");fbq("track","PageView");</script>`:"";
  const t=esc(artist)+" – "+esc(title);
  const og=upcoming?"Pre-save "+esc(title)+" now.":"Listen to "+esc(title)+" on your favourite platform.";
  const share=preview?"":`<button class="s" id="sh">Share this release</button><script>document.getElementById("sh").onclick=function(){var d={title:document.title,url:location.href};if(navigator.share){navigator.share(d)}else{navigator.clipboard.writeText(d.url);this.textContent="Link copied"}}</script>`;
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${t}</title>
<meta property="og:title" content="${t}"><meta property="og:description" content="${og}">${art&&!preview?`<meta property="og:image" content="${art}">`:""}<meta name="twitter:card" content="summary_large_image">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700&family=Figtree:wght@400;600&display=swap" rel="stylesheet">
<style>*{box-sizing:border-box}body{margin:0;min-height:100vh;display:flex;justify-content:center;overflow-x:hidden;background:#0e0d12;color:#fff;font:16px/1.4 Figtree,system-ui,sans-serif}
.bg{position:fixed;inset:-60px;${cover};filter:blur(70px) saturate(1.5) brightness(.5);z-index:0}
.w{position:relative;z-index:1;width:100%;max-width:420px;padding:40px 22px 28px;display:flex;flex-direction:column;align-items:center}
.stage{position:relative;width:76%;max-width:290px;left:-9%;margin-bottom:34px}
.sleeve{position:relative;z-index:2;width:100%;aspect-ratio:1;border-radius:6px;${cover};box-shadow:0 22px 50px rgba(0,0,0,.55)}
.disc{position:absolute;z-index:1;top:3%;left:0;width:94%;aspect-ratio:1;border-radius:50%;background:radial-gradient(circle,${color} 0 13%,#0b0b0e 13.5% 15%,transparent 15.5%),repeating-radial-gradient(circle,#17171d 0 2px,#0b0b0e 2px 4px);box-shadow:0 10px 30px rgba(0,0,0,.5);animation:out 1.1s .3s cubic-bezier(.2,.8,.2,1) both}
@keyframes out{from{transform:translateX(0) rotate(0)}to{transform:translateX(30%) rotate(160deg)}}
@media(prefers-reduced-motion:reduce){.disc{animation:none;transform:translateX(30%)}}
h1{font:700 30px/1.1 "Bricolage Grotesque",Figtree,sans-serif;letter-spacing:-.02em;margin:0 0 6px;text-align:center}
.a{font-size:17px;opacity:.88;margin:0}.k{font-size:14px;opacity:.6;margin:6px 0 ${badge?"14px":"26px"}}
.d{margin:0 0 22px;padding:6px 16px;border-radius:999px;background:rgba(255,255,255,.16);font-size:14px;font-weight:600}
.b{display:flex;align-items:center;gap:14px;width:100%;padding:11px 14px;margin-bottom:10px;border-radius:12px;background:rgba(255,255,255,.1);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);border:1px solid rgba(255,255,255,.12);color:#fff;text-decoration:none;font-weight:600;transition:background .15s}
.b:hover{background:rgba(255,255,255,.18)}.b:focus-visible,.s:focus-visible{outline:2px solid #fff;outline-offset:2px}
.b.pre{background:${color};border-color:transparent}.b.pre:hover{background:${color};filter:brightness(1.12)}
.pre .m{background:rgba(255,255,255,.22)!important}.pre .p{background:#fff;color:#111}
.m{width:34px;height:34px;border-radius:8px;display:grid;place-items:center;font-size:13px;font-weight:700}.n{flex:1}
.p{background:${color};padding:7px 16px;border-radius:999px;font-size:14px}.e{opacity:.6;text-align:center}
.s{margin-top:10px;background:none;border:0;color:#fff;opacity:.8;font:600 14px Figtree,sans-serif;text-decoration:underline;cursor:pointer}
.f{margin-top:18px;font-size:13px;opacity:.5}</style>${px}</head>
<body><div class="bg"></div><div class="w"><div class="stage"><div class="disc"></div><div class="sleeve" role="img" aria-label="${esc(title)} cover art"></div></div>
<h1>${esc(title)}</h1><p class="a">${esc(artist)}</p><p class="k">${kind}</p>${badge}${rows}${share}<p class="f">Made with ${esc(brand)}</p></div></body></html>`;
}
