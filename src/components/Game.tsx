import {Component,type ReactNode,useState} from 'react';
import {Canvas} from '@react-three/fiber';
import {EffectComposer,Bloom,Vignette} from '@react-three/postprocessing';
import {AdaptiveDpr,Preload} from '@react-three/drei';
import {useGame} from '../store';
import {input} from '../flight';
import Airplane from './Airplane';
import FlightController from './FlightController';
import CameraRig from './CameraRig';
import Terrain from './Terrain';
import Environment from './Environment';
import Collectibles from './Collectibles';
import AudioManager from './AudioManager';
import HUD from './HUD';
class SceneBoundary extends Component<{children:ReactNode},{error:boolean}>{state={error:false};static getDerivedStateFromError(){return{error:true}}render(){return this.state.error?<div className="webgl-error"><h1>A little turbulence.</h1><p>Your browser couldn’t start the 3D sky. Please enable hardware acceleration and reload.</p><button onClick={()=>location.reload()}>Try again</button></div>:this.props.children;}}
export default function Game(){const quality=useGame(s=>s.quality);const[ready,setReady]=useState(false);return <div className="game-shell"><div className="canvas-wrap" onPointerMove={e=>{if(useGame.getState().status!=='playing')return;if(e.pointerType==='touch'&&!input.touch)return;input.pointer=true;input.x=Math.max(-1,Math.min(1,(e.clientX/window.innerWidth-.5)*2.5));input.y=Math.max(-1,Math.min(1,(.5-e.clientY/window.innerHeight)*2.5));}} onPointerDown={e=>{if(e.pointerType==='touch'){input.touch=true;e.currentTarget.setPointerCapture(e.pointerId);}}} onPointerUp={()=>{input.touch=false;input.pointer=false;input.x=0;input.y=0}} onPointerCancel={()=>{input.touch=false;input.pointer=false}} onPointerLeave={()=>{input.pointer=false}}><SceneBoundary><Canvas shadows={quality} dpr={[1,1.6]} camera={{position:[-15,18,29],fov:51,near:.1,far:700}} gl={{antialias:true,powerPreference:'high-performance'}} onCreated={()=>setReady(true)}><FlightController/><CameraRig/><Environment/><Terrain/><Collectibles/><Airplane/>{quality&&<EffectComposer multisampling={0}><Bloom luminanceThreshold={1.3} intensity={.35} mipmapBlur/><Vignette eskil={false} offset={.25} darkness={.23}/></EffectComposer>}<AdaptiveDpr pixelated/><Preload all/></Canvas></SceneBoundary></div><div className="paper-grain"/><HUD/><AudioManager/>{!ready&&<div className="loading-sky"><span>折</span><p>Folding your little escape…</p></div>}</div>}
