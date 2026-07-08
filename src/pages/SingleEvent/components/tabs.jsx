"use client"

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import { Target, Sparkles } from "lucide-react";

const Highlights = ({ data }) => {
    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2 text-orange-600">
                <Sparkles className="w-5 h-5 shrink-0" />
                <h3 className="text-base sm:text-lg font-bold tracking-tight text-zinc-900">Event Highlights</h3>
            </div>
            <div className="text-zinc-600 text-sm sm:text-base leading-relaxed font-light highlights-container">
                {data}
            </div>
        </div>
    );
};

const Objectives = ({ data }) => {
    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2 text-orange-600">
                <Target className="w-5 h-5 shrink-0" />
                <h3 className="text-base sm:text-lg font-bold tracking-tight text-zinc-900">Objectives</h3>
            </div>
            <p className="text-zinc-600 text-sm sm:text-base leading-relaxed font-light">
                {data}
            </p>
        </div>
    );
};

const MotionWrapper = ({ children, tab }) => {
    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={tab}
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -12, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="w-full"
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
};

const Tab = ({ about }) => {
    if (!about) return null;

    return (
        <div className="w-full bg-white border border-zinc-200/80 rounded-3xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.015)]">
            <Tabs defaultValue="objectives" className="w-full space-y-6">
                <TabsList className="bg-zinc-100 border border-zinc-200/50 rounded-2xl p-1 inline-flex gap-1 h-auto">
                    <TabsTrigger 
                        value="objectives" 
                        className="text-zinc-500 font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl border border-transparent data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=active]:border-orange-500/10 data-[state=active]:no-underline transition-all duration-200 cursor-pointer"
                    >
                        Objectives
                    </TabsTrigger>
                    <TabsTrigger 
                        value="highlights" 
                        className="text-zinc-500 font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl border border-transparent data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=active]:border-orange-500/10 data-[state=active]:no-underline transition-all duration-200 cursor-pointer"
                    >
                        Highlights
                    </TabsTrigger>
                </TabsList>
                
                <div className="p-2 overflow-auto min-h-[180px]">
                    <TabsContent value="objectives" className="mt-0 focus-visible:ring-0">
                        <MotionWrapper tab="objectives">
                            <Objectives data={about.objectives} />
                        </MotionWrapper>
                    </TabsContent>

                    <TabsContent value="highlights" className="mt-0 focus-visible:ring-0">
                        <MotionWrapper tab="highlights">
                            <Highlights data={about.highlights} />
                        </MotionWrapper>
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    );
};

export default Tab;
