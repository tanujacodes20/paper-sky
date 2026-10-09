import {test} from 'node:test';
import assert from 'node:assert/strict';
import {chunkData,hitObstacle,ringAt,random} from './world';
import {useGame} from './store';
test('chunk generation is deterministic and changes with seed',()=>{assert.deepEqual(chunkData(4),chunkData(4));assert.notDeepEqual(chunkData(4),chunkData(5));});
test('ring path remains accessible through the endless world',()=>{for(let i=0;i<2000;i++){const p=ringAt(i);assert.ok(p.y>8&&p.y<14);assert.ok(Math.abs(p.x)<=10);assert.equal(p.d,35+i*32)}});
test('bounding volume detects a tree and allows flight above it',()=>{const o=chunkData(0).find(o=>o.kind==='tree')!;assert.ok(hitObstacle(o.x,1,-o.z,o));assert.ok(!hitObstacle(o.x,40,-o.z,o));assert.ok(!hitObstacle(o.x+20,1,-o.z,o));});
test('flight lifecycle, combos, energy, and collision-free exploration',()=>{const s=useGame.getState();s.start('journey');for(let i=0;i<4;i++)useGame.getState().ring();assert.equal(useGame.getState().combo,4);assert.equal(useGame.getState().score,500);useGame.setState({energy:85});s.crane();assert.equal(useGame.getState().energy,100);s.pause();assert.equal(useGame.getState().status,'paused');s.pause();s.crash();assert.equal(useGame.getState().status,'crashed');s.start('free',2);s.crash();assert.equal(useGame.getState().status,'playing');assert.equal(useGame.getState().distance,1300);s.start('journey');assert.equal(useGame.getState().score,0);assert.equal(useGame.getState().combo,0);});
