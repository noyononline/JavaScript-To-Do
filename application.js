let buttonTextAdd = "Add New";
let buttonTextEdit = "Update Contact";
let nameElement = document.getElementById("name");
let phoneElement = document.getElementById("phone");
let actionButton = document.getElementById("action");
let contactElement = document.getElementById("contacts");
let contactList = [];

let serial = 1;
let editItemSerial = 0;
actionButton.addEventListener("click", function () {
  if (this.innerText === buttonTextAdd) {
    createElement();
  } else if (this.innerText === buttonTextEdit) {
    updateElement(editItemSerial);
  }
});
function updateElement(editItemSerial) {
  contactList.forEach(function (contact, index) {
    if (contact?.id === editItemSerial) {
      contact.name = nameElement.value;
      contact.phone = phoneElement.value;
      return;
    }
  });
  applyDefaultProps();
  renderContacts(contactList);
}

function createElement() {
  if (nameElement.value !== "" && phoneElement.value !== "") {
    const contact = {
      id: serial,
      name: nameElement.value,
      phone: phoneElement.value,
    };
    contactList.push(contact);
    renderContacts(contactList);
    resetFields();
    serial++;
  }
}

function renderContacts(contactList) {
  contactElement.innerHTML = "";
  contactList.forEach(function (contact, index) {
    let liHtmlElement = buildContactList(contact);
    contactElement.appendChild(liHtmlElement);
  });
}

function buildContactList(contact) {
  let liElement = document.createElement("li");
  liElement.id = contact.id;
  liElement.className = "my-[5px]";

  liElement.innerHTML = `
        <div class="flex justify-between p-[10px] bg-blue-200 w-[300px]" id="${contact.id}">
            <div class="" id="contactInfo">
                <h2>ID : ${contact.id}</h2>
                <h2>NAME : ${contact.name}</h2>
                <h3>PHONE : ${contact.phone}</h3>
            </div>

            <div>
                <button class="bg-blue-500 p-2 my-2" onClick="editItem(this, ${contact.id});">
                    Edit
                </button>
                <button class="bg-green-500 p-2 my-2" onClick="deleteItem(this, ${contact.id});">
                    Delete
                </button>
            </div>
        </div>
    `;
  return liElement;
}

function deleteItem(element, itemId) {
  contactList = contactList.filter((item) => item.id !== itemId);
  element.parentElement.parentElement.parentElement.remove();
}

function editItem(element, itemId) {
  let editItem = contactList.find((item) => item.id === itemId) || { id: 0 };
  if (editItem?.id !== 0) {
    editItemSerial = editItem?.id;
    applyEditProps();
    nameElement.value = editItem?.name;
    phoneElement.value = editItem?.phone;
  }
}

function resetFields() {
  nameElement.value = "";
  phoneElement.value = "";
}
function applyDefaultProps() {
  resetFields();
  actionButton.innerText = buttonTextAdd;
  actionButton.classList.remove("bg-red-500");
  actionButton.classList.add("bg-green-500");
}

function applyEditProps() {
  actionButton.innerText = buttonTextEdit;
  actionButton.classList.remove("bg-green-500");
  actionButton.classList.add("bg-red-500");
}
