'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function GetStartedThreeCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene, Camera & Fog
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xf5f9fb, 0.022);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 22);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. Dynamic Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x048ba2, 2.5, 50);
    pointLight1.position.set(-10, 8, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x0ea5e9, 2.5, 50);
    pointLight2.position.set(10, -8, 10);
    scene.add(pointLight2);

    // 3. Left Side Concept: 3D "Creation Blueprint Matrix" (for Create New)
    const leftGroup = new THREE.Group();
    leftGroup.position.set(-8.8, 0, -2);
    scene.add(leftGroup);

    // Outer Octahedron Blueprint
    const octaGeo = new THREE.OctahedronGeometry(3.2, 0);
    const octaMat = new THREE.MeshStandardMaterial({
      color: 0x048ba2,
      wireframe: true,
      transparent: true,
      opacity: 0.28,
    });
    const octaMesh = new THREE.Mesh(octaGeo, octaMat);
    leftGroup.add(octaMesh);

    // Inner Glowing Core
    const innerIcoGeo = new THREE.IcosahedronGeometry(1.6, 1);
    const innerIcoMat = new THREE.MeshStandardMaterial({
      color: 0x008ca0,
      emissive: 0x048ba2,
      emissiveIntensity: 0.5,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });
    const innerIco = new THREE.Mesh(innerIcoGeo, innerIcoMat);
    leftGroup.add(innerIco);

    // 4. Right Side Concept: 3D "Data Ingestion Ring & Quantum Stream" (for Import)
    const rightGroup = new THREE.Group();
    rightGroup.position.set(8.8, 0, -2);
    scene.add(rightGroup);

    // Ingestion Torus Ribbon
    const torusGeo = new THREE.TorusGeometry(3.0, 0.04, 16, 100);
    const torusMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      emissive: 0x0ea5e9,
      emissiveIntensity: 0.9,
      roughness: 0.1,
    });
    const torusMesh = new THREE.Mesh(torusGeo, torusMat);
    torusMesh.rotation.x = Math.PI / 3;
    rightGroup.add(torusMesh);

    // Nested Angled Torus
    const torusGeo2 = new THREE.TorusGeometry(2.3, 0.03, 16, 80);
    const torusMesh2 = new THREE.Mesh(torusGeo2, torusMat);
    torusMesh2.rotation.x = -Math.PI / 4;
    torusMesh2.rotation.y = Math.PI / 5;
    rightGroup.add(torusMesh2);

    // 5. Global Floating Neural Career Dust
    const particleCount = 120;
    const pGeo = new THREE.BufferGeometry();
    const pPositions = new Float32Array(particleCount * 3);
    const pColors = new Float32Array(particleCount * 3);

    const colorTeal = new THREE.Color(0x048ba2);
    const colorCyan = new THREE.Color(0x38bdf8);
    const colorIndigo = new THREE.Color(0x6366f1);

    for (let i = 0; i < particleCount * 3; i += 3) {
      pPositions[i] = (Math.random() - 0.5) * 36;
      pPositions[i + 1] = (Math.random() - 0.5) * 22;
      pPositions[i + 2] = (Math.random() - 0.5) * 14 - 2;

      const clr = Math.random() > 0.6 ? colorTeal : Math.random() > 0.3 ? colorCyan : colorIndigo;
      pColors[i] = clr.r;
      pColors[i + 1] = clr.g;
      pColors[i + 2] = clr.b;
    }

    pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
    pGeo.setAttribute('color', new THREE.BufferAttribute(pColors, 3));

    const pMat = new THREE.PointsMaterial({
      size: 0.13,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // 6. Interactive Cursor Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      targetX = (e.clientX / innerWidth - 0.5) * 1.4;
      targetY = (e.clientY / innerHeight - 0.5) * 1.4;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 7. Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera interpolation
      mouseX += (targetX - mouseX) * 0.045;
      mouseY += (targetY - mouseY) * 0.045;

      camera.position.x = mouseX * 2.2;
      camera.position.y = -mouseY * 1.8;
      camera.lookAt(0, 0, 0);

      // Left Blueprint Rotations
      octaMesh.rotation.x = elapsedTime * 0.12;
      octaMesh.rotation.y = elapsedTime * 0.15;
      innerIco.rotation.x = -elapsedTime * 0.2;
      innerIco.rotation.z = elapsedTime * 0.18;
      leftGroup.position.y = Math.sin(elapsedTime * 0.8) * 0.35;

      // Right Ingestion Ring Rotations
      torusMesh.rotation.z = elapsedTime * 0.16;
      torusMesh2.rotation.z = -elapsedTime * 0.22;
      torusMesh2.rotation.x = -Math.PI / 4 + Math.sin(elapsedTime * 0.5) * 0.12;
      rightGroup.position.y = Math.cos(elapsedTime * 0.85) * 0.35;

      // Particles slow drift
      particles.rotation.y = elapsedTime * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    // 8. Resize Handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      renderer.dispose();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-85"
      aria-hidden="true"
    />
  );
}
