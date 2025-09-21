import * as vscode from 'vscode';
import * as path from 'path';

export async function getParentFolderUri(uri: vscode.Uri): Promise<vscode.Uri> {
    try {
        // 获取资源状态信息
        const stat = await vscode.workspace.fs.stat(uri);
        
        // 如果是文件夹，直接返回自身
        if (stat.type === vscode.FileType.Directory) {
            return uri;
        }
        
        // 如果是文件，返回其所在文件夹
        const dirPath = path.dirname(uri.fsPath);
        return vscode.Uri.file(dirPath);
    } catch (error) {
        vscode.window.showErrorMessage(`获取文件夹信息失败: ${error instanceof Error ? error.message : String(error)}`);
        throw error; // 抛出错误让调用者处理
    }
}