import gsap from 'gsap';
import ScrollToPlugin from 'gsap/dist/ScrollToPlugin';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import Draggable from 'gsap/dist/Draggable';
import { useEffect } from 'react';
import Observer from 'gsap/dist/Observer';
import GSDevTools from 'gsap/dist/GSDevTools';
import SplitText from 'gsap/dist/SplitText';

const GSAPInitializer = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollToPlugin, ScrollTrigger, Draggable, Observer, GSDevTools, SplitText);
  }, []);

  return null;
};

export default GSAPInitializer;
