/**
 * Animated Skill & Progress Bars
 * Pure Vanilla JavaScript (ES6+)
 * 
 * Features:
 * - IntersectionObserver viewport detection (runs once per page visit)
 * - Decoupled data-* configuration attributes
 * - Synchronized requestAnimationFrame numeric counter & CSS width animation
 * - WCAG 2.1 AA accessibility & prefers-reduced-motion detection
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // DOM Elements
  const skillItems = document.querySelectorAll('.skill-item');
  const replayButton = document.getElementById('replay-btn');

  // Animation configuration
  const ANIMATION_DURATION = 1400; // Duration in milliseconds matching CSS transition
  const OBSERVER_THRESHOLD = 0.2;  // Trigger when 20% of element is in viewport

  /**
   * Cubic easing out function for smooth numeric count-up
   * Matches CSS transition curve cubic-bezier(0.22, 1, 0.36, 1)
   * @param {number} t - normalized time between 0 and 1
   * @returns {number} eased progress value
   */
  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

  /**
   * Check user preference for reduced motion
   * @returns {boolean}
   */
  const prefersReducedMotion = () => {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  };

  /**
   * Animates a single skill item from 0% to its target percentage
   * @param {HTMLElement} item - The skill-item container element
   */
  const animateSkillItem = (item) => {
    const fill = item.querySelector('.progress-fill');
    const percentLabel = item.querySelector('.skill-percentage');
    const track = item.querySelector('.progress-track');

    if (!fill || !percentLabel) return;

    // Retrieve target percentage from data-* attributes (fallback to 0)
    const target = parseInt(item.dataset.percentage, 10) || 
                   parseInt(fill.dataset.target, 10) || 
                   0;

    // Accessibility attribute updates
    if (track) {
      track.setAttribute('aria-valuenow', target.toString());
    }

    // Handle Reduced Motion Preference
    if (prefersReducedMotion()) {
      fill.style.width = `${target}%`;
      percentLabel.textContent = `${target}%`;
      item.classList.add('is-animated');
      return;
    }

    // Trigger smooth CSS width expansion
    fill.style.width = `${target}%`;

    // Synchronized JavaScript numeric counter using requestAnimationFrame
    let startTimestamp = null;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progressRatio = Math.min(elapsed / ANIMATION_DURATION, 1);
      const easedProgress = easeOutCubic(progressRatio);
      const currentValue = Math.round(easedProgress * target);

      percentLabel.textContent = `${currentValue}%`;

      if (progressRatio < 1) {
        window.requestAnimationFrame(step);
      } else {
        percentLabel.textContent = `${target}%`;
        item.classList.add('is-animated');
      }
    };

    window.requestAnimationFrame(step);

    // Guaranteed fallback timer to ensure completion even if rAF is background-throttled
    setTimeout(() => {
      percentLabel.textContent = `${target}%`;
      item.classList.add('is-animated');
    }, ANIMATION_DURATION + 50);
  };

  /**
   * Reset a skill item back to 0%
   * @param {HTMLElement} item - The skill-item container element
   */
  const resetSkillItem = (item) => {
    const fill = item.querySelector('.progress-fill');
    const percentLabel = item.querySelector('.skill-percentage');
    const track = item.querySelector('.progress-track');

    if (!fill || !percentLabel) return;

    item.classList.remove('is-animated');
    fill.style.width = '0%';
    percentLabel.textContent = '0%';

    if (track) {
      track.setAttribute('aria-valuenow', '0');
    }
  };

  /**
   * Set up IntersectionObserver to trigger animations only once per visit
   */
  const setupIntersectionObserver = () => {
    if (!('IntersectionObserver' in window)) {
      // Fallback for older browsers: animate immediately
      skillItems.forEach(animateSkillItem);
      return;
    }

    const observerOptions = {
      root: null, // viewport
      rootMargin: '0px 0px -20px 0px',
      threshold: OBSERVER_THRESHOLD
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        // Trigger when intersecting and hasn't yet animated
        if (entry.isIntersecting && !entry.target.classList.contains('is-animated')) {
          animateSkillItem(entry.target);
          // Unobserve ensures the animation runs strictly ONCE per page visit
          obs.unobserve(entry.target);
        }
      });
    }, observerOptions);

    skillItems.forEach((item) => {
      observer.observe(item);
    });
  };

  /**
   * Set up Replay button for testing and demonstration
   */
  const setupReplayControl = () => {
    if (!replayButton) return;

    replayButton.addEventListener('click', () => {
      // Temporarily disable button to prevent overlapping animations
      replayButton.disabled = true;
      replayButton.style.opacity = '0.6';

      // Reset all bars to 0
      skillItems.forEach(resetSkillItem);

      // Brief delay to allow DOM repaint before re-triggering animation
      setTimeout(() => {
        skillItems.forEach(animateSkillItem);

        setTimeout(() => {
          replayButton.disabled = false;
          replayButton.style.opacity = '1';
        }, ANIMATION_DURATION + 100);
      }, 50);
    });
  };

  // Initialize
  setupIntersectionObserver();
  setupReplayControl();
});
