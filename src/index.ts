import data from './data.json';

console.log(data.users);

const userList = document.createElement('ul');
data.users.forEach(user => {
  const listItem = document.createElement('li');
  listItem.textContent = `${user.name}`;
  userList.appendChild(listItem);
});

document.body.appendChild(userList);