import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Box, OrbitControls } from "@react-three/drei";
import * as THREE from 'three'
import {createRoot} from 'react-dom/client'
import extension from '@theatre/r3f/dist/extension'


//Theatre.js imports
import {getProject} from '@theatre/core'
import studio from '@theatre/studio'
import { editable as e, SheetProvider } from '@theatre/r3f'
import { PerspectiveCamera } from "@theatre/r3f";
import demoProjectState from './state.json'

studio.initialize();
studio.extend(extension);

const demoSheet = getProject('Demo Project', {state: demoProjectState}).sheet('Demo Sheet');


const App = () => {
  useEffect(() => {
    demoSheet.project.ready.then(() => demoSheet.sequence.play({ iterationCount: Infinity, range: [0, 2] }));
    console.log("playing");
  }, [])

  return (
    <Canvas>
      <OrbitControls />
      <SheetProvider sheet={demoSheet}>
        <PerspectiveCamera theatreKey="Camera" makeDefault position={[5, 5, -5]} fov={75}/>
        <ambientLight />
        <e.pointLight theatreKey="Light" position={[10, 10, 10]} />
        <e.mesh theatreKey="Cube">
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="orange" />
        </e.mesh>
        <e.mesh theatreKey="Floor" >
          <planeGeometry args={[5, 5]} />
          <meshStandardMaterial color={"pink"} />
        </e.mesh>
      </SheetProvider>
    </Canvas>
  );
};

export default App;
