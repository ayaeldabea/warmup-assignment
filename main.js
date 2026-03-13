const fs = require("fs");

// ============================================================
// Function 1: getShiftDuration(startTime, endTime)
// startTime: (typeof string) formatted as hh:mm:ss am or hh:mm:ss pm
// endTime: (typeof string) formatted as hh:mm:ss am or hh:mm:ss pm
// Returns: string formatted as h:mm:ss
// ============================================================
function getShiftDuration(startTime, endTime) {
    function timeToSeconds(timeStr) {
        const [time, period] = timeStr.split(' ');
        const [hours, minutes, seconds] = time.split(':').map(Number);
        
        let hours24 = hours;
        
        if (period === 'pm' && hours !== 12) {
            hours24 = hours + 12;
        } else if (period === 'am' && hours === 12) {
            hours24 = 0;
        }
        
        return (hours24 * 3600) + (minutes * 60) + seconds;
    }
    
    function secondsToTime(totalSeconds) {
        const hours = Math.floor(totalSeconds / 3600);
        const remainingSeconds = totalSeconds % 3600;
        const minutes = Math.floor(remainingSeconds / 60);
        const seconds = remainingSeconds % 60;
        
        const minutesStr = minutes < 10 ? '0' + minutes : minutes;
        const secondsStr = seconds < 10 ? '0' + seconds : seconds;
        
        return `${hours}:${minutesStr}:${secondsStr}`;
    }
    
    const startSeconds = timeToSeconds(startTime);
    const endSeconds = timeToSeconds(endTime);
    
    let diffSeconds = endSeconds - startSeconds;
    if (diffSeconds < 0) {
        diffSeconds += 24 * 3600;
    }
    
    return secondsToTime(diffSeconds);
    // TODO: Implement this function
}

// ============================================================
// Function 2: getIdleTime(startTime, endTime)
// startTime: (typeof string) formatted as hh:mm:ss am or hh:mm:ss pm
// endTime: (typeof string) formatted as hh:mm:ss am or hh:mm:ss pm
// Returns: string formatted as h:mm:ss
// ============================================================
function getIdleTime(startTime, endTime) {
    function timeToSeconds(timeStr) {
        const [time, period] = timeStr.trim().toLowerCase().split(' ');
        const [hours, minutes, seconds] = time.split(':').map(Number);
        let hours24 = hours;
        if (period === 'pm' && hours !== 12) hours24 = hours + 12;
        if (period === 'am' && hours === 12) hours24 = 0;
        return (hours24 * 3600) + (minutes * 60) + seconds;
    }

    function secondsToTime(totalSeconds) {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        const minutesStr = minutes < 10 ? '0' + minutes : minutes;
        const secondsStr = seconds < 10 ? '0' + seconds : seconds;
        return `${hours}:${minutesStr}:${secondsStr}`;
    }

    const DELIVERY_START = 8 * 3600;
    const DELIVERY_END = 22 * 3600;
    const MIDNIGHT = 24 * 3600;

    let startSec = timeToSeconds(startTime);
    let endSec = timeToSeconds(endTime);

    if (endSec < startSec) endSec += MIDNIGHT;

    let idleSeconds = 0;

    if (startSec < DELIVERY_START) {
        idleSeconds += Math.min(DELIVERY_START, endSec) - startSec;
    }

    if (endSec > DELIVERY_END) {
        idleSeconds += endSec - Math.max(DELIVERY_END, startSec);
    }

    return secondsToTime(idleSeconds);
}
    // TODO: Implement this function


// ============================================================
// Function 3: getActiveTime(shiftDuration, idleTime)
// shiftDuration: (typeof string) formatted as h:mm:ss
// idleTime: (typeof string) formatted as h:mm:ss
// Returns: string formatted as h:mm:ss
// ============================================================
// TODO: Implement this function
function getActiveTime(shiftDuration, idleTime) {
    function durationToSeconds(duration) {
        const [hours, minutes, seconds] = duration.split(':').map(Number);
        return (hours * 3600) + (minutes * 60) + seconds;
    }

    function secondsToTime(totalSeconds) {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        const minutesStr = minutes < 10 ? '0' + minutes : minutes;
        const secondsStr = seconds < 10 ? '0' + seconds : seconds;
        return `${hours}:${minutesStr}:${secondsStr}`;
    }

    const shiftSeconds = durationToSeconds(shiftDuration);
    const idleSeconds = durationToSeconds(idleTime);

    return secondsToTime(shiftSeconds - idleSeconds);
}


