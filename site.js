(() => {
  const cartKey = "malikGCartCount";
  const cartCount = () => Number.parseInt(localStorage.getItem(cartKey) || "0", 10);
  const renderCartCount = () => {
    const count = cartCount();
    document.querySelectorAll("[data-cart-count]").forEach((element) => {
      element.textContent = String(count);
    });
  };

  renderCartCount();
  document.querySelectorAll("[data-year]").forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });

  document.querySelectorAll("[data-add-to-cart]").forEach((button) => {
    button.addEventListener("click", () => {
      localStorage.setItem(cartKey, String(cartCount() + 1));
      renderCartCount();
      const originalLabel = button.textContent;
      button.textContent = "✓";
      button.setAttribute("aria-label", "Added to bag");
      window.setTimeout(() => {
        button.textContent = originalLabel;
        button.removeAttribute("aria-label");
      }, 1100);
    });
  });

  document.querySelectorAll("[data-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      document.querySelectorAll("[data-filter]").forEach((filterButton) => {
        const isActive = filterButton === button;
        filterButton.classList.toggle("active", isActive);
        filterButton.setAttribute("aria-pressed", String(isActive));
      });
      document.querySelectorAll("[data-product-category]").forEach((product) => {
        product.classList.toggle("d-none", filter !== "all" && product.dataset.productCategory !== filter);
      });
    });
  });

  document.querySelectorAll("[data-demo-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const feedback = form.querySelector("[data-form-feedback]");
      if (feedback) {
        feedback.textContent = form.closest(".modal")
          ? "This demo login is ready to connect to an account service."
          : form.closest(".contact-form")
            ? "Thanks. Your message is ready for our team."
            : "Thanks for joining us. Watch your inbox for the next Malik G note.";
      }
      if (form.closest(".contact-form")) form.reset();
    });
  });
})();
