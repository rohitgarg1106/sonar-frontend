/**
 * Get System Information in json format. Gets Run Queue, Memory and Swap Info.
 */

 var os = require('os');
 var fs = require('fs');
 
 var sysinfo = {};
 
 sysinfo.hostname = os.hostname();
 
 sysinfo.os = {};
 sysinfo.os.release          = os.release();
 sysinfo.os.platform         = os.platform();
 sysinfo.os.arch             = os.arch();
 
 sysinfo.cpu = {};
 sysinfo.cpu.run_queue_1     = os.loadavg()[0].toFixed(2);
 sysinfo.cpu.run_queue_5     = os.loadavg()[1].toFixed(2);
 sysinfo.cpu.run_queue_15    = os.loadavg()[2].toFixed(2);
 
 sysinfo.memory = {};
 sysinfo.memory.total        = os.totalmem();
 sysinfo.memory.free         = os.freemem();
 sysinfo.memory.used_perc    = (100 - ( ( os.totalmem() - os.freemem() ) / os.totalmem() * 100) ) .toFixed(2);
 
 /**
  * Gets Swap info out of /proc/swaps on Linux systems.
  */
 function getSwap() {
     var swapinfo = [];
     
     fs.readFileSync('/proc/swaps').toString().split(os.EOL).forEach(function(line) {
        var lineArray = line.split(/\s+/);
        if ( lineArray[0] != 'Filename' ) {
            var tempObject = {};
            tempObject.size = parseInt(lineArray[2]);
            tempObject.used = parseInt(lineArray[3]);
            tempObject.perc = ( tempObject.used / tempObject.size * 100).toFixed(2);
            if ( ! isNaN(tempObject.size) ) {
             swapinfo.push(tempObject);    
            }
        } 
     });
     
     return swapinfo;
 };
 
//  sysinfo.swap = getSwap();
 
 console.log(sysinfo);