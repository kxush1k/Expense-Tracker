document.addEventListener("DOMContentLoaded", () => {
  const expenseform = document.querySelector(".form_elements");
  const expencename = document.querySelector(".Expence_name");
  const expenceamount = document.querySelector(".Expence_amount");
  const addedexpenselist = document.querySelector(".addedexpense_list");
  const totalamount = document.querySelector(".total_amount");
  let expenses = JSON.parse(localStorage.getItem("expense")) || [];
  let total = calculatetotal();
  expenseform.addEventListener("submit", () => {
    event.preventDefault();
    const name = expencename.value.trim();
    const amount = parseFloat(expenceamount.value);
    if (name !== "" && !isNaN(amount) && amount > 0) {
      const newexpence = {
        id: Date.now(),
        name: name,
        amount: amount,
      };
      expenses.push(newexpence);
      saveexpense();
      updatetotal();
      renderexpences();
      expencename.value = "";
      expenceamount.value = "";
    }
  });
  function renderexpences() {
    addedexpenselist.innerHTML = "";
    expenses.forEach((expense) => {
      const li = document.createElement("li");
      li.innerHTML = `
      <span>${expense.name} - ${expense.amount}</span> <button data-id=${expense.id}>Remove</button>`;
      addedexpenselist.appendChild(li);
    });
  }
  function saveexpense() {
    localStorage.setItem("expense", JSON.stringify(expenses));
  }
  function calculatetotal() {
    return expenses.reduce((Sum, expense) => Sum + expense.amount, 0);
  }
  function updatetotal() {
    total = calculatetotal();
    totalamount.textContent = total.toFixed(2);
  }
  addedexpenselist.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const deleteexpense = parseInt(e.target.getAttribute("data-id"));
      expenses = expenses.filter((expense) => expense.id !== deleteexpense);
      saveexpense();
      updatetotal();
      renderexpences();
    }
  });
  updatetotal();
  renderexpences();
});
