import React, { useEffect, useState } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useFetch from "./hooks/use-fetch";

function App() {
  const [tasks, setTasks] = useState([]);

  const httpData = useFetch();

  const {isLoading, error, sendReq: fetchTasks} = httpData;

  // re fetch data when the component reloads
  useEffect(() => {
    const setTaskData = (taskObj) => {
      const loadedTasks = [];

      for (const taskKey in taskObj) {
        loadedTasks.push({id: taskKey, text: taskObj[taskKey].text});
      }
      setTasks(loadedTasks);
    };

    fetchTasks({url: 'https://react-hooks-example-db-b2259-default-rtdb.firebaseio.com/tasks.json'}, setTaskData);
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
