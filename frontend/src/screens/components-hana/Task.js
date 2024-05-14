import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DoneIcon from '@mui/icons-material/Done';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

// a singular task component that can be edited and deleted
const Task = ({tabs, setTabs, currentTab, task}) => {

    // if "EDIT" button is clicked
    function editTask(task_id) {

        const new_tabs = [...tabs];
        const selectedTab = new_tabs.find((tabs) => tabs.id === currentTab);
        const new_task = selectedTab.tasks.find((obj) => obj.id === task_id);

        if (new_task.hidden === true) {
            new_task.hidden = false;
        }
        new_task.edit_mode = true;
        
        setTabs(new_tabs);

    }

    // if "SAVE" button is clicked
    function saveTask(task_id) {

        const new_tabs = [...tabs];
        const selectedTab = new_tabs.find((tabs) => tabs.id === currentTab);
        const new_task = selectedTab.tasks.find((obj) => obj.id === task_id);

        // updates task name
        const name = document.getElementById("task-name-edit");
        if (name.value !== "") {
            new_task.name = name.value;
        }

        // updates task description
        const description = document.getElementById("task-description-edit");
        if (description.value !== "") {
            new_task.description = description.value;
        }

        // updates due date
        const date = document.getElementById("task-due-date-edit");
        if (date.value !== "") {
            new_task.due_date = date.valueAsDate;
        }

        new_task.edit_mode = false;
        
        setTabs(new_tabs);

    }

    // if "DELETE" button is clicked
    function deleteTask(task_id) {

        const new_tabs = [...tabs];
        const selectedTab = new_tabs.find((tabs) => tabs.id === currentTab);
        // deletes task from current tab's task list
        const new_task = selectedTab.tasks.filter((obj) => obj.id !== task_id);
        selectedTab.tasks = new_task;
        setTabs(new_tabs);

    }

    // when you tick a checkbox
    // this makes sure that the checked state doesn't carry over to other tabs
    function setChecked(task_id) {
        
        const new_tabs = [...tabs];
        const selectedTab = new_tabs.find((tabs) => tabs.id === currentTab);
        const new_task = selectedTab.tasks.find((obj) => obj.id === task_id);
        // changes checked state
        new_task.checked = !new_task.checked;
        setTabs(new_tabs);

    }

    // hides and unhides the task information
    function dropdown(task_id) {

        const new_tabs = [...tabs];
        const selectedTab = new_tabs.find((tabs) => tabs.id === currentTab);
        const new_task = selectedTab.tasks.find((obj) => obj.id === task_id);

        if (new_task.hidden === true) {
            new_task.hidden = false;

        } else {
            new_task.hidden = true;
        }

        setTabs(new_tabs);

    }

    
    return (
        <div className="flex justify-around m-1">
            <div className="w-5/6">
                <div id="task-name" className="flex justify-between p-2 bg-[#495253]">
                    {/* div that contains checkbox and task name*/}
                    <div>
                        <input
                            type="checkbox"
                            checked={task.checked}
                            onChange={() => setChecked(task.id)}
                        ></input>
                        {task.edit_mode === false
                        ? <label
                            id="task-name"
                            className="p-2 text-[#D7C4A9]"
                        >{task.name}</label>
                        : <textarea
                            id="task-name-edit"
                            placeholder={task.name}
                            className="mx-2 bg-[#687172] text-[#D7C4A9] h-6"
                        ></textarea>}
                    </div>
                    {/* dropdown button that show details of the task */}
                    {task.hidden === true
                    ? <button
                        onClick={() => dropdown(task.id)}
                        className="text-[#D7C4A9]"
                    >&lt;</button>
                    : <button
                        onClick={() => dropdown(task.id)}
                        className="text-[#D7C4A9] font-bold"
                    >V</button>}
                </div>
                {/* hides and unhides the task information */}
                {task.hidden === true
                ? <div></div>
                : <div id="task-info" className="py-2 px-3 bg-[#687172]">
                    {/* when the task is in edit mode */}
                    {task.edit_mode === false
                    ? <h3
                        id="task-description"
                        className="text-[#D7C4A9]"
                    >Description: {task.description}</h3>
                    : <div>
                        <label
                            className="text-[#D7C4A9]"
                        >Description: </label>
                        <textarea
                            id="task-description-edit"
                            placeholder={task.description}
                            className="bg-[#495253] text-[#D7C4A9] h-6"
                        ></textarea>
                    </div>}
                    {task.edit_mode === false
                    ? <h3
                        id="task-due-date"
                        className="text-[#D7C4A9]"
                    >Due date: {task.due_date.toDateString()}</h3>
                    : <div>
                        <label
                            className="text-[#D7C4A9]"
                        >Due date: </label>
                        <input
                            type="date"
                            id="task-due-date-edit"
                            className="bg-[#495253] text-[#D7C4A9]"
                        ></input>
                    </div>}
                </div>
                }
            </div>
            <div className="flex flex-col">
                {/* edits current task */}
                {task.edit_mode === false
                ? <button
                    onClick={() => editTask(task.id)}
                    className="font-bold"
                ><DriveFileRenameOutlineIcon/></button>
                : <button
                    onClick={() => saveTask(task.id)}
                    className="font-bold"
                ><DoneIcon/></button>}

                {/* deletes current task */}
                <button
                    onClick={() => deleteTask(task.id)}
                    className="font-bold"
                ><DeleteOutlineIcon/></button>
            </div>
        </div>
    )
}

export default Task;