const addBtn = document.querySelector('.addBtn');
const itemInput = document.querySelector('input');
const items = document.querySelector('.items');

function deleteButtonClick(e) {
    e.parentNode.parentNode.removeChild(e.parentNode);
}
function createNewLi() {
    if(itemInput.value=='') {
        return;
    }
    const newItem = document.createElement('li');
    const newSpan = document.createElement('span');
    newSpan.innerHTML=itemInput.value;

    const newDeletBtn = document.createElement('img');
    newDeletBtn.setAttribute('src', 'trash-can.png');
    newDeletBtn.setAttribute('onclick', 'deleteButtonClick(this)');

    newItem.appendChild(newSpan);
    newItem.appendChild(newDeletBtn);
    
    items.appendChild(newItem);
    
    itemInput.value='';
}

addBtn.addEventListener('click', (e) => {
    createNewLi();
});

itemInput.addEventListener('keyup', (e) => {
    if(e.key=='Enter') {
        createNewLi();
    }
});