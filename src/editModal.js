//-----------------------------------------------------------
//Edit Modal Created


const editModal = document.getElementById('editModal');

function openEditModal() {
    editModal.style.display = 'block';
}

function closeEditModal() {
    editModal.style.display = 'none';
}

function editHandleSubmit(event) {
    event.preventDefault();

    const existingData = list_items;

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const leaveDropDown = document.getElementById('leaveDropDown').value;
    const description = document.getElementById('description').value;
    const startDate = startDatePickerInput.value;
    const endDate = endDatePickerInput.value;

    const inputData =
    {
        "firstName": firstName,
        "lastName": lastName,
        "leaveDropDown": leaveDropDown,
        "description": description,
        "startDate": startDate,
        "endDate": endDate
    }

    console.log(inputData);

    existingData.push(inputData);

    const updatedData = JSON.stringify(existingData);
    const parsedData = JSON.parse(updatedData);
    console.log('this is updatedData', updatedData);
    console.log('this is parsedData', parsedData);
    closeEditModal();
}


flatPickrInit();
const openEditModalBtn = document.getElementById('openEditModal');
const closeEditBtn = document.getElementsByClassName('closeEditModal')[0];

openEditModalBtn.addEventListener('click', openEditModal);
closeEditBtn.addEventListener('click', closeEditModal);
window.addEventListener('click', function (event) {
    if (event.target === editModal) {
        closeEditModal();
    }
});

const editForm = document.getElementById('editForm');
editForm.addEventListener('submit', editHandleSubmit);

