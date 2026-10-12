const nav = document.querySelector("nav");
const menuBtn = document.querySelector(".menu-btn");
menuBtn.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
});
document.querySelectorAll("nav a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));

document.getElementById("year").textContent = new Date().getFullYear();
const topBtn = document.getElementById("topBtn");
addEventListener("scroll", () => topBtn.classList.toggle("show", scrollY > 450));
topBtn.addEventListener("click", () => scrollTo({top:0, behavior:"smooth"}));

// Live IT-object wallpaper: laptops, code brackets, servers, databases, cloud and terminal symbols.
const canvas = document.getElementById("itWallpaper"), ctx = canvas.getContext("2d");
const symbols = ["</>", "{}", "01", "💻", "🖥", "⌘", "DB", "☁", "⚙", "▣", "API"];
let objects = [];
function resize(){
  canvas.width=innerWidth; canvas.height=innerHeight;
  const count=Math.min(34, Math.max(16, Math.floor(innerWidth/38)));
  objects=Array.from({length:count},()=>({
    x:Math.random()*canvas.width, y:Math.random()*canvas.height,
    size:Math.random()*13+11, speed:Math.random()*.22+.07,
    drift:(Math.random()-.5)*.25, rot:(Math.random()-.5)*.002,
    angle:Math.random()*Math.PI*2, symbol:symbols[Math.floor(Math.random()*symbols.length)],
    alpha:Math.random()*.16+.06
  }));
}
function wallpaper(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.font="600 14px monospace";
  objects.forEach(o=>{
    o.y-=o.speed; o.x+=o.drift; o.angle+=o.rot;
    if(o.y<-30){o.y=canvas.height+30;o.x=Math.random()*canvas.width}
    if(o.x<-30)o.x=canvas.width+30;if(o.x>canvas.width+30)o.x=-30;
    ctx.save();ctx.translate(o.x,o.y);ctx.rotate(o.angle);
    ctx.fillStyle=`rgba(185,15,42,${o.alpha})`;ctx.fillText(o.symbol,-12,5);ctx.restore();
  });
  requestAnimationFrame(wallpaper);
}
addEventListener("resize",resize); resize(); wallpaper();

// Small reveal effect
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")}),{threshold:.08});
document.querySelectorAll(".reveal").forEach(e=>observer.observe(e));
