import React from 'react'
import './Loading.css';

function Loading() {
  return (
    <div className="loading-dots text-[#555] dark:text-white">
        <span>.</span>
        <span>.</span>
        <span>.</span>
    </div>
  );
}

export default Loading