document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signup");
  const errorPanel = document.getElementById("errorPanel");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // only needed if form has novalidate

  form.addEventListener("submit", function (e) {
    let errors = [];
    errorPanel.innerHTML = ""; // clear previous messages
    let firstInvalidEl = null;

    const productIdEl = document.getElementById("productId");
    const descEl = document.getElementById("description");
    const priceEl = document.getElementById("price");
    const userEl = document.getElementById("username");
    const emailEl = document.getElementById("email");

    const productId = productIdEl.value.trim();
    const description = descEl.value.trim();
    const price = priceEl.value.trim();
    const username = userEl.value.trim();
    const email = emailEl.value.trim();
    const statusChecked = [...form.querySelectorAll("input[name='status']:checked")];

    const mark = (el, msg) => {
      if (!firstInvalidEl) firstInvalidEl = el;
      errors.push(msg);
    };

    if (!/^\d{8}$/.test(productId)) {
      mark(productIdEl, "Product ID must be exactly 8 digits (e.g., 44455599).");
    }

    if (description.length < 20) {
      mark(descEl, "Product description must be at least 20 characters.");
    }

    if (!/^\d+$/.test(price) || Number(price) <= 0 || Number(price) >= 1000) {
      mark(priceEl, "Price must be a whole number greater than 0 and less than 1000.");
    }

    if (!/^[A-Za-z][A-Za-z0-9]{3,}$/.test(username)) {
      mark(userEl, "Supplier username must start with a letter and be at least 4 characters.");
    }

    if (statusChecked.length === 0) {
      mark(form.querySelector("fieldset"), "Select at least one Supplier Status option.");
    }

    // Only needed if your <form> has novalidate
    if (form.hasAttribute("novalidate") && !emailRegex.test(email)) {
      mark(emailEl, "Please enter a valid email address.");
    }

    if (errors.length > 0) {
      e.preventDefault();
      errorPanel.innerHTML = "<ul><li>" + errors.join("</li><li>") + "</li></ul>";
      if (firstInvalidEl && typeof firstInvalidEl.focus === "function") firstInvalidEl.focus();
    } else {
      alert("Form submitted successfully!");
    }
  });

  form.addEventListener("reset", () => {
    errorPanel.innerHTML = "";
  });
});
