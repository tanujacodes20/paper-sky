import { useMemo,useRef,useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { flight } from '../flight';
import {useGame} from '../store';
export function PaperModel({scale=1,crane=false}:{scale?:number;crane?:boolean}){
 const geometry=useMemo(()=>{const g=new THREE.BufferGeometry();const verts=crane?[
 0,0,-1.6, -.25,.1,.4, -2,1,.1, 0,0,-1.6, 2,1,.1,.25,.1,.4,
 0,0,-1.6, .25,.1,.4,0,-.3,.7, 0,0,-1.6,0,-.3,.7,-.25,.1,.4,
 0,0,-1.6,0,.6,-1.9,.2,.25,-1.65,
 ]:[0,0,-2.6,-2.1,.1,1.55,-.28,.23,.8, 0,0,-2.6,-.28,.23,.8,0,-.42,1.15, 0,0,-2.6,.28,.23,.8,2.1,.1,1.55, 0,0,-2.6,0,-.42,1.15,.28,.23,.8];g.setAttribute('position',new THREE.Float32BufferAttribute(verts,3));const uvs=[];for(let k=0;k<verts.length;k+=3)uvs.push((verts[k]+2.1)/4.2,(verts[k+2]+2.6)/4.2);g.setAttribute('uv',new THREE.Float32BufferAttribute(uvs,2));const colors=[];for(let i=0;i<verts.length/9;i++){const c=new THREE.Color(i%2===0?'#fffbee':'#d2c7b5');for(let j=0;j<3;j++)colors.push(c.r,c.g,c.b)}g.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));g.computeVertexNormals();return g;},[crane]);
 const texture=useMemo(()=>{const data=new Uint8Array(64*64*4);for(let i=0;i<64*64;i++){let c=235+Math.random()*20;data.set([c,c,c,255],i*4)}const t=new THREE.DataTexture(data,64,64);t.needsUpdate=true;return t;},[]);
 useEffect(()=>()=>{geometry.dispose();texture.dispose()},[geometry,texture]);
 return <group scale={scale}><mesh geometry={geometry} castShadow><meshStandardMaterial vertexColors side={THREE.DoubleSide} roughness={.95} map={texture}/></mesh><lineSegments><edgesGeometry args={[geometry,8]}/><lineBasicMaterial color="#a69782" transparent opacity={.4}/></lineSegments></group>
}
export default function Airplane(){const group=useRef<THREE.Group>(null);useFrame(({clock},dt)=>{if(!group.current)return;const state=useGame.getState();group.current.position.copy(flight.position);const idle=state.status==='menu';group.current.rotation.z=THREE.MathUtils.damp(group.current.rotation.z,-flight.steerX*.65+(idle?Math.sin(clock.elapsedTime*.7)*.13:0),5,dt);group.current.rotation.x=THREE.MathUtils.damp(group.current.rotation.x,flight.steerY*.22+Math.sin(clock.elapsedTime*2)*.025,4,dt);group.current.rotation.y=THREE.MathUtils.damp(group.current.rotation.y,-flight.steerX*.15,3,dt);if(idle)group.current.position.y+=Math.sin(clock.elapsedTime)*.2;});return <group ref={group}><PaperModel scale={.8}/></group>}
