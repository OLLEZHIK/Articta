"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Smoothly animates a number from its previous value to the new value.
 * Uses requestAnimationFrame for 60fps transitions.
 */
export function useAnimatedNumber(
  targetValue: number,
  duration: number = 400
): number {
  const [displayValue, setDisplayValue] = useState(targetValue);
  const previousValue = useRef(targetValue);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const startValue = previousValue.current;
    const diff = targetValue - startValue;

    // Skip animation if difference is negligible
    if (Math.abs(diff) < 0.001) {
      setDisplayValue(targetValue);
      previousValue.current = targetValue;
      return;
    }

    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic for smooth deceleration
      const eased = 1 - Math.pow(1 - progress, 3);

      const current = startValue + diff * eased;
      setDisplayValue(current);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayValue(targetValue);
        previousValue.current = targetValue;
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [targetValue, duration]);

  // Update ref when animation completes
  useEffect(() => {
    return () => {
      previousValue.current = targetValue;
    };
  }, [targetValue]);

  return displayValue;
}
