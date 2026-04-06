document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('calculator-form');
    const vdropSlider = document.getElementById('vdrop-slider');
    const vdropVal = document.getElementById('vdrop-val');
    const resultCard = document.getElementById('result-card');
    
    // Result elements
    const resSection = document.getElementById('res-section');
    const resCurrent = document.getElementById('res-current');
    const resVdrop = document.getElementById('res-vdrop');
    const resVdropPerc = document.getElementById('res-vdrop-perc');

    // Standard cable cross-sections (mm²)
    const standardSections = [1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95, 120, 150, 185, 240, 300, 400];

    // Approx Current Carrying Capacities (A) for PVC cables in air
    const maxCurrentCu = {
        1.5: 19, 2.5: 26, 4: 35, 6: 45, 10: 63, 16: 85, 25: 112, 
        35: 138, 50: 168, 70: 214, 95: 259, 120: 299, 150: 344, 
        185: 390, 240: 460, 300: 530, 400: 620
    };
    const maxCurrentAl = {
        1.5: 0, 2.5: 0, 4: 0, 6: 0, 10: 46, 16: 62, 25: 82, 
        35: 100, 50: 122, 70: 156, 95: 188, 120: 218, 150: 250, 
        185: 286, 240: 336, 300: 386, 400: 450
    };

    // Update slider UI
    vdropSlider.addEventListener('input', (e) => {
        vdropVal.textContent = `%${e.target.value}`;
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get inputs
        const phase = parseInt(document.querySelector('input[name="phase"]:checked').value);
        const k = parseInt(document.querySelector('input[name="conductor"]:checked').value); // 56 for Cu, 35 for Al
        const powerKW = parseFloat(document.getElementById('power').value);
        const length = parseFloat(document.getElementById('length').value);
        const targetDropPerc = parseFloat(document.getElementById('vdrop-slider').value);

        // Validation
        if (!powerKW || !length || powerKW <= 0 || length <= 0) return;

        // Base values based on phase
        const V = phase === 1 ? 220 : 380;
        const allowedDeltaV = (targetDropPerc * V) / 100;

        // Calculate Current (I)
        let I = 0;
        if (phase === 1) {
            I = (powerKW * 1000) / V;
        } else {
            I = (powerKW * 1000) / (Math.sqrt(3) * V);
        }

        // Calculate theoretical required cross section (S = mm²) based on Voltage Drop
        let S_req = 0;
        if (phase === 1) {
            S_req = (2 * length * I) / (k * allowedDeltaV);
        } else {
            S_req = (Math.sqrt(3) * length * I) / (k * allowedDeltaV);
        }

        // Mapping array for capacities
        const capacities = (k === 56) ? maxCurrentCu : maxCurrentAl;

        // Find standard section that satisfies BOTH Voltage Drop AND Current Carrying Capacity
        let recommendedSection = null;
        for (let s of standardSections) {
            // Check if section s is large enough for voltage drop AND can carry the current I
            if (s >= S_req && capacities[s] >= I) {
                recommendedSection = s;
                break;
            }
        }

        let actualDeltaV = 0;
        if (recommendedSection) {
            // Calculate ACTUAL voltage drop with the recommended section
            if (phase === 1) {
                actualDeltaV = (2 * length * I) / (k * recommendedSection);
            } else {
                actualDeltaV = (Math.sqrt(3) * length * I) / (k * recommendedSection);
            }
        } else {
            // Unrealistic case, bigger than 400mm2 or unsupported capacity
            recommendedSection = ">400";
            if (phase === 1) {
                actualDeltaV = (2 * length * I) / (k * 400);
            } else {
                actualDeltaV = (Math.sqrt(3) * length * I) / (k * 400);
            }
        }

        let actualDropPerc = (actualDeltaV / V) * 100;

        // Display results
        resSection.textContent = recommendedSection;
        resCurrent.textContent = I.toFixed(1) + " A";
        resVdrop.textContent = actualDeltaV.toFixed(2) + " V";
        resVdropPerc.textContent = "%" + actualDropPerc.toFixed(2);

        // Warning color if it exceeds standard sizes
        if (recommendedSection === ">400") {
            resSection.style.webkitTextFillColor = 'var(--danger)';
        } else {
            resSection.style.webkitTextFillColor = ''; // reset
        }

        // Show card
        resultCard.classList.remove('hidden');
        
        // Scroll slightly
        setTimeout(() => {
            resultCard.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }, 100);
    });

    // --- Sidebar and Routing Logic ---
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const navItems = document.querySelectorAll('.nav-item');
    const pages = document.querySelectorAll('.page');

    function toggleSidebar() {
        sidebar.classList.toggle('active');
        sidebarOverlay.classList.toggle('active');
    }

    menuToggle.addEventListener('click', toggleSidebar);
    sidebarOverlay.addEventListener('click', toggleSidebar);

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active from all nav items
            navItems.forEach(nav => nav.classList.remove('active'));
            // Add active to clicked nav item
            item.classList.add('active');

            // Hide all pages
            pages.forEach(page => {
                page.classList.remove('active');
                page.classList.add('hidden');
            });

            // Show target page
            const targetId = item.getAttribute('data-target');
            const targetPage = document.getElementById(targetId);
            if(targetPage) {
                targetPage.classList.remove('hidden');
                targetPage.classList.add('active');
            }

            // Close sidebar on mobile
            if (window.innerWidth < 768) {
                toggleSidebar();
            }
        });
    });

    // --- Resistor Logic ---
    const select1 = document.getElementById('sel-band1');
    const select2 = document.getElementById('sel-band2');
    const select3 = document.getElementById('sel-band3');
    const select4 = document.getElementById('sel-band4');
    
    const vis1 = document.getElementById('vis-band1');
    const vis2 = document.getElementById('vis-band2');
    const vis3 = document.getElementById('vis-band3');
    const vis4 = document.getElementById('vis-band4');

    const resResult = document.getElementById('resistor-result');
    const resTol = document.getElementById('resistor-tol');

    function updateResistor() {
        const val1 = select1.value;
        const val2 = select2.value;
        const mult = parseFloat(select3.value);
        const tol = select4.value;

        // Visuals
        vis1.style.background = select1.options[select1.selectedIndex].dataset.color;
        vis2.style.background = select2.options[select2.selectedIndex].dataset.color;
        vis3.style.background = select3.options[select3.selectedIndex].dataset.color;
        vis4.style.background = select4.options[select4.selectedIndex].dataset.color;

        // Calc
        let ohms = parseInt(val1 + val2) * mult;
        
        let ohmString = "";
        // Round safely due to JS floating math
        ohms = Math.round(ohms * 100) / 100;
        
        if (ohms >= 1000000) {
            ohmString = (ohms / 1000000) + "M";
        } else if (ohms >= 1000) {
            ohmString = (ohms / 1000) + "k";
        } else {
            ohmString = ohms;
        }

        resResult.textContent = ohmString;
        resTol.textContent = "±" + tol + "%";
    }

    if(select1) {
        [select1, select2, select3, select4].forEach(sel => {
            sel.addEventListener('change', updateResistor);
        });
        updateResistor();
    }
});
