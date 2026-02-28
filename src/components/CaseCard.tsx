import React from 'react';
import { LegalCase } from '@/types';
import { AlertCircle, Calendar, User, Tag, Link as LinkIcon, AlertTriangle } from 'lucide-react';

export default function CaseCard({ caseItem }: { caseItem: LegalCase }) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
            <div className="p-5 border-b border-slate-100 flex items-start gap-4 bg-slate-50/50">
                <div className="mt-1 p-2 bg-red-50 text-red-600 rounded-lg shrink-0">
                    <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-slate-800">
                        {caseItem.case_name || "Legal Controversy / Investigation"}
                    </h3>
                    {caseItem.leader_name && (
                        <p className="text-sm font-medium text-slate-600 mb-1">
                            Involving: <span className="text-slate-900">{caseItem.leader_name}</span>
                        </p>
                    )}
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-200 text-slate-700">
                        {caseItem.party_name}
                    </span>
                </div>
            </div>

            <div className="p-5 space-y-4">
                <p className="text-slate-600 leading-relaxed text-sm">
                    {caseItem.case_details}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-100">
                    <div className="flex items-start gap-2">
                        <Calendar className="w-4 h-4 text-slate-400 mt-0.5" />
                        <div>
                            <span className="block text-xs text-slate-500 font-medium uppercase tracking-wider">Time / Period</span>
                            <span className="text-sm text-slate-800">{caseItem.time}</span>
                        </div>
                    </div>

                    {(caseItem.who_did_it || caseItem.affiliation) && (
                        <div className="flex items-start gap-2">
                            <User className="w-4 h-4 text-slate-400 mt-0.5" />
                            <div>
                                <span className="block text-xs text-slate-500 font-medium uppercase tracking-wider">Key Figures</span>
                                <span className="text-sm text-slate-800">
                                    {caseItem.who_did_it || caseItem.affiliation}
                                    {caseItem.who_did_it && caseItem.affiliation ? ` (${caseItem.affiliation})` : ''}
                                </span>
                            </div>
                        </div>
                    )}

                    {caseItem.current_status && (
                        <div className="flex items-start gap-2 sm:col-span-2">
                            <AlertCircle className="w-4 h-4 text-slate-400 mt-0.5" />
                            <div>
                                <span className="block text-xs text-slate-500 font-medium uppercase tracking-wider">Current Status</span>
                                <span className="text-sm text-amber-700 font-medium">{caseItem.current_status}</span>
                            </div>
                        </div>
                    )}

                    {caseItem.source && (
                        <div className="flex items-start gap-2 sm:col-span-2">
                            <LinkIcon className="w-4 h-4 text-slate-400 mt-0.5" />
                            <div>
                                <span className="block text-xs text-slate-500 font-medium uppercase tracking-wider">Sources</span>
                                <span className="text-sm text-slate-600">{caseItem.source}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
