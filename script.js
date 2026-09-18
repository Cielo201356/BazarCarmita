const cartCountElement = document.getElementById('cartCount');
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const navToggleButton = document.querySelector('.nav-toggle');
const mainNav = document.getElementById('mainNav');
const categoryButtons = document.querySelectorAll('.category-pill');

let cartCount = 0;

const updateCartCount = () => {
  if (cartCountElement) {
    cartCountElement.textContent = String(cartCount);
  }
};

if (navToggleButton && mainNav) {
  navToggleButton.addEventListener('click', () => {
    const isExpanded = navToggleButton.getAttribute('aria-expanded') === 'true';
    navToggleButton.setAttribute('aria-expanded', String(!isExpanded));
    mainNav.classList.toggle('is-open', !isExpanded);
  });
}

categoryButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const isActive = button.classList.contains('active');

    categoryButtons.forEach((item) => {
      item.classList.toggle('active', item === button);
      item.setAttribute('aria-pressed', String(item === button));
    });

    if (isActive) {
      button.setAttribute('aria-pressed', 'true');
    }
  });
});

addToCartButtons.forEach((button) => {
  button.addEventListener('click', () => {
    cartCount += 1;
    updateCartCount();

    const originalText = button.textContent;
    button.textContent = 'Añadido';
    button.disabled = true;

    window.setTimeout(() => {
      button.textContent = originalText;
      button.disabled = false;
    }, 900);
  });
});

updateCartCount();
