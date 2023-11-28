//make villain class for villain service
export class Villain {
    id: number;
    name: string;
    reportName: string;
    reportNumber: string;
    location: Location;
    time: string;
    extraDetails: string;
    status: string;

    constructor(id: number, name: string, reportName: string, reportNumber: string, 
        location: Location, time: string, extraDetails: string) {
        this.id = id;
        this.name = name;
        this.reportName = reportName;
        this.reportNumber = reportNumber;
        this.location = location;
        this.time = time;
        this.extraDetails = extraDetails;
        this.status = "open";
      }

}