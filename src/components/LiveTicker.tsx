"use client";

import React from "react";

interface LiveTickerProps {
    headlines: string[];
}

export default function LiveTicker({ headlines }: LiveTickerProps) {
    return (
        <div className="bg-slate-900 text-white py-2 overflow-hidden relative z-50 shadow-md">
            <div className="flex items-center gap-4 animate-marquee whitespace-nowrap">
                {headlines.map((headline, index) => (
                    <span key={index} className="mx-4 text-sm font-medium tracking-wide">
                        {headline} <span className="text-slate-500 mx-2">|</span>
                    </span>
                ))}
                {/* Duplicate for seamless loop */}
                {headlines.map((headline, index) => (
                    <span key={`dup-${index}`} className="mx-4 text-sm font-medium tracking-wide">
                        {headline} <span className="text-slate-500 mx-2">|</span>
                    </span>
                ))}
            </div>
        </div>
    );
}
