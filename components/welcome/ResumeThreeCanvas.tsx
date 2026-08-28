'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function ResumeThreeCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xf8fafc, 0.025);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 24);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x048ba2, 3, 50);
    pointLight1.position.set(12, 12, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x38bdf8, 2.5, 40);
    pointLight2.position.set(-12, -10, 8);
    scene.add(pointLight2);

    // 3. Central Sleek 3D Double-Ring Orbital Halo
    const haloGroup = new THREE.Group();
    scene.add(haloGroup);

    // Outer Torus Ring
    const torusGeo1 = new THREE.TorusGeometry(8.5, 0.035, 16, 120);
    const ringMat1 = new THREE.MeshStandardMaterial({
      color: 0x048ba2,
      emissive: 0x048ba2,
      emissiveIntensity: 0.8,
      roughness: 0.2,
    });
    const ring1 = new THREE.Mesh(torusGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    haloGroup.add(ring1);

    // Inner Angled Torus Ring
    const torusGeo2 = new THREE.TorusGeometry(6.8, 0.025, 16, 100);
    const ringMat2 = new THREE.MeshStandardMaterial({
      color: 0x0ea5e9,
      emissive: 0x0ea5e9,
      emissiveIntensity: 0.9,
      roughness: 0.2,
    });
    const ring2 = new THREE.Mesh(torusGeo2, ringMat2);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.y = Math.PI / 6;
    haloGroup.add(ring2);

    // 4. Subtle Floating Geometric Icosahedron Core (Deep In Perspective)
    const icoGeo = new THREE.IcosahedronGeometry(4.2, 1);
    const icoMat = new THREE.MeshPhysicalMaterial({
      color: 0x048ba2,
      wireframe: true,
      transparent: true,
      opacity: 0.16,
    });
    const ico = new THREE.Mesh(icoGeo, icoMat);
    haloGroup.add(ico);

    // 5. Elegant Floating Stardust Particles (Cyan & Soft Gold)
    const particleCount = 140;
    const pGeo = new THREE.BufferGeometry();
    const pCoords = new Float32Array(particleCount * 3);
    const pColors = new Float32Array(particleCount * 3);

    const c1 = new THREE.Color(0x048ba2);
    const c2 = new THREE.Color(0x38bdf8);
    const c3 = new THREE.Color(0x0d9488);

    for (let i = 0; i < particleCount * 3; i += 3) {
      // Form a wide spherical cloud around the stage
      const radius = 9 + Math.random() * 12;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      pCoords[i] = radius * Math.sin(phi) * Math.cos(theta);
      pCoords[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pCoords[i + 2] = radius * Math.cos(phi) - 2;

      const pickColor = Math.random() > 0.6 ? c1 : Math.random() > 0.3 ? c2 : c3;
      pColors[i] = pickColor.r;
      pColors[i + 1] = pickColor.g;
      pColors[i + 2] = pickColor.b;
    }

    pGeo.setAttribute('position', new THREE.BufferAttribute(pCoords, 3));
    pGeo.setAttribute('color', new THREE.BufferAttribute(pColors, 3));

    const pMat = new THREE.PointsMaterial({
      size: 0.14,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(pGeo, pMat);
    haloGroup.add(particles);

    // 6. Interactive Mouse Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      targetX = (e.clientX / innerWidth - 0.5) * 1.2;
      targetY = (e.clientY / innerHeight - 0.5) * 1.2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 7. Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse easing
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      camera.position.x = mouseX * 2.5;
      camera.position.y = -mouseY * 2.0;
      camera.lookAt(0, 0, 0);

      // Slow, mesmerizing halo rotation
      ring1.rotation.z = elapsedTime * 0.08;
      ring2.rotation.y = elapsedTime * 0.1;
      ring2.rotation.x = -Math.PI / 4 + Math.sin(elapsedTime * 0.4) * 0.1;

      ico.rotation.x = elapsedTime * 0.05;
      ico.rotation.y = elapsedTime * 0.07;

      particles.rotation.y = elapsedTime * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    // 8. Resize
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
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-75"
      aria-hidden="true"
    />
  );
}

