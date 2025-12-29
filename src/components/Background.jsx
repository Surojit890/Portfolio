import React, { useMemo, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaReact, FaJs, FaPython, FaNode, FaHtml5, FaCss3, FaGitAlt, 
  FaDocker, FaAws, FaRust, FaJava 
} from 'react-icons/fa';
import { 
  SiTypescript, SiTailwindcss, SiMongodb, SiPostgresql, 
  SiNextdotjs, SiVite, SiGraphql, SiFirebase, SiLinux 
} from 'react-icons/si';
import { VscCode } from 'react-icons/vsc';

const Background = () => {
    // Only render on client to avoid hydration mismatches with random values
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const icons = [
        FaReact, FaJs, FaPython, FaNode, FaHtml5, FaCss3, FaGitAlt,
        SiTypescript, SiTailwindcss, SiMongodb, SiPostgresql, VscCode,
        FaDocker, FaAws, SiNextdotjs, SiVite, SiGraphql, SiFirebase, 
        FaRust, FaJava, SiLinux
    ];

    const floatingIcons = useMemo(() => {
        return Array.from({ length: 50 }).map((_, i) => {
            const Icon = icons[i % icons.length];
            // Random positioning and delay logic
            const initialX = Math.random() * 100;
            const initialY = Math.random() * 100;
            const duration = 10 + Math.random() * 20; // 10-30s float duration
            const delay = Math.random() * 5;
            const size = 20 + Math.random() * 40; // 20-60px size

            return {
                id: i,
                Icon,
                initialX,
                initialY,
                duration,
                delay,
                size
            };
        });
    }, []);

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-[-1]">
             {/* Gradient Background Overlay for depth (optional, can be removed if CSS handles it well) */}
             <div className="absolute inset-0 bg-gradient-to-br from-transparent to-background/20" />

            {floatingIcons.map(({ id, Icon, initialX, initialY, duration, delay, size }) => (
                <motion.div
                    key={id}
                    className="absolute text-primary dark:text-primary" 
                    initial={{ 
                        x: `calc(${initialX}vw - 50%)`, 
                        y: `calc(${initialY}vh - 50%)`, 
                        opacity: 0 
                    }}
                    animate={{ 
                        y: [`calc(${initialY}vh - 50%)`, `calc(${initialY - 20}vh - 50%)`, `calc(${initialY}vh - 50%)`],
                        x: [`calc(${initialX}vw - 50%)`, `calc(${initialX + 10}vw - 50%)`, `calc(${initialX}vw - 50%)`],
                        rotate: [0, 360],
                        opacity: [0.1, 0.2, 0.1]
                    }}
                    transition={{
                        duration: duration,
                        repeat: Infinity,
                        ease: "linear",
                        delay: delay
                    }}
                    style={{
                        fontSize: `${size}px`,
                        left: 0,
                        top: 0,
                    }}
                >
                    <Icon />
                </motion.div>
            ))}
        </div>
    );
};

export default Background;
