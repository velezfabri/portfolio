// Seconds for GSAP, pixels for distances. CSS feedback lives in journey.css.
export const motionSettings = {
  name: { duration: 0.8, stagger: 0.07, distance: 28, surnameDelay: 0.22 },
  welcome: { duration: 0.34, distance: -18 },
  reveal: { duration: 0.7, distance: 32, start: "top 88%" },
  portrait: { distance: -18, scrub: 0.5 },
  story: {
    scrub: 0.25,
    desktopQuery: "(min-width: 1024px) and (min-height: 700px)",
    start: "top 35%",
    end: "bottom 65%",
  },
} as const;
