import { motion } from "framer-motion";

const ViewMotion = ({ children, delay = 0 }) => {
    const isMobile = window.innerWidth < 768;
    return (
        <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: isMobile ? 0.05 : 0.2 }}
            transition={{ duration: 0.5, ease: "easeOut", delay }}
            className="my-8"
        >
            {children}
        </motion.section>
    );
};

export default ViewMotion;
