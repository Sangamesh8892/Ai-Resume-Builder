import { FileText, Loader2 } from "lucide-react";
import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-md">
      <div className="flex flex-col items-center gap-6">
        {/* Main loader icon */}
        <div className="rounded-full border-2 border-purple-200 bg-white p-4 shadow-lg">
          <Loader2 className="h-10 w-10 animate-spin text-purple-600" strokeWidth={2.5} />
        </div>

        {/* App name */}
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-xl font-semibold tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Resume Builder
          </h2>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-indigo-500 [animation-delay:0ms]"></span>
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-purple-500 [animation-delay:150ms]"></span>
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-pink-500 [animation-delay:300ms]"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;