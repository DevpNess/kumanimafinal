"use client"
import { useEffect } from 'react';
export default function useBorder() {
  useEffect(() => {
    const syncPointer = ({ x = 0, y = 0 }) => {
      document.documentElement.style.setProperty('--x', x.toFixed(2));
      document.documentElement.style.setProperty('--xp', (x / window.innerWidth).toFixed(2));
      document.documentElement.style.setProperty('--y', y.toFixed(2));
      document.documentElement.style.setProperty('--yp', (y / window.innerHeight).toFixed(2));
    }
    return () => document.body.addEventListener('pointermove', syncPointer); // Limpieza
  }, []);
}