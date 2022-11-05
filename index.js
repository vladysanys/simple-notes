const tasks = []
const error = document.createElement('span')
const createTaskBlock = document.querySelector('.create-task-block')
const errorCheck = (value) => {
    if(!value) {
        error.className = 'error-message-block'
        error.textContent = 'Название задачи не должно быть пустым'
        createTaskBlock.append(error)
        return true
    }
    return false
}
const taskList = document.querySelector('.tasks-list')
const errorTwo = document.createElement('span')
const newTask = document.querySelector('.create-task-block__input')
const createTaskBlockButton = document.querySelector('.create-task-block__button')
const modalOverlay = document.createElement('div')
modalOverlay.className = 'modal-overlay modal-overlay_hidden'

const deleteModal = document.createElement('div')
deleteModal.className = 'delete-modal'

const modalQuestion = document.createElement('h3')
modalQuestion.className = 'delete-modal__question'
modalQuestion.textContent = 'Вы действительно хотите удалить эту задачу?'

const deleteModalButtons = document.createElement('div')
deleteModalButtons.className = 'delete-modal__buttons'

const deleteModalButton1 = document.createElement('button')
deleteModalButton1.className = 'delete-modal__button delete-modal__cancel-button'
deleteModalButton1.textContent = 'Отмена'

const deleteModalButton2 = document.createElement('button')
deleteModalButton2.className = 'delete-modal__button delete-modal__confirm-button'
deleteModalButton2.textContent = 'Удалить'

taskList.addEventListener('click', (event) => {
    const {target} = event
    const buttonDelete = event.target.closest('.task-item__delete-button')
    buttonDelete.append(modalOverlay)
    modalOverlay.append(deleteModal)
    deleteModal.append(modalQuestion, deleteModalButtons)
    deleteModalButtons.append(deleteModalButton1, deleteModalButton2)
    if(buttonDelete) {
        modalOverlay.className = 'modal-overlay'
    }
    const buttonAbolition = event.target.closest('.delete-modal__cancel-button')
    if(buttonAbolition) {
        modalOverlay.className = 'modal-overlay modal-overlay_hidden'
    }
    const buttonConfirm = event.target.closest('.delete-modal__confirm-button')
    if (buttonConfirm) {
        const deleteModalButton23 = event.target.closest('.task-item')
        deleteModalButton23.remove()
        const idDeleteTask = deleteModalButton23.dataset.taskId
        console.log(idDeleteTask)
        tasks.forEach((item,i) => {
            if(idDeleteTask === tasks[i].id) {
                tasks.splice(tasks[i],1)
            }
        })
    }
})
createTaskBlockButton.addEventListener('click', (event) => {
    event.preventDefault();
    const newTaskText = (newTask.value || '').trim()
    const isTaskExists = tasks.some((task) => task.text === newTaskText)
    const isValid = errorCheck(newTask.value)
    if(isTaskExists) {
        error.className = 'error-message-block'
        error.textContent = 'Такая задача уже есть!'
        createTaskBlock.append(error)
    }
    if(isValid || isTaskExists) {
    } else {
    error.remove()
    const taskItem = document.createElement('div')
    taskItem.className = 'task-item'
    const id = Date.now()
    taskItem.dataset.taskId = `${id}`
        const newTaskItem = {
            id: `${id}`,
            completed: false,
            text: `${newTask.value}`,
            }
        tasks.push(newTaskItem)
        taskItem.innerHTML = 
        `<div class="task-item__main-container">
            <div class="task-item__main-content">
                <form class="checkbox-form">
                    <input class="checkbox-form__checkbox" type="checkbox"
        id="task-${id}">
                    <label for="task-${id}"></label>
                </form>
                <span class="task-item__text">${newTask.value}</span>
        </div>
        <button class="task-item__delete-button default-button
            delete-button" data-delete-task-id="5">Удалить
        </button>
        </div>`
        taskList.append(taskItem)
    }
})
