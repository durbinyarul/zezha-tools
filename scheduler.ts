import cron from 'node-cron';
import { exec } from 'child_process';


// Schedule task at 12:40, 12:44, and 12:48 PM
cron.schedule('40,44,48 12 * * *', () => {
    console.log('⏰ Triggering automation at', new Date().toLocaleTimeString());

    exec('npm run daily-login', (error, stdout, stderr) => {
        if (error) {
            console.error(`❌ Error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`⚠️ stderr: ${stderr}`);
        }
        console.log(`✅ Output:\n${stdout}`);
    });
});