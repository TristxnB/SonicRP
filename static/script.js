let isCreateOpen = false

document.getElementById("addPost").addEventListener("click", create);

function create(){
    if(isCreateOpen){
        isCreateOpen = false
        document.getElementById("create").style.display = "none"
    }else{
        isCreateOpen = true
        document.getElementById("create").style.display = "flex"
    }
}