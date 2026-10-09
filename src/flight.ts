import { Vector3 } from 'three';
export const flight={position:new Vector3(0,11,0),velocity:new Vector3(),steerX:0,steerY:0,speed:18,boost:false,brake:false,time:0,distance:0};
export const input={keys:new Set<string>(),x:0,y:0,pointer:false,touch:false,boost:false,brake:false};
