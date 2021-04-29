const db = {
  users: [
    { id: 1, name: 'Fernando Cordero', email: 'fcordero@acid.cl' },
    { id: 2, name: 'Dama Castillo', email: 'damarisc@gmail.com' },
  ],
  brands: [
    { id: 201, name: 'Adodo' },
    { id: 202, name: 'Nite' },
  ],
  categories: [
    { id: 301, name: 'Shoes' },
    { id: 302, name: 'Close' },
  ],
  customers: [
    { id: 10, name: 'Fernando Cordero', email: 'fcordero@acid.cl' },
    { id: 20, name: 'Dama Castillo', email: 'damarisc@gmail.com' },
  ],
  orders: [
    { id: '2021abc', userId: '1', shipping: 19990 },
    { id: '2021abc321', userId: '2', shipping: 19990 },
  ],
  products: [
    { id: 1, sku: '209060', name: 'Some shoes' },
    { id: 2, sku: '209038', name: 'Velvet' },
  ],
};

async function list(table: string) {
  return db[table];
}

async function remove(table: string, id: string) {
  for (let i = 0; i < db[table].length; i++) {
    if (db[table].id == id) {
      const idRemoved = db[table].id;
      delete db[table].id;
      return `Id removed ${idRemoved}`;
    }
  }
}

async function get(table: string, id: string) {
  const col = await list(table);
  return col.filter((item) => item.id == id)[0] || null;
}

async function upsert(table: string, data: any) {
  db[table].push(data);
  return data;
}

module.exports = {
  list,
  remove,
  get,
  upsert,
};
