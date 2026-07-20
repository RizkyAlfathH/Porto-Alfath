"use client";

import { motion } from "framer-motion";
import type { IconType } from "react-icons";

type SkillTileProps = {
  name: string;
  icon: IconType;
  color: string;
};

export default function SkillTile({ name, icon: Icon, color }: SkillTileProps) {
  return (
    <motion.div
      whileHover={{ y: -3, borderColor: color }}
      transition={{ duration: 0.2 }}
      className="flex flex-col items-center gap-2.5 rounded-xl border border-line bg-bg/40 px-3 py-4 text-center"
    >
      <span
        className="flex h-9 w-9 items-center justify-center rounded-lg transition-shadow duration-300"
        style={{ backgroundColor: `${color}1A` }}
      >
        <Icon className="h-[18px] w-[18px]" style={{ color }} />
      </span>
      <span className="font-mono text-xs text-muted">{name}</span>
    </motion.div>
  );
}