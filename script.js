const initialListContent = [ 'milk', 'bread', 'butter', 'apple' ];

const itemsList = document.querySelector('.list ul');
const itemInput = document.querySelector('#new-item-input');

let itemsCount = 1;

document.querySelector('#new-item-button').addEventListener('click', () => handleNewItemEvent());
document.querySelector('#delete-button').addEventListener('click', deleteSelectedItems);

initialListContent.forEach(curTitle => appendNewItem(curTitle));

function handleNewItemEvent() {
    const newItemTitle = itemInput.value;

    if (!newItemTitle) return;

    appendNewItem(newItemTitle);

    itemInput.value = "";
}

function appendNewItem(newItemTitle) {
    const newItemId = `item${itemsCount}`;
    itemsCount++;

    const listItemElement = document.createElement('li');
    listItemElement.setAttribute('id', newItemId);

    const startDiv = document.createElement('div');
    startDiv.classList.add('start');
    const endDiv = document.createElement('div');
    endDiv.classList.add('end');

    const checkBox = document.createElement('input');
    checkBox.setAttribute('type', 'checkbox');
    checkBox.setAttribute('id', `${newItemId}-check`);
    checkBox.dataset.itemId = newItemId;
    const label = document.createElement('label');
    label.setAttribute('for', `${newItemId}-check`);
    label.innerText = newItemTitle;
    const button = document.createElement('button');
    button.innerText = 'X';
    button.classList.add('delete-item-button');
    button.dataset.itemId = newItemId;
    button.addEventListener('click', event => deleteItem(event))

    startDiv.appendChild(checkBox);
    startDiv.appendChild(label);
    endDiv.appendChild(button);
    listItemElement.appendChild(startDiv);
    listItemElement.appendChild(endDiv);
    itemsList.appendChild(listItemElement);
}

function deleteItem(event) {
    const itemId = event.target.dataset.itemId;
    const item = document.getElementById(itemId);
    item.remove();
}

function deleteSelectedItems() {
    const checkBoxes = document.querySelectorAll('.list input[type="checkbox"]');
    const itemsIdsToRemove = [];
    
    for (let i = 0; i < checkBoxes.length; i++) {
        if (checkBoxes[i].checked) {
            itemsIdsToRemove.push(checkBoxes[i].dataset.itemId);
        }
    }

    itemsIdsToRemove.forEach(id => document.getElementById(id).remove());
}