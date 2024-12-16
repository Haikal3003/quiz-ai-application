import React from 'react';

interface CircleResultProps {
  score: number;
  total: number;
}

export default function CircleResult({ score, total }: CircleResultProps) {
  const correctPercentage = (score / total) * 100;

  const correctCircumference = 2 * Math.PI * 50;
  const correctStrokeDasharray = (correctPercentage / 100) * correctCircumference;

  return (
    <div className="flex items-center justify-center space-x-4">
      <div className="relative w-32 h-32">
        <svg width="120" height="120" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="50" stroke="#ff0000" strokeWidth="10" fill="none" />

          <circle cx="60" cy="60" r="50" stroke="#4caf50" strokeWidth="10" fill="none" strokeDasharray={`${correctStrokeDasharray} ${correctCircumference}`} />

          <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fill="white" transform="rotate(0)" className="text-sm">
            {score}/{total}
          </text>
        </svg>
      </div>
    </div>
  );
}
