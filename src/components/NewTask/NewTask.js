import Section from '../UI/Section';
import TaskForm from './TaskForm';

import useFetch from "../../hooks/use-fetch";

const NewTask = (props) => {

    const createTask = (taskText, data) => {
      const generatedId = data.name; // firebase-specific => "name" contains generated id
      const createdTask = { id: generatedId, text: taskText };
        console.log(data);
        console.log(taskText);
        console.log(createdTask);
        props.onAddTask(createdTask);
    }

    const {isLoading, error, sendReq: sendTask} = useFetch();

    const enterTaskHandler = async (taskText) => {
        const config = {
            url: 'https://react-hooks-example-db-b2259-default-rtdb.firebaseio.com/tasks.json',
            method: 'POST',
            body: JSON.stringify({ text: taskText }),
            headers: {
                'Content-Type': 'application/json',
            },
        }
        await sendTask(config, createTask.bind(null, taskText));
    }


  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
