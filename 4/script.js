const form = document.getElementById('employeeForm');
const updateForm = document.getElementById('updateForm');
const deleteForm = document.getElementById('deleteForm');
const employeeInfo = document.getElementById('employeeInfo');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const id = form.elements.id.value;
  const name = form.elements.name.value;
  const role = form.elements.role.value;
  const department = form.elements.department.value;

  fetch('/employees', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, name, role, department }),
  })
    .then((response) => response.json())
    .then((data) => {
      employeeInfo.innerHTML = `
        <p>Employee added successfully:</p>
        <p>ID: ${data.id}</p>
        <p>Name: ${data.name}</p>
        <p>Role: ${data.role}</p>
        <p>Department: ${data.department}</p>
      `;
      form.reset();
    })
    .catch((error) => {
      employeeInfo.innerHTML = `<p>Error: ${error.message}</p>`;
    });
});

updateForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const updateId = updateForm.elements.updateId.value;
  const updateName = updateForm.elements.updateName.value;
  const updateRole = updateForm.elements.updateRole.value;
  const updateDepartment = updateForm.elements.updateDepartment.value;

  fetch(`/employees/${updateId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id:updateId,name: updateName, role: updateRole, department: updateDepartment }),
  })
    .then((response) => response.json())
    .then((data) => {
      employeeInfo.innerHTML = `
        <p>Employee updated successfully:</p>
        <p>ID: ${data.id}</p>
        <p>Name: ${data.name}</p>
        <p>Role: ${data.role}</p>
        <p>Department: ${data.department}</p>
      `;
      updateForm.reset();
    })
    .catch((error) => {
      employeeInfo.innerHTML = `<p>Error: ${error.message}</p>`;
    });
});

deleteForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const deleteName = deleteForm.elements.deleteName.value;

  fetch(`/employees/${deleteName}`, {
    method: 'DELETE',
  })
    .then((response) => response.json())
    .then((data) => {
      employeeInfo.innerHTML = `<p>${data.message}</p>`;
      deleteForm.reset();
    })
    .catch((error) => {
      employeeInfo.innerHTML = `<p>Error: ${error.message}</p>`;
    });
});