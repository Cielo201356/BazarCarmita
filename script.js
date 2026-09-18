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
  const setMenuState = (isOpen) => {
    navToggleButton.setAttribute('aria-expanded', String(isOpen));
    mainNav.classList.toggle('is-open', isOpen);
    mainNav.hidden = !isOpen;
  };

  setMenuState(window.innerWidth > 980);

  navToggleButton.addEventListener('click', () => {
    const isExpanded = navToggleButton.getAttribute('aria-expanded') === 'true';
    setMenuState(!isExpanded);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 980) {
      mainNav.hidden = false;
      mainNav.classList.remove('is-open');
      navToggleButton.setAttribute('aria-expanded', 'false');
    } else if (!mainNav.hidden && navToggleButton.getAttribute('aria-expanded') === 'true') {
      mainNav.hidden = false;
    }
  });
}

categoryButtons.forEach((button) => {
  button.addEventListener('click', () => {
    categoryButtons.forEach((item) => {
      const isSelected = item === button;
      item.classList.toggle('active', isSelected);
      item.setAttribute('aria-pressed', String(isSelected));
    });
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
