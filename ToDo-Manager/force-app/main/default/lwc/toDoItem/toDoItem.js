import { LightningElement , api} from 'lwc';
import updateTodo from "@salesforce/apex/ToDoController.updateTodo";
import deleteTodo from "@salesforce/apex/ToDoController.deleteTodo";


export default class ToDoItem extends LightningElement {
    @api todoId;
    @api todoName;
    @api done = false;

    updateHandler(){
      // construcT an json and serialize it and passing it as payload to our update todo
      const todo ={
          todoId:this.todoId,
          todoName:this.todoName,
          done: !this.done
      };
     updateTodo({payload:JSON.stringify(todo)}).then(result =>{
            console.log("Item updated Successfully");
            // defining our custom event to inform parent component about changes being done in child component
            const updateEvent = new CustomEvent('update');
            this.dispatchEvent(updateEvent);
      }).catch(error =>{
            console.log('Error in Update', error);
        });
    }

    deleteHandler(){
        deleteTodo({todoId:this.todoId}).then(result =>{
             console.log("Item deleted Successfully");
            const deleteEvent = new CustomEvent('update');
            this.dispatchEvent(deleteEvent);
        }).catch(error =>{
           console.log("Error is delete", error);
        });
    }
 
    get containerClass(){
        return this.done ? "todo completed" :"todo upcoming";
    }

    get iconName(){
        return this.done ? "utility:check" :"utility:add";
    }


}