const lista = document.getElementById("lista");
const inputDescricao = document.getElementById("inputDescricao");
const btAdicionar = document.getElementById("btAdicionar");


const taskUrl = "https://parseapi.back4app.com/classes/lista";
const headers = {
  "X-Parse-Application-Id": "5XvUo93NelN1i745o3PzJZLAnWeV2nrdq8Btqcjc",
  "X-Parse-REST-API-Key": "LbdScYICdEHMiBmvAGVq4ylcoY18TWBQeRkDiXVu"
};

const renderizaLista = (lista, tarefas) => {
  lista.innerHTML = "";
  tarefas.forEach((tarefa) => {
    const itemText = document.createTextNode(
      `${tarefa.description} `
    );
    const buttonDelete = document.createElement("button");
    buttonDelete.innerHTML = "Remover";
    buttonDelete.onclick = () => deleteTask(tarefa.objectId);
    const checkboxDone = document.createElement("input");
    checkboxDone.type = "checkbox";
    checkboxDone.checked = tarefa.done;
    checkboxDone.onchange = () => updateTask(tarefa, checkboxDone.checked);
    const listItem = document.createElement("li");
    listItem.appendChild(checkboxDone)
    listItem.appendChild(itemText);
    if (checkboxDone.checked === true) {
      listItem.classList.add("risco")
    }
    listItem.appendChild(buttonDelete);
    lista.appendChild(listItem);
  });
};

const getTasks = () => {
  fetch(taskUrl, { headers: headers })
    .then((res) => res.json())
    .then((data) => {
      renderizaLista(lista, data.results);
    });
};

const handleBtAdicionarClick = () => {
  const description = inputDescricao.value;
  if (!description) {
    alert("É necessário digitar uma descrição!");
    return;
  }
  btAdicionar.disabled = true;
  fetch(taskUrl, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ description: description }),
  })
    .then((res) => res.json())
    .then((data) => {
      getTasks();
      btAdicionar.disabled = false;
      inputDescricao.value = "";
      inputDescricao.focus();
      console.log("data", data);
    })
    .catch((err) => {
      btAdicionar.disabled = false;
      console.log(err);
    });
};

const deleteTask = (id) => {
  fetch(`${taskUrl}/${id}`, {
    method: "DELETE",
    headers: headers,
  })
    .then((res) => res.json())
    .then((data) => {
      getTasks();
      console.log("data", data);
    })
    .catch((err) => {
      console.log(err);
    });
};

const updateTask = (task, isChecked) => {
  fetch(`${taskUrl}/${task.objectId}`, {
    method: "PUT",
    headers: headers,
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ done: isChecked }),
  })
    .then((res) => res.json())
    .then((data) => {
      getTasks();
      console.log("data", data);
    })
    .catch((err) => {
      console.log(err);
    });
};

getTasks();

btAdicionar.onclick = handleBtAdicionarClick;