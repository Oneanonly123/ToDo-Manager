import { LightningElement, track } from 'lwc';
import addTodo from "@salesforce/apex/ToDoController.addTodo";
import getCurrentTodos from "@salesforce/apex/ToDoController.getCurrentTodos";

export default class ToDoManager extends LightningElement {
     time = "12:35";
     greeting = "Good Morning";

    @track todos = [];

  //LifeCycle methods are a part of LWC FrameWork and gets invoked automatically by the frameWork Itself
  // it get called when component is initialized
   connectedCallback() {
    //get current time
    this.getTime();
     this.fetchTodos();

  //  this.populateTodos();
       
    setInterval(() =>{
       this.getTime();
       console.log("setInterval");

    }, 1000 *60);
}

    /* Get time and parse in human readable format
   * It follows 12 hour format
   */
  getTime() {
    const date = new Date(); /* creating object of Date class */
    const hour = date.getHours();
    const min = date.getMinutes();

    this.time = `${this.getHour(hour)}:${this.getDoubleDigit(
      min
    )} ${this.getMidDay(hour)}`;
    //get greeting (mornig/afternoon/evening/)
    this.setGreeting(hour);
  }

  //Convert 24 hours format to 12 hours format
  getHour(hour) {
    return hour == 0 ? 12 : hour > 12 ? hour - 12 : hour;
  }

  //convert single digit to double digit
  getDoubleDigit(digit) {
    return digit < 10 ? "0" + digit : digit;
  }

  //return AM or PM based on current hour
  getMidDay(hour) {
    return hour >= 12 ? "PM" : "AM";
  }

  //return greeting based on current hour
  setGreeting(hour) {
    if (hour < 12) {
      this.greeting = "Good Morning";
    } else if (hour >= 12 && hour < 17) {
      this.greeting = "Good Afternoon";
    } else {
      this.greeting = "Good Evening";
    }
  }
   
  addTodoHandler(){
      const inputBox = this.template.querySelector("lightning-input");
     // console.log('current value', inputBox.value);
    //  this.todos.push(inputBox.value);

      const todo ={
        //  todoId:this.todos.length,
          todoName :inputBox.value,
          done:false,
        //  todoDate: new Date()
       }
        // serializing it in string format as method accept String Payload
       addTodo({payload:JSON.stringify(todo)}).then(response => {
           console.log('Inserting todo Item successfully');
            this.fetchTodos();
       }).catch(error =>{
            console.log('Error in inserting todo' + error);
       });
      // this.todos.push(todo);
       inputBox.value = "";
  }


  // this method is going to invoke the getcurrenttodo method from our class
  fetchTodos(){
      getCurrentTodos().then(result =>{
          if(result){
            this.todos = result;
        //   console.error("No Error in fetching todo item");
           
          }
      }).catch(error =>{
        console.error("Error in fetching todo item" + error);
      });
  }


  updateHandler(){
    this.fetchTodos();
  }

  deleteHandler(){
    this.fetchTodos();
  }

   get upcomingTasks() {
       // if todo is not undefined and it has some length
    return this.todos && this.todos.length
      ? this.todos.filter(todo => !todo.done)
      : [];
  }
  // get property to return completed todos
  get completedTasks() {
      return this.todos && this.todos.length
      ? this.todos.filter(todo => todo.done)
      : [];
  }

  populateTodos(){
    const todos =[
      {
        todoId : 0,
        todoName:"Feed the dog",
        done:false,
        todoDate:new Date()
       },

       {
         todoId : 1,
         todoName:"Love the dog", 
         done:false,
         todoDate:new Date()
       },

       {
         todoId : 2,
         todoName:"The dog",
         done:true,
         todoDate:new Date()
       }
   
       
    ];
    this.todos = todos;
  }
}
  
