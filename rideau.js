window.addEventListener('load', () => {
    const left = document.querySelector('.curtain-left');
    const right = document.querySelector('.curtain-right');
    const zipper = document.querySelector('.zipper');
    const curtain = document.querySelector('.curtain');
    const content = document.querySelector('.page-content');
  
    // Lance l'ouverture après un court délai
    setTimeout(() => {
      left.style.transform = 'translateX(-100%)';
      right.style.transform = 'translateX(100%)';
    }, 500);
  
    // Retire le rideau et montre le contenu après l'animation
    setTimeout(() => {
      curtain.style.display = 'none';
      document.body.style.overflow = 'auto'; // permet de scroller à nouveau
      content.style.opacity = 1;
    }, 2500); // attend 2.5 secondes (temps de l'animation)
  });