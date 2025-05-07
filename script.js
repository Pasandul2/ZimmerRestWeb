// window.addEventListener('load', () => {
//     setTimeout(() => {
//         window.scrollTo({
//             top: 0,
//             behavior: 'smooth'
//         });
//     }, 50); // slight delay to allow layout to settle
// });


// Carousel section

const track = document.getElementById('carouselTrack');
    const slides = track.children;
    const totalRealSlides = 3; // without clones
    let currentIndex = 1; // Start at real first slide
    let slideWidth = window.innerWidth;

    function updateSlide(animated = true) {
      if (!animated) {
        track.style.transition = 'none';
      } else {
        track.style.transition = 'transform 0.5s ease-in-out';
      }
      track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }

    function moveSlide(direction) {
      currentIndex += direction;
      updateSlide();

      // Reset auto-scroll
      resetAutoScroll();
    }

    track.addEventListener('transitionend', () => {
      if (currentIndex === 0) {
        currentIndex = totalRealSlides;
        updateSlide(false);
      } else if (currentIndex === totalRealSlides + 1) {
        currentIndex = 1;
        updateSlide(false);
      }
    });

    function startAutoScroll() {
      return setInterval(() => moveSlide(1), 50000);
    }

    function resetAutoScroll() {
      clearInterval(autoScroll);
      autoScroll = startAutoScroll();
    }

    let autoScroll = startAutoScroll();

    window.addEventListener('resize', () => {
      slideWidth = window.innerWidth;
      updateSlide(false);
    });

    // Initial position
    updateSlide(false);



document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelector('.carousel-slides');
    const images = document.querySelectorAll('.carousel-slides img');
    
    let currentIndex = 0;
    const originalImages = images.length;
    let autoSlideInterval;

    // Clone first images and append them to the end for infinite loop
    const clones = [];
    images.forEach(img => {
        const clone = img.cloneNode(true);
        slides.appendChild(clone);
        clones.push(clone);
    });
    const totalImages = originalImages * 2; // Double the images with clones

    // Function to update carousel position
    function updateCarousel(transition = true) {
        const slideWidth = images[0].clientWidth + 20; // Including margin
        slides.style.transition = transition ? 'transform 0.5s ease' : 'none';
        slides.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }

    // Automatic sliding
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            currentIndex++;
            
            // When reaching the cloned slides, instantly jump back to original
            if (currentIndex === originalImages) {
                updateCarousel(true);
                setTimeout(() => {
                    currentIndex = 0;
                    updateCarousel(false);
                }, 500); // Match this timing with CSS transition duration
            } else {
                updateCarousel(true);
            }
        }, 3000); // Change slide every 3 seconds
    }

    // Stop automatic sliding
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Handle window resize
    window.addEventListener('resize', () => {
        updateCarousel(false); // No transition on resize
    });

    // Start the carousel
    startAutoSlide();

    // Pause on hover
    slides.addEventListener('mouseenter', stopAutoSlide);
    slides.addEventListener('mouseleave', startAutoSlide);

    // Ensure smooth transition handling
    slides.addEventListener('transitionend', () => {
        if (currentIndex === originalImages) {
            currentIndex = 0;
            updateCarousel(false);
        }
    });
});

// Reviews section

let currentSlide = 0;
const totalSlides = 10;
const reviews = document.getElementById('reviews');
const review = document.getElementById('review');

