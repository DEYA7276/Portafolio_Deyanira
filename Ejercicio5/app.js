const statusElement = document.querySelector("#connection-status");
const messageElement = document.querySelector("#connection-message");

function updateConnectionStatus() {
  const isOnline = navigator.onLine;
  statusElement.dataset.state = isOnline ? "online" : "offline";
  messageElement.textContent = isOnline
    ? "Con conexión a internet"
    : "Sin conexión a internet";
}

window.addEventListener("online", updateConnectionStatus);
window.addEventListener("offline", updateConnectionStatus);
updateConnectionStatus();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    try {
      await navigator.serviceWorker.register("./sw.js");
    } catch (error) {
      console.error("No se pudo registrar el Service Worker:", error);
    }
  });
}
