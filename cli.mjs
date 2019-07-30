#!/usr/bin/env -S node --experimental-modules

import {inspect} from 'util';
import program from 'commander';

import {createActions} from './index.mjs';


async function main(){

/*
 spqr new my-site
 spqr develop
 spqr build
 spqr serve
*/

 program
   .command('create-actions <file>')
   .option('-t, --template [name]', 'Specify template [floof]', 'floof')
   .action(async function (file, {template}) {

     const actions = await createActions({
       file,
       name:'New Site',
       context:{
         siteName: 'test',
         siteRootPath: file,
         templateName: template,
       }
     });

     console.log(inspect(actions, null, 3, true));

     //spqr({actions});

 });



 program.parse(process.argv)

}

main();
