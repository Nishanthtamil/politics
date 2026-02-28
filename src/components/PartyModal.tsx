"use client";

import React, { useState, useEffect } from "react";
import { Party } from "@/types";
import { X, Newspaper, Trophy, AlertTriangle, BarChart2, ExternalLink } from "lucide-react";
import RadarChart from "./charts/RadarChart";

interface PartyModalProps {
    party: Party | null;
    isOpen: boolean;
    onClose: () => void;
}

type Tab = "overview" | "news" | "achievements" | "controversies";

export default function PartyModal({ party, isOpen, onClose }: PartyModalProps) {
    const [activeTab, setActiveTab] = useState<Tab>("overview");
    const [news, setNews] = useState<any[]>([]);
    const [loadingNews, setLoadingNews] = useState(false);

    useEffect(() => {
        if (isOpen && party) {
            setActiveTab("overview");
            fetchNews(party.keywords);
        }
    }, [isOpen, party]);

    const fetchNews = async (keywords: string[]) => {
        setLoadingNews(true);
        try {
            const query = keywords.join(",");
            const res = await fetch(`/api/news?q=${encodeURIComponent(query)}`);
            const data = await res.json();
            setNews(data.items || []);
        } catch (error) {
            console.error("Failed to fetch news", error);
        } finally {
            setLoadingNews(false);
        }
    };

    if (!isOpen || !party) return null;

    const chartData = {
        labels: ["Welfare", "Infrastructure", "Ideology", "Nationalism"],
        datasets: [
            {
                label: party.abbr,
                data: [
                    party.focus.welfare,
                    party.focus.infrastructure,
                    party.focus.ideology,
                    party.focus.nationalism,
                ],
                backgroundColor: "rgba(59, 130, 246, 0.2)",
                borderColor: "rgba(59, 130, 246, 1)",
                borderWidth: 2,
            },
        ],
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className={`p-6 ${party.bg} border-b border-slate-100 flex justify-between items-start`}>
                    <div className="flex items-center gap-4">
                        <div className="h-16 w-16 bg-white rounded-full shadow-sm flex items-center justify-center text-2xl font-bold text-slate-700 border-2 border-slate-100">
                            {party.symbol}
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900">{party.name}</h2>
                            <p className="text-slate-600 font-medium">Leader: {party.leader}</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 bg-white/50 hover:bg-white rounded-full transition-colors text-slate-500 hover:text-slate-800"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-slate-200 bg-slate-50 overflow-x-auto">
                    <TabButton
                        active={activeTab === "overview"}
                        onClick={() => setActiveTab("overview")}
                        icon={<BarChart2 className="w-4 h-4" />}
                        label="Overview"
                    />
                    <TabButton
                        active={activeTab === "news"}
                        onClick={() => setActiveTab("news")}
                        icon={<Newspaper className="w-4 h-4" />}
                        label="Latest News"
                    />
                    <TabButton
                        active={activeTab === "achievements"}
                        onClick={() => setActiveTab("achievements")}
                        icon={<Trophy className="w-4 h-4" />}
                        label="The Good"
                    />
                    <TabButton
                        active={activeTab === "controversies"}
                        onClick={() => setActiveTab("controversies")}
                        icon={<AlertTriangle className="w-4 h-4" />}
                        label="The Bad"
                    />
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 bg-white">
                    {activeTab === "overview" && (
                        <div className="flex flex-col md:flex-row gap-8 items-center">
                            <div className="w-full md:w-1/2 h-64 md:h-80">
                                <RadarChart data={chartData} />
                            </div>
                            <div className="w-full md:w-1/2 space-y-4">
                                <h3 className="text-lg font-bold text-slate-800">Strategic Focus</h3>
                                <p className="text-slate-600 leading-relaxed">{party.description}</p>
                                <div className="grid grid-cols-2 gap-4 mt-4">
                                    <StatBox label="Welfare" value={party.focus.welfare} />
                                    <StatBox label="Infrastructure" value={party.focus.infrastructure} />
                                    <StatBox label="Ideology" value={party.focus.ideology} />
                                    <StatBox label="Nationalism" value={party.focus.nationalism} />
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "news" && (
                        <div className="space-y-4">
                            {loadingNews ? (
                                <div className="text-center py-10 text-slate-500 animate-pulse">Fetching latest headlines...</div>
                            ) : news.length > 0 ? (
                                news.map((item, idx) => (
                                    <a
                                        key={idx}
                                        href={item.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block p-4 rounded-lg border border-slate-100 hover:border-blue-200 hover:bg-blue-50 transition-all group"
                                    >
                                        <h4 className="font-semibold text-slate-800 group-hover:text-blue-700 mb-1">{item.title}</h4>
                                        <p className="text-sm text-slate-500 flex items-center gap-2">
                                            {item.source} • {new Date(item.pubDate).toLocaleDateString()}
                                            <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </p>
                                    </a>
                                ))
                            ) : (
                                <div className="text-center py-10 text-slate-500">No recent news found.</div>
                            )}
                        </div>
                    )}

                    {activeTab === "achievements" && (
                        <div className="space-y-4">
                            {party.achievements.map((item, idx) => (
                                <div key={idx} className="flex gap-4 p-4 bg-green-50/50 rounded-lg border border-green-100">
                                    <div className="mt-1 bg-green-100 p-2 rounded-full h-fit text-green-600">
                                        <Trophy className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-800">{item.title}</h4>
                                        <p className="text-slate-600 text-sm mt-1">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === "controversies" && (
                        <div className="space-y-4">
                            {party.controversies.map((item, idx) => (
                                <div key={idx} className="flex gap-4 p-4 bg-red-50/50 rounded-lg border border-red-100">
                                    <div className="mt-1 bg-red-100 p-2 rounded-full h-fit text-red-600">
                                        <AlertTriangle className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-800">{item.title}</h4>
                                        <p className="text-slate-600 text-sm mt-1">{item.desc}</p>
                                        <div className="mt-2 text-xs font-medium text-slate-500 bg-white px-2 py-1 rounded border border-slate-200 inline-block">
                                            Source: {item.source}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function TabButton({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors whitespace-nowrap border-b-2 ${active
                    ? "border-blue-600 text-blue-700 bg-blue-50/50"
                    : "border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-100"
                }`}
        >
            {icon}
            {label}
        </button>
    );
}

function StatBox({ label, value }: { label: string; value: number }) {
    return (
        <div className="bg-slate-50 p-3 rounded-lg text-center">
            <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">{label}</div>
            <div className="text-xl font-bold text-slate-800">{value}%</div>
        </div>
    );
}
