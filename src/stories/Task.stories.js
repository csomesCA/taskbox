import React from 'react';

import Task from '../components/Task';


/* This is the default export. It contains the  component, the title, and optionally exclude stories (exports in story that shouldn't be
rendered by Storybook), and argTypes (specifies the args behavior in each story)
*/
export default {
    component: Task,
    title: 'Task',

};

// Standard function which we will copy for each of our stories using the '.bind({})' technique
const Template = args => <Task {...args}/>;


// DEFAULT STATE 
export const Default = Template.bind({});

// Arguments or Args are what allows us to live edit components. Each following story uses these base Default args to start.
Default.args = {
    task: {
        id: '1',
        title: 'Test Task',
        state: 'TEST_INBOX',
        updatedAt: new Date(2018, 0, 1, 9, 0),
    },
};

// PINNED STATE
export const Pinned = Template.bind({}); 
Pinned.args = {
    task: {
        ...Default.args.task,
        state: 'TASK_PINNED',
    },
};

// ARCHIVED STATE 
export const Archived = Template.bind({});
Archived.args = {
    task: {
        ...Default.args.task,
        state: 'TASK_ARCHIVED',
    },
};

const longTitleString = `This task's name is absurdly large. In fact, I think if I keep going I might end up with content overflow. What will happen? The star that represents a pinned task could have text overlapping. The text could cut-off abruptly when it reaches the star. I hope not!`;

export const LongTitle = Template.bind({});
LongTitle.args = {
  task: {
    ...Default.args.task,
    title: longTitleString,
  },
};