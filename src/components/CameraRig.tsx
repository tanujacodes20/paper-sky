import {useRef} from 'react';
import {useFrame} from '@react-three/fiber';
import {PerspectiveCamera,Vector3,MathUtils} from 'three';
import {flight} from '../flight';
import {useGame} from '../store';
export default function CameraRig(){const look=useRef(new Vector3(-6,9,-30));const desired=useRef(new Vector3());useFrame(({camera,clock},dt)=>{const s=useGame.getState(),menu=s.status==='menu';const p=flight.position;desired.current.set(p.x+(menu?-5:-flight.steerX*1.3),p.y+(menu?7:4),p.z+(menu?29:18));if(Math.abs(camera.position.z-desired.current.z)>100){camera.position.copy(desired.current);look.current.set(p.x,p.y-1,p.z-30);}camera.position.lerp(desired.current,1-Math.exp(-dt*2.8));const target=new Vector3(p.x+(menu?-7:flight.steerX*3),p.y+(menu?-2:-1),p.z-30);look.current.lerp(target,1-Math.exp(-dt*3));camera.lookAt(look.current);if(flight.boost&&s.status==='playing'){camera.position.x+=Math.sin(clock.elapsedTime*30)*.035;camera.position.y+=Math.cos(clock.elapsedTime*25)*.025}const cam=camera as PerspectiveCamera;cam.fov=MathUtils.damp(cam.fov,menu?51:53+(flight.speed-18)*.42,3,dt);cam.updateProjectionMatrix();});return null;}
