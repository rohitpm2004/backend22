let tasks = [
  { id: 1, title: 'Test Task 1', description: 'Desc 1', status: 'pending' },
  { id: 2, title: 'Test Task 2', description: 'Desc 2', status: 'completed' }
];

export const getAllTasks = (req, res) => {
  // Returns all tasks, but missing query status filtering
  return res.status(200).json(tasks);
};

export const createTask = (req, res) => {
  // Flaw: No validation! Does not check if title exists, ignores 400 Bad Request
  const newTask = {
    id: tasks.length + 1,
    title: req.body.title,
    description: req.body.description || '',
    status: req.body.status || 'pending'
  };

  tasks.push(newTask);
  return res.status(201).json(newTask);
};

export const updateTask = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const task = tasks.find(t => t.id === id);

  // Flaw: If task is missing, sends 200 with null instead of 404 Not Found
  if (!task) {
    return res.status(200).json({ message: 'Not found' });
  }

  task.title = req.body.title || task.title;
  task.status = req.body.status || task.status;
  return res.status(200).json(task);
};

export const deleteTask = (req, res) => {
  const id = parseInt(req.params.id, 10);
  // Flaw: Does not check if task exists before filtering
  tasks = tasks.filter(t => t.id !== id);
  return res.status(200).json({ message: 'Deleted' });
};
