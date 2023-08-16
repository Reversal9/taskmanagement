import Issue from '../../models/issue.js';

const getIssues = async (req, res) => {
    try {
        const issues = await Issue.find();
        res.status(200).json({ issues });
    } catch (error) {
        throw error;
    }
};

const addIssue = async (req, res) => {
    const body = req.body;
    const issue = new Issue({
        summary: body.summary,
        assigneeId: body.assigneeId
    });
    const newIssue = await issue.save();
    const allIssues = await Issue.find();

    res.status(201).json({
        message: "Todo added",
        issue: newIssue,
        Issues: allIssues });
};

const updateIssue = async (req, res) => {
    try {
        const { params: { id }, body } = req;
        const updateIssue = await Issue.findByIdAndUpdate(
            { _id: id },
            body
        );
        const allIssues = await Issue.find();
        res.status(200).json({
            message: "Issue updated",
            issue: updateIssue,
            issues: allIssues
        });
    } catch (error) {
        throw error;
    }
};

const deleteIssue = async (req, res) => {
    try {
        const deleteIssue = await Issue.findByIdAndDelete(req.params.id);
        const allIssues = await Issue.find();
        res.status(200).json({
            message: "Issue deleted",
            issue: deleteIssue,
            issues: allIssues
        });
    } catch (error) {
        throw error;
    }
};

export { getIssues, addIssue, updateIssue, deleteIssue };