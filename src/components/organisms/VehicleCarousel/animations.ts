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
  },

  visible: (index: number) => ({
    opacity: 1,
    y: 0,

    transition: {
      delay: index * 0.06,
      duration: 0.5,
      ease: 'easeOut',
    },
  }),
};
