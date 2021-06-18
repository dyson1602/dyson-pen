import path from 'path';
import { Command } from 'commander';
import { serve } from 'local-api';

export const serveCommand = new Command()
  .command('serve [filename]')
  .description('Open a file for editing')
  .option('-p, --port <number>', 'port to run serve on', '4005')
  .action(async (filename = 'notebook.js', options: { port: string }) => {
    try {
      const dir = path.join(process.cwd(), path.dirname(filename));
      await serve(parseInt(options.port), path.basename(filename), dir);
    } catch (error) {
      if(error.code === 'EADDRINUSE'){
        console.log('Port is in use. Try running on a different port.')
      } else {
        console.log("Here's the problem: ", error.message)
      }
      //Forceful exit with unseccessful launch of app
      process.exit(1)
    }
  });
