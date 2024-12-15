
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  Home,
  Film,
  Music,
  Layers2,
  Newspaper,
  Settings,
} from "lucide-react";

const AnimatedMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const menuContainerVariants = {
    open: {
      transition: {
        staggerChildren: 0.1, // Stagger for opening
      },
    },
    closed: {
      transition: {
        staggerChildren: 0.1,
        staggerDirection: -1, // Reverse stagger for closing
      },
    },
  };

  // Variants for individual menu items
  const menuItemVariants = {
    hidden: {
      x: 0,
      y: 0,
      opacity: 0,
      scale: 0,
    },
    visible: (index: number) => ({
      x: Math.cos((index * (2 * Math.PI)) / 6) * 150,
      y: Math.sin((index * (2 * Math.PI)) / 6) * 150,
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    }),
    exit: {
      x: 0,
      y: 0,
      opacity: 0,
      scale: 0,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
  };

  const menuItems = [
    { name: "Home", icon: <Home size={30} />, rotation: 0 },
    { name: "Movies", icon: <Film size={30} />, rotation: 60 },
    { name: "Music", icon: <Music size={30} />, rotation: 120 },
    { name: "Sports", icon: <Layers2 size={30} />, rotation: 180 },
    { name: "News", icon: <Newspaper size={30} />, rotation: 240 },
    { name: "Settings", icon: <Settings size={30} />, rotation: 300 },
  ];

  return (
    <div className=" center w-32 h-fit bg-red-100">
      s
    </div>
  );
};

export default AnimatedMenu;
