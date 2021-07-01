'use strict';

const toggleBtn = document.getElementById('toggle');
const openModalBtn = document.getElementById('open');
const closeModalBtn = document.getElementById('close');
const modal = document.getElementById('modal');

// *Event Listeners*

// Toggle navigation
toggleBtn.addEventListener('click', () =>
  document.body.classList.toggle('show-nav')
);

// Show modal
openModalBtn.addEventListener('click', () => modal.classList.add('show-modal'));

// Hide modal
closeModalBtn.addEventListener('click', () =>
  modal.classList.remove('show-modal')
);

// Hide modal on outside click
window.addEventListener('click', e =>
  e.target == modal ? modal.classList.remove('show-modal') : false
);
