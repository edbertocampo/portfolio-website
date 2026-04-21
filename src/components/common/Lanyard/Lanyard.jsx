/* eslint-disable react/no-unknown-property */
'use client';
import { useEffect, useRef, useState } from 'react';
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';

import cardGLB from '../../../assets/lanyard/card.glb';
import lanyard from '../../../assets/lanyard/lanyard.png';

import * as THREE from 'three';
import './Lanyard.css';

extend({ MeshLineGeometry, MeshLineMaterial });

export default function Lanyard({
  position = [0, 0, 20], 
  gravity = [0, -40, 0], 
  fov = 20, 
  transparent = true,
  cardImage = '/OCAMPO.png',
  scrollY,
  eventSource
}) {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="lanyard-wrapper" style={{ width: '100%', height: '100%' }}>
      <Canvas
        eventSource={eventSource}
        camera={{ position: position, fov: fov }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ alpha: transparent }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
        style={{ pointerEvents: 'none' }}
      >
        <ambientLight intensity={Math.PI} />
        <Physics gravity={gravity} timeStep={1 / 60} interpolate={true}>
          <Band isMobile={isMobile} cardImage={cardImage} scrollY={scrollY} />
        </Physics>
        <Environment blur={0.75}>
          <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={10} color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
        </Environment>
      </Canvas>
    </div>
  );
}

function Band({ maxSpeed = 50, minSpeed = 10, isMobile = false, cardImage, scrollY }) {
  const { size } = useThree();
  const band = useRef(),
    fixed = useRef(),
    j1 = useRef(),
    j2 = useRef(),
    j3 = useRef(),
    card = useRef();
  
  const vec = new THREE.Vector3(),
    ang = new THREE.Vector3(),
    rot = new THREE.Vector3(),
    dir = new THREE.Vector3();
  
  const segmentProps = { 
    type: 'dynamic', 
    canSleep: false, 
    colliders: false, 
    angularDamping: 5, 
    linearDamping: 5 
  };

  const { nodes, materials } = useGLTF(cardGLB);
  const cardTexture = useTexture(cardImage);

  const [curve] = useState(
    () => new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()])
  );
  const [dragged, drag] = useState(false);
  const [hovered, hover] = useState(false);

  // Constants for scale and positioning
  const lateralOffset = isMobile ? 0 : 2.5;
  const attachmentHeight = 1.95; 
  const ropeLength = 0.7; // Shortened lace length

  useEffect(() => {
    if (cardTexture) {
      cardTexture.minFilter = THREE.LinearFilter;
      cardTexture.magFilter = THREE.LinearFilter;
      cardTexture.flipY = true;
      cardTexture.center.set(0.5, 0.5);
      cardTexture.rotation = Math.PI;
      cardTexture.repeat.set(1, 1);
      cardTexture.offset.set(-0.25, 0); 
    }
  }, [cardTexture]);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], ropeLength]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], ropeLength]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], ropeLength]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, attachmentHeight, 0]]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => {
        document.body.style.cursor = 'auto';
      };
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);

    if (scrollY && fixed.current) {
      const yScroll = scrollY.get();
      fixed.current.setNextKinematicTranslation({ x: lateralOffset, y: yScroll, z: 0 });
    }

    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach(ref => ref.current?.wakeUp());
      
      card.current?.setNextKinematicTranslation({ 
        x: vec.x - dragged.x, 
        y: vec.y - dragged.y, 
        z: vec.z - dragged.z 
      });
    }
    
    if (fixed.current && card.current) {
      [j1, j2, j3].forEach(ref => {
        const trans = ref.current.translation();
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(trans);
        ref.current.lerped.lerp(trans, dt * 15);
      });

      const cardPos = card.current.translation();
      const cardRot = new THREE.Quaternion().copy(card.current.rotation());
      const worldAttachment = new THREE.Vector3(0, attachmentHeight, 0).applyQuaternion(cardRot).add(cardPos);

      curve.points[0].copy(worldAttachment);
      curve.points[1].copy(j3.current.lerped);
      curve.points[2].copy(j2.current.lerped);
      curve.points[3].copy(j1.current.lerped);
      curve.points[4].copy(fixed.current.translation());

      if (band.current) {
        band.current.geometry.setPoints(curve.getPoints(isMobile ? 32 : 64));
      }

      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x * 0.9, y: (ang.y - rot.y * 0.5) * 0.9, z: ang.z * 0.9 });
    }
  });

  curve.curveType = 'centripetal';

  return (
    <>
      <RigidBody ref={fixed} type="kinematicPosition" colliders={false} />
      
      <RigidBody position={[lateralOffset, 3.5, 0]} ref={j1} {...segmentProps}>
        <BallCollider args={[0.05]} />
      </RigidBody>
      <RigidBody position={[lateralOffset, 3.0, 0]} ref={j2} {...segmentProps}>
        <BallCollider args={[0.05]} />
      </RigidBody>
      <RigidBody position={[lateralOffset, 2.5, 0]} ref={j3} {...segmentProps}>
        <BallCollider args={[0.05]} />
      </RigidBody>

      <RigidBody position={[lateralOffset, 1.5, 0]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
        <CuboidCollider args={[1.0, 1.4, 0.01]} />
        <group
          scale={2.75}
          position={[0, -1.5, -0.05]}
          onPointerOver={() => hover(true)}
          onPointerOut={() => hover(false)}
          onPointerUp={e => (e.target.releasePointerCapture(e.pointerId), drag(false))}
          onPointerDown={e => (
            e.target.setPointerCapture(e.pointerId),
            drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())))
          )}
        >
          {/* Picture on both sides */}
          <mesh geometry={nodes.card.geometry}>
            <meshPhysicalMaterial
              map={cardTexture}
              anisotropy={16}
              clearcoat={isMobile ? 0 : 1}
              clearcoatRoughness={0.15}
              roughness={0.9}
              metalness={0.8}
              side={THREE.DoubleSide}
            />
          </mesh>
          <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
          <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
        </group>
      </RigidBody>
      
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="black"
          transparent
          opacity={1}
          depthWrite={false}
          resolution={[size.width, size.height]}
          lineWidth={1.0}
        />
      </mesh>
    </>
  );
}
