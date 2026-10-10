// ========================================
// REGISTRO DEL SERVICE WORKER
// ========================================

if ('serviceWorker' in navigator) {

    window.addEventListener('load', () => {

        navigator.serviceWorker.register('./sw.js')
            .then(registration => {

                console.log('Service Worker registrado correctamente');
                console.log('Scope:', registration.scope);

            })
            .catch(error => {

                console.error(
                    'Error al registrar el Service Worker:',
                    error
                );

            });

    });

} else {

    console.log('El navegador no soporta Service Worker');

}


// ========================================
// ESTADO DE CONEXIÓN
// ========================================

const conexion = document.getElementById('conexion');

function actualizarConexion() {

    if (navigator.onLine) {
        conexion.textContent = '🟢 Con conexión a Internet';
    } else {
        conexion.textContent = '🔴 Sin conexión - modo offline';
    }

}

actualizarConexion();

window.addEventListener('online', actualizarConexion);
window.addEventListener('offline', actualizarConexion);


// ========================================
// INDEXEDDB
// ========================================

let db;

const request = indexedDB.open('MiPWA_DB', 1);


// Crear base de datos
request.onupgradeneeded = event => {

    db = event.target.result;

    if (!db.objectStoreNames.contains('datos')) {

        db.createObjectStore('datos', {
            keyPath: 'id',
            autoIncrement: true
        });

    }

    console.log('IndexedDB: almacén creado');

};


// Conexión correcta
request.onsuccess = event => {

    db = event.target.result;

    console.log('IndexedDB conectada correctamente');

};


// Error
request.onerror = event => {

    console.error(
        'Error en IndexedDB:',
        event.target.error
    );

};


// ========================================
// GUARDAR DATO
// ========================================

document.getElementById('guardar').addEventListener('click', () => {

    const input = document.getElementById('dato');
    const valor = input.value.trim();

    if (valor === '') {

        alert('Escribe un dato primero');
        return;

    }

    const transaction = db.transaction(
        ['datos'],
        'readwrite'
    );

    const store = transaction.objectStore('datos');

    store.add({
        texto: valor,
        fecha: new Date().toLocaleString()
    });

    transaction.oncomplete = () => {

        console.log('Dato guardado correctamente');

        input.value = '';

        alert('Dato guardado en IndexedDB');

    };

});


// ========================================
// MOSTRAR DATOS
// ========================================

document.getElementById('mostrar').addEventListener('click', () => {

    const transaction = db.transaction(
        ['datos'],
        'readonly'
    );

    const store = transaction.objectStore('datos');

    const request = store.getAll();

    request.onsuccess = () => {

        const resultado = document.getElementById('resultado');

        resultado.innerHTML = '';

        request.result.forEach(dato => {

            const elemento = document.createElement('p');

            elemento.textContent =
                `📌 ${dato.texto} - ${dato.fecha}`;

            resultado.appendChild(elemento);

        });

    };

});
