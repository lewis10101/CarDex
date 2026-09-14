/**
 * Reliably resets scroll position to the top of the viewport and any internal scroll containers.
 * Handles window, documentElement, document.body, <main>, and custom app viewports.
 * Uses multi-frame execution to prevent browser scrollRestoration or React DOM re-layout
 * from leaving the scroll offset midway down the page.
 */
export function resetScrollToTop(smooth = false): void {
  if (typeof window === 'undefined') return;

  // Prevent browser history scroll restoration from fighting programmatic resets
  if ('scrollRestoration' in window.history) {
    try {
      window.history.scrollRestoration = 'manual';
    } catch {
      // ignore
    }
  }

  const performReset = () => {
    // 1. Reset standard window & html/body scroll
    try {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: smooth ? 'smooth' : 'instant',
      });
    } catch {
      window.scrollTo(0, 0);
    }

    if (document.documentElement) {
      document.documentElement.scrollTop = 0;
      document.documentElement.scrollLeft = 0;
    }
    if (document.body) {
      document.body.scrollTop = 0;
      document.body.scrollLeft = 0;
    }

    // 2. Reset dedicated app scroll containers
    const appViewport = document.getElementById('app-viewport-container');
    if (appViewport) {
      appViewport.scrollTop = 0;
      appViewport.scrollLeft = 0;
    }

    const mainContainer =
      document.getElementById('main-scroll-container') || document.querySelector('main');
    if (mainContainer) {
      mainContainer.scrollTop = 0;
      mainContainer.scrollLeft = 0;
    }

    // 3. Reset any custom tagged scroll containers
    const allScrollables = document.querySelectorAll('[data-scroll-container="true"]');
    allScrollables.forEach((el) => {
      el.scrollTop = 0;
      el.scrollLeft = 0;
    });
  };

  // Immediate synchronous reset
  performReset();

  // Next animation frame (after React commit and browser paint)
  if (typeof requestAnimationFrame !== 'undefined') {
    requestAnimationFrame(() => {
      performReset();
    });
  }

  // Double-check on macro-task queues to catch async image/font layout shifts
  setTimeout(() => {
    performReset();
  }, 25);

  setTimeout(() => {
    performReset();
  }, 100);
}
