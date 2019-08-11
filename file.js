const vscode = require('vscode');
const fs = require('fs');

class File {
    constructor(context, name) {
        this.context = context;
        this.name = name;
    }

    create(alreadyWarning, matchesInformation, created, editing){
        if(exists(this.getWorkspaceFile())){
			vscode.window.showInformationMessage(alreadyWarning, 'Yes', 'No')
			.then((selection) => {
				if(selection == 'Yes'){
					fs.copyFile(this.getGlobalFile(), this.getWorkspaceFile(), (err) => {
						if(!err)
							vscode.window.showInformationMessage(matchesInformation);
					});
				}
			});
		}else{
			fs.writeFileSync(this.getWorkspaceFile(), "");
			fs.copyFileSync(this.getGlobalFile(), this.getWorkspaceFile());
			vscode.window.showInformationMessage(created, 'Edit the workspace file')
			.then((selection) => {
				if(selection == 'Edit the workspace file'){
					vscode.workspace.openTextDocument(this.getWorkspaceFile()).then(doc => {
						vscode.window.showTextDocument(doc);
					});
					vscode.window.showInformationMessage(editing);
				}
			});
		}
    }

    delete(confirmation, success, error, nonexistent){
        if(exists(this.getWorkspaceFile())){
			vscode.window.showInformationMessage(confirmation, 'Yes', 'No')
			.then((selection) => {
				if(selection == 'Yes'){
					try{
						fs.unlinkSync(this.getWorkspaceFile());
						vscode.window.showInformationMessage(success);
					}catch{
						vscode.window.showInformationMessage(error);
					}
				}
			});
		}else
			vscode.window.showInformationMessage(nonexistent);
    }

    edit(workspaceWarning, globalWarning, createCommand){
        if(exists(this.getWorkspaceFile())){
			vscode.workspace.openTextDocument(this.getWorkspaceFile()).then(doc => {
                vscode.window.showTextDocument(doc, { preview: false });
			});
			vscode.window.showInformationMessage(workspaceWarning);
		}else{
			vscode.workspace.openTextDocument(this.getGlobalFile()).then(doc => {
				vscode.window.showTextDocument(doc, { preview: false });
			});
			vscode.window.showInformationMessage(globalWarning, 'Create')
			.then((selection) => {
				if(selection == 'Create')
					vscode.commands.executeCommand(createCommand);		
			});
		}
    }

    globalEdit(warning){
        vscode.workspace.openTextDocument(this.getGlobalFile()).then(doc => {
			vscode.window.showTextDocument(doc, { preview: false });
		});
		vscode.window.showInformationMessage(warning);
    }
    
    getWorkspaceFile(){
        return this.context.storagePath+'/'+this.name+(this.context.globalState.get('batch', 'batch') == 'batch' ? '.bat' : '.sh');
    }

    getGlobalFile(){
        return this.context.extensionPath+'/'+this.name+(this.context.globalState.get('batch', 'batch') == 'batch' ? '.bat' : '.sh');
    }

    getWorkspacePath(){
        return '\"'+this.context.storagePath+'\\'+this.name+(this.context.globalState.get('batch', 'batch') == 'batch' ? '.bat' : '.sh')+'\"';
    }

    getGlobalPath(){
        return '\"'+this.context.extensionPath+'\\'+this.name+(this.context.globalState.get('batch', 'batch') == 'batch' ? '.bat' : '.sh')+'\"';
    }
}
module.exports = File;

function exists(file) {
    try {
        fs.statSync(file);
        return true;
    } catch (e) {
        return false;
    }
}