const API_URL = "https://jsonplaceholder.typicode.com/todos";

const notificationCount = document.getElementById("notificationCount");
const notificationList = document.getElementById("notificationList");
const refreshBtn = document.getElementById("refreshBtn");
const simulateBtn = document.getElementById("simulateBtn");

let notifications = [
  { id: 1, emoji: "❤️", text: "❤️ Rahul liked your post" },
  { id: 2, emoji: "💬", text: "💬 Aman commented on your post" },
  { id: 3, emoji: "👤", text: "👤 Priya followed you" },
];

function updateNotificationCount() {
  notificationCount.textContent = notifications.length;
}

setInterval(() => {}, 1000)

function showLoading() {
  notificationList.innerHTML = "<div class='state-message'>Loading notifications...</div>";
}

function showError() {
  notificationList.innerHTML = "<div class='state-message error'>❌ Unable to load notifications.<br>Please try again.</div>";
}

 function displayNotifications() {
  notificationList.innerHTML = "";

  if (!notifications.length) {
    notificationList.innerHTML = "<div class='empty-state'>No notifications right now.</div>";
    updateNotificationCount();
    return;
  }

  notifications.forEach( (notification) => {
    const item = document.createElement("div");
    item.className = "notification-item";
    item.innerHTML = `
      <span class="notification-emoji">${notification.emoji}</span>
      <span>${notification.text}</span>
    `;
    notificationList.appendChild(item);
     setTimeout(() => {
        updateNotificationCount();
    }, 1000);
  });
  
}

function simulateNotification() {
  const newNotification = {
    id: Date.now(),
    emoji: "✨",
    text: "✨ New activity: You just received a new notification",
  };

  notifications.push(newNotification);
  displayNotifications();
}

const getNotifications = async () => {
  showLoading();

  try {
    // fetch() sends a request to the API and returns a Promise.
    const response = await fetch(API_URL);

    // await waits until the Promise finishes.
    // response.json() turns the API response into JavaScript data.
    const todos = await response.json();

    // filter() keeps only the completed tasks.
    const completedTodos = todos.filter((todo) => todo.completed);

    notifications = completedTodos.slice(0, 6).map((todo, index) => {
      const icons = ["❤️", "💬", "👤", "📢", "✨", "🔥"];
      const emoji = icons[index % icons.length];

      return {
        id: todo.id,
        emoji: emoji,
        text: `${emoji} ${todo.title}`,
      };
    });

    displayNotifications();
  } catch (error) {
    console.log(error);
    showError();
  }
};

refreshBtn.addEventListener("click", getNotifications);
simulateBtn.addEventListener("click", simulateNotification);

document.addEventListener("DOMContentLoaded", () => {
  displayNotifications();
  getNotifications();
});
