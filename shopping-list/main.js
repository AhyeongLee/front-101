const addBtn = document.querySelector('.addBtn');
const itemInput = document.querySelector('input');
const items = document.querySelector('.items');

function createNewLi() {
    if(itemInput.value=='') {
        return;
    }
    const newItem = document.createElement('li');
    const newSpan = document.createElement('span');
    newSpan.innerHTML=itemInput.value;

    const newDeletBtn = document.createElement('img');
    newDeletBtn.setAttribute('src', 'trash-can.png');
    

    newItem.appendChild(newSpan);
    newItem.appendChild(newDeletBtn);
    
    items.appendChild(newItem);

    newItem.scrollIntoView({block: 'center', behavior: 'smooth'});
    
    itemInput.value='';
}

addBtn.addEventListener('click', (e) => {
    createNewLi();
    itemInput.focus();
});

itemInput.addEventListener('keyup', (e) => {
    if(e.key=='Enter') {
        createNewLi();
    }
});

items.addEventListener('click', (e) => {
    if (e.target.tagName == 'IMG'){
        items.removeChild(e.target.parentNode);
    }
});