// ============================================================
// Function 4: metQuota(date, activeTime)
// date: (typeof string) formatted as yyyy-mm-dd
// activeTime: (typeof string) formatted as h:mm:ss
// Returns: boolean
// ============================================================

// TODO: Implement this function
function metQuota(date, activeTime) {
    function durationToSeconds(duration) {
        const [hours, minutes, seconds] = duration.split(':').map(Number);
        return (hours * 3600) + (minutes * 60) + seconds;
    }

    const [year, month, day] = date.split('-').map(Number);

    const isEid = (year === 2025 && month === 4 && day >= 10 && day <= 30);

    const quotaSeconds = isEid ? (6 * 3600) : (8 * 3600 + 24 * 60);

    const activeSeconds = durationToSeconds(activeTime);

    return activeSeconds >= quotaSeconds;
}


// ============================================================
// Function 5: addShiftRecord(textFile, shiftObj)
// textFile: (typeof string) path to shifts text file
// shiftObj: (typeof object) has driverID, driverName, date, startTime, endTime
// Returns: object with 10 properties or empty object {}
// ============================================================
// TODO: Implement this function
function addShiftRecord(textFile, shiftObj) {
    function durationToSeconds(duration) {
        const [hours, minutes, seconds] = duration.split(':').map(Number);
        return (hours * 3600) + (minutes * 60) + seconds;
    }

    function timeToSeconds(timeStr) {
        const [time, period] = timeStr.trim().toLowerCase().split(' ');
        const [hours, minutes, seconds] = time.split(':').map(Number);
        let hours24 = hours;
        if (period === 'pm' && hours !== 12) hours24 = hours + 12;
        if (period === 'am' && hours === 12) hours24 = 0;
        return (hours24 * 3600) + (minutes * 60) + seconds;
    }

    function secondsToTime(totalSeconds) {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        const minutesStr = minutes < 10 ? '0' + minutes : minutes;
        const secondsStr = seconds < 10 ? '0' + seconds : seconds;
        return `${hours}:${minutesStr}:${secondsStr}`;
    }

    function getShiftDuration(startTime, endTime) {
        let startSec = timeToSeconds(startTime);
        let endSec = timeToSeconds(endTime);
        if (endSec < startSec) endSec += 24 * 3600;
        return secondsToTime(endSec - startSec);
    }

    function getIdleTime(startTime, endTime) {
        const DELIVERY_START = 8 * 3600;
        const DELIVERY_END = 22 * 3600;
        let startSec = timeToSeconds(startTime);
        let endSec = timeToSeconds(endTime);
        if (endSec < startSec) endSec += 24 * 3600;
        let idleSeconds = 0;
        if (startSec < DELIVERY_START) {
            idleSeconds += Math.min(DELIVERY_START, endSec) - startSec;
        }
        if (endSec > DELIVERY_END) {
            idleSeconds += endSec - Math.max(DELIVERY_END, startSec);
        }
        return secondsToTime(idleSeconds);
    }

    function getActiveTime(shiftDuration, idleTime) {
        return secondsToTime(durationToSeconds(shiftDuration) - durationToSeconds(idleTime));
    }

    function metQuota(date, activeTime) {
        const [year, month, day] = date.split('-').map(Number);
        const isEid = (year === 2025 && month === 4 && day >= 10 && day <= 30);
        const quotaSeconds = isEid ? (6 * 3600) : (8 * 3600 + 24 * 60);
        return durationToSeconds(activeTime) >= quotaSeconds;
    }

    const content = fs.readFileSync(textFile, 'utf8');
    const lines = content.split('\n').filter(line => line.trim() !== '');

    const duplicate = lines.find(line => {
        const cols = line.split(',');
        return cols[0].trim() === shiftObj.driverID && cols[2].trim() === shiftObj.date;
    });
    if (duplicate) return {};

    const shiftDuration = getShiftDuration(shiftObj.startTime, shiftObj.endTime);
    const idleTime      = getIdleTime(shiftObj.startTime, shiftObj.endTime);
    const activeTime    = getActiveTime(shiftDuration, idleTime);
    const quota         = metQuota(shiftObj.date, activeTime);

    const newRecord = {
        driverID:      shiftObj.driverID,
        driverName:    shiftObj.driverName,
        date:          shiftObj.date,
        startTime:     shiftObj.startTime.trim(),
        endTime:       shiftObj.endTime.trim(),
        shiftDuration: shiftDuration,
        idleTime:      idleTime,
        activeTime:    activeTime,
        metQuota:      quota,
        hasBonus:      false
    };

    const newLine = `${newRecord.driverID},${newRecord.driverName},${newRecord.date},${newRecord.startTime},${newRecord.endTime},${newRecord.shiftDuration},${newRecord.idleTime},${newRecord.activeTime},${newRecord.metQuota},${newRecord.hasBonus}`;

    const lastIndex = lines.map(line => line.split(',')[0].trim()).lastIndexOf(shiftObj.driverID);

    if (lastIndex === -1) {
        lines.push(newLine);
    } else {
        lines.splice(lastIndex + 1, 0, newLine);
    }

    fs.writeFileSync(textFile, lines.join('\n'), 'utf8');

    return newRecord;
}

