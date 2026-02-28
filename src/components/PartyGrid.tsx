"use client";

import React from "react";
import { Party } from "@/types";
import PartyCard from "./PartyCard";

interface PartyGridProps {
    parties: Party[];
    onSelectParty: (party: Party) => void;
}

export default function PartyGrid({ parties, onSelectParty }: PartyGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 max-w-7xl mx-auto">
            {parties.map((party) => (
                <PartyCard key={party.id} party={party} onSelect={onSelectParty} />
            ))}
        </div>
    );
}
