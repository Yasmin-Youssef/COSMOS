// WRITE YOUR JS CODE HERE
import {initToday} from './today.module.js';
import { displayLunches } from './launches.module.js';
import { displayPlants } from './plants.module.js';

initToday();
displayLunches();
displayPlants();


const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section[id]");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const sectionId = link.dataset.section;

    sections.forEach((section) => {
      section.classList.add("hidden");
    });

    const targetSection = document.getElementById(sectionId);

    if (targetSection) {
      targetSection.classList.remove("hidden");
    }
  });
});