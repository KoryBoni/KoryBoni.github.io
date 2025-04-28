$(document).ready(function() {

    const config = {
        initialLanguage: 'es',
        priceRange: {
            min: 0,
            max: 100000,
            step: 1000,
            initialValue: 50000
        },
        toastDuration: 3000
    };

    
    const translations = {
        es: {
            // Header
            'pageTitle': 'DKategoría',
            'heroSubtitle': 'Descubre la belleza que perdura en el tiempo',
            
            // Secciones
            'productosDestacados': 'Productos Destacados',
            'nuestraEsencia': 'Nuestra Esencia',
            'tituloCatalogo': 'Catálogo de Flores Eternas',
            'contacto': 'Contacta con DKategoría',
            
            // Filtros
            'buscarPlaceholder': 'Buscar flores...',
            'tipoFlor': 'Tipo de flor',
            'ocasion': 'Ocasión',
            'rangoPrecios': 'Rango de precios',
            'todos': 'Todos',
            'todas': 'Todas',
            
            // Productos
            'añadirCarrito': 'Añadir',
            
            // Contacto
            'informacionContacto': 'Información de Contacto',
            'nombre': 'Nombre completo*',
            'email': 'Correo electrónico*',
            'motivo': 'Motivo de contacto*',
            'mensaje': 'Mensaje*',
            'enviarMensaje': 'Enviar mensaje',
            'ubicacion': 'Ubicación:',
            'telefono': 'Teléfono:',
            'horario': 'Horario de atención:',
            'privacidad': 'Acepto la política de privacidad y el tratamiento de mis datos*',
            
            // Footer
            'redesSociales': 'Síguenos en redes sociales',
            'enlacesRapidos': 'Enlaces rápidos',
            'inicio': 'Inicio',
            'catalogo': 'Catálogo',
            
            // Mensajes
            'languageChanged': 'Idioma cambiado a Español',
            'addedToFavorites': 'Añadido a favoritos',
            'removedFromFavorites': 'Eliminado de favoritos',
            'addedToCart': 'añadido al carrito',
            'formSuccess': 'Mensaje enviado con éxito. Nos pondremos en contacto pronto.',
            'formError': 'Por favor complete todos los campos requeridos',
            
            // Favoritos y Carrito
            'favoritesTitle': 'Mis Favoritos',
            'cartTitle': 'Mi Carrito',
            'emptyFavorites': 'No tienes productos en favoritos',
            'emptyCart': 'Tu carrito está vacío',
            'totalLabel': 'Total:',
            'addAllToCart': 'Añadir todo al carrito',
            'proceedCheckout': 'Proceder al pago',
            'viewCatalog': 'Ver catálogo'
        },
        en: {
            // Header
            'pageTitle': 'DKategoría',
            'heroSubtitle': 'Discover beauty that lasts over time',
            
            // Secciones
            'productosDestacados': 'Featured Products',
            'nuestraEsencia': 'Our Essence',
            'tituloCatalogo': 'Eternal Flowers Catalog',
            'contacto': 'Contact DKategoría',
            
            // Filtros
            'buscarPlaceholder': 'Search flowers...',
            'tipoFlor': 'Flower type',
            'ocasion': 'Occasion',
            'rangoPrecios': 'Price range',
            'todos': 'All',
            'todas': 'All',
            
            // Productos
            'añadirCarrito': 'Add to cart',
            
            // Contacto
            'informacionContacto': 'Contact Information',
            'nombre': 'Full name*',
            'email': 'Email*',
            'motivo': 'Contact reason*',
            'mensaje': 'Message*',
            'enviarMensaje': 'Send message',
            'ubicacion': 'Location:',
            'telefono': 'Phone:',
            'horario': 'Business hours:',
            'privacidad': 'I accept the privacy policy and the processing of my data*',
            
            // Footer
            'redesSociales': 'Follow us on social media',
            'enlacesRapidos': 'Quick links',
            'inicio': 'Home',
            'catalogo': 'Catalog',
            
            // Mensajes
            'languageChanged': 'Language changed to English',
            'addedToFavorites': 'Added to favorites',
            'removedFromFavorites': 'Removed from favorites',
            'addedToCart': 'added to cart',
            'formSuccess': 'Message sent successfully. We will contact you soon.',
            'formError': 'Please fill all required fields',
            
            // Favoritos y Carrito
            'favoritesTitle': 'My Favorites',
            'cartTitle': 'My Cart',
            'emptyFavorites': 'You have no favorite products',
            'emptyCart': 'Your cart is empty',
            'totalLabel': 'Total:',
            'addAllToCart': 'Add all to cart',
            'proceedCheckout': 'Proceed to checkout',
            'viewCatalog': 'View catalog'
        }
    };


    const state = {
        currentLanguage: config.initialLanguage,
        favorites: [],
        cart: []
    };


    function initComponents() {
      
        $('.sidenav').sidenav({
            edge: 'left',
            draggable: true
        });
        
        
        $('#price-range')
            .attr({
                'min': config.priceRange.min,
                'max': config.priceRange.max,
                'step': config.priceRange.step,
                'value': config.priceRange.initialValue
            })
            .trigger('input');
    }

    
    function initLanguage() {
       
        const savedLanguage = localStorage.getItem('preferredLanguage');
        if (savedLanguage && translations[savedLanguage]) {
            state.currentLanguage = savedLanguage;
            $('.language-btn').text(state.currentLanguage === 'es' ? 'ES/EN' : 'EN/ES');
        }
        
        updatePageLanguage();
    }

    function changeLanguage() {
        state.currentLanguage = state.currentLanguage === 'es' ? 'en' : 'es';
        updatePageLanguage();
        
        
        $('.language-btn').text(state.currentLanguage === 'es' ? 'ES/EN' : 'EN/ES');
        localStorage.setItem('preferredLanguage', state.currentLanguage);
        
        showToast(translations[state.currentLanguage].languageChanged);
    }

    function updatePageLanguage() {
        
        $('[data-translate]').each(function() {
            const key = $(this).data('translate');
            if (translations[state.currentLanguage][key]) {
                if ($(this).is('input, select, textarea') && $(this).attr('type') !== 'button') {
                    $(this).attr('placeholder', translations[state.currentLanguage][key]);
                } else {
                    $(this).text(translations[state.currentLanguage][key]);
                }
            }
        });
        
        updateSelectOptions();
        updateComplexElements();
    }

    function updateSelectOptions() {
        $('#flower-type option, #occasion option').each(function() {
            const key = $(this).data('translate');
            const defaultValue = $(this).parent().attr('id') === 'flower-type' ? 'todos' : 'todas';
            
            if (key && translations[state.currentLanguage][key]) {
                $(this).text(translations[state.currentLanguage][key]);
            } else if ($(this).val() === '') {
                $(this).text(translations[state.currentLanguage][defaultValue]);
            }
        });
    }

    function updateComplexElements() {
        $('.add-to-cart').each(function() {
            $(this).html(`<i class="fas fa-cart-plus"></i> ${translations[state.currentLanguage].añadirCarrito}`);
        });
    }

    
    function initFilters() {
        $('#catalogSearchInput, #flower-type, #occasion, #price-range').on('change keyup', debounce(filterProducts, 300));
        $('#price-range').on('input', updatePriceRangeDisplay);
        filterProducts();
    }

    function updatePriceRangeDisplay() {
        $('#price-value').text(`$0 - $${parseInt($('#price-range').val()).toLocaleString()}`);
    }

    function filterProducts() {
        const searchTerm = $('#catalogSearchInput').val().toLowerCase();
        const flowerType = $('#flower-type').val();
        const occasion = $('#occasion').val();
        const maxPrice = parseInt($('#price-range').val());
        
        $('.product-card').each(function() {
            const $card = $(this);
            const title = $card.find('.product-title').text().toLowerCase();
            const price = parseInt($card.find('.product-price').text().replace(/\D/g, ''));
            const cardFlowerType = $card.data('flower-type');
            const cardOccasion = $card.data('occasion');
            
            const matchesSearch = !searchTerm || title.includes(searchTerm);
            const matchesFlowerType = !flowerType || cardFlowerType === flowerType;
            const matchesOccasion = !occasion || cardOccasion === occasion;
            const matchesPrice = price <= maxPrice;
            
            $card.toggleClass('hidden', !(matchesSearch && matchesFlowerType && matchesOccasion && matchesPrice));
        });
    }

    
    function debounce(func, wait) {
        let timeout;
        return function() {
            const context = this, args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), wait);
        };
    }

    function showToast(message, type = 'success') {
        const toast = $('#toastNotification');
        toast.text(message)
            .removeClass('success error')
            .addClass(type)
            .css({ 'opacity': '1', 'visibility': 'visible' });
        
        setTimeout(() => {
            toast.css({ 'opacity': '0', 'visibility': 'hidden' });
        }, config.toastDuration);
    }

    
    function openPanel(panel) {
        panel.addClass('open');
        $('#overlay').addClass('active');
        $('body').css('overflow', 'hidden');
    }

    function closeAllPanels() {
        $('#favoritesPanel, #cartPanel').removeClass('open');
        $('#overlay').removeClass('active');
        $('body').css('overflow', '');
    }

    function addToFavorites(product) {
        if (!state.favorites.some(item => item.id === product.id)) {
            state.favorites.push(product);
            updateFavoritesCount();
            renderFavorites();
            showToast(translations[state.currentLanguage].addedToFavorites, 'success');
        }
    }

    function removeFromFavorites(productId) {
        state.favorites = state.favorites.filter(item => item.id !== productId);
        updateFavoritesCount();
        renderFavorites();
    }

    function addToCart(product) {
        const existingItem = state.cart.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            state.cart.push({...product, quantity: 1});
        }
        updateCartCount();
        renderCart();
        showToast(`${product.name} ${translations[state.currentLanguage].addedToCart}`, 'success');
    }

    function updateFavoritesCount() {
        $('.favorites-count').text(state.favorites.length);
    }

    function updateCartCount() {
        const count = state.cart.reduce((total, item) => total + item.quantity, 0);
        $('.cart-count').text(count);
    }

    function renderFavorites() {
        const content = $('#favoritesContent');
        
        if (state.favorites.length === 0) {
            content.html(`
                <div class="empty-panel">
                    <i class="fas fa-heart empty-icon"></i>
                    <p class="empty-message">${translations[state.currentLanguage].emptyFavorites}</p>
                    <button class="btn btn-primary">${translations[state.currentLanguage].viewCatalog}</button>
                </div>
            `);
            return;
        }
        
        let html = '<div class="items-list">';
        state.favorites.forEach(product => {
            html += `
                <div class="item-card" data-id="${product.id}">
                    <img src="${product.image}" alt="${product.name}" class="item-image">
                    <div class="item-details">
                        <h4 class="item-title">${product.name}</h4>
                        <p class="item-price">$${product.price.toLocaleString()}</p>
                        <div class="item-actions">
                            <button class="remove-item" data-id="${product.id}">
                                <i class="fas fa-trash"></i>
                            </button>
                            <button class="btn btn-outline add-to-cart-from-fav" data-id="${product.id}">
                                <i class="fas fa-cart-plus"></i> ${translations[state.currentLanguage].añadirCarrito}
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });
        html += '</div>';
        content.html(html);
    }

    function renderCart() {
        const content = $('#cartContent');
        const totalAmount = $('#cartPanel .total-amount');
        
        if (state.cart.length === 0) {
            content.html(`
                <div class="empty-panel">
                    <i class="fas fa-shopping-cart empty-icon"></i>
                    <p class="empty-message">${translations[state.currentLanguage].emptyCart}</p>
                    <button class="btn btn-primary">${translations[state.currentLanguage].viewCatalog}</button>
                </div>
            `);
            totalAmount.text('$0');
            return;
        }
        
        let html = '<div class="items-list">';
        let total = 0;
        
        state.cart.forEach(item => {
            const subtotal = item.price * item.quantity;
            total += subtotal;
            html += `
                <div class="item-card" data-id="${item.id}">
                    <img src="${item.image}" alt="${item.name}" class="item-image">
                    <div class="item-details">
                        <h4 class="item-title">${item.name}</h4>
                        <p class="item-price">$${item.price.toLocaleString()} x ${item.quantity}</p>
                        <div class="item-actions">
                            <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                            <span>${item.quantity}</span>
                            <button class="quantity-btn increase" data-id="${item.id}">+</button>
                            <button class="remove-item" data-id="${item.id}">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });
        
        html += '</div>';
        content.html(html);
        totalAmount.text('$' + total.toLocaleString());
    }

    
    function initEventListeners() {
    
        $('#menuToggle').click(() => $('.sidenav').sidenav('open'));
        
        $('.language-btn').click(e => {
            e.preventDefault();
            changeLanguage();
        });

        $('a[href^="#"]').click(function(e) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: $($(this).attr('href')).offset().top - 20
            }, 500);
            $('.sidenav').sidenav('close');
        });
        
        $(document).on('click', '.favorite-btn', function(e) {
            e.stopPropagation();
            const $card = $(this).closest('.product-card');
            const product = {
                id: $card.data('id'),
                name: $card.find('.product-title').text(),
                price: parseFloat($card.find('.product-price').text().replace(/[^0-9.]/g, '')),
                image: $card.find('.product-image img').attr('src')
            };
            
            addToFavorites(product);
            $(this).toggleClass('active');
        });
     
        $(document).on('click', '.add-to-cart', function(e) {
            e.preventDefault();
            const $card = $(this).closest('.product-card');
            const product = {
                id: $card.data('id'),
                name: $card.find('.product-title').text(),
                price: parseFloat($card.find('.product-price').text().replace(/[^0-9.]/g, '')),
                image: $card.find('.product-image img').attr('src')
            };
            addToCart(product);
        });
        
        $('#favoritesBtn').click(() => openPanel($('#favoritesPanel')));
        $('#closeFavorites').click(closeAllPanels);
    
        $('#cartBtn').click(() => openPanel($('#cartPanel')));
        $('#closeCart').click(closeAllPanels);
        $('#overlay').click(closeAllPanels);
        
        $(document).on('click', '.remove-item', function() {
            const productId = $(this).data('id');
            removeFromFavorites(productId);
        });
        
        $(document).on('click', '.add-to-cart-from-fav', function() {
            const productId = $(this).data('id');
            const product = state.favorites.find(item => item.id === productId);
            addToCart(product);
        });
        
        $(document).on('click', '.decrease', function() {
            const productId = $(this).data('id');
            const item = state.cart.find(item => item.id === productId);
            if (item.quantity > 1) {
                item.quantity -= 1;
            } else {
                state.cart = state.cart.filter(i => i.id !== productId);
            }
            updateCartCount();
            renderCart();
        });
        
        $(document).on('click', '.increase', function() {
            const productId = $(this).data('id');
            const item = state.cart.find(item => item.id === productId);
            item.quantity += 1;
            updateCartCount();
            renderCart();
        });
        

        $('#contactForm').submit(function(e) {
            e.preventDefault();
            let isValid = true;
            
            $(this).find('[required]').each(function() {
                if (!$(this).val()) {
                    isValid = false;
                    $(this).addClass('invalid');
                } else {
                    $(this).removeClass('invalid');
                }
            });
            
            if (isValid) {
         
                setTimeout(() => {
                    showToast(translations[state.currentLanguage].formSuccess, 'success');
                    this.reset();
                }, 1000);
            } else {
                showToast(translations[state.currentLanguage].formError, 'error');
            }
        });
    }

    function initApp() {
        initComponents();
        initLanguage();
        initFilters();
        initEventListeners();
        updateFavoritesCount();
        updateCartCount();
        renderFavorites();
        renderCart();
    }

    initApp();
});