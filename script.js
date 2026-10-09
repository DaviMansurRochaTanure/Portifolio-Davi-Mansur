const botaoTema =
document.getElementById("botaoTema");

const temaSalvo = localStorage.getItem("tema");

if(temaSalvo === "claro")
{
    document.body.classList.add("claro")
}

botaoTema.addEventListener("click", function (){
    document.body.classList.toggle("claro");
    if (document.body.classList.contains("claro")) {
        localStorage.setItem("tema", "claro"); 
    } else {
        localStorage.setItem("tema", "escuro"); 
    }
});


const typingConfigs = [
  {
    elementId: "typing-text",
    phrases: ["Sobre Mim", "About Me", "Minha História"]
  },
  {
    elementId: "Typing-p",
    phrases: ["conhecimento na area de tecnologia em geral", "Desenvolvedor em constante evolução, movido pela curiosidade."]
  },
  {
    elementId: "typing-habilidades",
    phrases: [ "</habilidades>", "// tech_stack", "// o_que_eu_domino"]
  }
];


const TYPING_DELAY = 120;   
const ERASING_DELAY = 60;   
const NEW_TEXT_DELAY = 2500; 


class TypeWriter {
  constructor(element, phrases) {
    this.element = element;
    this.phrases = phrases;

    this.textNode = document.createElement("span");
    this.cursorNode = document.createElement("span");
    this.cursorNode.className = "cursor";

    this.element.textContent = "";
    this.element.appendChild(this.textNode);
    this.element.appendChild(this.cursorNode);

    this.phraseIndex = 0;
    this.characterIndex = 0;
    this.isDeleting = false;

    this.init();
  }

  init() {
    if (this.phrases.length) {
      setTimeout(() => this.type(), 500);
    }
  }

  type() {
    const currentPhrase = this.phrases[this.phraseIndex];

    if (this.isDeleting) {
      this.textNode.textContent = currentPhrase.substring(0, this.characterIndex - 1);
      this.characterIndex--;
    } else {
      this.textNode.textContent = currentPhrase.substring(0, this.characterIndex + 1);
      this.characterIndex++;
    }

    let typeSpeed = this.isDeleting ? ERASING_DELAY : TYPING_DELAY;

    if (!this.isDeleting && this.characterIndex === currentPhrase.length) {
      typeSpeed = NEW_TEXT_DELAY;
      this.isDeleting = true;
    } else if (this.isDeleting && this.characterIndex === 0) {
      this.isDeleting = false;
      this.phraseIndex = (this.phraseIndex + 1) % this.phrases.length;
      typeSpeed = 400;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  typingConfigs.forEach((config) => {
    const el = document.getElementById(config.elementId);
    if (el) {
      new TypeWriter(el, config.phrases);
    }
  });
});


const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible"); 
    } else {
      entry.target.classList.remove("visible"); 
    }
  });
}, {
  threshold: 0.15 
});

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card-scroll");
  cards.forEach((card) => observer.observe(card));
});




document.querySelectorAll('.spotlight-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  });
});