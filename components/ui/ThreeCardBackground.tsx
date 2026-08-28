'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeCardBackgroundProps {
  variant: 'teal-mesh' | 'red-particles' | 'testimonial-nodes' | 'metric-pulse' | 'role-matrix';
  className?: string;
  isHovered?: boolean;
}

export const ThreeCardBackground: React.FC<ThreeCardBackgroundProps> = ({
  variant,
  className = '',
  isHovered = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isHoveredRef = useRef(isHovered);

  useEffect(() => {
    isHoveredRef.current = isHovered;
  }, [isHovered]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 300;
    const height = container.clientHeight || 300;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 24;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.pointerEvents = 'none';
    container.appendChild(renderer.domElement);

    let animationFrameId: number;
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    let primaryMesh: THREE.Object3D | null = null;
    let particles: THREE.Points | null = null;
    let linesMesh: THREE.LineSegments | null = null;
    let lineGeometry: THREE.BufferGeometry | null = null;
    let particlePositions: Float32Array | null = null;

    if (variant === 'teal-mesh') {
      const geometry = new THREE.IcosahedronGeometry(8, 1);
      const wireframeGeometry = new THREE.WireframeGeometry(geometry);
      const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x048ba2,
        transparent: true,
        opacity: 0.45,
      });
      primaryMesh = new THREE.LineSegments(wireframeGeometry, lineMaterial);
      primaryMesh.position.set(8, -4, -2);
      scene.add(primaryMesh);

      const particleCount = 45;
      const particleGeo = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);

      const tealColor = new THREE.Color('#048BA2');
      const cyanColor = new THREE.Color('#00E5FF');
      const blueColor = new THREE.Color('#2563EB');

      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 40;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 35;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

        const col = i % 3 === 0 ? tealColor : i % 3 === 1 ? cyanColor : blueColor;
        colors[i * 3] = col.r;
        colors[i * 3 + 1] = col.g;
        colors[i * 3 + 2] = col.b;
      }

      particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const particleMat = new THREE.PointsMaterial({
        size: 1.1,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
      });

      particles = new THREE.Points(particleGeo, particleMat);
      scene.add(particles);
    } else if (variant === 'red-particles') {
      const particleCount = 35;
      const particleGeo = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);

      const redColor = new THREE.Color('#EF4444');
      const roseColor = new THREE.Color('#F43F5E');

      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 40;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 35;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

        const col = i % 2 === 0 ? redColor : roseColor;
        colors[i * 3] = col.r;
        colors[i * 3 + 1] = col.g;
        colors[i * 3 + 2] = col.b;
      }

      particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const particleMat = new THREE.PointsMaterial({
        size: 0.9,
        vertexColors: true,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending,
      });

      particles = new THREE.Points(particleGeo, particleMat);
      scene.add(particles);

      const ringGeo = new THREE.RingGeometry(5, 7, 6);
      const ringWire = new THREE.WireframeGeometry(ringGeo);
      const ringMat = new THREE.LineBasicMaterial({
        color: 0xef4444,
        transparent: true,
        opacity: 0.35,
      });
      primaryMesh = new THREE.LineSegments(ringWire, ringMat);
      primaryMesh.position.set(-6, 4, -4);
      scene.add(primaryMesh);
    } else if (variant === 'testimonial-nodes') {
      // High-Visibility 3D Constellation Nodes (Teal + Cyan + Blue)
      const count = 35;
      const particleGeo = new THREE.BufferGeometry();
      particlePositions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);

      const teal = new THREE.Color('#048BA2');
      const cyan = new THREE.Color('#00E5FF');
      const blue = new THREE.Color('#2563EB');

      for (let i = 0; i < count; i++) {
        particlePositions[i * 3] = (Math.random() - 0.5) * 32;
        particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 26;
        particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 14;

        const col = i % 3 === 0 ? teal : i % 3 === 1 ? cyan : blue;
        colors[i * 3] = col.r;
        colors[i * 3 + 1] = col.g;
        colors[i * 3 + 2] = col.b;
      }

      particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
      particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const particleMat = new THREE.PointsMaterial({
        size: 1.1,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
      });

      particles = new THREE.Points(particleGeo, particleMat);
      scene.add(particles);

      // Connecting constellation lines
      const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x048ba2,
        transparent: true,
        opacity: 0.35,
      });
      lineGeometry = new THREE.BufferGeometry();
      const linePositions = new Float32Array(count * count * 6);
      lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
      linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
      scene.add(linesMesh);

      // Subtle wireframe sphere
      const sphereGeo = new THREE.IcosahedronGeometry(4, 1);
      const sphereWire = new THREE.WireframeGeometry(sphereGeo);
      const sphereMat = new THREE.LineBasicMaterial({
        color: 0x0fa5bf,
        transparent: true,
        opacity: 0.35,
      });
      primaryMesh = new THREE.LineSegments(sphereWire, sphereMat);
      primaryMesh.position.set(6, -2, -3);
      scene.add(primaryMesh);
    } else if (variant === 'metric-pulse') {
      // High-Visibility 3D Dual-Orbit Rings & Particle Cloud
      const torusGroup = new THREE.Group();

      const torusGeo = new THREE.TorusGeometry(5, 0.18, 14, 40);
      const torusMat = new THREE.MeshBasicMaterial({
        color: 0x048ba2,
        wireframe: true,
        transparent: true,
        opacity: 0.6,
      });
      const torus1 = new THREE.Mesh(torusGeo, torusMat);
      torusGroup.add(torus1);

      const innerTorusGeo = new THREE.TorusGeometry(3.2, 0.12, 10, 30);
      const innerTorusMat = new THREE.MeshBasicMaterial({
        color: 0x00e5ff,
        wireframe: true,
        transparent: true,
        opacity: 0.5,
      });
      const torus2 = new THREE.Mesh(innerTorusGeo, innerTorusMat);
      torus2.rotation.x = Math.PI / 3;
      torusGroup.add(torus2);

      primaryMesh = torusGroup;
      primaryMesh.position.set(0, 0, -2);
      scene.add(primaryMesh);

      const pCount = 24;
      const pGeo = new THREE.BufferGeometry();
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);

      const teal = new THREE.Color('#048BA2');
      const cyan = new THREE.Color('#00E5FF');
      const blue = new THREE.Color('#2563EB');

      for (let i = 0; i < pCount; i++) {
        pPos[i * 3] = (Math.random() - 0.5) * 20;
        pPos[i * 3 + 1] = (Math.random() - 0.5) * 20;
        pPos[i * 3 + 2] = (Math.random() - 0.5) * 12;

        const col = i % 3 === 0 ? teal : i % 3 === 1 ? cyan : blue;
        pCol[i * 3] = col.r;
        pCol[i * 3 + 1] = col.g;
        pCol[i * 3 + 2] = col.b;
      }

      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));

      const pMat = new THREE.PointsMaterial({
        size: 1.0,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
      });
      particles = new THREE.Points(pGeo, pMat);
      scene.add(particles);
    } else if (variant === 'role-matrix') {
      // 3D Geometric Crystal Orbit & Responsive Starfield
      const group = new THREE.Group();
      
      const octaGeo = new THREE.OctahedronGeometry(4.5, 0);
      const octaWire = new THREE.WireframeGeometry(octaGeo);
      const octaMat = new THREE.LineBasicMaterial({
        color: 0x048ba2,
        transparent: true,
        opacity: 0.55,
      });
      const octa = new THREE.LineSegments(octaWire, octaMat);
      group.add(octa);

      const ringGeo = new THREE.RingGeometry(6, 6.2, 24);
      const ringWire = new THREE.WireframeGeometry(ringGeo);
      const ringMat = new THREE.LineBasicMaterial({
        color: 0x00e5ff,
        transparent: true,
        opacity: 0.4,
      });
      const ring = new THREE.LineSegments(ringWire, ringMat);
      ring.rotation.x = Math.PI / 4;
      group.add(ring);

      primaryMesh = group;
      primaryMesh.position.set(7, -3, -2);
      scene.add(primaryMesh);

      const pCount = 30;
      const pGeo = new THREE.BufferGeometry();
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);

      const teal = new THREE.Color('#048BA2');
      const cyan = new THREE.Color('#00E5FF');
      const blue = new THREE.Color('#2563EB');

      for (let i = 0; i < pCount; i++) {
        pPos[i * 3] = (Math.random() - 0.5) * 30;
        pPos[i * 3 + 1] = (Math.random() - 0.5) * 25;
        pPos[i * 3 + 2] = (Math.random() - 0.5) * 15;

        const col = i % 3 === 0 ? teal : i % 3 === 1 ? cyan : blue;
        pCol[i * 3] = col.r;
        pCol[i * 3 + 1] = col.g;
        pCol[i * 3 + 2] = col.b;
      }

      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));

      const pMat = new THREE.PointsMaterial({
        size: 1.1,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
      });
      particles = new THREE.Points(pGeo, pMat);
      scene.add(particles);
    }

    // Mouse movement listener
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = x * 2.5;
      targetY = y * 2.5;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize listener
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      const speedMultiplier = isHoveredRef.current ? 2.5 : 1.0;

      mouseX += (targetX - mouseX) * 0.06;
      mouseY += (targetY - mouseY) * 0.06;

      if (primaryMesh) {
        primaryMesh.rotation.x = elapsedTime * 0.22 * speedMultiplier + mouseY * 0.1;
        primaryMesh.rotation.y = elapsedTime * 0.32 * speedMultiplier + mouseX * 0.1;
      }

      if (particles) {
        particles.rotation.y = elapsedTime * 0.08 * speedMultiplier + mouseX * 0.06;
        particles.rotation.x = elapsedTime * 0.05 * speedMultiplier + mouseY * 0.06;
      }

      if (variant === 'testimonial-nodes' && linesMesh && lineGeometry && particlePositions) {
        const count = 35;
        let lineIdx = 0;
        const lineAttr = lineGeometry.attributes.position as THREE.BufferAttribute;
        const lineArr = lineAttr.array as Float32Array;

        for (let i = 0; i < count; i++) {
          for (let j = i + 1; j < count; j++) {
            const dx = particlePositions[i * 3] - particlePositions[j * 3];
            const dy = particlePositions[i * 3 + 1] - particlePositions[j * 3 + 1];
            const dz = particlePositions[i * 3 + 2] - particlePositions[j * 3 + 2];
            const distSq = dx * dx + dy * dy + dz * dz;

            if (distSq < 75) {
              lineArr[lineIdx++] = particlePositions[i * 3];
              lineArr[lineIdx++] = particlePositions[i * 3 + 1];
              lineArr[lineIdx++] = particlePositions[i * 3 + 2];

              lineArr[lineIdx++] = particlePositions[j * 3];
              lineArr[lineIdx++] = particlePositions[j * 3 + 1];
              lineArr[lineIdx++] = particlePositions[j * 3 + 2];
            }
          }
        }
        lineGeometry.setDrawRange(0, lineIdx / 3);
        lineAttr.needsUpdate = true;
      }

      camera.position.x = mouseX * 0.5;
      camera.position.y = mouseY * 0.5;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [variant]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none transition-opacity duration-300 ${className}`}
    />
  );
};
