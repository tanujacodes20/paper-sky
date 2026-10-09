import { create } from 'zustand';
export const regions = [
  {name:'Sakura Village',jp:'桜の里',note:'Where every journey blossoms.',color:'#e9adb4'},
  {name:'Bamboo Forest',jp:'竹の森',note:'Follow the whispers of the forest.',color:'#91a885'},
  {name:'Mountain Valley',jp:'山の谷',note:'A little closer to the clouds.',color:'#a4b5c0'},
  {name:'Kyoto Temple',jp:'京都の寺',note:'Find a moment between the moments.',color:'#cf9879'},
  {name:'Mount Fuji',jp:'富士山',note:'Some horizons are worth the journey.',color:'#d6c7de'},
];
function readBest(){try{return Number(localStorage.getItem('paper-sky-best')||0)}catch{return 0}}
interface State {
 status:'menu'|'playing'|'paused'|'crashed'; mode:'journey'|'free'; score:number;best:number;combo:number;distance:number;energy:number;region:number;startRegion:number;auto:boolean;sound:boolean;quality:boolean;settings:boolean;guide:boolean;notice:string;run:number;
 start:(mode:'journey'|'free',region?:number)=>void; pause:()=>void; crash:()=>void; ring:()=>void; crane:()=>void; home:()=>void; toggle:(key:'auto'|'sound'|'quality'|'settings'|'guide')=>void;
}
export const useGame=create<State>((set,get)=>({
 status:'menu',mode:'journey',score:0,best:readBest(),combo:0,distance:0,energy:100,region:0,startRegion:0,auto:false,sound:true,quality:true,settings:false,guide:false,notice:'',run:0,
 start:(mode,region=0)=>set({status:'playing',mode,score:0,combo:0,distance:region*650,energy:100,region,startRegion:region,notice:'Follow the golden rings',run:get().run+1,settings:false,guide:false}),
 pause:()=>set({status:get().status==='playing'?'paused':get().status==='paused'?'playing':get().status}),
 crash:()=>{if(get().mode==='free'||get().status!=='playing')return;const best=Math.max(get().best,get().score);try{localStorage.setItem('paper-sky-best',String(best))}catch{/* storage can be unavailable */}set({status:'crashed',best});},
 ring:()=>{const combo=get().combo+1;set({combo,score:get().score+100*Math.min(5,Math.ceil(combo/3)),notice:combo>1?`${combo} rings · Beautiful flow`:'A perfect beginning'});},
 crane:()=>set({energy:Math.min(100,get().energy+30),notice:'A gift from the wind · +30 energy'}),
 home:()=>set({status:'menu',settings:false,guide:false,notice:'',startRegion:0,distance:0,region:0,run:get().run+1}),
 toggle:key=>set({[key]:!get()[key]}),
}));
