const STORAGE_KEY = 'Clara';

const localStorageManager = {
    getAllData() {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    },

    getItem(key) {
        const data = this.getAllData();
        return data[key];
    },

    setItem(key, value) {
        const data = this.getAllData();
        data[key] = value;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    },

    removeItem(key) {
        const data = this.getAllData();
        delete data[key];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    },

    clear() {
        localStorage.removeItem(STORAGE_KEY);
    },
};

export default localStorageManager;
