"use client";

import { useState, useEffect } from "react";

interface OnboardingHintProps {
  onDismiss?: () => void;
}

export function OnboardingHint({ onDismiss }: OnboardingHintProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem("articta-onboarding-dismissed");
    if (!dismissed) {
      setVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    setVisible(false);
    localStorage.setItem("articta-onboarding-dismissed", "true");
    if (onDismiss) onDismiss();
  };

  if (!visible) return null;

  return (
    <div className="onboarding-banner" onClick={handleDismiss}>
      <div className="onboarding-banner-content">
        <span className="onboarding-pulse-dot" />
        <span className="onboarding-text">
          ✨ <strong>Interactive Model:</strong> Click any highlighted value or card to adjust numbers & see recalculations live.
        </span>
      </div>
      <button className="onboarding-close-btn" onClick={handleDismiss}>
        Got it
      </button>
    </div>
  );
}
