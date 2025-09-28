import { animate } from "https://cdn.jsdelivr.net/npm/motion@latest/+esm"

// Ecran de chargement
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen')
    
    setTimeout(() => {
        animate(
            loadingScreen,
            {
                opacity: [1, 0],
                scale: [1, 1.5],
                filter: ["blur(0px)", "blur(10px)"]
            },
            {
                duration: 1.2,
                easing: "ease-out"
            }
        ).finished.then(() => {
            loadingScreen.remove()
            animateContent()
        })
    }, 1000)
})

// Chargement du contenu
function animateContent() {
    animate(
        "header",
        { opacity: [0, 1], y: [-20, 0] },
        { duration: 1 }
    )
    animate(
        "main",
        { opacity: [0, 1], y: [20, 0] },
        { duration: 1 }
    )
    animate(
        "section",
        { opacity: [0, 1], y: [20, 0] },
        { duration: 1 }
    )
}

document.addEventListener('DOMContentLoaded', () => {
    const main = document.querySelector('main')
    const section = document.querySelector('section')
    const header = document.querySelector('header')
    
    if (main) main.style.opacity = '0'
    if (section) section.style.opacity = '0'
    if (header) header.style.opacity = '0'
    
    emailjs.init("rFMaONZp_miJbOKEn")
})

// Formulaire de contact
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault()
    
    const submitBtn = document.getElementById('submit-btn')
    const originalText = submitBtn.textContent
    
    submitBtn.textContent = 'Envoi en cours...'
    submitBtn.disabled = true
    submitBtn.classList.add('opacity-50')
    
    const templateParams = {
        from_name: `${this.prenom.value} ${this.nom.value}`,
        from_email: this.email.value,
        message: this.message.value,
        to_email: 'alexandre.drain@epitech.eu'
    }
    
    emailjs.send('service_9onsnqc', 'template_brxd54e', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text)
            document.getElementById('contact-form').reset()
            submitBtn.textContent = 'Message envoyé'
            submitBtn.disabled = true
            submitBtn.classList.remove('opacity-50')
            submitBtn.classList.add('bg-green-600', 'cursor-not-allowed')
        })
        .catch(function(error) {
            console.log('FAILED...', error)
            submitBtn.textContent = originalText
            submitBtn.disabled = false
            submitBtn.classList.remove('opacity-50')
        })
})