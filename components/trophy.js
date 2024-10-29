import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Trophy = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(new THREE.Scene());
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const trophyRef = useRef(null);
  const frameIdRef = useRef(null);
  const starsRef = useRef(null);

  useEffect(() => {
    // Scene setup
    const scene = sceneRef.current;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(2, 2, 8);
    camera.lookAt(0, 1, 0);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // Transparent background
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Create moving stars
    const createStars = () => {
      const starGeometry = new THREE.BufferGeometry();
      const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.1, transparent: true });
      const starVertices = [];

      for (let i = 0; i < 5000; i++) {
        const x = (Math.random() - 0.5) * 100;
        const y = (Math.random() - 0.5) * 100;
        const z = (Math.random() - 0.5) * 100;
        starVertices.push(x, y, z);
      }

      starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
      const stars = new THREE.Points(starGeometry, starMaterial);
      scene.add(stars);
      starsRef.current = stars;
    };

    createStars();

    // Create trophy geometry
    const createTrophy = () => {
      const group = new THREE.Group();

      // Base
      const baseGeometry = new THREE.CylinderGeometry(1.2, 1.5, 0.6, 32);
      const baseMaterial = new THREE.MeshPhongMaterial({ color: 0x5C4033, shininess: 50 });
      const base = new THREE.Mesh(baseGeometry, baseMaterial);
      group.add(base);

      // Stem
      const stemGeometry = new THREE.CylinderGeometry(0.2, 0.4, 2, 32);
      const stemMaterial = new THREE.MeshStandardMaterial({ color: 0xFFFF00, metalness: 0.6, roughness: 0.05 });
      const stem = new THREE.Mesh(stemGeometry, stemMaterial);
      stem.position.y = 1.5;
      group.add(stem);

      // Inverted bowl
      const invertedBowlGeometry = new THREE.SphereGeometry(1.5, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
      const invertedBowlMaterial = new THREE.MeshStandardMaterial({ color: 0xFFFF00, metalness: 0.6, roughness: 0.05, side: THREE.DoubleSide });
      const invertedBowl = new THREE.Mesh(invertedBowlGeometry, invertedBowlMaterial);
      invertedBowl.rotation.x = Math.PI;
      invertedBowl.scale.y = 1.4;
      invertedBowl.position.y = 3.5;
      group.add(invertedBowl);

      // Handles
      const handleGeometry = new THREE.TorusGeometry(0.7, 0.11, 16, 32, Math.PI);
      const handleMaterial = new THREE.MeshStandardMaterial({ color: 0xFFFF00, metalness: 0.6, roughness: 0.05 });

      const leftHandle = new THREE.Mesh(handleGeometry, handleMaterial);
      leftHandle.position.set(-1, 2.7, 0);
      leftHandle.rotation.z = Math.PI / 2;
      group.add(leftHandle);

      const rightHandle = new THREE.Mesh(handleGeometry, handleMaterial);
      rightHandle.position.set(1, 2.7, 0);
      rightHandle.rotation.z = -Math.PI / 2;
      group.add(rightHandle);

      return group;
    };

    const trophy = createTrophy();
    scene.add(trophy);
    trophyRef.current = trophy;

    // Animation
    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);

      if (starsRef.current) {
        starsRef.current.rotation.x += 0.0002;
        starsRef.current.rotation.y += 0.0002;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Scroll handler
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const rotationAmount = (scrollPosition / maxScroll) * Math.PI * 15;

      if (trophyRef.current) {
        trophyRef.current.rotation.y = rotationAmount;
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Resize handler
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && rendererRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement);
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      cancelAnimationFrame(frameIdRef.current);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
      }}
    />
  );
};

export default Trophy;
