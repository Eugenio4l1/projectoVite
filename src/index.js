import data from './data.json';

const users = [...data.users];

const userList = document.getElementById('userList');
const nameInput = document.getElementById('nameInput');

function renderUsers() {
  userList.innerHTML = '';
  users.forEach(user => {
    const listItem = document.createElement('li');
    listItem.textContent = user.name;
    userList.appendChild(listItem);
  });
  console.clear();
  console.log(users);
}

nameInput.addEventListener('keydown', (event) => {
  if (event.key !== 'Enter') return;

  const name = nameInput.value.trim();
  if (!name) return;

  users.push({ name });
  renderUsers();

  nameInput.value = '';
});

renderUsers();