// 1. Эффект навигации при скролле
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// 2. Плавный скролл по ссылкам
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// 3. Анимация "выплывания" элементов при скролле (Intersection Observer)
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
});

revealElements.forEach(el => revealObserver.observe(el));

// Защита от "схлопывания": принудительно показываем элементы, которые уже на экране
window.addEventListener('load', () => {
    revealElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            el.classList.add('active');
        }
    });
});

// 4. Логика галереи (смена главного фото) - УНИВЕРСАЛЬНАЯ
window.changeImage = function(element) {
    // Получаем путь к картинке из миниатюры
    const newSrc = element.src;
    
    // Находим главную картинку в ТОМ ЖЕ блоке, где находится миниатюра
    const mainImage = element.closest('.single-room-layout').querySelector('.main-room-image');
    
    // Меняем картинку с небольшой анимацией прозрачности
    if (mainImage) {
        mainImage.style.opacity = '0';
        setTimeout(() => {
            mainImage.src = newSrc;
            mainImage.style.opacity = '1';
        }, 200);
    }

    // Убираем класс active ТОЛЬКО у миниатюр в этой же галерее
    const thumbnails = element.closest('.thumbnail-grid').querySelectorAll('.thumbnail');
    thumbnails.forEach(thumb => thumb.classList.remove('active'));
    
    // Добавляем класс active текущей
    element.classList.add('active');
};