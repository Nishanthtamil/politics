export interface Achievement {
    title: string;
    desc: string;
}

export interface Controversy {
    title: string;
    desc: string;
    source: string;
}

export interface PartyFocus {
    welfare: number;
    infrastructure: number;
    ideology: number;
    nationalism: number;
}

export interface Party {
    id: string;
    name: string;
    abbr: string;
    leader: string;
    symbol: string;
    color: string;
    bg: string;
    description: string;
    focus: PartyFocus;
    achievements: Achievement[];
    controversies: Controversy[];
    keywords: string[];
}

export interface LegalCase {
    party_name: string;
    case_name?: string;
    case_details: string;
    time: string;
    who_did_it?: string;
    affiliation?: string;
    source?: string;
    leader_name?: string;
    current_status?: string;
}
