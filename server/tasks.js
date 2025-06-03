const { v4: uuidv4 } = require('uuid');
let tasks = [
  {
    id: uuidv4(),
    title: 'Design Homepage',
    description: 'Create wireframes and mockups for the new homepage design',
    priority: 'high',
    status: 'todo',
    dueDate: '2024-07-15',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: uuidv4(),
    title: 'Setup Database',
    description: 'Configure MongoDB database for the project',
    priority: 'medium',
    status: 'inprogress',
    dueDate: '2024-07-20',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: uuidv4(),
    title: 'Write Documentation',
    description: 'Complete API documentation for developers',
    priority: 'low',
    status: 'done',
    dueDate: '2024-07-10',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

module.exports = tasks