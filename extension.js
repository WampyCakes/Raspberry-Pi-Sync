const vscode = require('vscode');
const fs = require('fs');
const path = require("path");
const File = require('./file.js')

function activate(context) {
	let globalState = context.globalState;
	const excludeFile = context.storagePath+'/exclude.txt';
	let transferFile = new File(context, 'Transfer Files');
	let diffFile = new File(context, 'Compare');

	try {
		fs.statSync(context.storagePath);
	} catch(e) {
		fs.mkdirSync(context.storagePath);
	}
	
	try {
		fs.statSync(excludeFile);
	} catch(e) {
		fs.writeFileSync(excludeFile, "");
	}

	let sync = vscode.commands.registerCommand('rsync.sync', () => {
		if(exists(transferFile.getWorkspaceFile())){
			let terminal = vscode.window.activeTerminal;
			if(terminal == undefined)
				terminal = vscode.window.createTerminal();
			terminal.sendText(transferFile.getWorkspacePath()+" "+'\"'+excludeFile+'\"');
		}else{
			vscode.commands.executeCommand('rsync.global');
			vscode.window.showInformationMessage('There is no workspace sync file. Running the global file.');
		}
	});

	let global = vscode.commands.registerCommand('rsync.global', () => {
		let terminal = vscode.window.activeTerminal;
		if(terminal == undefined)
			terminal = vscode.window.createTerminal();
		terminal.sendText(transferFile.getGlobalPath()+" "+'\"'+excludeFile+'\"');	
	});

	let diff = vscode.commands.registerCommand('rsync.diff', () => {
		if(exists(diffFile.getWorkspaceFile())){
			let terminal = vscode.window.activeTerminal;
			if(terminal == undefined)
				terminal = vscode.window.createTerminal();
			terminal.sendText(diffFile.getWorkspacePath()+" "+'\"'+excludeFile+'\"');
		}else{
			vscode.commands.executeCommand('rsync.gdiff');
			vscode.window.showInformationMessage('There is no workspace compare file. Running the global file.');
		}
	});

	let gdiff = vscode.commands.registerCommand('rsync.gdiff', () => {
		let terminal = vscode.window.activeTerminal;
		if(terminal == undefined)
			terminal = vscode.window.createTerminal();
		terminal.sendText(diffFile.getGlobalPath()+" "+'\"'+excludeFile+'\"');
	});

	let edit = vscode.commands.registerCommand('rsync.edit', () => {
		transferFile.edit('You are editing the workspace sync file.',
	 	'You are editing the global sync file. To specify options for just this workspace, create a workspace sync file.', 'rsync.create');
	});

	let diffEdit = vscode.commands.registerCommand('rsync.diffedit', () => {
		diffFile.edit('You are editing the workspace compare file.',
		'You are editing the global compare file. To specify options for just this workspace, create a workspace compare file.', 'rsync.diffcreate');
	});

	let gedit = vscode.commands.registerCommand('rsync.gedit', () => {
		transferFile.globalEdit('You are editing the global sync file.');
	});

	let diffgedit = vscode.commands.registerCommand('rsync.diffgedit', () => {
		diffFile.globalEdit('You are editing the global compare file.');
	});

	let create = vscode.commands.registerCommand('rsync.create', () => {
		transferFile.create('This workspace already has a sync file. Would you like to overwrite the workspace sync file to be the same as the global file?',
	 	'Workspace sync file now matches the global file.', 'Workspace sync file created.', 'You are editing the workspace sync file.');
	});

	let diffCreate = vscode.commands.registerCommand('rsync.diffcreate', () => {
		diffFile.create('This workspace already has a compare file. Would you like to overwrite the workspace compare file to be the same as the global file?',
		'Workspace compare file now matches the global file.', 'Workspace compare file created.', 'You are editing the workspace compare file.');
	});

	let deleteWorkspace = vscode.commands.registerCommand('rsync.delete', () => {
		transferFile.delete('Are you sure you would like to delete the workspace sync file?',
	 	'The workspace sync file has been deleted.', 'There was an error deleting the workspace sync file.', 'A workspace sync file does not exist.');
	});

	let diffDelete = vscode.commands.registerCommand('rsync.diffdelete', () => {
		diffFile.delete('Are you sure you would like to delete the workspace compare file?',
	 	'The workspace compare file has been deleted.', 'There was an error deleting the workspace compare file.', 'A workspace compare file does not exist.');
	});

	let exclude = vscode.commands.registerCommand('rsync.exclude', (uri) => {
		fs.appendFileSync(excludeFile, '\n- '+path.basename(uri.fsPath));
	});

	let editExclude = vscode.commands.registerCommand('rsync.editexclude', () => {
		vscode.workspace.openTextDocument(excludeFile).then(doc => {
			vscode.window.showTextDocument(doc);
		 });
	});

	let shellCommand = vscode.commands.registerCommand('rsync.shell', () => {
		let toggled = globalState.get('batch', 'batch') == 'batch' ? 'bash' : 'batch';
		context.globalState.update('batch', toggled);
		vscode.window.showInformationMessage('Toggled to '+toggled, 'Toggle')
		.then((selection) => {
			if(selection == 'Toggle')
				vscode.commands.executeCommand('rsync.shell');
		});
	});

	context.subscriptions.push(sync, edit, gedit, diffEdit, diffgedit, exclude, editExclude, create, diffCreate, deleteWorkspace, diffDelete, global, shellCommand, diff, gdiff);
}
exports.activate = activate;

function deactivate() {}

function exists(file) {
	try {
		fs.statSync(file);
		return true;
	} catch (e) {
		return false;
	}
}

module.exports = {
	activate,
	deactivate
}
