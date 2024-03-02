function add(){
    const input = document.getElementById('input')
    const task = input.value
    const text = task.trim()
    if (text.length < 24 && text != ''){
        addTask(text)
    }
    else{
        alert('Ваша задача либо слишком длинная, либо слишком короткая')
    }
}
function addTask(text) {
        const ul = document.getElementById('list')
        const li = document.createElement('li')
        li.textContent = text

        const checkbox = document.createElement('input')
        checkbox.type = 'checkbox'
        checkbox.id = 'checkbox'
        checkbox.onclick = function() {
            if (checkbox.checked){
                li.style.textDecoration = 'line-through'
            }
            else{
                li.style.textDecoration = 'none'
            }
        }
        li.prepend(checkbox)

        const deleteButton = document.createElement('button')
        deleteButton.id = 'deleteButton'
        deleteButton.textContent = '❌'
        deleteButton.onclick = function() {
            ul.removeChild(li)
        }
        li.append(deleteButton)

        const upButton = document.createElement('button')
        upButton.id = 'upButton'
        upButton.textContent = '↑'
        upButton.onclick = function() {
            const prevLi = li.previousElementSibling;
            if (prevLi) {
                ul.insertBefore(li, prevLi);
            }
        }
        li.append(upButton)

        const downButton = document.createElement('button')
        downButton.id = 'downButton'
        downButton.textContent = '↓'
        downButton.onclick = function() {
            const nextLi = li.nextElementSibling;
            if (nextLi) {
                ul.insertBefore(nextLi,li)
            }
        }
        li.append(downButton)

        ul.append(li)
        input.value = ''
    
}
function save() {
    const listItems = document.querySelectorAll('#list li');
    const texts = Array.from(listItems).map(li => {
        return li.textContent.replace('❌', '').replace('↑', '').replace('↓', '').trim();
    });
    localStorage.setItem('toDoList', JSON.stringify(texts));
}
function saveLocaly() {
    alert('Список задач сохранен')
    save()
}
document.addEventListener('DOMContentLoaded', function() {
    let texts = JSON.parse(localStorage.getItem('toDoList')) || [];

    if (texts.length > 0) {
        for (const task of texts) {
            addTask(task);
        }
    } else {
        // If there are no saved tasks, initialize texts as an empty array
        texts = [];
    }
});
