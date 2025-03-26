// Your code here


function createEmployeeRecord(info){
const record = {
    firstName: info[0],
    familyName: info[1],
    title: info[2],
    payPerHour: info[3],
    timeInEvents: [],
    timeOutEvents: []
}

return record
}

function createEmployeeRecords(employeeRecords){


    return employeeRecords.map(function(info) {
        return createEmployeeRecord(info);
      });
    }

    function createTimeInEvent(employeeRecord, timestamp) {
        let [date, hour] = timestamp.split(" "); // Split timestamp into date and hour
        let event = {
          type: "TimeIn",  // Event type is "TimeIn"
          date: date,      // Extract date part of the timestamp
          hour: parseInt(hour) // Convert the hour part to a number
        };
      
        employeeRecord.timeInEvents.push(event); // Add event to timeInEvents array
        return employeeRecord; // Return updated record
      }

    function createTimeOutEvent(employeeRecord, timestamp) {
        let [date, hour] = timestamp.split(" "); // Split timestamp into date and hour
        let event = {
          type: "TimeOut", // Event type is "TimeOut"
          date: date,      // Extract date part of the timestamp
          hour: parseInt(hour) // Convert the hour part to a number
        };
      
        employeeRecord.timeOutEvents.push(event); // Add event to timeOutEvents array
        return employeeRecord; // Return updated record
      }

      function hoursWorkedOnDate(employeeRecord, date) {
        // Find the timeInEvent and timeOutEvent that match the given date
        let timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
        let timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);
      
        // If both timeIn and timeOut events exist for the date, calculate hours worked
        if (timeInEvent && timeOutEvent) {
          return (timeOutEvent.hour - timeInEvent.hour) / 100; // Return hours as a decimal (e.g., 2 hours = 2)
        }
      
        return 0; // If no matching events found, return 0
      }

      function wagesEarnedOnDate(employeeRecord, date) {
        // Get the number of hours worked on the specified date
        let hoursWorked = hoursWorkedOnDate(employeeRecord, date);
      
        // Multiply the hours worked by the pay per hour to calculate the wages earned
        return hoursWorked * employeeRecord.payPerHour;
      }

      function allWagesFor(employeeRecord) {
        // Use the map function to calculate wages for each day worked, then sum them up
        return employeeRecord.timeInEvents.reduce(function(totalWages, timeInEvent) {
          let date = timeInEvent.date;
          let hoursWorked = hoursWorkedOnDate(employeeRecord, date);
          let dailyWages = hoursWorked * employeeRecord.payPerHour;
          return totalWages + dailyWages;
        }, 0); // Initial value for totalWages is 0
      }

      function calculatePayroll(employees) {
        // Use the reduce method to sum up the total wages for all employees
        return employees.reduce((total, employee) => {
          return total + allWagesFor(employee);
        }, 0);
      }


