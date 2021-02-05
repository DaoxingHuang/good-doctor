import { observable, computed, action ,makeObservable } from "mobx";
import { ShareService } from "../services";
import { useMemo } from "react";

class Share {

  constructor() {
    makeObservable(this);
 }


  @observable schemas = [];

  @action async getAll(){
    const data = await ShareService.getShareList();
    this.schemas = [...data];
  }

  @action async updateSchema(schema){
    debugger;
    const tempSchemas = [...this.schemas]
    const id = schema.id;
    if(id){
      const index = tempSchemas.findIndex(item=>item.id === id);
      tempSchemas.splice(index,1,schema);
    }
    else{
      let max = 0;
      tempSchemas.forEach(item=>{
        const id = item.id&&parseInt(item.id,10);
        if(max<id){
          max = id;
        }
      })
      schema.id = max + 1;
      console.log("id", max);
      tempSchemas.push(schema);
    }
    const data =  await ShareService.updateShareList(tempSchemas);
    this.schemas=[...data];
  }
  
  @action async deleteSchema(schema){
    const tempSchemas = [...this.schemas]
    const index = tempSchemas.findIndex(item=>item.id === schema.id);
    tempSchemas.splice(index,1);
    const data =  await ShareService.updateShareList(tempSchemas);
    this.schemas=[...data];
  }
  
//   @computed
//   get unfinishedTodoCount() {
//     return this.todos.filter(todo => !todo.finished).length;
//   }

//   @action
//   addTodo(title) {
//     this.todos.push(new TodoModel(title));
//   }
}
export default new Share();
// export default function useStore(initialState) {
//   const store = useMemo(() => new Share());
//   return store
// }