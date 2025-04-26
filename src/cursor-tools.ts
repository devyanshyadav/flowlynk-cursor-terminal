import * as path from 'path';

// Get the parent directory of the current working directory
const PARENT_DIR: string = path.resolve(process.cwd(), '.');

const cursorTools = {
  read_file: {
    function: async ({ path: filePath }: { path: string }) => {
      try {
        const fs = require('fs').promises;
        const resolvedPath: string = path.resolve(PARENT_DIR, filePath);
        const data: string = await fs.readFile(resolvedPath, 'utf8');
        return { status: 'success', data };
      } catch (error: any) {
        return { status: 'error', message: error.message };
      }
    },
    description: "Reads text file content. Use in 'analyze' to check 'chaicode/to-do-list/styles.css' for updates.",
    input: { path: "string (file path relative to parent directory)" },
  },

  create_file: {
    function: async ({ path: filePath }: { path: string }) => {
      try {
        const fs = require('fs').promises;
        const resolvedPath: string = path.resolve(PARENT_DIR, filePath);
        await fs.writeFile(resolvedPath, '');
        return { status: 'success', data: `File ${filePath} created successfully` };
      } catch (error: any) {
        return { status: 'error', message: error.message };
      }
    },
    description: "Creates an empty file. Use in 'generate_structure' to initialize 'chaicode/to-do-list/empty.js'.",
    input: { path: "string (file path relative to parent directory)" },
  },

  create_and_write_file: {
    function: async ({ path: filePath, content, encoding }: { path: string; content: string; encoding?: string }) => {
      try {
        const fs = require('fs').promises;
        const resolvedPath: string = path.resolve(PARENT_DIR, filePath);
        await fs.writeFile(resolvedPath, content, encoding || 'utf8');
        return { status: 'success', data: `File ${filePath} created/written successfully` };
      } catch (error: any) {
        return { status: 'error', message: error.message };
      }
    },
    description: "Creates/writes text file content. Use in 'action' to create 'chaicode/to-do-list/README.md' with details.",
    input: {
      path: "string (file path relative to parent directory)",
      content: "string",
      encoding: "string (optional, default: utf8)",
    },
  },

  write_file: {
    function: async ({ path: filePath, content, encoding }: { path: string; content: string; encoding?: string }) => {
      try {
        const fs = require('fs').promises;
        const resolvedPath: string = path.resolve(PARENT_DIR, filePath);
        await fs.writeFile(resolvedPath, content, encoding || 'utf8');
        return { status: 'success', data: `File written to ${filePath}` };
      } catch (error: any) {
        return { status: 'error', message: error.message };
      }
    },
    description: "Overwrites text file content. Use in 'action' to update 'chaicode/to-do-list/styles.css' with dark theme.",
    input: {
      path: "string (file path relative to parent directory)",
      content: "string",
      encoding: "string (optional, default: utf8)",
    },
  },

  append_file: {
    function: async ({ path: filePath, content, encoding }: { path: string; content: string; encoding?: string }) => {
      try {
        const fs = require('fs').promises;
        const resolvedPath: string = path.resolve(PARENT_DIR, filePath);
        await fs.appendFile(resolvedPath, content, encoding || 'utf8');
        return { status: 'success', data: `Content appended to ${filePath}` };
      } catch (error: any) {
        return { status: 'error', message: error.message };
      }
    },
    description: "Appends text to a file. Use in 'action' to add to 'chaicode/to-do-list/execute.md'.",
    input: {
      path: "string (file path relative to parent directory)",
      content: "string",
      encoding: "string (optional, default: utf8)",
    },
  },

  delete_file: {
    function: async ({ path: filePath }: { path: string }) => {
      try {
        const fs = require('fs').promises;
        const resolvedPath: string = path.resolve(PARENT_DIR, filePath);
        await fs.unlink(resolvedPath);
        return { status: 'success', data: `File ${filePath} deleted` };
      } catch (error: any) {
        return { status: 'error', message: error.message };
      }
    },
    description: "Deletes a file. Use in 'action' to remove 'chaicode/to-do-list/old-styles.css'.",
    input: { path: "string (file path relative to parent directory)" },
  },

  read_directory: {
    function: async ({ path: dirPath, recursive }: { path: string; recursive?: boolean }) => {
      try {
        const fs = require('fs').promises;
        const path_module = require('path');
        const resolvedPath: string = path.resolve(PARENT_DIR, dirPath);
        if (!recursive) {
          const files: string[] = await fs.readdir(resolvedPath);
          return { status: 'success', data: files };
        } else {
          async function readDirRecursive(dir: string): Promise<string[]> {
            const files = await fs.readdir(dir, { withFileTypes: true });
            const results = await Promise.all(
              files.map(async (file: any) => {
                const fullPath: string = path_module.join(dir, file.name);
                if (file.isDirectory()) {
                  const subDirFiles: string[] = await readDirRecursive(fullPath);
                  return subDirFiles.map((f: string) => path_module.join(file.name, f));
                }
                return file.name;
              })
            );
            return results.flat();
          }
          const allFiles: string[] = await readDirRecursive(resolvedPath);
          return { status: 'success', data: allFiles };
        }
      } catch (error: any) {
        return { status: 'error', message: error.message };
      }
    },
    description: "Lists directory contents. Use in 'analyze' to find 'chaicode/to-do-list' for fuzzy matching.",
    input: {
      path: "string (directory path relative to parent directory)",
      recursive: "boolean (optional, default: false)",
    },
  },

  create_directory: {
    function: async ({ path: dirPath, recursive }: { path: string; recursive?: boolean }) => {
      try {
        const fs = require('fs').promises;
        const resolvedPath: string = path.resolve(PARENT_DIR, dirPath);
        await fs.mkdir(resolvedPath, { recursive: recursive !== false });
        return { status: 'success', data: `Directory ${dirPath} created` };
      } catch (error: any) {
        return { status: 'error', message: error.message };
      }
    },
    description: "Creates a directory. Use in 'generate_structure' to set up 'chaicode/to-do-list/src'.",
    input: {
      path: "string (directory path relative to parent directory)",
      recursive: "boolean (optional, default: true)",
    },
  },

  delete_directory: {
    function: async ({ path: dirPath, recursive }: { path: string; recursive?: boolean }) => {
      try {
        const fs = require('fs').promises;
        const resolvedPath: string = path.resolve(PARENT_DIR, dirPath);
        if (recursive) {
          await fs.rm(resolvedPath, { recursive: true, force: true });
        } else {
          await fs.rmdir(resolvedPath);
        }
        return { status: 'success', data: `Directory ${dirPath} deleted` };
      } catch (error: any) {
        return { status: 'error', message: error.message };
      }
    },
    description: "Deletes a directory. Use in 'action' to remove 'chaicode/to-do-list/old-src'.",
    input: {
      path: "string (directory path relative to parent directory)",
      recursive: "boolean (optional, default: false)",
    },
  },

  check_file_exists: {
    function: async ({ path: filePath }: { path: string }) => {
      try {
        const fs = require('fs').promises;
        const resolvedPath: string = path.resolve(PARENT_DIR, filePath);
        await fs.access(resolvedPath);
        return { status: 'success', data: true };
      } catch (error) {
        return { status: 'success', data: false };
      }
    },
    description: "Checks if file/directory exists. Use in 'analyze' to verify 'chaicode/to-do-list'.",
    input: { path: "string (file or directory path relative to parent directory)" },
  },

  get_file_stats: {
    function: async ({ path: filePath }: { path: string }) => {
      try {
        const fs = require('fs').promises;
        const resolvedPath: string = path.resolve(PARENT_DIR, filePath);
        const stats = await fs.stat(resolvedPath);
        return {
          status: 'success',
          data: {
            size: stats.size,
            created: stats.birthtime,
            modified: stats.mtime,
            isFile: stats.isFile(),
            isDirectory: stats.isDirectory(),
            permissions: stats.mode.toString(8).slice(-3),
          },
        };
      } catch (error: any) {
        return { status: 'error', message: error.message };
      }
    },
    description: "Gets file/directory metadata. Use in 'analyze' to check 'chaicode/to-do-list/styles.css' stats.",
    input: { path: "string (file or directory path relative to parent directory)" },
  },

  rename_file: {
    function: async ({ oldPath, newPath }: { oldPath: string; newPath: string }) => {
      try {
        const fs = require('fs').promises;
        const resolvedOldPath: string = path.resolve(PARENT_DIR, oldPath);
        const resolvedNewPath: string = path.resolve(PARENT_DIR, newPath);
        await fs.rename(resolvedOldPath, resolvedNewPath);
        return { status: 'success', data: `Renamed ${oldPath} to ${newPath}` };
      } catch (error: any) {
        return { status: 'error', message: error.message };
      }
    },
    description: "Renames/moves a file/directory. Use in 'action' to rename 'chaicode/to-do-list/style.css'.",
    input: {
      oldPath: "string (current path relative to parent directory)",
      newPath: "string (new path relative to parent directory)",
    },
  },

  copy_file: {
    function: async ({ source, destination, overwrite }: { source: string; destination: string; overwrite?: boolean }) => {
      try {
        const fs = require('fs').promises;
        const resolvedSource: string = path.resolve(PARENT_DIR, source);
        const resolvedDestination: string = path.resolve(PARENT_DIR, destination);
        const flags = overwrite ? 0 : fs.constants.COPYFILE_EXCL;
        await fs.copyFile(resolvedSource, resolvedDestination, flags);
        return { status: 'success', data: `Copied ${source} to ${destination}` };
      } catch (error: any) {
        return { status: 'error', message: error.message };
      }
    },
    description: "Copies a file. Use in 'action' to back up 'chaicode/to-do-list/styles.css'.",
    input: {
      source: "string (source path relative to parent directory)",
      destination: "string (destination path relative to parent directory)",
      overwrite: "boolean (optional, default: true)",
    },
  },

  read_json_file: {
    function: async ({ path: filePath }: { path: string }) => {
      try {
        const fs = require('fs').promises;
        const resolvedPath: string = path.resolve(PARENT_DIR, filePath);
        const data: string = await fs.readFile(resolvedPath, 'utf8');
        const jsonData: any = JSON.parse(data);
        return { status: 'success', data: jsonData };
      } catch (error: any) {
        return { status: 'error', message: error.message };
      }
    },
    description: "Reads/parses JSON file. Use in 'analyze' to check 'chaicode/to-do-list/package.json'.",
    input: { path: "string (file path relative to parent directory)" },
  },

  write_json_file: {
    function: async ({ path: filePath, data, pretty }: { path: string; data: object; pretty?: boolean }) => {
      try {
        const fs = require('fs').promises;
        const resolvedPath: string = path.resolve(PARENT_DIR, filePath);
        const jsonString: string = pretty ? JSON.stringify(data, null, 2) : JSON.stringify(data);
        await fs.writeFile(resolvedPath, jsonString, 'utf8');
        return { status: 'success', data: `JSON written to ${filePath}` };
      } catch (error: any) {
        return { status: 'error', message: error.message };
      }
    },
    description: "Writes JSON to file. Use in 'action' to update 'chaicode/to-do-list/package.json'.",
    input: {
      path: "string (file path relative to parent directory)",
      data: "object",
      pretty: "boolean (optional, default: false)",
    },
  },

  ask_user: {
    function: async ({ question }: { question: string }) => {
        console.log(" asked to dev");
      try {
        const readline = require('readline').createInterface({
          input: process.stdin,
          output: process.stdout,
        });
        return new Promise((resolve) => {
          readline.question(question, (answer: string) => {
            readline.close();
            resolve({ status: 'success', data: answer.trim() });
          });
        });
      } catch (error: any) {
        return { status: 'error', message: error.message };
      }
    },
    description: "Prompts user for terminal input. Use in 'action' to ask user for input.",
    input: { question: "string (prompt to display to user)" },
  },
};

export default cursorTools;