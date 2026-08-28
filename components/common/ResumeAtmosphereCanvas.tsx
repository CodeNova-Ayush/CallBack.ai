'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function ResumeAtmosphereCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene & Deep Atmosphere Fog
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xf5f9fb, 0.02);

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

    // 2. Realistic Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.1);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x048ba2, 2.2);
    dirLight1.position.set(15, 15, 12);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x0ea5e9, 1.8);
    dirLight2.position.set(-15, -12, 10);
    scene.add(dirLight2);

    // Group for all perimeter resume elements
    const perimeterGroup = new THREE.Group();
    scene.add(perimeterGroup);

    // --- Helper: Build a Clean Modern 3D Resume Document ---
    const buildResumeDocument = (themeColor: number, accentColor: number) => {
      const doc = new THREE.Group();

      // Document Paper Plane (Glassy clean surface)
      const paperGeo = new THREE.PlaneGeometry(3.6, 4.8, 1, 1);
      const paperMat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.92,
        roughness: 0.1,
        metalness: 0.05,
        transmission: 0.15,
        side: THREE.DoubleSide,
      });
      const paper = new THREE.Mesh(paperGeo, paperMat);
      doc.add(paper);

      // Subtle Outer Edge Wireframe
      const edges = new THREE.EdgesGeometry(paperGeo);
      const edgeMat = new THREE.LineBasicMaterial({
        color: themeColor,
        transparent: true,
        opacity: 0.55,
      });
      const wire = new THREE.LineSegments(edges, edgeMat);
      doc.add(wire);

      // Document Header Band
      const headerGeo = new THREE.PlaneGeometry(3.0, 0.45);
      const headerMat = new THREE.MeshBasicMaterial({ color: themeColor, transparent: true, opacity: 0.85 });
      const header = new THREE.Mesh(headerGeo, headerMat);
      header.position.set(0, 1.8, 0.02);
      doc.add(header);

      // Profile Avatar Indicator
      const avatarGeo = new THREE.CircleGeometry(0.24, 16);
      const avatarMat = new THREE.MeshBasicMaterial({ color: accentColor });
      const avatar = new THREE.Mesh(avatarGeo, avatarMat);
      avatar.position.set(-1.1, 1.15, 0.02);
      doc.add(avatar);

      // Name & Title Wireframe Lines
      const lineMat = new THREE.MeshBasicMaterial({ color: 0x94a3b8, transparent: true, opacity: 0.75 });
      const nameGeo = new THREE.PlaneGeometry(1.7, 0.12);
      const nameLine = new THREE.Mesh(nameGeo, lineMat);
      nameLine.position.set(0.15, 1.22, 0.02);
      doc.add(nameLine);

      const titleGeo = new THREE.PlaneGeometry(1.3, 0.09);
      const titleLine = new THREE.Mesh(titleGeo, lineMat);
      titleLine.position.set(-0.05, 1.02, 0.02);
      doc.add(titleLine);

      // Section Divider Line
      const divGeo = new THREE.PlaneGeometry(3.0, 0.04);
      const divLine = new THREE.Mesh(divGeo, new THREE.MeshBasicMaterial({ color: 0xcbd5e1 }));
      divLine.position.set(0, 0.75, 0.02);
      doc.add(divLine);

      // Experience Bullet Points (4 lines)
      for (let i = 0; i < 4; i++) {
        const y = 0.4 - i * 0.42;
        const bulletDot = new THREE.Mesh(
          new THREE.CircleGeometry(0.05, 8),
          new THREE.MeshBasicMaterial({ color: themeColor })
        );
        bulletDot.position.set(-1.25, y, 0.02);
        doc.add(bulletDot);

        const bLine = new THREE.Mesh(
          new THREE.PlaneGeometry(2.3 - (i % 2) * 0.35, 0.08),
          lineMat
        );
        bLine.position.set(0.05, y, 0.02);
        doc.add(bLine);
      }

      // Bottom Skills Matrix Badges (3 pills)
      for (let j = 0; j < 3; j++) {
        const badgeGeo = new THREE.PlaneGeometry(0.75, 0.22);
        const badgeMat = new THREE.MeshBasicMaterial({
          color: j === 0 ? themeColor : accentColor,
          transparent: true,
          opacity: 0.7,
        });
        const badge = new THREE.Mesh(badgeGeo, badgeMat);
        badge.position.set(-0.95 + j * 0.95, -1.8, 0.02);
        doc.add(badge);
      }

      return doc;
    };

    // --- Helper: Build a 3D Verified Trust Credential Badge ---
    const buildTrustCredential = () => {
      const cred = new THREE.Group();

      const cardGeo = new THREE.PlaneGeometry(3.4, 4.2, 1, 1);
      const cardMat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.9,
        roughness: 0.1,
        metalness: 0.05,
        transmission: 0.2,
        side: THREE.DoubleSide,
      });
      const card = new THREE.Mesh(cardGeo, cardMat);
      cred.add(card);

      const wire = new THREE.LineSegments(
        new THREE.EdgesGeometry(cardGeo),
        new THREE.LineBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.6 })
      );
      cred.add(wire);

      // Trust Shield Ring
      const ringGeo = new THREE.RingGeometry(0.45, 0.6, 24);
      const ringMat = new THREE.MeshBasicMaterial({ color: 0x10b981, side: THREE.DoubleSide });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.set(0, 1.2, 0.02);
      cred.add(ring);

      // 94%+ Score Banner
      const scoreBar = new THREE.Mesh(
        new THREE.PlaneGeometry(2.4, 0.35),
        new THREE.MeshBasicMaterial({ color: 0x059669, transparent: true, opacity: 0.85 })
      );
      scoreBar.position.set(0, 0.3, 0.02);
      cred.add(scoreBar);

      // Verification Line Rows
      for (let i = 0; i < 3; i++) {
        const row = new THREE.Mesh(
          new THREE.PlaneGeometry(2.2 - i * 0.3, 0.09),
          new THREE.MeshBasicMaterial({ color: 0x94a3b8, transparent: true, opacity: 0.7 })
        );
        row.position.set(0, -0.3 - i * 0.35, 0.02);
        cred.add(row);
      }

      // Cryptographic Proof Hash Line
      const hashLine = new THREE.Mesh(
        new THREE.PlaneGeometry(2.6, 0.15),
        new THREE.MeshBasicMaterial({ color: 0x048ba2, transparent: true, opacity: 0.6 })
      );
      hashLine.position.set(0, -1.5, 0.02);
      cred.add(hashLine);

      return cred;
    };

    // 3. Position the 4 Resume Document Artifacts Exclusively in the Outer Viewport Corners
    // TOP-LEFT CORNER: Modern Executive Resume Sheet
    const topLeftDoc = buildResumeDocument(0x048ba2, 0x0ea5e9);
    topLeftDoc.position.set(-13.5, 7.8, -4);
    topLeftDoc.rotation.set(0.18, 0.38, -0.12);
    topLeftDoc.scale.setScalar(1.25);
    perimeterGroup.add(topLeftDoc);

    // TOP-RIGHT CORNER: Verified Trust Credential & ATS Scorecard
    const topRightDoc = buildTrustCredential();
    topRightDoc.position.set(13.5, 7.5, -4);
    topRightDoc.rotation.set(0.15, -0.4, 0.1);
    topRightDoc.scale.setScalar(1.2);
    perimeterGroup.add(topRightDoc);

    // BOTTOM-LEFT CORNER: Technical Lead Resume Sheet
    const bottomLeftDoc = buildResumeDocument(0x0284c7, 0x06b6d4);
    bottomLeftDoc.position.set(-14.2, -6.8, -3.5);
    bottomLeftDoc.rotation.set(-0.2, 0.35, 0.16);
    bottomLeftDoc.scale.setScalar(1.2);
    perimeterGroup.add(bottomLeftDoc);

    // BOTTOM-RIGHT CORNER: ATS Multi-Parser Analysis Sheet
    const bottomRightDoc = buildResumeDocument(0x0d9488, 0x14b8a6);
    bottomRightDoc.position.set(14.0, -7.0, -3.5);
    bottomRightDoc.rotation.set(-0.18, -0.36, -0.14);
    bottomRightDoc.scale.setScalar(1.2);
    perimeterGroup.add(bottomRightDoc);

    // 4. Perimeter Connecting Career Skill Nodes (Only along outer frame)
    const perimeterNodes = [
      new THREE.Vector3(-14, 2, -3),
      new THREE.Vector3(-11, 9, -4),
      new THREE.Vector3(11, 9, -4),
      new THREE.Vector3(14, 2, -3),
      new THREE.Vector3(-14, -2, -3),
      new THREE.Vector3(-11, -9, -4),
      new THREE.Vector3(11, -9, -4),
      new THREE.Vector3(14, -2, -3),
    ];

    const nodeGroup = new THREE.Group();
    const sphereGeo = new THREE.SphereGeometry(0.18, 16, 16);
    const sphereMat = new THREE.MeshStandardMaterial({
      color: 0x008ca0,
      emissive: 0x048ba2,
      emissiveIntensity: 0.7,
    });

    perimeterNodes.forEach((pos) => {
      const sp = new THREE.Mesh(sphereGeo, sphereMat);
      sp.position.copy(pos);
      nodeGroup.add(sp);
    });
    perimeterGroup.add(nodeGroup);

    // Outer Edge Subtle Glow Particles
    const particleCount = 80;
    const pGeo = new THREE.BufferGeometry();
    const pCoords = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      // Keep x on outer edges (|x| > 9) or y on outer edges (|y| > 6)
      const signX = Math.random() > 0.5 ? 1 : -1;
      pCoords[i] = signX * (9.5 + Math.random() * 8);
      pCoords[i + 1] = (Math.random() - 0.5) * 18;
      pCoords[i + 2] = (Math.random() - 0.5) * 10 - 2;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pCoords, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0x048ba2,
      size: 0.14,
      transparent: true,
      opacity: 0.65,
    });
    const particles = new THREE.Points(pGeo, pMat);
    perimeterGroup.add(particles);

    // 5. Interactive Parallax & Subtle Float Wave
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      targetX = (e.clientX / innerWidth - 0.5) * 1.5;
      targetY = (e.clientY / innerHeight - 0.5) * 1.5;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 6. Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse tracking
      mouseX += (targetX - mouseX) * 0.04;
      mouseY += (targetY - mouseY) * 0.04;

      camera.position.x = mouseX * 2.2;
      camera.position.y = -mouseY * 1.8;
      camera.lookAt(0, 0, 0);

      // Harmonic Corner Float Wave (Top-Left)
      topLeftDoc.position.y = 7.8 + Math.sin(elapsedTime * 0.7) * 0.3;
      topLeftDoc.rotation.z = -0.12 + Math.cos(elapsedTime * 0.5) * 0.04;

      // Harmonic Corner Float Wave (Top-Right)
      topRightDoc.position.y = 7.5 + Math.cos(elapsedTime * 0.8) * 0.32;
      topRightDoc.rotation.z = 0.1 + Math.sin(elapsedTime * 0.55) * 0.04;

      // Harmonic Corner Float Wave (Bottom-Left)
      bottomLeftDoc.position.y = -6.8 + Math.sin(elapsedTime * 0.75 + 1) * 0.28;
      bottomLeftDoc.rotation.z = 0.16 + Math.cos(elapsedTime * 0.45) * 0.04;

      // Harmonic Corner Float Wave (Bottom-Right)
      bottomRightDoc.position.y = -7.0 + Math.cos(elapsedTime * 0.85 + 2) * 0.3;
      bottomRightDoc.rotation.z = -0.14 + Math.sin(elapsedTime * 0.5) * 0.04;

      // Particle slow orbit
      particles.rotation.y = elapsedTime * 0.015;

      renderer.render(scene, camera);
    };

    animate();

    // 7. Responsive Resize
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
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-90 transition-opacity duration-1000"
      aria-hidden="true"
    />
  );
}
