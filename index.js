function createEmployeeRecord(array){
    //Loads Array elements into corresponding Object properties. Additionally, initialize empty Arrays on the properties timeInEvents and timeOutEvents.
    return {
        firstName: array[0],
        familyName:array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents:[],
        timeOutEvents:[]
    }
}

createEmployeeRecord();

function createEmployeeRecords(arrayOfArrays){
    // Converts each nested Array into an employee record using createEmployeeRecord and accumulates it to a new Array
    let arrayOfEmployeeObj = arrayOfArrays.map(createEmployeeRecord)
    return arrayOfEmployeeObj

}
createEmployeeRecords();

function createTimeInEvent(dateStamp){
    // Add an Obj with keys: type: "TimeIn", hour: dervied from argument, date: derived from the argument
    let timeInObj = {
        type: "TimeIn",
        hour: parseInt(dateStamp.split(' ')[1], 10),
        date: dateStamp.split(' ')[0]
    }
    this.timeInEvents.push(timeInObj)
    return this
}

function createTimeOutEvent(dateStamp){
    // Add an Object with keys: type: Set to "TimeOut", hour: Derived from the argument, date: Derived from the argument
   
    let timeOutObj = {
        type: "TimeOut",
        hour: parseInt(dateStamp.split(' ')[1]),
        date: dateStamp.split(' ')[0]
    }
    this.timeOutEvents.push(timeOutObj)
    return this
}

function hoursWorkedOnDate(date){
    // Given a date, find the number of hours elapsed between that date's timeInEvent and timeOutEvent
    let timeOut = this.timeOutEvents.find((TimeOutObj) => {
        if (TimeOutObj['date'] === date){
            return TimeOutObj
        }
    })

    let timeIn = this.timeInEvents.find((TimeInObj) => {
        if(TimeInObj['date'] === date){
            return TimeInObj
        }
    })

    let hoursWorked = (timeOut.hour - timeIn.hour)/100
    return hoursWorked
}

function wagesEarnedOnDate(date){
    // Using hoursWorkedOnDate, multiply the hours by the record's payRate to determine amount owed. Amount should be returned as a number.
    let payRate = this.payPerHour
    let hoursForDay = hoursWorkedOnDate.call(this, date)
    let wagesForDay = payRate * hoursForDay
    return wagesForDay
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

function allWagesFor(){
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(srcArray, firstName){
    // Test the firstName field for a match with the firstName argument
    console.log("this is the scrArray", srcArray)
    
    let employeeObj = srcArray.find((obj) => {
        if(obj.firstName === firstName){
            return obj
        } else {
            return undefined
        }
    })
    return employeeObj
}

function calculatePayroll(array){
    // Using allWagesFor for each of the employees, accumulate the value of all dates worked by the employee in the record used as context. Amount should be returned as a number.
    console.log(array)
    console.log("this is the arg", this)
    let payroll = array.reduce(((employee1, employee2) => employee1 + allWagesFor.call(employee2)),0)
    return payroll
}

