import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext } from "react-beautiful-dnd";
import {
    editColumn,
    selectIssues,
    selectColumns,
    selectColumnOrder
} from './boardSlice';
import { Header } from "./Header";
import { Column } from './Column';
import styles from './Board.module.css';

export function Board() {
    const issues = useSelector(selectIssues);
    const columns = useSelector(selectColumns);
    const columnOrder = useSelector(selectColumnOrder);
    const dispatch = useDispatch();

    function onDragEnd({ destination, source, draggableId }) {
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId && source.index === destination.index) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const column = columns[source.droppableId];
            const newIssueIds = Array.from(column.issueIds);
            newIssueIds.splice(source.index, 1);
            newIssueIds.splice(destination.index, 0, draggableId);
            const newColumn = {
                ...column,
                issueIds: newIssueIds
            }
            dispatch(editColumn(newColumn));
        }

        if (source.droppableId !== destination.droppableId) {
            const sourceColumn = columns[source.droppableId];
            const newSourceIssueIds = Array.from(sourceColumn.issueIds);
            newSourceIssueIds.splice(source.index, 1);
            const destinationColumn = columns[destination.droppableId];
            const newDestinationIssueIds = Array.from(destinationColumn.issueIds);
            newDestinationIssueIds.splice(destination.index, 0, draggableId);
            const newSourceColumn = {
                ...sourceColumn,
                issueIds: newSourceIssueIds
            }
            const newDestinationColumn = {
                ...destinationColumn,
                issueIds: newDestinationIssueIds
            }
            dispatch(editColumn(newSourceColumn));
            dispatch(editColumn(newDestinationColumn));
        }
    }

    return (
        <div
            className ={styles.appProject}>
                <Header />

                <DragDropContext
                    onDragEnd = {onDragEnd}>
                    <div
                        className = {styles.appProjectBoard}>
                            {columnOrder.map(columnId => {
                                const column = columns[columnId];
                                const mappedIssues = column.issueIds.map(issueId => issues[issueId]);

                                return <Column
                                    key = {column.columnId}
                                    column = {column}
                                    issues = {mappedIssues}
                                />
                            })}
                    </div>
                </DragDropContext>
        </div>
    );
}