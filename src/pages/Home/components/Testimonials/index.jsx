import React from 'react';
import Cards from '@/const/data/Cards';
import Card from './Card';
import { motion } from 'framer-motion';
import { MessageSquareQuote } from 'lucide-react';

const containerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

function Points() {
    const isMobile = window.innerWidth < 768;

    return (
        <motion.div
            className="mx-auto px-4 py-8 relative z-10 w-full"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: isMobile ? 0.05 : 0.15 }}
            variants={containerVariants}
        >
            {/* Heading */}
            <div className="flex flex-col items-center justify-center text-center space-y-2 mb-10">
                <div className="flex items-center gap-1.5 text-orange-600">
                    <MessageSquareQuote className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Testimonials</span>
                </div>
                <motion.h1
                    className="font-black text-2xl sm:text-3xl text-zinc-950"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    Voices of <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">Connect</span>
                </motion.h1>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {Cards.map((item) => (
                    <motion.div
                        key={item.id}
                        variants={cardVariants}
                        className="h-full"
                    >
                        <Card item={item} />
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}

export default Points;
