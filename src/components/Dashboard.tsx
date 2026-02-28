"use client";

import React, { useState } from "react";
import { Party } from "@/types";
import LiveTicker from "./LiveTicker";
import PartyGrid from "./PartyGrid";
import PartyModal from "./PartyModal";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import partiesData from "@/data/parties.json";

export default function Dashboard() {
    const [selectedParty, setSelectedParty] = useState<Party | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handlePartySelect = (party: Party) => {
        setSelectedParty(party);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedParty(null), 300); // Clear after animation
    };

    const headlines = [
        "TN Assembly Elections 2026: The Battle Begins",
        "ECI Announces New Voter Registration Drive",
        "Political Parties Gear Up for Mega Rallies in Madurai",
        "Focus on Infrastructure: New Metro Lines Approved",
        "Youth Voter Turnout Expected to Break Records",
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                            TN
                        </div>
                        <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                            PolitiGuide <span className="text-blue-600">2026</span>
                        </h1>
                    </div>
                    <div className="text-sm font-medium text-slate-500">
                        Neutral • Data-Driven • Transparent
                    </div>
                </div>
                <LiveTicker headlines={headlines} />
            </header>

            {/* Main Content */}
            <main className="flex-1 py-10">
                <div className="max-w-7xl mx-auto px-6 mb-10 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                        Know Your Options. <span className="text-blue-600">Decide the Future.</span>
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
                        Explore the ideologies, achievements, and track records of Tamil Nadu's major political parties.
                    </p>
                    <div className="flex justify-center">
                        <Link
                            href="/cases"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-medium transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                        >
                            <AlertTriangle className="w-5 h-5 text-amber-400" />
                            Track Legal Cases & Controversies
                        </Link>
                    </div>
                </div>

                <PartyGrid parties={partiesData} onSelectParty={handlePartySelect} />
            </main>

            {/* Footer */}
            <footer className="bg-slate-900 text-slate-400 py-8 text-center text-sm">
                <p>© 2026 TN PolitiGuide. A non-partisan initiative for voter awareness.</p>
            </footer>

            {/* Modal */}
            <PartyModal
                party={selectedParty}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </div>
    );
}
