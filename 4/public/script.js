const form = document.getElementById('employeeForm');
const updateForm = document.getElementById('updateForm');
const deleteForm = document.getElementById('deleteForm');
const employeeInfo = document.getElementById('employeeInfo');
const getEmployeeForm = document.getElementById('getEmployeeForm');


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

getEmployeeForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const employeeId = getEmployeeForm.elements.employeeId.value;

  fetch(`/employees/${employeeId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Employee not found');
      }
      return response.json();
    })
    .then((data) => {
      employeeInfo.innerHTML = `
        <p>Employee details:</p>
        <p>ID: ${data.id}</p>
        <p>Name: ${data.name}</p>
        <p>Role: ${data.role}</p>
        <p>Department: ${data.department}</p>
      `;
      getEmployeeForm.reset();
    })
    .catch((error) => {
      employeeInfo.innerHTML = `<p>Error: ${error.message}</p>`;
    });
});

// Function to get all employee details
function getAllEmployees() {
  fetch('/employees')
    .then((response) => response.json())
    .then((data) => {
      let employeesList = "<h1>All Employees</h1>";
      data.forEach((employee) => {
        employeesList += `
          <p>ID: ${employee.id}</p>
          <p>Name: ${employee.name}</p>
          <p>Role: ${employee.role}</p>
          <p>Department: ${employee.department}</p>
          <hr>
        `;
      });
      employeeInfo.innerHTML = employeesList;
    })
    .catch((error) => {
      employeeInfo.innerHTML = `<p>Error: ${error.message}</p>`;
    });
}

// Add click event listener to the "Get All Employee Details" button
const getAllEmployeesButton = document.getElementById('getAllEmployeesButton');
getAllEmployeesButton.addEventListener('click', getAllEmployees);


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
    body: JSON.stringify({ name: updateName, role: updateRole, department: updateDepartment }),
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


