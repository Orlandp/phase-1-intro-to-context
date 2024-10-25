// Your code here
// Create an employee record from a given array
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
      firstName,
      familyName,
      title,
      payPerHour,
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  // Convert an array of arrays to an array of employee records
  function createEmployeeRecords(employeeData) {
    return employeeData.map(createEmployeeRecord);
  }
  
  // Add a time-in event to an employee record
  function createTimeInEvent(employee, dateTime) {
    const [date, hour] = dateTime.split(" ");
    employee.timeInEvents.push({
      type: "TimeIn",
      date,
      hour: parseInt(hour, 10)
    });
    return employee;
  }
  
  // Add a time-out event to an employee record
  function createTimeOutEvent(employee, dateTime) {
    const [date, hour] = dateTime.split(" ");
    employee.timeOutEvents.push({
      type: "TimeOut",
      date,
      hour: parseInt(hour, 10)
    });
    return employee;
  }
  
  // Calculate hours worked on a given date
  function hoursWorkedOnDate(employee, targetDate) {
    const timeIn = employee.timeInEvents.find(e => e.date === targetDate);
    const timeOut = employee.timeOutEvents.find(e => e.date === targetDate);
    return (timeOut.hour - timeIn.hour) / 100;
  }
  
  // Calculate wages earned on a given date
  function wagesEarnedOnDate(employee, targetDate) {
    return hoursWorkedOnDate(employee, targetDate) * employee.payPerHour;
  }
  
  // Calculate all wages for an employee
  function allWagesFor(employee) {
    return employee.timeInEvents.reduce((total, event) => {
      return total + wagesEarnedOnDate(employee, event.date);
    }, 0);
  }
  
  // Calculate total payroll for all employees
  function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((total, employee) => {
      return total + allWagesFor(employee);
    }, 0);
  }
  
  // Test the code with example data
  const employeesData = [
    ["Thor", "Odinson", "God of Thunder", 25],
    ["Steve", "Rogers", "Captain America", 15],
    ["Natasha", "Romanoff", "Black Widow", 20]
  ];
  
  const employeeRecords = createEmployeeRecords(employeesData);
  createTimeInEvent(employeeRecords[0], "2023-10-15 0900");
  createTimeOutEvent(employeeRecords[0], "2023-10-15 1700");
  createTimeInEvent(employeeRecords[1], "2023-10-15 1000");
  createTimeOutEvent(employeeRecords[1], "2023-10-15 1800");
  
  console.log("Thor's wages on 2023-10-15:", wagesEarnedOnDate(employeeRecords[0], "2023-10-15"));
  console.log("Total payroll:", calculatePayroll(employeeRecords));
  
