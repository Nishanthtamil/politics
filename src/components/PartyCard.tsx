"use client";

import React from "react";
import { Party } from "@/types";
import { ArrowRight } from "lucide-react";

interface PartyCardProps {
    party: Party;
    onSelect: (party: Party) => void;
}

export default function PartyCard({ party, onSelect }: PartyCardProps) {
    return (
        <div
            onClick={() => onSelect(party)}
            className={`group relative bg-white rounded-xl border-l-4 ${party.color} shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden`}
        >
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-xl font-bold text-slate-800 group-hover:text-slate-900 transition-colors">
                            {party.abbr}
                        </h3>
                        <p className="text-sm text-slate-500 font-medium">{party.leader}</p>
                    </div>
                    <div className={`p-2 rounded-full ${party.bg} text-xs font-bold text-slate-700`}>
                        {party.symbol}
                    </div>
                </div>

                <p className="text-slate-600 text-sm line-clamp-2 mb-4">
                    {party.description}
                </p>

                <div className="flex items-center text-slate-400 text-xs font-semibold group-hover:text-slate-800 transition-colors">
                    <span>View Analysis</span>
                    <ArrowRight className="w-3 h-3 ml-1 transform group-hover:translate-x-1 transition-transform" />
                </div>
            </div>
        </div>
    );
}