// ============================================================
// Function 6: setBonus(textFile, driverID, date, newValue)
// textFile: (typeof string) path to shifts text file
// driverID: (typeof string)
// date: (typeof string) formatted as yyyy-mm-dd
// newValue: (typeof boolean)
// Returns: nothing (void)
// ============================================================
// TODO: Implement this function
function setBonus(textFile, driverID, date, newValue) {
    const content = fs.readFileSync(textFile, 'utf8');
    const lines = content.split('\n').filter(line => line.trim() !== '');

    const updatedLines = lines.map(line => {
        const cols = line.split(',');
        if (cols[0].trim() === driverID && cols[2].trim() === date) {
            cols[9] = newValue.toString();
            return cols.join(',');
        }
        return line;
    });

    fs.writeFileSync(textFile, updatedLines.join('\n'), 'utf8');
}


// ============================================================
// Function 7: countBonusPerMonth(textFile, driverID, month)
// textFile: (typeof string) path to shifts text file
// driverID: (typeof string)
// month: (typeof string) formatted as mm or m
// Returns: number (-1 if driverID not found)
// ============================================================
// TODO: Implement this function
function countBonusPerMonth(textFile, driverID, month) {
    const content = fs.readFileSync(textFile, 'utf8');
    const lines = content.split('\n').filter(line => line.trim() !== '');

    const driverLines = lines.filter(line => line.split(',')[0].trim() === driverID);

    if (driverLines.length === 0) return -1;

    const targetMonth = parseInt(month);

    return driverLines.filter(line => {
        const cols = line.split(',');
        const recordMonth = parseInt(cols[2].trim().split('-')[1]);
        return recordMonth === targetMonth && cols[9].trim() === 'true';
    }).length;
}

// ============================================================
// Function 8: getTotalActiveHoursPerMonth(textFile, driverID, month)
// textFile: (typeof string) path to shifts text file
// driverID: (typeof string)
// month: (typeof number)
// Returns: string formatted as hhh:mm:ss
// ============================================================
// TODO: Implement this function
function getTotalActiveHoursPerMonth(textFile, driverID, month) {
    function durationToSeconds(duration) {
        const [hours, minutes, seconds] = duration.split(':').map(Number);
        return (hours * 3600) + (minutes * 60) + seconds;
    }

    function secondsToLongDuration(totalSeconds) {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        const hoursStr = String(hours);
        const minutesStr = minutes < 10 ? '0' + minutes : minutes;
        const secondsStr = seconds < 10 ? '0' + seconds : seconds;
        return `${hoursStr}:${minutesStr}:${secondsStr}`;
    }

    const content = fs.readFileSync(textFile, 'utf8');
    const lines = content.split('\n').filter(line => line.trim() !== '');

    let totalSeconds = 0;

    lines.forEach(line => {
        const cols = line.split(',');
        const recordDriverID = cols[0].trim();
        const recordMonth = parseInt(cols[2].trim().split('-')[1]);

        if (recordDriverID === driverID && recordMonth === month) {
            totalSeconds += durationToSeconds(cols[7].trim());
        }
    });

    return secondsToLongDuration(totalSeconds);
}


