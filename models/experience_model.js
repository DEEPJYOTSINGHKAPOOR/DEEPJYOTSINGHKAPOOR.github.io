class ExeperienceModel {
    constructor(designationInCompany , companyName, companyLink, experienceMonth , jobLocation, jobDescription) {
        this.designationInCompany = designationInCompany ;
        this.companyName = companyName ;
        this.companyLink = companyLink ;
        this.experienceMonth = experienceMonth;
        this.jobLocation = jobLocation ;
        this.jobDescription = jobDescription ;
    }
    toString() {
        return `
        Designation In Company: ${this.designationInCompany}
        Company Name: ${this.companyName}
      `;
    }
}


module.exports = ExeperienceModel ;