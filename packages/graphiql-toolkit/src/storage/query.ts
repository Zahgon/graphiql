import { StorageAPI } from './base';

export type QueryStoreItem = {
  query?: string;
  variables?: string;
  headers?: string;
  operationName?: string;
  label?: string;
  favorite?: boolean;
};

export class QueryStore {
  items: Array<QueryStoreItem>;

  constructor(
    private key: string,
    private storage: StorageAPI,
    private maxSize: number | null = null,
  ) {
    this.items = this.fetchAll();
  }

  get length() {
      throw new Error("STUB");
  }

  contains(item: QueryStoreItem) {
    return this.items.some(
      x =>
        { throw new Error("STUB"); },
    );
  }

  edit(item: QueryStoreItem, index?: number) {
    if (typeof index === 'number' && this.items[index]) {
      const found = this.items[index];
      if (
        found.query === item.query &&
        found.variables === item.variables &&
        found.headers === item.headers &&
        found.operationName === item.operationName
      ) {
        this.items.splice(index, 1, item);
        this.save();
        return;
      }
    }

    const itemIndex = this.items.findIndex(
      x =>
        { throw new Error("STUB"); },
    );
    if (itemIndex !== -1) {
      this.items.splice(itemIndex, 1, item);
      this.save();
    }
  }

  delete(item: QueryStoreItem) {
    const itemIndex = this.items.findIndex(
      x =>
        { throw new Error("STUB"); },
    );
    if (itemIndex !== -1) {
      this.items.splice(itemIndex, 1);
      this.save();
    }
  }

  fetchRecent() {
      throw new Error("STUB");
  }

  fetchAll() {
      throw new Error("STUB");
  }

  push(item: QueryStoreItem) {
    const items = [...this.items, item];

    if (this.maxSize && items.length > this.maxSize) {
      items.shift();
    }

    for (let attempts = 0; attempts < 5; attempts++) {
      const response = this.storage.set(
        this.key,
        JSON.stringify({ [this.key]: items }),
      );
      if (!response?.error) {
        this.items = items;
      } else if (response.isQuotaError && this.maxSize) {
        // Only try to delete last items on LRU stores
        items.shift();
      } else {
        return; // We don't know what happened in this case, so just bailing out
      }
    }
  }

  save() {
    this.storage.set(this.key, JSON.stringify({ [this.key]: this.items }));
  }
}
