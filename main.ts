// Rooms off a one-square hallway are independent: BFS each room over pushes, walk the hallway between them.
import{mkdirSync as M,readdirSync as R,readFileSync as F,writeFileSync as W}from'node:fs'
const I=process.env.MAKEFUN_INPUT_DIR??'/input',O=process.env.MAKEFUN_OUTPUT_DIR??'/output'
const S=(t:string)=>{const r=t.split('\n').filter(l=>l),w=Math.max(...r.map(l=>l.length)),N=w*r.length,f=new Uint8Array(N),g=f.slice(),o=f.slice(),D=[-w,w,-1,1]
let p=0,m=''
r.forEach((l,y)=>[...l].forEach((c,x)=>{const i=y*w+x;if(c!='#')f[i]=1;if('.*+'.includes(c))g[i]=1;if('$*'.includes(c))o[i]=1;if('@+'.includes(c))p=i}))
// Squares the player reaches from a, around boxes, kept to squares with in[q]; returns the visited list.
const reach=(a:number,inn:Uint8Array)=>{const s=new Int32Array(N).fill(-1),q=[a];s[a]=a
for(let k=0;k<q.length;k++)for(const d of D){const n=q[k]+d;if(inn[n]&&!o[n]&&s[n]<0){s[n]=q[k];q.push(n)}}return[q,s]as const}
const hy=p/w|0
for(let x=0;x<w;x++)for(const e of[-w,w]){const h=hy*w+x,dr=h+e;if(!f[h]||!f[dr])continue
const inn=new Uint8Array(N);inn[h]=inn[dr]=1;const c=[h,dr]
for(let k=1;k<c.length;k++)for(const d of D){const n=c[k]+d;if(f[n]&&!inn[n]&&(n/w|0)!=hy){inn[n]=1;c.push(n)}}
const b0=c.filter(i=>o[i]).sort((a,b)=>a-b);if(!b0.length)continue
const key=(b:number[],a:number)=>{for(const i of b)o[i]=1;const v=Math.min(...reach(a,inn)[0]);for(const i of b)o[i]=0;return b.reduce((k,i)=>k*256+i,v)}
for(const i of b0)o[i]=0
const P=new Map<number,[number,number,number]>(),k0=key(b0,h);P.set(k0,[-1,0,0])
let L:[number[],number,number][]=[[b0,h,k0]],z=-1
while(z<0&&L.length){const X:typeof L=[]
for(const[b,a,k]of L){if(z>=0)break;for(const i of b)o[i]=1;const s=reach(a,inn)[1],mv:[number,number][]=[]
b.forEach((i,j)=>D.forEach(d=>{if(inn[i+d]&&!o[i+d]&&s[i-d]>=0)mv.push([j,d])}));for(const i of b)o[i]=0
for(const[j,d]of mv){const i=b[j],nb=b.slice();nb[j]=i+d;nb.sort((a,b)=>a-b);const nk=key(nb,i);if(P.has(nk))continue
P.set(nk,[k,i,d]);if(nb.every(i=>g[i])){z=nk;break}X.push([nb,i,nk])}}
L=X}
for(const i of b0)o[i]=1
const ps:[number,number][]=[];for(let k=z;P.get(k)![0]>=0;k=P.get(k)![0])ps.unshift(P.get(k)!.slice(1)as[number,number])
for(const[i,d]of ps){const[,s]=reach(p,f),t=i-d;let u=''
for(let c=t;c!=p;c=s[c])u='udlr'[D.indexOf(c-s[c])]+u
m+=u+'UDLR'[D.indexOf(d)];o[i]=0;o[i+d]=1;p=i}}
return m}
for(const id of R(I).sort()){let m='';try{m=S(F(`${I}/${id}/level.txt`,'utf8'))}catch{}M(`${O}/${id}`,{recursive:true});W(`${O}/${id}/solution.txt`,m+'\n')}
