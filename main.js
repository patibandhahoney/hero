/**
 * SCROLL-DRIVEN HERO SECTION ANIMATION
 * ==============================================================================
 * Clean, concise, and understandable JavaScript utilizing GSAP 3 & ScrollTrigger.
 * Features:
 *  1. Smooth Car movement along the Road on Scroll
 *  2. Expanding Green Energy Trail
 *  3. Dynamic "WELCOME ITZFIZZ" Letter-by-Letter Reveal as Car passes
 *  4. Impact Metric Boxes appearing One by One with Number Count-up
 *  5. Optional Web Audio API Sound Synthesizer
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Register GSAP Plugins
  gsap.registerPlugin(ScrollTrigger);

  // 2. DOM Elements
  const heroSection = document.querySelector('.hero-scroll-container');
  const pinnedViewport = document.getElementById('pinnedViewport');
  const carVehicle = document.getElementById('carVehicle');
  const carImage = document.getElementById('carImage');
  const energyTrail = document.getElementById('energyTrail');
  const letters = document.querySelectorAll('.value-letter');
  const statCards = document.querySelectorAll('.stat-card');
  const audioToggleBtn = document.getElementById('audioToggleBtn');
  const audioIcon = document.getElementById('audioIcon');

  // Track state
  let isAudioEnabled = false;
  let audioCtx = null;
  let engineOsc = null;
  const animatedCards = new Set();

  // NUMBER COUNTER ANIMATION HELPER
  function animateCardCounter(card) {
    if (animatedCards.has(card)) return;
    animatedCards.add(card);

    const counter = card.querySelector('.counter');
    if (!counter) return;

    const target = parseInt(counter.getAttribute('data-target'), 10) || 0;
    const obj = { val: 0 };
    gsap.to(obj, {
      val: target,
      duration: 1.2,
      ease: 'power2.out',
      onUpdate: () => {
        counter.textContent = Math.floor(obj.val);
      }
    });
  }

  // SCROLL-DRIVEN ANIMATION SETUP
  let scrollTriggerInstance = null;

  function setupScrollAnimation() {
    if (scrollTriggerInstance) scrollTriggerInstance.kill();

    const roadWidth = window.innerWidth;
    const carWidth = carVehicle.offsetWidth || 260;
    const endX = roadWidth - carWidth;

    // Cache Letter bounding coordinates dynamically
    const getLetterData = () => {
      return Array.from(letters).map((letter) => ({
        element: letter,
        left: letter.getBoundingClientRect().left
      }));
    };

    let letterData = getLetterData();
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => { letterData = getLetterData(); });
    }

    // Main GSAP ScrollTrigger
    scrollTriggerInstance = ScrollTrigger.create({
      trigger: heroSection,
      start: 'top top',
      end: 'bottom bottom',
      pin: pinnedViewport,
      scrub: 0.8, // Smooth scrub interpolation
      onRefresh: () => { letterData = getLetterData(); },
      onUpdate: (self) => {
        const progress = self.progress; // 0.0 to 1.0
        const currentCarX = progress * endX;

        // 1. Move Hypercar smoothly
        gsap.set(carVehicle, { x: currentCarX });

        // 2. Expand Green Energy Trail Width
        const trailWidth = currentCarX + carWidth * 0.35;
        gsap.set(energyTrail, { width: Math.max(0, trailWidth) });

        // 3. Reveal Letters One by One as Car passes over them
        const carFrontX = carVehicle.getBoundingClientRect().right - carWidth * 0.3;

        letterData.forEach((data) => {
          if (carFrontX >= data.left) {
            data.element.classList.add('revealed');
          } else {
            data.element.classList.remove('revealed');
          }
        });

        // 4. Reveal Metric Boxes One by One at progressive thresholds
        statCards.forEach((card) => {
          const threshold = parseFloat(card.getAttribute('data-threshold')) || 0.5;
          if (progress >= threshold) {
            if (!card.classList.contains('visible')) {
              card.classList.add('visible');
              animateCardCounter(card);
            }
          } else {
            card.classList.remove('visible');
            animatedCards.delete(card); // Allow re-animating on scroll down
          }
        });

        // 5. Update Audio Pitch on scroll
        if (isAudioEnabled && audioCtx && engineOsc) {
          const targetFreq = 70 + progress * 160 + Math.min(180, Math.abs(self.getVelocity()) * 0.05);
          engineOsc.frequency.setTargetAtTime(targetFreq, audioCtx.currentTime, 0.05);
        }
      }
    });
  }

  // WEB AUDIO SYNTHESIZER (Optional Sound Toggle)
  audioToggleBtn.addEventListener('click', () => {
    if (!isAudioEnabled) {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioCtx = new AudioContext();

        const gain = audioCtx.createGain();
        gain.gain.setValueAtTime(0.06, audioCtx.currentTime);

        const filter = audioCtx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(450, audioCtx.currentTime);

        engineOsc = audioCtx.createOscillator();
        engineOsc.type = 'sawtooth';
        engineOsc.frequency.setValueAtTime(70, audioCtx.currentTime);

        engineOsc.connect(filter);
        filter.connect(gain);
        gain.connect(audioCtx.destination);

        engineOsc.start();
        isAudioEnabled = true;
        audioToggleBtn.classList.add('active');
        audioIcon.textContent = '🔊';
      } catch (err) {
        console.warn('Audio blocked or not supported:', err);
      }
    } else {
      if (audioCtx) {
        audioCtx.close();
        audioCtx = null;
      }
      isAudioEnabled = false;
      audioToggleBtn.classList.remove('active');
      audioIcon.textContent = '🔇';
    }
  });

  // WINDOW RESIZE HANDLER & INITIALIZATION
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      setupScrollAnimation();
      ScrollTrigger.refresh();
    }, 120);
  });

  // Initialize
  setupScrollAnimation();
});
