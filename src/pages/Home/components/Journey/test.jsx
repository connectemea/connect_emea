import React from "react";
import { Timeline } from "@/components/ui/timeline.jsx";
import { CheckCircle2 } from "lucide-react";

export function TimelineDemo() {
    const data = [
        {
            title: "Welcome",
            content: (
                <div className="text-left">
                    <p className="mb-6 text-xs sm:text-sm leading-relaxed text-zinc-650 font-light max-w-xl">
                        New members are <span className="text-orange-650 font-bold">welcomed</span> into our
                        student community, guided through onboarding, and begin forming connections
                        with peers across diverse departments.
                    </p>
                </div>
            ),
        },
        {
            title: "Explore",
            content: (
                <div className="text-left">
                    <p className="mb-6 text-xs sm:text-sm leading-relaxed text-zinc-650 font-light max-w-xl">
                        Students <span className="text-orange-650 font-bold">discover</span> clubs, hackathons,
                        events, and workshops that align with their passions — from{" "}
                        <span className="italic font-normal text-zinc-800">technology</span> to{" "}
                        <span className="italic font-normal text-zinc-800">arts and entrepreneurship</span>.
                    </p>
                </div>
            ),
        },
        {
            title: "Build",
            content: (
                <div className="text-left">
                    <p className="mb-6 text-xs sm:text-sm leading-relaxed text-zinc-650 font-light max-w-xl">
                        Members <span className="text-orange-650 font-bold">collaborate</span> on projects,
                        competitions, and research, strengthening both{" "}
                        <span className="font-semibold text-zinc-800">technical expertise</span> and{" "}
                        <span className="font-semibold text-zinc-800">leadership skills</span>.
                    </p>
                </div>
            ),
        },
        {
            title: "Learn",
            content: (
                <div className="text-left">
                    <p className="mb-6 text-xs sm:text-sm leading-relaxed text-zinc-650 font-light max-w-xl">
                        Through <span className="text-orange-650 font-bold">workshops</span>, peer-to-peer
                        sessions, and mentorship, students continuously expand their academic
                        knowledge and professional growth.
                    </p>
                </div>
            ),
        },
        {
            title: "Refine",
            content: (
                <div className="text-left">
                    <p className="mb-4 text-xs sm:text-sm leading-relaxed text-zinc-650 font-light max-w-xl">
                        Students polish their portfolios and sharpen their skills by engaging in:
                    </p>
                    <div className="mb-6 space-y-2.5 max-w-xl">
                        {[
                            "Contributing to open-source",
                            "Presenting research papers",
                            "Attending mock interviews",
                            "Hosting community events"
                        ].map((text, idx) => (
                            <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-zinc-650 font-light">
                                <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0" />
                                <span>{text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            ),
        },
        {
            title: "Lead",
            content: (
                <div className="text-left">
                    <p className="mb-6 text-xs sm:text-sm leading-relaxed text-zinc-650 font-light max-w-xl">
                        Senior members step into <span className="text-orange-650 font-bold">leadership roles</span>,
                        mentoring juniors, organizing campus-wide events, and driving initiatives
                        that shape the student community.
                    </p>
                </div>
            ),
        },
        {
            title: "Graduate",
            content: (
                <div className="text-left">
                    <p className="mb-6 text-xs sm:text-sm leading-relaxed text-zinc-650 font-light max-w-xl">
                        Students graduate not only with{" "}
                        <span className="text-orange-650 font-bold">degrees</span>, but also with lifelong
                        networks, real-world experiences, and unforgettable community-driven
                        memories.
                    </p>
                </div>
            ),
        },
    ];

    return (
        <div className="relative w-full overflow-clip">
            <Timeline data={data} />
        </div>
    );
}
