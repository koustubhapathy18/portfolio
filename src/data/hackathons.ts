export type PlacementType = "1st" | "2nd" | "3rd" | "finalist" | "participant";

export interface HackathonItem {
    emoji: string;
    name: string;
    organizer: string;
    description: string;
    placement: PlacementType;
    techStack: string[];
    date: string;
    teamSize: number;
    teammates?: string[];
}

export interface HackathonStats {
    totalEvents: number;
    wins: number;
    finalistRounds: number;
    totalParticipants: number;
}

export const hackathonStats: HackathonStats = {
    totalEvents: 1,
    wins: 1,
    finalistRounds: 1,
    totalParticipants: 100,
};

export const hackathons: HackathonItem[] = [
    {
        emoji: "🏆",
        name: "Web Development Competition — FESTRONIX 2K26",
        organizer: "GIFT Autonomous, Bhubaneswar — Annual Technical Festival",
        description:
            "Won 1st place and the cash prize as Team Luminary, building a polished web application under competitive time constraints that impressed the judges across design, functionality, and code quality.",
        placement: "1st",
        techStack: ["HTML", "CSS", "JavaScript", "React"],
        date: "Feb 27, 2026",
        teamSize: 3,
        teammates: ["Koustubha Pathy", "Sibani Bisoyi", "Jagan Kumar Swain"]
    },
];
