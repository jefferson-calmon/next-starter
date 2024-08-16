#! /usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */

import { Command } from 'commander';

// import pkg from '../package.json' assert { type: 'json' };
import { create } from './commands/create.ts';

const program = new Command();

console.log('');

program
	.version('', '-v, --version', 'Exibir a versão atual do app')
	.name('app')
	.description(
		'CLI feita para automatizar tarefas repetitivas dentro do app'
	);

program.command('create <item> <name>').action(create);

program.parse(process.argv);