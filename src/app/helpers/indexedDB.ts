const dbName = 'dt-database';

export const initializeDB = (): Promise<void> => {
    return new Promise((resolve, reject) => {
        const openRequest = indexedDB.open(dbName, 2);
    
        openRequest.onupgradeneeded = function(e) {
          const db = (<IDBOpenDBRequest>e.target).result;
    
          if (!db.objectStoreNames.contains("tokens")) {
            db.createObjectStore("tokens");
          }
        };
    
        openRequest.onsuccess = function(e) {
          console.log("DB initialized");
          resolve();
        };
    
        openRequest.onerror = function(e) {
          console.error("Error initializing DB", e);
          reject(e);
        };
    })
}

export const getTokenFromIndexedDB = (): Promise<string> => {
    return new Promise((resolve, reject) => {
        const openRequest = indexedDB.open(dbName, 2);

        openRequest.onsuccess = function(e) {
            const db = (<IDBOpenDBRequest>e.target).result;
            const transaction = db.transaction(["tokens"], "readonly");
            const store = transaction.objectStore("tokens");
            const getRequest = store.get("dt-token");
            
            getRequest.onsuccess = function() {
                resolve(getRequest.result as string);
            };

            getRequest.onerror = function(error) {
                reject("Error getting token from IndexedDB");
            };
        };

        openRequest.onerror = function(error) {
            reject("Error opening IndexedDB");
        };
    });
}

export const setTokenInIndexedDB = (token: string): void => {
    const storeName = "tokens";
    
    let db;
    
    const openRequest = indexedDB.open(dbName, 2);
    
    openRequest.onupgradeneeded = function(e) {
        db = (<IDBOpenDBRequest>e.target).result;
    
        if (!db.objectStoreNames.contains(storeName)) {
            db.createObjectStore(storeName);
        }
    };
    
    openRequest.onsuccess = function(e) {
        db = (<IDBOpenDBRequest>e.target).result;
    
        const transaction = db.transaction([storeName], "readwrite");
        const store = transaction.objectStore(storeName);
        store.put(token, "dt-token");
    };
    
    openRequest.onerror = function(e) {
        console.error("Error opening database:", (<IDBOpenDBRequest>e.target).error);
    };
}

export const removeTokenFromIndexedDB = (): Promise<void> => {
    return new Promise((resolve, reject) => {
        const openRequest = indexedDB.open(dbName, 2);

        openRequest.onsuccess = function(e) {
            const db = (<IDBOpenDBRequest>e.target).result;
            const transaction = db.transaction(["tokens"], "readwrite");
            const store = transaction.objectStore("tokens");
            const deleteRequest = store.delete("dt-token");
            
            deleteRequest.onsuccess = function() {
                resolve();
            };

            deleteRequest.onerror = function(error) {
                reject("Error deleting token from IndexedDB");
            };
        };

        openRequest.onerror = function(error) {
            reject("Error opening IndexedDB");
        };
    });
}
