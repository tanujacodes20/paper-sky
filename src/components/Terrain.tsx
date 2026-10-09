import {useMemo,useRef,useState,useEffect} from 'react';
import {useFrame} from '@react-three/fiber';
import * as THREE from 'three';
import {flight} from '../flight';
import {CHUNK,pathX,random} from '../world';
import Obstacles,{Torii,House} from './Obstacles';
function Water({index}:{index:number}){const geometry=useMemo(()=>{const g=new THREE.BufferGeometry();const v:number[]=[],uv:number[]=[],indices:number[]=[];for(let i=0;i<=20;i++){const d=index*CHUNK+i*5;const center=pathX(d)+5;v.push(center-4,-.1,-d,center+4,-.1,-d);uv.push(0,i/20,1,i/20);if(i<20){const n=i*2;indices.push(n,n+1,n+2,n+1,n+3,n+2)}}g.setAttribute('position',new THREE.Float32BufferAttribute(v,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g.setIndex(indices);g.computeVertexNormals();return g},[index]);useEffect(()=>()=>geometry.dispose(),[geometry]);return <mesh geometry={geometry} receiveShadow><meshStandardMaterial color="#a9cbbe" roughness={.3} metalness={.3} side={THREE.DoubleSide}/></mesh>}
function Bridge({d}:{d:number}){const x=pathX(d)+5;return <group position={[x,0,-d]}><mesh position={[0,.45,0]} receiveShadow><boxGeometry args={[12,.65,3.5]}/><meshStandardMaterial color="#a1876a"/></mesh>{[-1.6,1.6].map(z=><group key={z}>{[-5,-2.5,0,2.5,5].map(x=><mesh key={x} position={[x,1.2,z]}><boxGeometry args={[.18,2,.18]}/><meshStandardMaterial color="#8f6655"/></mesh>)}<mesh position={[0,2,z]}><boxGeometry args={[12,.16,.18]}/><meshStandardMaterial color="#8f6655"/></mesh></group>)}</group>}
function Chunk({index}:{index:number}){const fields=useMemo(()=>{const r=random(index+92);return Array.from({length:8},(_,i)=>({x:(i%2?1:-1)*(30+r()*35),z:-index*100-r()*100,color:['#bbc695','#a3b88b','#c3cba1'][i%3]}))},[index]);const d=index*CHUNK+65;return <group>
 <mesh rotation={[-Math.PI/2,0,0]} position={[0,-.3,-index*CHUNK-50]} receiveShadow><planeGeometry args={[240,100]}/><meshStandardMaterial color={["#b2bb91","#a4b18d","#aeb5a0","#b9b599","#c7c9b5"][Math.floor(Math.max(0,index*100)/650)%5]}/></mesh>
 <Water index={index}/>
 {fields.map((f,i)=><group key={i} position={[f.x,-.2,f.z]}><mesh rotation={[-Math.PI/2,0,0]} receiveShadow><planeGeometry args={[20,17]}/><meshStandardMaterial color={f.color}/></mesh>{Array.from({length:7},(_,j)=><mesh key={j} position={[j*2.8-8,0,0]}><boxGeometry args={[.18,.14,17]}/><meshStandardMaterial color="#899c73"/></mesh>)}</group>)}
 <Obstacles index={index}/>
 {index%2===0&&<Bridge d={index*100+35}/>}
 {index%3===0&&<Torii x={pathX(d)} z={-d}/>}
 {index%3===1&&<House x={-34} z={-d} scale={2} temple/>}
 {[-1,1].map((side)=><mesh key={side} position={[side*105,-12,-index*100-50]} scale={[65,34+(index%3)*8,70]} receiveShadow><icosahedronGeometry args={[1,1]}/><meshStandardMaterial color={index%2?'#9ba98a':'#8fa18b'} flatShading/></mesh>)}
 </group>}
export default function Terrain(){const [index,setIndex]=useState(0);const last=useRef(0);useFrame(()=>{const n=Math.floor(flight.distance/CHUNK);if(n!==last.current){last.current=n;setIndex(n)}});return <>{Array.from({length:8},(_,slot)=>{const i=index-1+((slot-index+1)%8+8)%8;return <Chunk key={slot} index={i}/>})}</>}
