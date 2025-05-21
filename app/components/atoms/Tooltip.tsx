'use client'

import React from 'react'

interface TooltipProps {
  text: string | React.ReactNode
  children: React.ReactNode
  position?: 'top' | 'right' | 'bottom' | 'left'
}

// eslint-disable-next-line no-unused-vars
export default function Tooltip({ text, children, position = 'top' }: TooltipProps) {
  return (
    <div className="group relative inline-block">
      {children}
      <div className="hidden group-hover:flex absolute bg-gray-700 text-white p-2 rounded-md shadow-lg transform transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100 -top-2 -translate-y-full left-1/2 -translate-x-1/2">
        <span className="whitespace-nowrap">{text}</span>
        <div className="bg-gray-700 rotate-45 p-1 absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2" />
      </div>
    </div>
  )
}
