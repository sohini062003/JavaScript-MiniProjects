document.addEventListener("DOMContentLoaded", () => {
    let inputname = document.getElementById("expensename");
    let inputamount = document.getElementById("expenseamt");
    let expense_button = document.getElementById("expensebtn");
    let expense_list = document.getElementById("expense-list");
    let expensedisplay = document.getElementById("expense");
    let totaldisplay = document.getElementById("totalexpense");
    let refresh=document.getElementById("refreshbtn");

    let expense =JSON.parse(localStorage.getItem('expense')) || [];
    let total = 0.0;
    expense.forEach(i => render(i));
    expense_button.addEventListener("click", function (event) {
        event.preventDefault();

        const name = inputname.value.trim();
        const amount = parseFloat(inputamount.value.trim());

        if (name !== "" && !isNaN(amount) && amount > 0) {
            const newExp = {
                id: Date.now(),
                name: name,
                amount: amount,
            };
            expense.push(newExp);
            saveToLocal(expense);

            inputname.value = "";
            inputamount.value = "";

            render(newExp);
            updateTotal();
        }
    });

        function saveToLocal(expense) {
            localStorage.setItem("expense", JSON.stringify(expense));
        }

        function updateTotal() {
            total = expense.reduce((sum, item) => sum + item.amount, 0);
            totaldisplay.textContent = `Total: $${total.toFixed(2)}`;
            totaldisplay.classList.remove("hidden");
        }

        function render(Exp) {
            expensedisplay.classList.remove("hidden");

            const new_list = document.createElement("li");
            new_list.setAttribute("exp-id", Exp.id);

            new_list.innerHTML = `
                <span>${Exp.name}</span>
                <span>$${Exp.amount.toFixed(2)}</span>
                <button class="remove-btn" exp-id="${Exp.id}">Delete</button>
            `;

            expense_list.appendChild(new_list);
        }
        expense_list.addEventListener('click', (e) =>{
            if(e.target.classList.contains("remove-btn")){
                const exp_id= parseInt(e.target.getAttribute("exp-id"));
                removexp(exp_id);
                
            }
        });

        function removexp(id){
            const itemRemove=expense.find(item => item.id === id);

            const item=expense_list.querySelector(`li[exp-id="${id}"]`);
            if(item){
                item.remove();
            }
            expense = expense.filter(t => t.id !== id);
            saveToLocal(expense);
            total=total-itemRemove.amount;
            totaldisplay.textContent = `Total: $${total.toFixed(2)}`;
        }
        refresh.addEventListener('click', () =>{
            if(expense.length!=0){
                localStorage.removeItem("expense");
                expense=[];
                total=0.0;
                expense_list.innerHTML = ""; // Clear the list display
                totaldisplay.textContent = ""; 
                totaldisplay.classList.add("hidden");
                expensedisplay.classList.add("hidden");
            }
            else{
                alert("The data is already empty!");
            }
        })
    
});
