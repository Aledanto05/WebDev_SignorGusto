// Signor Gusto Custom JavaScript — v3.0
// Scroll animations, floating icons, counter, cursor, progress bar

document.addEventListener('DOMContentLoaded', function () {

    /* ========================================================
       SCROLL PROGRESS BAR
    ======================================================== */
    const progressBar = document.getElementById('scroll-progress');
    if (progressBar) {
        window.addEventListener('scroll', function () {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            progressBar.style.width = progress + '%';
        }, { passive: true });
    }


    /* ========================================================
       SCROLL REVEAL (IntersectionObserver)
    ======================================================== */
    const revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    /* ========================================================
       SCROLL REVEAL — LEGACY (service-card, hero-content, feature-item)
    ======================================================== */
    const legacyObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                legacyObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.service-card, .hero-content, .feature-item').forEach(el => {
        if (!el.classList.contains('reveal')) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)';
            legacyObserver.observe(el);
        }
    });

    /* ========================================================
       COUNTER ANIMATION
    ======================================================== */
    const counters = document.querySelectorAll('.stat-number[data-target]');
    const counterObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el     = entry.target;
                const target = parseInt(el.dataset.target, 10);
                const suffix = el.dataset.suffix || '';
                const duration = 1800;
                const step     = 16;
                const steps    = duration / step;
                let current    = 0;
                const increment = target / steps;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    el.textContent = Math.floor(current) + suffix;
                }, step);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(c => counterObserver.observe(c));

    /* ========================================================
       SMOOTH SCROLL
    ======================================================== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    /* ========================================================
       NAVBAR SCROLL EFFECT
    ======================================================== */
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
            navbar.style.padding   = '10px 0';
        } else {
            navbar.style.boxShadow = 'none';
            navbar.style.padding   = '15px 0';
        }
    }, { passive: true });

    /* ========================================================
       HAMBURGER MENU
    ======================================================== */
    const hamburger  = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('open');
            mobileMenu.classList.toggle('open');
        });
        mobileMenu.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                hamburger.classList.remove('open');
                mobileMenu.classList.remove('open');
            });
        });
    }

    /* ========================================================
       SECTOR TABS
    ======================================================== */
    const stabs = document.querySelectorAll('.stab');
    stabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
            stabs.forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.area-panel').forEach(p => p.classList.remove('active'));
            tab.classList.add('active');
            const panel = document.getElementById(tab.dataset.area);
            if (panel) panel.classList.add('active');
        });
    });

    /* ========================================================
       KEYWORD PILLS — POPUP MODAL
    ======================================================== */
    const modalData = {
        // AREA 1 — Food Service
        ristoranti:      { icon: '🍽️', cat: 'Food Service',       title: 'Ristoranti',              desc: 'Per i ristoranti costruiamo una presenza digitale solida che porta prenotazioni concrete. Gestiamo social media, campagne Meta & Google Ads, food photography e strategie di fidelizzazione clienti.',        tags: ['Social Media', 'Google Ads', 'Food Photo', 'Prenotazioni Online', 'Fidelizzazione'] },
        pizzerie:        { icon: '🍕', cat: 'Food Service',        title: 'Pizzerie',                 desc: 'La pizza è il prodotto food più cercato online. Posizioniamo la tua pizzeria con campagne locali iper-targettizzate, gestione Google My Business e contenuti social che fanno venire fame.',                  tags: ['Local Ads', 'Google Maps', 'Instagram Reels', 'Delivery Marketing'] },
        sushi:           { icon: '🍣', cat: 'Food Service',        title: 'Sushi & Cucina Etnica',    desc: 'Target giovane, alta frequenza sui social, forte leva visiva. Creiamo contenuti che valorizzano l\'estetica del prodotto e campagne di acquisizione clienti per il delivery e la sala.',                     tags: ['Visual Content', 'TikTok', 'Delivery Ads', 'Menu Design Digital'] },
        steakhouse:      { icon: '🥩', cat: 'Food Service',        title: 'Steakhouse',               desc: 'Comunicazione premium per un\'esperienza premium. Lavoriamo sul posizionamento di alto livello, targeting su clienti altospendenti e campagne per serate speciali.',                                          tags: ['Premium Branding', 'Meta Ads', 'Influencer', 'Serate Evento'] },
        agriturismi:     { icon: '🌾', cat: 'Food Service',        title: 'Agriturismi',              desc: 'L\'agriturismo vende territorio, autenticità ed emozione. Costruiamo storytelling visivo potente, gestiamo prenotazioni online e campagne stagionali mirate su turisti e famiglie.',                          tags: ['Storytelling', 'Booking', 'Turismo', 'Seasonal Ads', 'Google Tourism'] },
        catene:          { icon: '🔗', cat: 'Food Service',        title: 'Catene di Ristorazione',   desc: 'Per le catene gestiamo la comunicazione a livello nazionale o multi-sede, con coordinamento brand, campagne localizzate per ogni punto vendita e reportistica centralizzata.',                               tags: ['Multi-location', 'Brand Consistency', 'National Ads', 'Franchising'] },
        pasticcerie:     { icon: '🧁', cat: 'Bakery & Dolci',      title: 'Pasticcerie',              desc: 'La pasticceria vive di bellezza ed emozione. Creiamo contenuti visivi straordinari, gestiamo i social con un calendario editoriale stagionale e campagne per eventi come Natale e Pasqua.',                  tags: ['Visual Marketing', 'Stagionalità', 'Packaging', 'UGC', 'Instagram'] },
        gelaterie:       { icon: '🍦', cat: 'Bakery & Dolci',      title: 'Gelaterie',                desc: 'Prodotto stagionale per eccellenza. Massimizziamo le conversioni nella stagione calda con campagne aggressive e costruiamo il brand durante l\'inverno per fidelizzare il cliente.',                          tags: ['Seasonal Strategy', 'Local Ads', 'Loyalty', 'Google Maps'] },
        panifici:        { icon: '🍞', cat: 'Bakery & Dolci',      title: 'Panifici',                 desc: 'Il pane artigianale sta vivendo una nuova era. Comunichiamo il valore dell\'artigianalità, il processo produttivo e la qualità degli ingredienti per distinguerti dalla grande distribuzione.',             tags: ['Artigianalità', 'Storytelling', 'B2C', 'Packaging', 'Local SEO'] },
        laboratori:      { icon: '🎂', cat: 'Bakery & Dolci',      title: 'Laboratori Dolciari',      desc: 'Per i laboratori dolciari lavoriamo su B2B (fornitura a ristoranti e hotel) e B2C. Creiamo materiali di presentazione, schede prodotto e campagne per entrambi i canali.',                                 tags: ['B2B', 'B2C', 'Catalogo Digitale', 'Trade Fairs', 'LinkedIn'] },
        cocktailbar:     { icon: '🍸', cat: 'Beverage On Trade',   title: 'Cocktail Bar',             desc: 'Il bar vive di atmosfera, di notte, di esperienze. Gestiamo la comunicazione serale sui social, collaborazioni con DJ e locali, e campagne per eventi speciali e serate a tema.',                            tags: ['Nightlife', 'Instagram Stories', 'Event Marketing', 'Influencer'] },
        distillerie:     { icon: '🥃', cat: 'Beverage On Trade',   title: 'Distillerie con Tasting Room', desc: 'La distilleria è un\'esperienza sensoriale unica. Costruiamo il brand con contenuti premium, gestiamo le prenotazioni per le visite e lavoriamo sul posizionamento B2B.',                           tags: ['Experience', 'B2B Distribution', 'Luxury', 'Tasting Events', 'eCommerce'] },
        torrefazioni:    { icon: '☕', cat: 'Beverage On Trade',   title: 'Torrefazioni con Caffetteria', desc: 'Il caffè specialty è un mercato in fortissima crescita. Posizioniamo la tua torrefazione come punto di riferimento con contenuti educativi e campagne mirate.',                                      tags: ['Specialty Coffee', 'Education Content', 'B2B HoReCa', 'Local', 'eCommerce'] },
        cantine:         { icon: '🍷', cat: 'Produzione & Brand',  title: 'Cantine Vinicole',         desc: 'La cantina è il nostro DNA. Gestiamo comunicazione social, campagne per il turismo del vino, distribuzione B2B verso enoteche e ristoranti, e strategie per il mercato internazionale.',                   tags: ['Wine Tourism', 'B2B', 'Enoteca', 'Export', 'Social', 'eCommerce'] },
        birrifici:       { icon: '🍺', cat: 'Produzione & Brand',  title: 'Birrifici Artigianali',    desc: 'Il craft beer è un mercato in espansione. Costruiamo il brand attorno alla storia del birraio, gestiamo la distribuzione locale e le campagne per eventi e taproom.',                                       tags: ['Craft Beer', 'Taproom', 'B2B', 'Events', 'Social', 'Local'] },
        caseifici:       { icon: '🧀', cat: 'Produzione & Brand',  title: 'Caseifici',                desc: 'Per i caseifici costruiamo brand identity forte, gestiamo la presenza su piattaforme GDO e lavoriamo sulla distribuzione B2B verso ristoranti e specialty food store.',                                    tags: ['Brand Identity', 'GDO', 'B2B', 'eCommerce', 'DOP/IGP'] },
        salumifici:      { icon: '🥓', cat: 'Produzione & Brand',  title: 'Salumifici',               desc: 'Il salume italiano nel mondo è ambasciatore di cultura. Creiamo campagne di valorizzazione del prodotto, materiali per fiere internazionali e strategie di export marketing.',                               tags: ['Export', 'Trade Fair', 'B2B', 'Packaging', 'DOP'] },
        pastifici:       { icon: '🍝', cat: 'Produzione & Brand',  title: 'Pastifici',                desc: 'Mercato competitivo, grande opportunità di differenziazione. Lavoriamo sul posizionamento premium, sul racconto del territorio e sulla distribuzione specializzata.',                                         tags: ['Premium Positioning', 'Retail', 'B2B', 'Storytelling', 'Packaging'] },
        olio:            { icon: '🫒', cat: 'Produzione & Brand',  title: 'Produttori di Olio',       desc: 'L\'olio extravergine è uno dei prodotti italiani più copiati al mondo. Costruiamo autenticità, racconto del territorio e campagne per posizionare il tuo prodotto nella fascia premium.',                   tags: ['Premium', 'DOP/IGP', 'eCommerce', 'Export', 'Packaging'] },
        aziende_agricole:{ icon: '🌱', cat: 'Produzione & Brand',  title: 'Aziende Agricole',         desc: 'Per le aziende agricole gestiamo il passaggio dal campo al consumatore finale: branding, canali diretti, agriturismo, vendita online e comunicazione autentica del territorio.',                           tags: ['Farm to Table', 'eCommerce', 'Agriturismo', 'Social', 'B2B'] },
        conserve:        { icon: '🫙', cat: 'Produzione & Brand',  title: 'Produttori di Conserve',   desc: 'Settore con grande potenziale eCommerce. Costruiamo la strategia digitale per vendere direttamente, gestiamo marketplace e creiamo contenuti che valorizzano ricette e utilizzi del prodotto.',             tags: ['eCommerce', 'Marketplace', 'Ricette', 'Packaging', 'B2C'] },
        bibite:          { icon: '🥤', cat: 'Produzione & Brand',  title: 'Succhi & Bibite',          desc: 'Per i produttori di bevande costruiamo strategie omnicanale: dalla GDO all\'eCommerce, dai social al B2B verso il canale Ho.Re.Ca.',                                                                       tags: ['Omnicanale', 'GDO', 'eCommerce', 'B2B HoReCa', 'Social'] },
        liquori:         { icon: '🍾', cat: 'Produzione & Brand',  title: 'Produttori di Liquori',    desc: 'Il liquore artigianale è un prodotto altamente emozionale. Creiamo campagne premium, gestiamo la distribuzione B2B e il posizionamento nei cocktail bar più esclusivi.',                                   tags: ['Premium', 'Cocktail Culture', 'B2B Bar', 'Export', 'Luxury'] },
        hotel:           { icon: '🏨', cat: 'Hospitality & Eventi',title: 'Hotel con Ristorante',     desc: 'Per gli hotel valutiamo il ristorante come prodotto separato dall\'hospitality, con campagne dedicate per portare clienti esterni e valorizzare l\'offerta F&B.',                                           tags: ['F&B Strategy', 'Local Ads', 'Social', 'Review Management', 'Google'] },
        resort:          { icon: '🌴', cat: 'Hospitality & Eventi',title: 'Resort',                   desc: 'Il resort vende sogno ed esclusività. Costruiamo contenuti visivi di altissimo livello, campagne luxury su Meta e Google, e strategie di direct booking per ridurre le commissioni OTA.',                  tags: ['Luxury', 'Direct Booking', 'Visual', 'Meta Ads', 'Influencer'] },
        catering:        { icon: '🍱', cat: 'Hospitality & Eventi',title: 'Catering',                 desc: 'Per le aziende di catering lavoriamo principalmente sul B2B: campagne su LinkedIn, materiali di presentazione, partecipazione a fiere di settore e gestione del portfolio eventi.',                        tags: ['B2B', 'LinkedIn', 'Portfolio', 'Trade Fair', 'Lead Gen'] },
        banqueting:      { icon: '🎉', cat: 'Hospitality & Eventi',title: 'Banqueting',               desc: 'Il banqueting si basa sulla fiducia. Costruiamo autorevolezza digitale attraverso recensioni gestite, case history di eventi passati e campagne mirate per sposi e aziende.',                               tags: ['Matrimoni', 'Corporate', 'Reviews', 'Case History', 'Lead Gen'] },
        location:        { icon: '💍', cat: 'Hospitality & Eventi',title: 'Location Matrimoni',       desc: 'Il wedding è il mercato dove l\'emozione conta tutto. Creiamo visual identità emozionale, gestiamo Instagram e Pinterest, e produciamo video che vendono il sogno del grande giorno.',                     tags: ['Wedding Marketing', 'Instagram', 'Pinterest', 'Video', 'Influencer'] },
        chef:            { icon: '👨‍🍳', cat: 'Personal Brand',   title: 'Chef',                     desc: 'Lo chef oggi è un brand. Costruiamo la tua presenza come autorità del settore: profilo social curato, media relations, posizionamento per consulenze e format televisivi.',                                 tags: ['Social Growth', 'Media', 'Consulenze', 'Personal Branding', 'Content'] },
        pasticceri:      { icon: '🎂', cat: 'Personal Brand',      title: 'Pasticceri',               desc: 'La pasticceria è arte visiva. Costruiamo un profilo Instagram aspirazionale, gestiamo collaborazioni con brand premium e posizionamento per masterclass e insegnamento.',                                   tags: ['Instagram', 'Masterclass', 'Brand Collab', 'Visual', 'Teaching'] },
        pizzaioli:       { icon: '🍕', cat: 'Personal Brand',      title: 'Pizzaioli',                desc: 'Il pizzaiolo campione è un personaggio pubblico. Costruiamo la tua storia, gestiamo la comunicazione dei riconoscimenti e ti posizioniamo per consulenze e format di intrattenimento.',                    tags: ['Storytelling', 'Awards', 'Social', 'Consulenze', 'TV/Media'] },
        panificatori:    { icon: '🍞', cat: 'Personal Brand',      title: 'Maestri Panificatori',     desc: 'Il pane artigianale ha un pubblico appassionato e in crescita. Costruiamo la tua community online, gestiamo corsi e masterclass e ti posizioniamo come riferimento del settore.',                         tags: ['Community', 'Masterclass', 'Content', 'Social', 'Teaching'] },
        chef_privati:    { icon: '🥘', cat: 'Personal Brand',      title: 'Chef Privati',             desc: 'Per lo chef privato il personal brand è lo strumento di acquisizione principale. Costruiamo la tua identità digitale premium per attrarre clienti altospendenti.',                                         tags: ['Premium Clienti', 'Referral', 'Social', 'Portfolio', 'Luxury'] },
        chef_consulenti: { icon: '📋', cat: 'Personal Brand',      title: 'Chef Consulenti',          desc: 'La consulenza nel food si vende con autorevolezza. Costruiamo la tua reputazione online, gestiamo la presenza su LinkedIn e creiamo case history dei tuoi progetti più rilevanti.',                        tags: ['LinkedIn', 'Autorevolezza', 'Case History', 'B2B', 'Speaking'] },
        sommelier:       { icon: '🍷', cat: 'Personal Brand',      title: 'Sommelier',                desc: 'Il sommelier di alto livello è un brand riconoscibile. Costruiamo la tua presenza come esperto, gestiamo collaborazioni con cantine e wine bar, e curiamo la comunicazione per eventi.',                   tags: ['Wine Expert', 'Cantine', 'Events', 'Content', 'LinkedIn'] },
        mixologist:      { icon: '🍸', cat: 'Personal Brand',      title: 'Mixologist',               desc: 'Il mixologist moderno è content creator. Costruiamo un profilo social orientato al behind-the-scenes, alle ricette e alle collaborazioni con brand spirits internazionali.',                                tags: ['Content Creator', 'Brand Collab', 'Spirits', 'Instagram', 'TikTok'] },
        bartender:       { icon: '🍹', cat: 'Personal Brand',      title: 'Bartender',                desc: 'Per il bartender lavoriamo su presenza social, partecipazione a competizioni internazionali e posizionamento per consulenze a locali e brand.',                                                             tags: ['Competitions', 'Social', 'Brand Ambassador', 'Consulenze', 'Content'] },
        coffee_specialist:{ icon:'☕', cat: 'Personal Brand',      title: 'Coffee Specialist',        desc: 'Il mercato specialty coffee è in fortissima crescita. Costruiamo la tua presenza come esperto attraverso contenuti educativi, eventi di cupping e collaborazioni con torrefazioni.',                       tags: ['Specialty', 'Education', 'Events', 'Collab', 'Instagram'] },
        mastro_birraio:  { icon: '🍺', cat: 'Personal Brand',      title: 'Mastro Birraio',           desc: 'La figura del birraio artigianale è sempre più apprezzata. Costruiamo il tuo profilo come artigiano del gusto, gestiamo la comunicazione del birrificio e le collaborazioni di settore.',                 tags: ['Craft', 'Artigianalità', 'Social', 'Collab', 'Events'] },
        vignaiolo:       { icon: '🌿', cat: 'Personal Brand',      title: 'Vignaiolo',                desc: 'Il vignaiolo naturale e artigianale è una delle figure più affascinanti del food. Costruiamo la narrazione autentica del tuo vino, dalla vigna alla bottiglia.',                                           tags: ['Natural Wine', 'Storytelling', 'Social', 'Wine Tourism', 'Export'] },
        casari:          { icon: '🧀', cat: 'Artigiani del Gusto', title: 'Casari',                   desc: 'Il casaro artigianale sta vivendo una rinascita. Costruiamo la tua storia, gestiamo la presenza online del caseificio e lavoriamo su distribuzione specialty e direct selling.',                           tags: ['Artigianalità', 'Direct Selling', 'Social', 'Specialty', 'B2B'] },
        mastri_salumieri:{ icon: '🥩', cat: 'Artigiani del Gusto', title: 'Mastri Salumieri',         desc: 'La norcineria italiana è patrimonio culturale. Costruiamo la comunicazione attorno al processo, alla tradizione e alla qualità delle materie prime per valorizzare il prodotto.',                         tags: ['Tradizione', 'Content', 'eCommerce', 'B2B', 'Packaging'] },
        prod_olio:       { icon: '🫒', cat: 'Artigiani del Gusto', title: 'Produttori di Olio',       desc: 'L\'olivicoltore che sceglie il personal brand si distingue in un mercato affollato. La tua storia vale quanto il tuo olio: costruiamo la narrazione che porta valore al prodotto.',                        tags: ['Personal Storytelling', 'eCommerce', 'Export', 'Premium', 'Social'] },
        cioccolatieri:   { icon: '🍫', cat: 'Artigiani del Gusto', title: 'Cioccolatieri',            desc: 'Il cioccolato artigianale è lusso accessibile. Costruiamo visual identity premium, gestiamo i social con contenuti esteticamente straordinari e curiamo la strategia eCommerce.',                         tags: ['Luxury', 'Visual', 'eCommerce', 'Packaging', 'Social', 'Gifting'] },
    };

    const overlay  = document.getElementById('modal-overlay');
    const closeBtn = document.getElementById('modal-close');

    function openModal(key) {
        const d = modalData[key];
        if (!d || !overlay) return;
        document.getElementById('m-icon').textContent  = d.icon;
        document.getElementById('m-cat').textContent   = d.cat;
        document.getElementById('m-title').textContent = d.title;
        document.getElementById('m-desc').textContent  = d.desc;
        document.getElementById('m-tags').innerHTML    =
            d.tags.map(t => '<span class="m-tag">' + t + '</span>').join('');
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        if (!overlay) return;
        overlay.classList.remove('open');
        document.body.style.overflow = '';
        document.querySelectorAll('.kw-pill').forEach(p => p.classList.remove('active'));
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (overlay)  overlay.addEventListener('click', function (e) {
        if (e.target === overlay) closeModal();
    });
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeModal();
    });

    document.querySelectorAll('.kw-pill[data-key]').forEach(function (pill) {
        pill.addEventListener('click', function () {
            document.querySelectorAll('.kw-pill').forEach(p => p.classList.remove('active'));
            this.classList.add('active');
            openModal(this.dataset.key);
        });
    });

    /* ========================================================
       PARALLAX — floating icons gentle parallax
    ======================================================== */
    const floats = document.querySelectorAll('.food-float');
    if (floats.length && window.matchMedia('(min-width: 768px)').matches) {
        window.addEventListener('scroll', function () {
            const sy = window.scrollY;
            floats.forEach((el, i) => {
                const speed = 0.03 + (i % 4) * 0.015;
                const dir   = i % 2 === 0 ? 1 : -1;
                el.style.transform = `translateY(${sy * speed * dir}px)`;
            });
        }, { passive: true });
    }

    /* ========================================================
       STAGGERED PARTNER CARDS (duplicate for infinite loop)
    ======================================================== */
    const track = document.getElementById('carousel-track');
    if (track) {
        const cards = track.innerHTML;
        track.innerHTML = cards + cards; // duplicate for seamless loop
    }

});