/*image slider*/
const slides = document.querySelector('.slides');
const dots = document.querySelectorAll('.dot');
let currentIndex = 0;
let isTransitioning = false;

function updateSlider(index) {
  slides.style.transition = 'transform 0.5s ease-in-out';
  slides.style.transform = `translateX(-${index * 100}%)`;
  dots.forEach(dot => dot.classList.remove('active'));
  dots[index % 4].classList.add('active'); 
}

function goToSlide(index) {
  currentIndex = index;
  updateSlider(currentIndex);
}

document.getElementById('prev').addEventListener('click', () => {
  if (currentIndex === 0) {
    currentIndex = 4;
    slides.style.transition = 'none';
    slides.style.transform = `translateX(-${currentIndex * 100}%)`;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        currentIndex = 3;
        updateSlider(currentIndex);
      });
    });
  } else {
    currentIndex--;
    updateSlider(currentIndex);
  }
});

document.getElementById('next').addEventListener('click', () => {
  if (isTransitioning) return;
  currentIndex++;
  updateSlider(currentIndex);
});

slides.addEventListener('transitionend', () => {
  isTransitioning = false;
  if (currentIndex === 4) {
    slides.style.transition = 'none';
    slides.style.transform = 'translateX(0)';
    currentIndex = 0;
    dots.forEach(dot => dot.classList.remove('active'));
    dots[0].classList.add('active');
  }
});

setInterval(() => {
  isTransitioning = true;
  currentIndex++;
  updateSlider(currentIndex);
}, 4000);
function openPopup() {
document.getElementById("rolePopup").style.display = "flex";
}
/*end*/

/*nav bar*/
const navbarToggle = document.getElementById('navbar-toggle');
const navbarMenu = document.getElementById('navbar-menu');
const navLinks = navbarMenu.querySelectorAll('.navbar-links a');

navbarToggle.addEventListener('click', () => {
    const isExpanded = navbarToggle.getAttribute('aria-expanded') === 'true';

    navbarToggle.classList.toggle('active');
    navbarMenu.classList.toggle('active');

    navbarToggle.setAttribute('aria-expanded', !isExpanded);
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navbarMenu.classList.contains('active')) {
            navbarToggle.classList.remove('active');
            navbarMenu.classList.remove('active');
            navbarToggle.setAttribute('aria-expanded', 'false');
        }
    });
});
/*end*/

  const text = "Even the smallest act of kindness holds the power to change someone’s world. Together, let’s bridge the gap between abundance and need — one donation at a time.";
  const typingText = document.getElementById("typing-text");
  let i = 0;

  function typeText() {
    if (i < text.length) {
      typingText.innerHTML += text.charAt(i);
      i++;
      setTimeout(typeText, 40); // typing speed
    }
  }

  window.onload = typeText;

  document.addEventListener('DOMContentLoaded', () => {
    const donationForm = document.getElementById('donation-form');
    const amountRadios = document.querySelectorAll('input[name="donation_amount"]');
    const customAmountContainer = document.getElementById('custom-amount-container');
    const customAmountInput = document.getElementById('custom-amount-input');
    const customAmountRadio = document.getElementById('amount-custom');


    function toggleCustomAmount() {
        if (customAmountRadio.checked) {
            customAmountContainer.style.display = 'block';
            customAmountInput.required = true; 
            customAmountInput.focus();         
        } else {
            customAmountContainer.style.display = 'none';
            customAmountInput.required = false;
            customAmountInput.value = ''; 
        }
    }

   
    amountRadios.forEach(radio => {
        radio.addEventListener('change', toggleCustomAmount);
    });

    
    toggleCustomAmount();

    
    donationForm.addEventListener('submit', (event) => {
        event.preventDefault(); 

        
        const formData = new FormData(donationForm);
        const data = {};

        
        formData.forEach((value, key) => {
           
            if (key === 'donation_amount' && value === 'custom') {
                data['selected_amount_option'] = 'custom'; 
                data['final_donation_amount'] = formData.get('custom_amount'); 
            } else if (key === 'donation_amount') {
                 data['selected_amount_option'] = value; 
                 data['final_donation_amount'] = value;  
            } else if (key !== 'custom_amount') { 
                data[key] = value;
            }
        });

       
        if (!data['final_donation_amount'] && formData.get('donation_amount') !== 'custom') {
             data['final_donation_amount'] = formData.get('donation_amount');
        }


        console.log('Form Submitted!');
        console.log('Collected Data:', data);

      

        alert(`Thank you for your donation of ₹${data.final_donation_amount} (${data.donation_frequency})! \n(Check console for submitted data - No actual payment processed)`);

       
    });
});


const counters = document.querySelectorAll('.counter');

        counters.forEach(counter => {
            counter.innerText = '0';
            const update = () => {
                const target = +counter.getAttribute('data-target');
                const current = +counter.innerText;
                const increment = Math.max(1, target / 200);

                if (current < target) {
                    counter.innerText = Math.ceil(current + increment);
                    setTimeout(update, 20);
                } else {
                    counter.innerText = target;
                }
            };
            update();
        });