import { Router } from "express";
import { getIssues, addIssue, updateIssue, deleteIssue } from "../controllers/issues/index.js";
import { addColumn, deleteColumn, getColumns, updateColumn } from "../controllers/columns/index.js";

const router = Router();

router.get("/issues", getIssues);

router.post("/issues", addIssue);

router.put("/issues/:id", updateIssue);

router.delete("/issues/:id", deleteIssue);

router.get("/columns", getColumns);

router.post("/columns", addColumn);

router.put("/columns/:id", updateColumn);

router.delete("/columns/:id", deleteColumn);

export default router;