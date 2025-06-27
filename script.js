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
  const feedback = document.getElementById("formFeedback");
  const display = document.getElementById("messageDisplay");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      if (!name || !email || !message) {
        showFeedback("Please fill in all fields", "red");
        return;
      }

      showFeedback("Thanks! Your message has been saved below.", "green");
      renderUserMessage(name, email, message);
      form.reset();
    });
  }

  function showFeedback(msg, color) {
    feedback.innerText = msg;
    feedback.style.color = color;
  }

  function renderUserMessage(name, email, message) {
    display.innerHTML = `
      <div class="card">
        <h3>${name}</h3>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> <span id="userMessage">${message}</span></p>
        <button onclick="editMessage()">Edit</button>
        <button onclick="deleteMessage()">Delete</button>
      </div>
    `;
  }

  window.editMessage = function () {
    if (confirm("Do you want to edit your message?")) {
      const current = document.getElementById("userMessage").innerText;
      const newMessage = prompt("Edit your message:", current);
      if (newMessage !== null && newMessage.trim() !== "") {
        document.getElementById("userMessage").innerText = newMessage;
        alert("Message updated!");
      }
    }
  };

  window.deleteMessage = function () {
    if (confirm("Are you sure you want to delete this message?")) {
      display.innerHTML = "";
      alert("Message deleted.");
}
};




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
});