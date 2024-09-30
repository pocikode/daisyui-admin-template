const initActivateMenu = () => {
  const path = window.location.pathname;
  console.log(path)

  const menuItems = document.querySelectorAll('.drawer-side .menu li a');
  menuItems.forEach(item => {
    item.classList.remove('text-primary');

    if (item.getAttribute('href') === path) {
      item.classList.add('text-primary');
    }
  });
};

document.addEventListener('DOMContentLoaded', () => {
  initActivateMenu();
})