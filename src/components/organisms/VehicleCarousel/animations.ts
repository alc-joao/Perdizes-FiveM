export const vehicleCarouselAnimation = {
  hidden: {
    opacity: 0,
    y: 40,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};

export const vehicleCardAnimation = {
  hidden: {
    opacity: 0,
    y: 24,
    scale: 0.96,
  },

  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,

    transition: {
      delay: index * 0.06,
      duration: 0.45,
      ease: 'easeOut',
    },
  }),
};
