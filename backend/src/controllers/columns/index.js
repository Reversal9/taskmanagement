import Column from '../../models/column.js';

const getColumns = async (req, res) => {
    try {
        const columns = await Column.find();
        res.status(200).json({ issues: columns });
    } catch (error) {
        throw error;
    }
};

const addColumn = async (req, res) => {
    const body = req.body;
    const column = new Column({
        title: body.title,
        issueIds: body.issueIds
    });
    const newColumn = await column.save();
    const allColumns = await Column.find();

    res.status(201).json({
        message: "Todo added",
        column: newColumn,
        columns: allColumns });
};

const updateColumn = async (req, res) => {
    try {
        const { params: { id }, body } = req;
        const updateColumn = await Column.findByIdAndUpdate(
            { _id: id },
            body
        );
        const allColumns = await Column.find();
        res.status(200).json({
            message: "Issue updated",
            column: updateColumn,
            columns: allColumns
        });
    } catch (error) {
        throw error;
    }
};

const deleteColumn = async (req, res) => {
    try {
        const deleteColumn = await Column.findByIdAndDelete(req.params.id);
        const allColumns = await Column.find();
        res.status(200).json({
            message: "Issue deleted",
            column: deleteColumn,
            columns: allColumns
        });
    } catch (error) {
        throw error;
    }
};

export { getColumns, addColumn, updateColumn, deleteColumn };