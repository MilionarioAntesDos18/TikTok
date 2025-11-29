// ===== POP-UP DE ATENCAO (FOMO) =====
function initializeExitPopup() {
    const exitPopup = document.getElementById('exitPopup');
    const closeExitPopupBtn = document.getElementById('closeExitPopup');
    const acceptDiscountBtn = document.getElementById('acceptDiscountBtn');
    const rejectDiscountBtn = document.getElementById('rejectDiscountBtn');
    const mainCTABtn = document.getElementById('mainCTABtn');
    const videoSection = document.getElementById('videoSection');

    let exitPopupShown = false;

    // Detectar intencao de saida por movimento do mouse (Desktop)
    document.addEventListener('mouseleave', (e) => {
        if (e.clientY <= 0 && !exitPopupShown) {
            showExitPopup();
        }
    });

    // Detectar tentativa de voltar (back button) - Mobile e Desktop
    window.addEventListener('popstate', (e) => {
        if (!exitPopupShown) {
            e.preventDefault();
            showExitPopup();
            // Manter o historico
            window.history.pushState(null, null, window.location.href);
        }
    });

    // Preparar para detectar back button
    window.history.pushState(null, null, window.location.href);

    // Detectar tentativa de fechar a pagina (Alt+F4, Cmd+W)
    document.addEventListener('keydown', (e) => {
        if ((e.altKey && e.key === 'F4') || (e.metaKey && e.key === 'w')) {
            e.preventDefault();
            if (!exitPopupShown) {
                showExitPopup();
            }
        }
    });

    function showExitPopup() {
        exitPopup.classList.remove('hidden');
        exitPopupShown = true;
    }

    function hideExitPopup() {
        exitPopup.classList.add('hidden');
    }

    // Botao fechar
    closeExitPopupBtn.addEventListener('click', hideExitPopup);

    // Botao aceitar (voltar ao video)
    acceptDiscountBtn.addEventListener('click', () => {
        hideExitPopup();
        videoSection.scrollIntoView({ behavior: 'smooth' });
    });

    // Botao rejeitar
    rejectDiscountBtn.addEventListener('click', hideExitPopup);

    // Botao CTA principal
    mainCTABtn.addEventListener('click', () => {
        videoSection.scrollIntoView({ behavior: 'smooth' });
    });

    // Fechar pop-up ao clicar fora
    exitPopup.addEventListener('click', (e) => {
        if (e.target === exitPopup) {
            hideExitPopup();
        }
    });
}

// ===== INICIALIZAR TUDO =====
document.addEventListener('DOMContentLoaded', () => {
    initializeExitPopup();
});

// ===== EFEITOS ADICIONAIS =====
// Adicionar efeito de hover nos cards de depoimentos
document.addEventListener('DOMContentLoaded', () => {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    testimonialCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
});

// ===== ANIMACAO DE SCROLL =====
function observeElements() {
    const options = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, options);

    const elementsToObserve = document.querySelectorAll(
        '.benefits-list, .testimonials-grid, .faq-list'
    );

    elementsToObserve.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

document.addEventListener('DOMContentLoaded', observeElements);

// ===== ANALYTICS SIMULADO =====
function trackEvent(eventName, eventData) {
    console.log(`Evento: ${eventName}`, eventData);
}

// Rastrear cliques nos botoes CTA
document.addEventListener('DOMContentLoaded', () => {
    const mainCTABtn = document.getElementById('mainCTABtn');
    const acceptDiscountBtn = document.getElementById('acceptDiscountBtn');

    if (mainCTABtn) {
        mainCTABtn.addEventListener('click', () => {
            trackEvent('cta_click', { button: 'main_cta', product: 'tiktok_oculto' });
        });
    }

    if (acceptDiscountBtn) {
        acceptDiscountBtn.addEventListener('click', () => {
            trackEvent('exit_popup_attention', { action: 'return_to_video', product: 'tiktok_oculto' });
        });
    }
});

// ===== SOCIAL PROOF NOTIFICATION =====

// Lista de nomes moçambicanos (masculinos e femininos)
const firstNames = [
    "Alberto", "Américo", "António", "Armando", "Bernardo", "Celso", "Dinis", "Edson", "Filipe", "Gilberto",
    "Hélder", "Inácio", "João", "José", "Manuel", "Mateus", "Nélson", "Osvaldo", "Paulo", "Ricardo",
    "Simão", "Tomás", "Valter", "Xavier", "Zacarias", "Alice", "Amélia", "Ana", "Beatriz", "Carla",
    "Celina", "Dina", "Elisa", "Fátima", "Glória", "Helena", "Ilda", "Joana", "Lúcia", "Maria",
    "Natália", "Olga", "Patrícia", "Rosa", "Sara", "Teresa", "Vera", "Ximena", "Yara", "Zélia"
];

// Lista de apelidos moçambicanos comuns
const lastNames = [
    "Manhique", "Chissano", "Guebuza", "Mabote", "Nhambiu", "Mondlane", "Machava", "Tembe", "Macamo", "Mondlane",
    "Matusse", "Mabunda", "Cossa", "Sitoe", "Mabjaia", "Zandamela", "Muianga", "Cumbe", "Bila", "Nhampossa",
    "Maluleque", "Nhantumbo", "Mabote", "Mabasso", "Chivambo", "Mabote", "Mabjaia", "Zandamela", "Muianga", "Cumbe"
];

function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateNotificationText() {
    const firstName = getRandomElement(firstNames);
    const lastName = getRandomElement(lastNames);
    const fullName = `${firstName} ${lastName.charAt(0)}.`; // Nome e inicial do apelido
    const time = Math.floor(Math.random() * 30) + 1; // Entre 1 e 30 minutos

    return {
        name: fullName,
        time: time
    };
}

function showSocialProofNotification() {
    const notificationElement = document.getElementById('socialProofNotification');
    const nameElement = document.getElementById('notificationName');
    const timeElement = document.getElementById('notificationTime');

    const data = generateNotificationText();
    
    nameElement.textContent = data.name;
    timeElement.textContent = data.time;

    // Mostrar a notificação
    notificationElement.classList.add('show');

    // Ocultar após 5 segundos
    setTimeout(() => {
        notificationElement.classList.remove('show');
    }, 5000);
}

function startSocialProofLoop() {
    // Exibir a primeira notificação após um pequeno atraso (ex: 5 segundos)
    setTimeout(showSocialProofNotification, 5000);

    // Agendar as notificações subsequentes a cada 20 a 40 segundos (40s ou menos)
    function scheduleNextNotification() {
        // Intervalo aleatório entre 20000ms (20s) e 40000ms (40s)
        const randomInterval = Math.floor(Math.random() * (40000 - 20000 + 1)) + 20000;
        
        setTimeout(() => {
            showSocialProofNotification();
            scheduleNextNotification(); // Agenda a próxima notificação após a exibição
        }, randomInterval);
    }
    
    scheduleNextNotification();
}

// Adicionar a inicialização ao DOMContentLoaded
document.addEventListener('DOMContentLoaded', startSocialProofLoop);
