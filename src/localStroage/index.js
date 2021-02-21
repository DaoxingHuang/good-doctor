import JSONManager from 'jsonfile';
// import SCHEMA from "../config/schema";
import { join } from 'path';

class LocalJsonManager {
  constructor() {
    this.schemaLocation = 'schema.json';
    this.path = join(__dirname, this.schemaLocation);
    this.schemas = this.readSchema();
  }

  refreshSchema() {
    this.schemas = this.readSchema();
  }

  readSchema() {
    const ret = JSONManager.readFileSync(this.path);
    return ret;
  }

  findSchemaInfo(id) {
    const find = this.schemas.find(item => item.id === id);
    return find || {};
  }

  writeSchema(schema) {
    JSONManager.writeFileSync(this.path, schema);
  }
}

export default new LocalJsonManager();
