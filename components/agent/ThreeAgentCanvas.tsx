'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeAgentCanvasProps {
  className?: string;
  intensity?: number;
}

export const ThreeAgentCanvas: React.FC<ThreeAgentCanvasProps> = ({
  className = 'absolute inset-0 pointer-events-none z-0',
  intensity = 1.0,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 600;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 65;

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 3. Ambient & Point Lighting for 3D Specular Sheen
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x048BA2, 3.5, 120);
    pointLight.position.set(20, 20, 30);
    scene.add(pointLight);

    // Helper: Create a Dual-Layered High-Visibility 3D Structure
    const createStructure = (geometry: THREE.BufferGeometry, colorHex: string, sizeScale = 1) => {
      const group = new THREE.Group();

      // Outer Sharp Glowing Wireframe
      const wireframeMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(colorHex),
        wireframe: true,
        transparent: true,
        opacity: 0.75 * intensity,
      });
      const wireframeMesh = new THREE.Mesh(geometry, wireframeMat);
      group.add(wireframeMesh);

      // Inner Translucent Faceted Core
      const coreMat = new THREE.MeshPhongMaterial({
        color: new THREE.Color(colorHex),
        emissive: new THREE.Color(colorHex),
        emissiveIntensity: 0.25,
        transparent: true,
        opacity: 0.12 * intensity,
        shininess: 90,
        flatShading: true,
      });
      const coreMesh = new THREE.Mesh(geometry, coreMat);
      coreMesh.scale.set(0.96, 0.96, 0.96);
      group.add(coreMesh);

      group.scale.set(sizeScale, sizeScale, sizeScale);
      return { group, wireframeMat, coreMat };
    };

    // Structure 1: Top-Right Vibrant Icosahedron
    const geo1 = new THREE.IcosahedronGeometry(9, 1);
    const struct1 = createStructure(geo1, '#048BA2', 1.1);
    struct1.group.position.set(32, 18, -8);
    scene.add(struct1.group);

    // Structure 2: Bottom-Left Dynamic Octahedron
    const geo2 = new THREE.OctahedronGeometry(11, 0);
    const struct2 = createStructure(geo2, '#00A8C6', 1.05);
    struct2.group.position.set(-32, -16, -10);
    scene.add(struct2.group);

    // Structure 3: Bottom-Right Geodesic Dodecahedron
    const geo3 = new THREE.DodecahedronGeometry(8, 0);
    const struct3 = createStructure(geo3, '#027A8F', 1.0);
    struct3.group.position.set(28, -14, -6);
    scene.add(struct3.group);

    // Structure 4: Top-Left Sleek Torus Ring
    const geo4 = new THREE.TorusGeometry(8, 1.8, 8, 24);
    const struct4 = createStructure(geo4, '#007083', 0.95);
    struct4.group.position.set(-34, 18, -8);
    scene.add(struct4.group);

    // Structure 5: Center-Floating Ambient Polyhedron
    const geo5 = new THREE.TetrahedronGeometry(9, 1);
    const struct5 = createStructure(geo5, '#048BA2', 0.9);
    struct5.group.position.set(0, 2, -14);
    scene.add(struct5.group);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Dynamic, Continuous Multi-Axis 3D Rotation Loop
    let animationFrameId: number;
    let clock = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      clock += 0.015;

      // Structure 1: Top-Right tumbling spin + float
      struct1.group.rotation.x += 0.012;
      struct1.group.rotation.y += 0.016;
      struct1.group.position.y = 18 + Math.sin(clock * 1.8) * 2.2;

      // Structure 2: Bottom-Left counter spin + float
      struct2.group.rotation.y -= 0.014;
      struct2.group.rotation.z += 0.010;
      struct2.group.position.y = -16 + Math.cos(clock * 1.5) * 2.0;

      // Structure 3: Bottom-Right diagonal roll
      struct3.group.rotation.x -= 0.011;
      struct3.group.rotation.z -= 0.013;
      struct3.group.position.y = -14 + Math.sin(clock * 2.0 + 1) * 1.8;

      // Structure 4: Top-Left Torus slow planetary roll
      struct4.group.rotation.x += 0.015;
      struct4.group.rotation.y += 0.010;
      struct4.group.position.y = 18 + Math.cos(clock * 1.6) * 2.0;

      // Structure 5: Center-Floating breathing spin
      struct5.group.rotation.x += 0.009;
      struct5.group.rotation.y += 0.011;
      struct5.group.rotation.z += 0.008;
      struct5.group.position.y = 2 + Math.sin(clock * 1.2) * 2.5;

      renderer.render(scene, camera);
    };

    animate();

    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      geo1.dispose();
      geo2.dispose();
      geo3.dispose();
      geo4.dispose();
      geo5.dispose();
      struct1.wireframeMat.dispose();
      struct1.coreMat.dispose();
      struct2.wireframeMat.dispose();
      struct2.coreMat.dispose();
      struct3.wireframeMat.dispose();
      struct3.coreMat.dispose();
      struct4.wireframeMat.dispose();
      struct4.coreMat.dispose();
      struct5.wireframeMat.dispose();
      struct5.coreMat.dispose();
      renderer.dispose();
    };
  }, [intensity]);

  return <div ref={containerRef} className={className} />;
};
