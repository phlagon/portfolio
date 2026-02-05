"use client";

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

export function CatModel() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current;
    let animationFrameId: number;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.z = 3;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(renderer.domElement);
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 1.2);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Cat Body (simple representation)
    const catGroup = new THREE.Group();
    const catColor = 0xeeeeee;
    
    // Head
    const headGeometry = new THREE.SphereGeometry(0.8, 32, 32);
    const headMaterial = new THREE.MeshStandardMaterial({ color: catColor, roughness: 0.6, metalness: 0.2 });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 0.3;
    catGroup.add(head);

    // Ears
    const earGeometry = new THREE.ConeGeometry(0.3, 0.6, 32);
    const leftEar = new THREE.Mesh(earGeometry, headMaterial);
    leftEar.position.set(-0.5, 1.1, 0);
    leftEar.rotation.z = -Math.PI / 9;
    catGroup.add(leftEar);

    const rightEar = new THREE.Mesh(earGeometry, headMaterial);
    rightEar.position.set(0.5, 1.1, 0);
    rightEar.rotation.z = Math.PI / 9;
    catGroup.add(rightEar);
    
    // Body
    const bodyGeometry = new THREE.CylinderGeometry(0.6, 0.4, 1.2, 32);
    const body = new THREE.Mesh(bodyGeometry, headMaterial);
    body.position.y = -0.6;
    catGroup.add(body);

    // Tail
    const tailCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, -1.2, -0.4),
        new THREE.Vector3(0, -1.0, -0.8),
        new THREE.Vector3(0.3, -0.5, -1.0),
        new THREE.Vector3(0, 0, -1.2)
    ]);
    const tailGeometry = new THREE.TubeGeometry(tailCurve, 20, 0.1, 8, false);
    const tail = new THREE.Mesh(tailGeometry, headMaterial);
    catGroup.add(tail);

    scene.add(catGroup);
    catGroup.position.y = -0.5;
    
    // Mouse tracking for head movement
    let mouseX = 0, mouseY = 0;
    const onDocumentMouseMove = (event: MouseEvent) => {
        mouseX = (event.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
        mouseY = (event.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
    }
    document.addEventListener('mousemove', onDocumentMouseMove);
    

    // Animation loop
    const clock = new THREE.Clock();
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Head movement
      catGroup.rotation.y = THREE.MathUtils.lerp(catGroup.rotation.y, mouseX * 0.5, 0.05);
      head.rotation.x = THREE.MathUtils.lerp(head.rotation.x, -mouseY * 0.4, 0.05);

      // Tail wag
      tail.rotation.y = Math.sin(elapsedTime * 2) * 0.3;

      // Gentle floating
      catGroup.position.y = -0.5 + Math.sin(elapsedTime * 0.5) * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!currentMount) return;
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', onDocumentMouseMove);
      cancelAnimationFrame(animationFrameId);
      if (renderer.domElement.parentNode === currentMount) {
        currentMount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" />;
}
