'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface VoiceWaveformThreeCanvasProps {
  isRecording?: boolean;
  isExtracting?: boolean;
}

export function VoiceWaveformThreeCanvas({
  isRecording = false,
  isExtracting = false,
}: VoiceWaveformThreeCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({ isRecording, isExtracting });

  useEffect(() => {
    stateRef.current = { isRecording, isExtracting };
  }, [isRecording, isExtracting]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene & Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 18);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // 2. Bottom Horizon Audio Fluid Silk Waves (Positioned strictly at bottom Y: -7.5)
    const waveCount = 6;
    const wavePoints = 140;
    const waveLines: { line: THREE.Line; speed: number; phase: number; amp: number }[] = [];

    const lineMatConfigs = [
      { color: 0x048ba2, opacity: 0.85 },
      { color: 0x00f5d4, opacity: 0.80 },
      { color: 0x8b5cf6, opacity: 0.70 },
      { color: 0x38bdf8, opacity: 0.65 },
      { color: 0x0284c7, opacity: 0.60 },
      { color: 0x10b981, opacity: 0.50 },
    ];

    const bottomBaseY = -7.5;

    for (let w = 0; w < waveCount; w++) {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(wavePoints * 3);
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      const cfg = lineMatConfigs[w % lineMatConfigs.length];
      const material = new THREE.LineBasicMaterial({
        color: cfg.color,
        transparent: true,
        opacity: cfg.opacity,
        blending: THREE.AdditiveBlending,
      });

      const line = new THREE.Line(geometry, material);
      line.position.y = bottomBaseY;
      line.position.z = -w * 0.35;
      masterGroup.add(line);

      waveLines.push({
        line,
        speed: 1.0 + w * 0.3,
        phase: (w * Math.PI) / 3,
        amp: 0.7 + w * 0.22,
      });
    }

    // 3. Glowing Floor Horizon Mesh (Soft radiant plane at bottom)
    const floorGeo = new THREE.PlaneGeometry(32, 6, 40, 10);
    const floorMat = new THREE.MeshBasicMaterial({
      color: 0x048ba2,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending,
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2.2;
    floorMesh.position.set(0, -8.2, -2);
    masterGroup.add(floorMesh);

    // 4. Subtle Ambient Floating Particles along the lower half
    const particleCount = 80;
    const pGeo = new THREE.BufferGeometry();
    const pPositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      pPositions[i * 3] = (Math.random() - 0.5) * 26;
      pPositions[i * 3 + 1] = -5.0 - Math.random() * 4.5; // Strictly bottom area
      pPositions[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1;
    }

    pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0x00f5d4,
      size: 0.08,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });
    const particleField = new THREE.Points(pGeo, pMat);
    masterGroup.add(particleField);

    // 5. Interactive Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      targetX = (e.clientX / innerWidth - 0.5) * 1.0;
      targetY = (e.clientY / innerHeight - 0.5) * 1.0;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 6. Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      const { isRecording: rec, isExtracting: ext } = stateRef.current;

      // Subtle camera parallax
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;
      camera.position.x = mouseX * 1.2;
      camera.position.y = -mouseY * 0.8;
      camera.lookAt(0, 0, 0);

      // Animate Bottom Fluid Waveform Lines
      waveLines.forEach((item) => {
        const positions = item.line.geometry.attributes.position.array as Float32Array;
        const width = 28;
        const ampMultiplier = rec ? 2.4 : ext ? 1.5 : 0.75;
        const freqMultiplier = rec ? 1.6 : ext ? 1.2 : 0.85;
        const speed = t * item.speed * (rec ? 2.0 : 1.0);

        for (let i = 0; i < wavePoints; i++) {
          const ratio = i / (wavePoints - 1);
          const x = (ratio - 0.5) * width;
          
          // Smooth bell curve envelope
          const envelope = Math.exp(-Math.pow((ratio - 0.5) * 2.2, 2));

          const wave1 = Math.sin(x * 0.35 * freqMultiplier + speed + item.phase);
          const wave2 = Math.cos(x * 0.75 * freqMultiplier - speed * 0.6 + item.phase) * 0.45;
          const wave3 = Math.sin(x * 1.4 + speed * 1.1) * 0.2;

          const y = (wave1 + wave2 + wave3) * item.amp * ampMultiplier * envelope;

          positions[i * 3] = x;
          positions[i * 3 + 1] = y;
          positions[i * 3 + 2] = Math.sin(x * 0.25 + speed) * 0.4;
        }

        item.line.geometry.attributes.position.needsUpdate = true;
      });

      // Subtle floor wave oscillation
      floorMesh.rotation.z = Math.sin(t * 0.3) * 0.02;

      // Particle subtle flow
      particleField.rotation.y = t * 0.02;

      renderer.render(scene, camera);
    };

    animate();

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
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-95 transition-opacity duration-700"
      aria-hidden="true"
    />
  );
}
