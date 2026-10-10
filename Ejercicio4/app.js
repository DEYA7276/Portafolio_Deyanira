const workerItem = document.querySelector("#worker-status").closest(".status-item");
const networkItem = document.querySelector("#network-status").closest(".status-item");
const workerStatus = document.querySelector("#worker-status");
const networkStatus = document.querySelector("#network-status");

function updateNetworkStatus() {
    const online = navigator.onLine;
    networkStatus.textContent = online ? "Conexión disponible" : "Sin conexión";
    networkItem.classList.toggle("is-ready", online);
    networkItem.classList.toggle("is-error", !online);
}

updateNetworkStatus();
window.addEventListener("online", updateNetworkStatus);
window.addEventListener("offline", updateNetworkStatus);

if ("serviceWorker" in navigator) {
    window.addEventListener("load", async () => {
        try {
            await navigator.serviceWorker.register("./sw.js");
            await navigator.serviceWorker.ready;
            workerStatus.textContent = "Service worker activo";
            workerItem.classList.add("is-ready");
        } catch (error) {
            workerStatus.textContent = "No se pudo activar el service worker";
            workerItem.classList.add("is-error");
            console.error("Error al registrar o activar el service worker:", error);
        }
    });
} else {
    workerStatus.textContent = "Service worker no disponible";
    workerItem.classList.add("is-error");
}
