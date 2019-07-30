import fs from 'fs';
import path from 'path';
import kebabCase from 'lodash/kebabCase.js';
import camelCase from 'lodash/camelCase.js';

export default async function main({file, name, context}){

  const system = JSON.parse( (await fs.promises.readFile(file)).toString() );
  const selection = system.program.actions.filter(action=>camelCase(action.configuration.name)===camelCase(name)).pop();

  for(let {name} of selection.parameters){
    const id = camelCase(name);
    if(!context[id]) throw new Error(`Action context requires: ${id}`)
  }

  for(let element of selection.actions){
    element.name = kebabCase(element.name);
  }

  for(let element of selection.actions){
    element.arguments = {};

    for(let {name} of element.parameters){
      const id = camelCase(name);
      element.arguments[id] = context[id];
    }
    
    delete element.parameters
  }

  return selection.actions;
}
