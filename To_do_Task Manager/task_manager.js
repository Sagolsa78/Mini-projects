
const fs=require("fs");

let task=loadtask();

const[,,command,  ...args]=process.argv;


switch(command){
    case"add":
      addtask(args.join(""));
      break;
    case"list":
      listtask();
      break;
    case "complete":
        completetask(args[0]);
        break;
    case "delete":
        deletetask(args[0]);
        break;
    default:
        console.log("invalid command");
        console.log("please enter a valid commands");


}

function loadtask(){
    try{
        const data=fs.readFileSync("task.json",'utf-8');
        return JSON.parse(data);

    } catch(err){
        return[];

    }
}

function savetask(){
    fs.writeFileSync("task.json",JSON.stringify(task,null,2))
}

function addtask(title){
    const newtask={title,completed:false};
    task.push(newtask);
    savetask();
    console.log(`task added:${title}`);

}

function listtask(){
    if (task.length===0){
        console.log("no task found.");

    }else{
        console.log("task:");
        task.forEach((task,index)=>{
            const status= task.comleted?"[x]":"[]";
            console.log(`${index+1}.${status} ${task.title}`);
        });

    }
}

function completetask (taskid){
    taskid=parseInt(taskid);
    if(Number.isInteger(taskid)&&taskid>0&&taskid<=task.length){
        task[taskid-1].compeleted=true;
        savetask();
        console.log(`marked task'${task[taskid].title}'as complete.`);

    }else{
        console.log("invalid task id.");

    }

}

function deletetask(taskid){
    taskid=parseInt(taskid);
    if (Number.isInteger(taskid)&&taskid>0 &&  taskid<=task.length){
        const deletetak=task.splice(taskid -1,1);
        savetask();
        console.log(`task "${deletetask[0].title}" deleted`);

    }else{
        console.log("invalid task id ");

    }
}
