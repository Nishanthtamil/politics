"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, Search, Filter } from 'lucide-react';
import casesDataRaw from '@/data/cases.json';
import { LegalCase } from '@/types';
import CaseCard from '@/components/CaseCard';

const casesData = casesDataRaw as LegalCase[];

export default function CasesPage() {
    const [selectedParty, setSelectedParty] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredCases = useMemo(() => {
        return casesData.filter(c => {
            const matchesParty = selectedParty ? (c.party_name === selectedParty || c.party_name.includes(selectedParty)) : true;

            const searchLower = searchQuery.toLowerCase();
            const matchesSearch =
                (c.case_details && c.case_details.toLowerCase().includes(searchLower)) ||
                (c.case_name && c.case_name.toLowerCase().includes(searchLower)) ||
                (c.who_did_it && c.who_did_it.toLowerCase().includes(searchLower)) ||
                (c.leader_name && c.leader_name.toLowerCase().includes(searchLower));

            return matchesParty && matchesSearch;
        });
    }, [selectedParty, searchQuery]);

    const availableParties = useMemo(() => {
        const parties = new Set<string>();
        casesData.forEach(c => parties.add(c.party_name));
        return Array.from(parties).sort();
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <Link href="/" className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
                                <ArrowLeft className="w-5 h-5" />
                            </Link>
                            <div>
                                <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                                    Legal Cases & Tracker
                                </h1>
                                <p className="text-sm text-slate-500">Comprehensive database of controversies and legal proceedings.</p>
                            </div>
                        </div>

                        <div className="relative w-full md:w-96">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-4 w-4 text-slate-400" />
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
                                placeholder="Search by name, case details..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </header>

            <main className="flex-1 py-8">
                <div className="max-w-7xl mx-auto px-6">
                    {/* Filters */}
                    <div className="mb-8 p-4 bg-white rounded-xl shadow-sm border border-slate-200">
                        <div className="flex items-center gap-2 mb-3">
                            <Filter className="w-4 h-4 text-slate-500" />
                            <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider">Filter by Party</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setSelectedParty(null)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedParty === null
                                        ? "bg-slate-800 text-white shadow-md"
                                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                    }`}
                            >
                                All Parties
                            </button>
                            {availableParties.map(party => {
                                const displayName = party;
                                return (
                                    <button
                                        key={party}
                                        onClick={() => setSelectedParty(party)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedParty === party
                                                ? "bg-blue-600 text-white shadow-md ring-2 ring-blue-600 ring-offset-2"
                                                : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300"
                                            }`}
                                    >
                                        {displayName}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Results count */}
                    <div className="mb-6 flex justify-between items-end">
                        <h2 className="text-xl font-semibold text-slate-800">
                            {filteredCases.length} {filteredCases.length === 1 ? 'Case' : 'Cases'} Found
                        </h2>
                    </div>

                    {/* Grid */}
                    {filteredCases.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredCases.map((caseItem, idx) => (
                                <CaseCard key={idx} caseItem={caseItem} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white rounded-xl border border-slate-200 border-dashed">
                            <div className="text-slate-400 mb-2">
                                <Search className="w-10 h-10 mx-auto opacity-50" />
                            </div>
                            <h3 className="text-lg font-medium text-slate-900">No cases found</h3>
                            <p className="text-slate-500">Try adjusting your filters or search terms.</p>
                            <button
                                onClick={() => { setSelectedParty(null); setSearchQuery(""); }}
                                className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
