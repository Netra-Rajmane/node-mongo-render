const form = document.getElementById('itemForm');
const itemsUl = document.getElementById('items');

async function fetchItems() {
  const res = await fetch('/api/items');
  const items = await res.json();

  if (items.length === 0) {
    itemsUl.innerHTML = '<li>No items yet. Add one above!</li>';
    return;
  }

  itemsUl.innerHTML = items
    .map(i => `
      <li>
        <div>
          <strong>${i.name}</strong><br>
          <small>${i.description || 'No description'}</small>
        </div>
        <button onclick="deleteItem('${i._id}')">🗑️</button>
      </li>
    `)
    .join('');
}

async function deleteItem(id) {
  await fetch('/api/items/' + id, { method: 'DELETE' });
  fetchItems();
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const description = document.getElementById('description').value.trim();

  if (!name) return alert('Please enter an item name');

  await fetch('/api/items', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, description })
  });

  form.reset();
  fetchItems();
});

fetchItems();
