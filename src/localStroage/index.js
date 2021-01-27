
import JSONManager from "jsonfile";
// import SCHEMA from "../config/schema";
import { join } from "path";
 class LocalJsonManager{
     constructor(){
         this.schemaLocation = 'schema.json';
         this.schemas = this.readSchema();
     }

     readSchema(){
         const path = join(__dirname,this.schemaLocation);
         const ret = JSONManager.readFileSync(path);
         return ret;
     }

     findSchemaInfo(id){
         const find = this.schemas.find(item=>item.id === id);
         return find || {}
     }
}

export default new LocalJsonManager();