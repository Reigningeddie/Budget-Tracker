let db;
const request = indexedDB.open("budget", 1);

request.onupgradeneeded = function(event) {
    const db = event.target.result;
    db.createobjectStore("pending", { autoIncrement: true });
};

request.onsuccess = function(event) {
    db = event.target.result;

    if (navigator.onLine) {
        checkDatabase();
    }
};

request.onerror = function(event) {
    console.log("error", event);
};

function saveRecord(record) {
    console.log("saveRecord -> record", record)

    const transaction = db.transaction(["pending"], "readwrite");

    const store = transaction.objectStore("pending");

    store.add(record, {key});
}

function checkDatabase() {
    const db = event.target.result
    const transaction = db.transaction(["pendig"], "readwrite");
    const pendingStore = transaction.objectStore("pending");
    const getAll = pendingStore.getAll();

    getAll.onsuccess = function() {
        if (getAll.result.length > 0) {
            fetch("/api/transaction/bulk", {
                method: "POST",
                body: JSON.stringify(getAll.result),
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json"
                }
            })
            .then(response => response.json())
            .then(() => {
                const clearTransaction = db.transaction(["pending"], "readwrite");
                const pendingStore =
                const clearAll =
            });
        }
    };
}

window.addEventListener("online", checkDatabase);