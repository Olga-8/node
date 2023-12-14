const { exec } = require('child_process');
const fs = require('fs');
const os = require('os');

const logFilePath = 'activityMonitor.log';
const shellCommand = os.platform() === 'win32'
  ? `powershell "Get-Process | Sort-Object CPU -Descending | Select-Object -First 1 | Format-Table -Property Name, CPU, WorkingSet -HideTableHeaders "`
  : `ps -A -o %cpu,%mem,comm | sort -nr | head -n 1`;
let lastLoggedTime = Date.now();

function getProcessInfo() {
  exec(shellCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
      return;
    }
    
    const output = stdout.trim();
    process.stdout.write('\x1b[2K\r');
    process.stdout.write(`${output}`);

    const currentTime = Date.now();
    if (currentTime - lastLoggedTime >= 60000) {
      fs.appendFileSync(logFilePath, `${Math.floor(currentTime / 1000)} : ${output}\n`);
      lastLoggedTime = currentTime;
    }
  });
}

setInterval(getProcessInfo, 100);
