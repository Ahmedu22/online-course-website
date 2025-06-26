document.addEventListener("DOMContentLoaded", () => {
  fetch("data.json")
    .then(res => res.json())
    .then(data => {
      if (document.getElementById("courses-list")) {
        renderCourses(data.courses);
        addCourseFilter(data.courses);
      }
      if (document.getElementById("mentors-list")) {
        renderMentors(data.mentors);
      }
    });

  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();
      if (!name || !email || !message) {
        showFeedback("Please fill all fields", "red");
      } else {
        showFeedback("Thanks! We'll respond shortly.", "green");
        form.reset();
      }
    });
  }
});

function renderCourses(courses) {
  const container = document.getElementById("courses-list");
  container.innerHTML = courses.map(c => `
    <div class="card">
      <h3>${c.title}</h3>
      <p>${c.description}</p>
      <p><strong>Level:</strong> ${c.level}</p>
      <button onclick="alert('Enrolled in ${c.title}!')">Enroll</button>
    </div>`).join('');
}

function renderMentors(mentors) {
  const container = document.getElementById("mentors-list");
  container.innerHTML = mentors.map(m => `
    <div class="card">
      <h3>${m.name}</h3>
      <p>${m.bio}</p>
      <p><strong>Expertise:</strong> ${m.expertise}</p>
      <p>⭐ ${m.rating} / 5</p>
    </div>`).join('');
}

function addCourseFilter(courses) {
  const searchInput = document.getElementById("searchInput");
  const levelFilter = document.getElementById("levelFilter");

  const filter = () => {
    const keyword = searchInput.value.toLowerCase();
    const level = levelFilter.value;
    const filtered = courses.filter(c =>
      c.title.toLowerCase().includes(keyword) &&
      (level === "" || c.level === level)
    );
    renderCourses(filtered);
  };

  searchInput.addEventListener("input", filter);
  levelFilter.addEventListener("change", filter);
}

function showFeedback(message, color) {
  const el = document.getElementById("formFeedback");
  el.innerText = message;
  el.style.color=color;
}