class BranchDTO {
    constructor(branchJSON) {
        var obj = JSON.parse(branchJSON);
        this.brnCode = obj.BRN_CODE;
        this.brnName = obj.BRN_NAME;
    }
}
module.exports = BranchDTO;