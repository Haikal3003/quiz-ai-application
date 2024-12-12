import React from 'react';

export default function LoadingQuestions({ progress }: { progress: number }) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="text-xs mb-4">Generating Quiz, Please Wait...</div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 relative overflow-hidden">
        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
      </div>
      <div className="mt-2 text-xs">{progress}%</div>
    </div>
  );
}
