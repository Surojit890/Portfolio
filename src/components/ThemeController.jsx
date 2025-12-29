import { useEffect } from 'react';

const PALETTES = [
  {
    name: "Emerald",
    primary: "158 64% 52%",
    accent: "170 70% 40%", // Darker Teal for gradient
    ring: "158 64% 52%",
    bgBase: "hsl(160, 15%, 5%)",
    bgBaseLight: "hsl(158, 20%, 95%)",
    bgGrads: [
      "hsla(158, 40%, 10%, 1)",
      "hsla(170, 40%, 15%, 1)",
      "hsla(140, 40%, 10%, 1)",
      "hsla(160, 30%, 15%, 1)",
      "hsla(150, 30%, 12%, 1)"
    ],
    bgGradsLight: [
      "hsla(158, 40%, 90%, 1)",
      "hsla(170, 40%, 85%, 1)",
      "hsla(140, 40%, 90%, 1)",
      "hsla(160, 30%, 85%, 1)",
      "hsla(150, 30%, 88%, 1)"
    ]
  },
  {
    name: "Royal Blue",
    primary: "217 91% 60%", // Blue 500
    accent: "200 90% 50%", // Cyan for gradient
    ring: "217 91% 60%",
    bgBase: "hsl(222, 47%, 5%)",
    bgBaseLight: "hsl(217, 30%, 96%)",
    bgGrads: [
      "hsla(217, 40%, 10%, 1)",
      "hsla(230, 40%, 15%, 1)",
      "hsla(200, 40%, 10%, 1)",
      "hsla(220, 30%, 15%, 1)",
      "hsla(210, 30%, 12%, 1)"
    ],
    bgGradsLight: [
      "hsla(217, 40%, 90%, 1)",
      "hsla(230, 40%, 88%, 1)",
      "hsla(200, 40%, 90%, 1)",
      "hsla(220, 30%, 88%, 1)",
      "hsla(210, 30%, 92%, 1)"
    ]
  },
  {
    name: "Amethyst",
    primary: "270 50% 60%", // Purple 500
    accent: "290 60% 50%", // Magenta for gradient
    ring: "270 50% 60%",
    bgBase: "hsl(270, 15%, 5%)",
    bgBaseLight: "hsl(270, 20%, 96%)",
    bgGrads: [
      "hsla(270, 40%, 10%, 1)",
      "hsla(285, 40%, 15%, 1)",
      "hsla(255, 40%, 10%, 1)",
      "hsla(275, 30%, 15%, 1)",
      "hsla(265, 30%, 12%, 1)"
    ],
    bgGradsLight: [
      "hsla(270, 40%, 90%, 1)",
      "hsla(285, 40%, 88%, 1)",
      "hsla(255, 40%, 90%, 1)",
      "hsla(275, 30%, 88%, 1)",
      "hsla(265, 30%, 92%, 1)"
    ]
  },
  {
    name: "Crimson",
    primary: "340 70% 60%", // Pink/Red
    accent: "360 80% 60%", // Red for gradient
    ring: "340 70% 60%",
    bgBase: "hsl(340, 15%, 5%)",
    bgBaseLight: "hsl(340, 20%, 96%)",
    bgGrads: [
      "hsla(340, 40%, 10%, 1)",
      "hsla(355, 40%, 15%, 1)",
      "hsla(325, 40%, 10%, 1)",
      "hsla(345, 30%, 15%, 1)",
      "hsla(335, 30%, 12%, 1)"
    ],
    bgGradsLight: [
      "hsla(340, 40%, 90%, 1)",
      "hsla(355, 40%, 88%, 1)",
      "hsla(325, 40%, 90%, 1)",
      "hsla(345, 30%, 88%, 1)",
      "hsla(335, 30%, 92%, 1)"
    ]
  },
  {
    name: "Amber",
    primary: "45 93% 47%", // Yellow/Amber
    accent: "25 90% 50%", // Orange for gradient
    ring: "45 93% 47%",
    bgBase: "hsl(40, 15%, 5%)",
    bgBaseLight: "hsl(40, 20%, 96%)",
    bgGrads: [
      "hsla(45, 40%, 10%, 1)",
      "hsla(60, 40%, 15%, 1)",
      "hsla(30, 40%, 10%, 1)",
      "hsla(50, 30%, 15%, 1)",
      "hsla(40, 30%, 12%, 1)"
    ],
    bgGradsLight: [
      "hsla(45, 40%, 90%, 1)",
      "hsla(60, 40%, 88%, 1)",
      "hsla(30, 40%, 90%, 1)",
      "hsla(50, 30%, 88%, 1)",
      "hsla(40, 30%, 92%, 1)"
    ]
  }
];

const ThemeController = () => {
  useEffect(() => {
    // Select random palette, ensuring it's not the same as the last one
    let lastIndex = parseInt(localStorage.getItem('lastThemeIndex'));
    let randomIndex;

    do {
      randomIndex = Math.floor(Math.random() * PALETTES.length);
    } while (randomIndex === lastIndex && PALETTES.length > 1);

    // Store new index
    localStorage.setItem('lastThemeIndex', randomIndex.toString());

    const palette = PALETTES[randomIndex];
    
    // Apply CSS variables to root
    const root = document.documentElement;
    
    // Set colors
    root.style.setProperty('--primary', palette.primary);
    root.style.setProperty('--accent', palette.accent); // New accent color
    root.style.setProperty('--ring', palette.ring);
    
    // Set background variables for both modes
    root.style.setProperty('--palette-bg-base-dark', palette.bgBase);
    root.style.setProperty('--palette-bg-base-light', palette.bgBaseLight);
    
    // Set gradients for dark mode
    palette.bgGrads.forEach((grad, index) => {
      root.style.setProperty(`--palette-bg-grad-dark-${index + 1}`, grad);
    });

    // Set gradients for light mode
    palette.bgGradsLight.forEach((grad, index) => {
      root.style.setProperty(`--palette-bg-grad-light-${index + 1}`, grad);
    });

    console.log(`Theme applied: ${palette.name}`);
  }, []);

  return null;
};

export default ThemeController;