function showSlide(index) {
    if (index >= totalSlides) {
        currentSlide = 1;
    } else if (index < 0) {
        currentSlide = totalSlides - 1;
    } else {
        currentSlide = index;
    }
    const offset = -currentSlide * 33.33; 
    review.style.transform = `translateX(${offset}%)`;
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

// Initial display
showSlide(currentSlide);


        // scrolling

        let lastScrollY = window.scrollY;
        const header = document.querySelector('.header');
        const section1Img = document.querySelector('.section1 img');
        const section2 = document.querySelector('section2 .aboutUs-content');
        const section7 = document.querySelectorAll('.review');
        const section7review1 = document.querySelector('.review1');
        const section7review2 = document.querySelector('.review2');
        const section7review3 = document.querySelector('.review3');
        const section7review4 = document.querySelector('.review4');
        const carouselNavprev = document.querySelector('.prev');
        const carouselNavnext = document.querySelector('.next');
        const backText = document.querySelector('.backText');
        const isMobile = window.innerWidth <= 480;
 
        window.addEventListener('scroll', () => {
            if (scrollY > 70) {
                header.style.opacity = "1";  
            } else {
                header.style.opacity = "0";  
            }
        });

        window.addEventListener('scroll', () => {
            if (scrollY > 70) { // Scrolling down
                section1Img.style.transform = "scale(0.7)";  // Scale down the image
                section1Img.style.paddingBottom = "0";  // Reduce padding-bottom
                carouselNavprev.style.opacity = "0"; 
                carouselNavnext.style.opacity = "0";
            } else { // Scrolling up
                section1Img.style.transform = "scale(1)";  // Restore original scale
                section1Img.style.paddingBottom = "30vh";  // Restore padding-bottom
                carouselNavprev.style.opacity = "1";
                carouselNavnext.style.opacity = "1";
            }
        
          
        });

        window.addEventListener('scroll', () => {
            if (scrollY > 50) { // Scrolling down
                section1Img.style.transform = isMobile ? "scale(1)" : "scale(0.7)";
                
            } else { // Scrolling up
                section1Img.style.transform = "scale(1)";  // Restore original scale
            }
        });

        window.addEventListener('scroll', () => {
            if (scrollY > 550) { // Scrolling down
                section2.style.opacity = "1";    // Slide in the text
                backText.style.left = "-2vw"; // Slide in the text
            } else { // Scrolling up
                section2.style.opacity = "0";   // Slide out the text
                backText.style.left = "-100vw"; // Slide out the text
            }
        });

        // window.addEventListener('scroll', () => {
        //     section7.forEach(section => {
        //         if (scrollY > 3200) {
        //             section.style.opacity = "1";
        //             section.style.marginTop = "0";

        //             section7review1.style.transition = "margin-top 1s ease-in-out , opacity 1s ease"; // Add transition for smooth effect
        //             section7review2.style.transition = "margin-top 2s ease-in-out , opacity 4s ease"; // Add transition for smooth effect
        //             section7review3.style.transition = "margin-top 2.7s ease-in-out , opacity 6s ease"; // Add transition for smooth effect
        //             section7review4.style.transition = "margin-top 2.7s ease-in-out , opacity 8s ease"; // Add transition for smooth effect
        //         } else {
        //             section.style.opacity = "0";
        //             section.style.marginTop = "100px"; // Adjust margin-top to 100px when hidden
        //             section.style.transition = "margin-top 0s ease , opacity 0s ease"; // Remove transition when hidden
        //         }
        //     });
            
        // });

        const thingsText = document.querySelector('.things-text');
        const thingsImg = document.querySelector('.things-img');

        window.addEventListener('scroll', () => {
            if (scrollY > 850) { // Scrolling down
                thingsText.style.opacity = "1";
                thingsText.style.marginLeft = "0px"; 
                 thingsImg.style.width = "50%";
            } else { // Scrolling up
                thingsText.style.opacity = "0"; 
                thingsText.style.marginLeft = "-200px"; // Slide out the text
                thingsImg.style.width = "20%"; // Slide out the image
            }
        });
        

    emailjs.init("wtd5FI2znClPhD0mr");

    const openFormBtns = document.querySelectorAll('.openFormBtn');
    const closeFormBtn = document.getElementById('closeFormBtn');
    const overlay = document.getElementById('bookingOverlay');
    const form = document.getElementById('bookingForm');
    const checkIn = document.getElementById("checkin");
    const checkOut = document.getElementById("checkout");

    checkIn.min = new Date().toISOString().split("T")[0];

    // Set minimum Check-out date after selecting Check-in
    checkIn.addEventListener("change", function () {
        checkOut.min = this.value;
    });

    openFormBtns.onclick = () => overlay.style.display = 'flex';
    closeFormBtn.onclick = () => overlay.style.display = 'none';

    // Optional: close form if clicked outside
    window.onclick = (e) => {
        if (e.target === overlay) {
        overlay.style.display = 'none';
        document.body.style.overflow = "";
        form.reset();
        }
    };

    openFormBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            overlay.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Disable scroll
        });
    });
    
    closeFormBtn.addEventListener("click", () => {
        overlay.style.display = "none";
        document.body.style.overflow = ""; // Restore scroll
        form.reset();
    });

    form.addEventListener('submit', function (e) {
        e.preventDefault();
    
        const bookingDetails = {
            name: form.name.value,
            email: form.email.value,
            phone: form.phone.value,
            checkin: form.checkin.value,
            checkout: form.checkout.value,
            guests: form.guests.value,
            kids: form.kids.value || "0",
            roomtype: form.roomtype.value,
            rooms: form.rooms.value,
            requests: form.requests.value || "None"
        };
    
        // Send email to owner
        emailjs.send("service_iw0muj2", "template_pni6ve3", bookingDetails)
        .then(function(response) {
            // Send confirmation email to customer
            emailjs.send("service_iw0muj2", "template_45pxrut", bookingDetails).then(function(response2) {
                alert("Booking submitted successfully!");
    
                // WhatsApp message
                const msg = `New Booking:-\nName: ${bookingDetails.name}\nEmail: ${bookingDetails.email}\nPhone: ${bookingDetails.phone}\nCheck-in: ${bookingDetails.checkin}\nCheck-out: ${bookingDetails.checkout}\nGuests: ${bookingDetails.guests}\nKids: ${bookingDetails.kids}\nRoom Type: ${bookingDetails.roomtype}\nRooms: ${bookingDetails.rooms}\nRequests: ${bookingDetails.requests}`;
                window.open(`https://wa.me/94713677499?text=${encodeURIComponent(msg)}`, '_blank');
    
                overlay.style.display = 'none';
                document.body.style.overflow = "";
                form.reset();
            }, function(error2) {
                alert("Customer confirmation email failed.");
                console.error(error2);
            });
    
        }, function(error) {
            alert("Booking failed. Please try again.");
            console.error(error);
        });
    });
    



    // contact form
