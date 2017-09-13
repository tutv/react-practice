class StorageService {
    _prefix = 'com.todo.max.';

    _getRealKey(key) {
        return this._prefix + key;
    }

    remove(key) {
        return localStorage.removeItem(this._getRealKey(key));
    }

    get(key, defaultValue = null) {
        const value = localStorage.getItem(this._getRealKey(key)) || defaultValue;

        try {
            return JSON.parse(value);
        } catch (e) {
            return value;
        }
    }

    set(key, value) {
        const type = typeof(value);
        if (type === 'object') {
            value = JSON.stringify(value);
        }

        return localStorage.setItem(this._getRealKey(key), value);
    }
}

export default new StorageService();