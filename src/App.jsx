import React, { useRef, useState, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Box, OrbitControls, CameraControls } from "@react-three/drei";

// Theatre.js imports 
import studio from '@theatre/studio'
import {getProject} from '@theatre/core'
import {editable as e, SheetProvisder} from '@theatre/core'
import extension from '@theatre/r3f/dist/extension'

// FOCUS TESTING
function Controls({ zoom, focus, pos = new THREE.Vector3(), look = new THREE.Vector3() }) {
  const camera = useThree((state) => state.camera)
  const gl = useThree((state) => state.gl)
  const controls = useMemo(() => new CameraControls(camera, gl.domElement), [])
  return useFrame((state, delta) => {
    zoom ? pos.set(focus.x, focus.y, focus.z + 0.2) : pos.set(0, 0, 5)
    zoom ? look.set(focus.x, focus.y, focus.z - 0.2) : look.set(0, 0, 4)

    state.camera.position.lerp(pos, 0.5)
    state.camera.updateProjectionMatrix()

    controls.setLookAt(state.camera.position.x, state.camera.position.y, state.camera.position.z, look.x, look.y, look.z, true)
    return controls.update(delta)
  })
}

// function Focus({}) {
//   return (

//   );
// }
// FOCUS TESTING

studio.initialize()
studio.extend(extension)

// stores animation/ object states
const sheet = getProject('Showroom', {state: projectState}).sheet('Sheet');

const Scene = () => {
  const boxRef = useRef();
  useFrame((state, delta) => {
    // boxRef.current.rotation.y += 0.02;
  });

  return (
    <>
      {/* Chair */}
      <SheetProvider sheet={sheet}>
        <e.Box ref={boxRef} args={[1, 1, 1]} rotation={[0, 0, 0]}>
          <meshNormalMaterial />
        </e.Box>
        {/* Table */}
        <e.Box ref={boxRef} args={[2, 0.25, 3]} rotation={[0, 0, 0]} position={[-2, 0.4, 0]}>
          <meshNormalMaterial />
        </e.Box>
        {/* Monitor */}
        <e.Box ref={boxRef} args={[0.3, 0.9, 1.1]} rotation={[0, 0, 0]} position={[-2.25, 1.15, 0.4]}
        onClick={(e) => zoomToView(e.object.position)}> {/* FOCUS TESTING */}
          <meshNormalMaterial />
        </e.Box>
        {/* Tower */}
        <Box ref={boxRef} args={[0.75, 1, 0.5]} rotation={[0, 0, 0]} position={[-2.25, 1, -0.7]}>
          <meshNormalMaterial />
        </Box>
        <ambientLight />
      </SheetProvider>
    </>
  );
};

const App = () => {
  // FOCUS TESTING
  const [zoom, setZoom] = useState(false)
  const [focus, setFocus] = useState({})
  // FOCUS TESTING

  return (
    <Canvas camera={{ fov: 70, position: [0, 0, 3] }}>
      <OrbitControls 
        minAzimuthAngle={-Math.PI / 2}
        maxAzimuthAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 3}
      />
      {/* <Controls zoom={zoom} focus={focus} /> */}
      <Scene />
    </Canvas>
  );
};

export default App;
