const table = document.createElement("table");
document.body.appendChild(table);
//tr:
const tr1 = document.createElement("tr");
const tr2 = document.createElement("tr");

//td:
const td1 = document.createElement("td");
const td2 = document.createElement("td");
const td3 = document.createElement("td");
const td4 = document.createElement("td");

//appendChild, tr to table 
table.appendChild(tr1);
table.appendChild(tr2);

//appendChild, td to tr
tr1.appendChild(td1);
tr2.appendChild(td2);
tr2.appendChild(td3);
tr2.appendChild(td4);


const txt_title = document.createElement("textarea");
const txt_add_task = document.createElement("textarea");
const txt_the_task = document.createElement("textarea");
const txt_complete_task = document.createElement("textarea");


const button_add = document.createElement("input");
button_add.type= "button";
button_add.value = "add";
button_add.addEventListener("click", add_task);


const the_task = document.createElement("input");
the_task.type = "text";


txt_title.value = "Check List";
txt_add_task.value = " Click on the button to add   (or simply press Enter)";
txt_the_task.value = "Fill out the thing you need to get done";
txt_complete_task.value = "Click here when you complete it";

txt_title.readOnly = true;
txt_add_task.readOnly = true;
txt_the_task.readOnly = true;
txt_complete_task.readOnly = true;


txt_title.classList.add("txt_class");
txt_title.id = "title";
txt_add_task.classList.add("txt_class");
txt_complete_task.classList.add("txt_class");
txt_the_task.classList.add("txt_class");


txt_complete_task.rows= "4";
txt_add_task.rows= "2";
txt_the_task.rows= "3";


td1.appendChild(txt_title);
td2.appendChild(txt_add_task);
td3.appendChild(txt_the_task);
td4.appendChild(txt_complete_task);
td2.appendChild(button_add);
td3.appendChild(the_task);


document.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        add_task();
    }
});


function add_task()
{

    if (the_task.value == '')
    {
        alert("Please write somthing and then press Enter");
        return;
    }

    const tr_task = document.createElement("tr");
    const td_number = document.createElement("td");
    const td_task = document.createElement("td");
    const td_complete = document.createElement("td");
    const txt_the_task = document.createElement("textarea");
    const txt_the_number_of_the_tesk = document.createElement("textarea");
    const check_box = document.createElement("input");
    check_box.type = "checkbox";

    table.appendChild(tr_task);
    tr_task.appendChild(td_number);
    tr_task.appendChild(td_task);
    tr_task.appendChild(td_complete);
    td_number.appendChild(txt_the_number_of_the_tesk);
    td_task.appendChild(txt_the_task);
    td_complete.appendChild(check_box);

    txt_the_task.classList.add("txt_task");
    txt_the_number_of_the_tesk.classList.add("txt_number");
    txt_the_task.value = the_task.value;
    txt_the_number_of_the_tesk.value = '';
    the_task.value = '';
    
    const button_remove = document.createElement("input");
    button_remove.type = "button";
    button_remove.value = "Remove";
    td_complete.appendChild(button_remove);
    button_remove.style.display = "none";
    check_box.addEventListener("change", function ()
    {
        if (check_box.checked) {
            button_remove.style.display = "";
            button_remove.addEventListener("click", function () {
                check_remove(tr_task);
            });

        }
        else
        {
            button_remove.style.display = "none";
        }
    });
    
    update_task_number()
    save_task();
}

function check_remove(tr_remove )
{
    tr_remove.remove();
    update_task_number();
    save_task();
}

function update_task_number()
{
    const rows = table.getElementsByTagName("tr");
    let taskNumber = 1;
    for (let i = 2; i < rows.length; i++)
    { 
        const td_number = rows[i].getElementsByTagName("td")[0];

        if (td_number && td_number.getElementsByTagName("textarea")[0])
        {
            td_number.getElementsByTagName("textarea")[0].value = taskNumber + ".";
            taskNumber++;
        }
    }
}

function save_task()
{
    const lines = table.getElementsByTagName("tr");
    const arr_save = [];
    for (let i = 2; i < lines.length; i++)
    {
        const td_save = lines[i].getElementsByTagName("td");
        const txt_num_save = td_save[0].getElementsByTagName("textarea")[0].value;
        const txt_task_save = td_save[1].getElementsByTagName("textarea")[0].value;
        const checkbox_save = td_save[2].getElementsByTagName("input")[0].checked; 
        arr_save.push({ txt_num_save, txt_task_save,checkbox_save });

    }
    localStorage.setItem("tasks", JSON.stringify(arr_save));

}


function load_task()
{
    const load_the_tasks = JSON.parse(localStorage.getItem("tasks")) || [];// gets the save tasks (if there are'nt any saves an empty array)
    load_the_tasks.forEach(task =>
    {
        const tr_task = document.createElement("tr");
        const td_number = document.createElement("td");
        const td_task = document.createElement("td");
        const td_complete = document.createElement("td");
        const txt_the_task = document.createElement("textarea");
        const txt_the_number_of_the_task = document.createElement("textarea");
        const check_box = document.createElement("input");
        check_box.type = "checkbox";
        check_box.checked = task.checkbox_save;


        table.appendChild(tr_task);
        tr_task.appendChild(td_number);
        tr_task.appendChild(td_task);
        tr_task.appendChild(td_complete);
        td_number.appendChild(txt_the_number_of_the_task);
        td_task.appendChild(txt_the_task);
        td_complete.appendChild(check_box);

        txt_the_task.classList.add( "txt_task_load");
        txt_the_number_of_the_task.classList.add( "txt_number_load");

        txt_the_task.value = task.txt_task_save;
        txt_the_number_of_the_task.value = task.txt_num_save;

        const button_remove = document.createElement("input");
        button_remove.type = "button";
        button_remove.value = "Remove ";
        td_complete.appendChild(button_remove);
        button_remove.style.display = "none";
        if (check_box.checked)
        {
            button_remove.style.display = "";


        }


        update_task_number();

        check_box.addEventListener("change", function ()
        {
           
            if (check_box.checked) {
                button_remove.style.display = "";

            }
            else {
                button_remove.style.display = "none";
            }
            save_task();
        });
       
        button_remove.addEventListener("click", function () {
            check_remove(tr_task);
        });
    });

}

