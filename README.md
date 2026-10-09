# PAPER SKY — A Journey Through Japan

An endless procedural paper-airplane game built with React, TypeScript, Vite, Three.js, React Three Fiber, Drei, Zustand, and React Three Postprocessing. No external models or audio assets; all scenery and sound are generated in code. Typography has local system fallbacks.

## Run

```sh
npm install
npm run dev
```

Open the localhost URL printed by Vite. Production: `npm run build`; serve the output with `npm run preview`. Tests: `npm test`.

## Controls

- Mouse or WASD / arrows: steer, climb, and dive
- Space: wind boost (limited energy)
- Shift: air brake
- G: auto-glide
- Escape / P: pause
- Mobile: drag to steer; hold boost / brake buttons

Golden rings build a combo multiplier (up to 5×); missed rings reset it. Origami cranes restore energy. Torii gates give 250 points and restore energy when crossed. Wind spirals lift the plane. Avoid trees, houses, rocks, torii beams, and the ground. The best score persists in localStorage. Free Explore has neither collisions nor scoring and can launch into any selected region.

Five biomes cycle every 650 metres. Eight stable chunk slots recycle deterministically seeded scenery, with instanced canopy, trunk, branch, cloud, and petal geometry. Ring, crane, and wind-current pools recycle ahead. Camera, physics, particles and animation run through useFrame. UI state updates are throttled. Cinematic effects can be disabled in settings for lower-powered devices. The procedural Web Audio soundtrack starts only on a user gesture and stops when paused or muted.

## Architecture

`Game` composes the scene; `FlightController` owns physics/input; `CameraRig` follows the plane; `Airplane` builds folded geometry; `Terrain` and `Obstacles` build chunks; `Environment` handles atmosphere; `Collectibles` handles rings, cranes, wind and checkpoints; `AudioManager` synthesizes sounds; `HUD` provides menus and controls. `world.ts` holds deterministic generators and collision bounds. Shared gameplay state lives in `store.ts`; high-frequency mutable flight state lives in `flight.ts`.