// ============================================================
// Function 9: getRequiredHoursPerMonth(textFile, rateFile, bonusCount, driverID, month)
// textFile: (typeof string) path to shifts text file
// rateFile: (typeof string) path to driver rates text file
// bonusCount: (typeof number) total bonuses for given driver per month
// driverID: (typeof string)
// month: (typeof number)
// Returns: string formatted as hhh:mm:ss
// ============================================================
// TODO: Implement this function
function getRequiredHoursPerMonth(textFile, rateFile, bonusCount, driverID, month) {
    function secondsToLongDuration(totalSeconds) {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        const hoursStr = String(hours);
        const minutesStr = minutes < 10 ? '0' + minutes : minutes;
        const secondsStr = seconds < 10 ? '0' + seconds : seconds;
        return `${hoursStr}:${minutesStr}:${secondsStr}`;
    }

    const shiftLines = fs.readFileSync(textFile, 'utf8').split('\n').filter(line => line.trim() !== '');
    const rateLines  = fs.readFileSync(rateFile, 'utf8').split('\n').filter(line => line.trim() !== '');

    const driverRate = rateLines.find(line => line.split(',')[0].trim() === driverID);
    const dayOff     = driverRate.split(',')[1].trim().toLowerCase();

    const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

    let totalSeconds = 0;

    shiftLines.forEach(line => {
        const cols          = line.split(',');
        const recordDriver  = cols[0].trim();
        const recordDate    = cols[2].trim();
        const recordMonth   = parseInt(recordDate.split('-')[1]);

        if (recordDriver !== driverID || recordMonth !== month) return;

        const [year, mon, day] = recordDate.split('-').map(Number);
        const dateObj           = new Date(year, mon - 1, day);
        const dayOfWeek         = dayNames[dateObj.getDay()];

        if (dayOfWeek === dayOff) return;

        const isEid             = (year === 2025 && mon === 4 && day >= 10 && day <= 30);
        const dailyQuotaSeconds = isEid ? (6 * 3600) : (8 * 3600 + 24 * 60);

        totalSeconds += dailyQuotaSeconds;
    });

    totalSeconds -= bonusCount * 2 * 3600;
    if (totalSeconds < 0) totalSeconds = 0;

    return secondsToLongDuration(totalSeconds);
}


// ============================================================
// Function 10: getNetPay(driverID, actualHours, requiredHours, rateFile)
// driverID: (typeof string)
// actualHours: (typeof string) formatted as hhh:mm:ss
// requiredHours: (typeof string) formatted as hhh:mm:ss
// rateFile: (typeof string) path to driver rates text file
// Returns: integer (net pay)
// ============================================================
// TODO: Implement this function
function getNetPay(driverID, actualHours, requiredHours, rateFile) {
    function durationToSeconds(duration) {
        const [hours, minutes, seconds] = duration.split(':').map(Number);
        return (hours * 3600) + (minutes * 60) + seconds;
    }

    const rateLines = fs.readFileSync(rateFile, 'utf8').split('\n').filter(line => line.trim() !== '');
    const driverRate = rateLines.find(line => line.split(',')[0].trim() === driverID);
    const cols = driverRate.split(',');
    const basePay = parseInt(cols[2].trim());
    const tier = parseInt(cols[3].trim());

    const actualSeconds = durationToSeconds(actualHours);
    const requiredSeconds = durationToSeconds(requiredHours);

    if (actualSeconds >= requiredSeconds) return basePay;

    const missingSeconds = requiredSeconds - actualSeconds;
    const missingHours = Math.floor(missingSeconds / 3600);

    const allowedMissing = { 1: 50, 2: 20, 3: 10, 4: 3 };
    const billableMissingHours = Math.max(0, missingHours - allowedMissing[tier]);

    const deductionRatePerHour = Math.floor(basePay / 185);
    const salaryDeduction = billableMissingHours * deductionRatePerHour;

    return basePay - salaryDeduction;
}

module.exports = {
    getShiftDuration,
    getIdleTime,
    getActiveTime,
    metQuota,
    addShiftRecord,
    setBonus,
    countBonusPerMonth,
    getTotalActiveHoursPerMonth,
    getRequiredHoursPerMonth,
    getNetPay
};

