import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { archiveTask, pinTask } from '../lib/redux';
import Task from './Task';

export function PureTaskList({ loading, tasks, onPinTask, onArchiveTask}) {

    //These events happen when you "Pin" a task (or click on it's star), and when you "Archive" a task (click on the checkbox)
    const events = {
        onPinTask,
        onArchiveTask,
    };

    
    const LoadingRow = (
        <div className="loading-item">
            <span className="glow-checkbox" />
            <span className="glow-text">
                <span>Loading</span> <span>cool</span> <span>state</span>
            </span>
        </div>
    );

    // This state is used for before Tasks are loaded into the application
    if (loading) {
        return (
            <div className="list-items">
                {LoadingRow}
                {LoadingRow}
                {LoadingRow}
                {LoadingRow}
                {LoadingRow}
                {LoadingRow}
            </div>
        );
    }

    // This state is for when there are no tasks, it will display a message and big checkmark
    if (tasks.length === 0) {
        return(
            <div className="list-items">
                <div className="wrapper-message">
                    <span className="icon-check"/>
                    <div className="title-message">You have no tasks</div>
                    <div className="subtitle-message">Sit back and relax</div>
                </div>
            </div>    
        );
    }

    // This const reorders tasks into a new list using the spread operation and the js function .filter()
    const tasksInOrder = [
        ...tasks.filter(t => t.state === 'TASK_PINNED'),
        ...tasks.filter(t => t.state !== 'TASK_PINNED'),
    ];

    // If everything is normal, the TaskList will render using the .map function inside of a list-items div
    return (
        <div className="list-items">
            {tasksInOrder.map(task => (
                <Task key={task.id} task={task} {...events} />
            ))}
        </div>
    );
}


// These are the Props that belong to TaskList. Only 'tasks' is required for the page to load
PureTaskList.propTypes = {
    /** checks if its in a loading state */
    loading: PropTypes.bool,

    /** The list of tasks */
    tasks: PropTypes.arrayOf(Task.propTypes.task).isRequired,

    /**Event to change the task to pinned */
    onPinTask: PropTypes.func,

    /** Event to change the task to archived */
    onArchiveTask: PropTypes.func,

};


// Gives a default value of false to the loading state Property
PureTaskList.defaultProps = {
    loading: false,
};


// Redux implementation
export default connect(
    ({tasks}) => ({
        tasks: tasks.filter(t => t.state === 'TASK_INBOX' || t.state === 'TASK_PINNED'),
    }),
    dispatch => ({
        onArchiveTask: id => dispatch(archiveTask(id)),
        onPinTask: id => dispatch(pinTask(id)),
    })
)(PureTaskList); 