const Cform = document.getElementById('form');
const result = document.getElementById('result');

Cform.addEventListener('submit', function(e) {
  e.preventDefault();
  const formData = new FormData(Cform);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);
  result.innerHTML = "Please wait..."

    fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                result.innerHTML = "Form submitted successfully";
            } else {
                console.log(response);
                result.innerHTML = json.message;
            }
        })
        .catch(error => {
            console.log(error);
            result.innerHTML = "Something went wrong!";
        })
        .then(function() {
            Cform.reset();
            setTimeout(() => {
                result.style.display = "none";
                document.body.style.overflow = "";
                form.reset();
            }, 3000);
        });
});

// Prevent typing in the date input fields and show date picker on focus

const checkin = document.getElementById('checkin');
const checkout = document.getElementById('checkout');

checkin.addEventListener('keydown', e => e.preventDefault()); // Prevent typing in the input field
checkin.addEventListener('focus', () => checkin.showPicker?.()); // Show date picker on focus
checkout.addEventListener('keydown', e => e.preventDefault()); // Prevent typing in the input field
checkout.addEventListener('focus', () => checkout.showPicker?.()); // Show date picker on focus


// Toggle menu for mobile view
const toggleBtn = document.getElementById('menu-toggle');
const closeBtn = document.getElementById('close-btn');
const nav = document.getElementById('main-nav');
const Moverlay = document.getElementById('menu-overlay');
const body = document.body;

function openMenu() {
    nav.classList.add('open');
    Moverlay.classList.add('show');
    body.classList.add('no-scroll');
}

function closeMenu() {
    nav.classList.remove('open');
    Moverlay.classList.remove('show');
    body.classList.remove('no-scroll');
}

toggleBtn.addEventListener('click', openMenu);
closeBtn.addEventListener('click', closeMenu);
Moverlay.addEventListener('click', closeMenu);

document.querySelectorAll('.main-nav a').forEach(link => {
    link.addEventListener('click', () => {
        closeMenu();
    });
});