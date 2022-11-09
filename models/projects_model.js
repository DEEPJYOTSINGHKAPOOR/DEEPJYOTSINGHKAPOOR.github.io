class ProjectModel {
    constructor(projectTitle, domainName, algorithms, date , projectDescription, imagesFileString, specialLink) {
        this.projectTitle = projectTitle ;
        this.domainName = domainName ;
        this.algorithms = algorithms ;
        this.date = date;
        this.projectDescription = projectDescription ;
        this.imagesFileString = imagesFileString ;
        this.specialLink = specialLink;
    }
    toString() {
        return `
        Project Title: ${this.projectTitle}
        DomainName: ${this.domainName}
        Algorithms: ${this.algorithms}
        date: ${this.date}
      `;
    }
}


module.exports = ProjectModel ;