'use client';

import { motion } from 'framer-motion';

interface StepProps {
  title: string;
  image: string;
  description: string;
}

export default function StepBlock({ title, image, description }: StepProps) {
  return (
    <motion.div
      className="text-center my-16"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <img src={image} alt={title} className="rounded-lg shadow-lg mx-auto max-h-[400px]" />
      <p className="mt-4 text-gray-300 max-w-xl mx-auto">{description}</p>
    </motion.div>
  );
}
