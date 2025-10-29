/* ===============================
   PHONE.JS
   Interactions for the mobile-only version of the portfolio.
   =============================== */

// Wait for the DOM to be fully loaded before running the script
document.addEventListener("DOMContentLoaded", () => {
  
  console.log("phone.js loaded successfully.");

  // Get all the links in the .mobile-links container
  const mobileLinks = document.querySelectorAll(".mobile-links a");

  // Add touch event listeners to each link for a native-like tap effect
  mobileLinks.forEach((link) => {
    
    // When the user's finger presses down
    link.addEventListener(
      "touchstart",
      () => {
        link.classList.add("active");
      },
      { passive: true } // Use passive for better scroll performance
    );

    // When the user's finger lifts up
    link.addEventListener(
      "touchend",
      () => {
        link.classList.remove("active");
      },
      { passive: true }
    );

    // Also remove the class if the touch is cancelled (e.g., scrolls off)
    link.addEventListener(
      "touchcancel",
      () => {
        link.classList.remove("active");
      },
      { passive: true }
    );
  });

  // You can add more mobile-specific JavaScript here.
  // For example, a "scroll to top" button, a simple text animation, etc.

});