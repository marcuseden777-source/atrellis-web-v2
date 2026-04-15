// quotation.js

let currentStep = 1;
const totalSteps = 7;

const userSelections = {
    propertyType: null,
    propertySize: null,
    style: null,
    scope: [],
    budget: null,
    contact: {}
};

// Form Interaction Logic
function selectOption(category, value, element) {
    // Single select mode
    userSelections[category] = value;
    
    // UI Update
    const siblings = element.parentNode.querySelectorAll('.glass-radio-card');
    siblings.forEach(el => el.classList.remove('selected'));
    element.classList.add('selected');
}

function toggleMultiOption(category, value, element) {
    // Multi select mode
    const index = userSelections[category].indexOf(value);
    
    if (index > -1) {
        userSelections[category].splice(index, 1);
        element.classList.remove('selected');
    } else {
        userSelections[category].push(value);
        element.classList.add('selected');
    }
}

// Navigation Logic
function nextStep() {
    // Validate current step
    if (!validateStep(currentStep)) {
        alert("Please make a selection to proceed.");
        return;
    }

    if (currentStep < totalSteps) {
        let currentEl = document.getElementById(`step-${currentStep}`);
        let nextEl = document.getElementById(`step-${currentStep + 1}`);
        
        // Hide current
        gsap.to(currentEl, { opacity: 0, y: -20, duration: 0.3, onComplete: () => {
            currentEl.classList.remove('active');
            
            // Show next
            nextEl.classList.add('active');
            gsap.fromTo(nextEl, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4 });
            
            currentStep++;
            updateUI();
        }});
    }
}

function prevStep() {
    if (currentStep > 1) {
        let currentEl = document.getElementById(`step-${currentStep}`);
        let prevEl = document.getElementById(`step-${currentStep - 1}`);
        
        // Hide current
        gsap.to(currentEl, { opacity: 0, y: 20, duration: 0.3, onComplete: () => {
            currentEl.classList.remove('active');
            
            // Show prev
            prevEl.classList.add('active');
            gsap.fromTo(prevEl, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.4 });
            
            currentStep--;
            updateUI();
        }});
    }
}

function updateUI() {
    // Progress Bar
    const progressPerc = ((currentStep) / totalSteps) * 100;
    gsap.to("#step-progress", { width: `${progressPerc}%`, duration: 0.5 });

    // Buttons
    document.getElementById('btn-prev').style.display = currentStep === 1 ? 'none' : 'inline-block';
    
    const nextBtn = document.getElementById('btn-next');
    if (currentStep === totalSteps) {
        nextBtn.style.display = 'none'; // Hide next on last step
        generateEstimate();
    } else {
        nextBtn.style.display = 'inline-block';
        nextBtn.innerText = 'Continue';
    }
}

function validateStep(step) {
    if (step === 1 && !userSelections.propertyType) return false;
    if (step === 2 && !userSelections.propertySize) return false;
    if (step === 3 && !userSelections.style) return false;
    if (step === 4 && userSelections.scope.length === 0) return false;
    if (step === 5 && !userSelections.budget) return false;
    
    if (step === 6) {
        const name = document.getElementById('contactName').value;
        const email = document.getElementById('contactEmail').value;
        if (!name || !email) return false;
        
        userSelections.contact = {
            name: name,
            email: email,
            phone: document.getElementById('contactPhone').value
        };
    }
    return true;
}

// Pricing Engine (Indicative Placeholder based on constraints)
function generateEstimate() {
    let basePrice = 20000; // Baseline

    // Size Multipliers
    if (userSelections.propertySize === '601 - 1000 sqft') basePrice += 15000;
    if (userSelections.propertySize === '1001 - 1500 sqft') basePrice += 30000;
    if (userSelections.propertySize === 'Above 1500 sqft') basePrice += 50000;

    // Scope Additions (Averaged)
    let scopeCost = userSelections.scope.length * 5000; 

    // Tier Multipliers
    let multiplier = 1.0;
    if (userSelections.budget === 'Economic') multiplier = 0.8;
    if (userSelections.budget === 'Premium') multiplier = 1.5;

    let finalEst = (basePrice + scopeCost) * multiplier;
    
    let lowEnd = Math.floor((finalEst * 0.9) / 1000) * 1000;
    let highEnd = Math.ceil((finalEst * 1.1) / 1000) * 1000;

    document.getElementById('estimateOutput').innerText = `S$${lowEnd.toLocaleString()} - S$${highEnd.toLocaleString()}`;
    
    // Animate Number Reveal
    gsap.fromTo("#estimateOutput", 
        { opacity: 0, scale: 0.8, filter: "blur(10px)" }, 
        { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1, ease: "back.out(1.7)" }
    );
}

function submitLead() {
    alert("Lead captured! Connecting to CRM and redirecting home...");
    window.location.href = "services.html";
}
