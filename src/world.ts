export const CHUNK=100;
export function random(seed:number){let a=seed|0;return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;}}
export function pathX(d:number){return Math.sin(d*.008)*10;}
export function ringAt(i:number){const d=35+i*32;return {x:pathX(d),y:11+Math.sin(i*.48)*2.4,d};}
export type Obstacle={x:number;y:number;z:number;radius:number;kind:'tree'|'house'|'bamboo'|'rock';scale:number;turn:number};
export function chunkData(index:number):Obstacle[]{const r=random(index*923+57);const region=((Math.floor(Math.max(0,index*CHUNK)/650))%5);return Array.from({length:24},(_,i)=>{const d=index*CHUNK+r()*CHUNK;const side=i%2?1:-1;const x=pathX(d)+side*(13+r()*55);const kind=region===1?'bamboo':region===2&&i%3===0?'rock':i%7===0?'house':'tree';const scale=.8+r()*.9;return{x,y:0,z:-d,radius:kind==='house'?4:2.7,kind,scale,turn:r()*Math.PI};});}
export function hitObstacle(x:number,y:number,d:number,o:Obstacle){const h=o.kind==='house'?7:o.kind==='rock'?9:o.kind==='bamboo'?12:8;return Math.abs(d+o.z)<o.radius*o.scale+.5&&Math.abs(x-o.x)<o.radius*o.scale+.5&&y<h*o.scale;}
