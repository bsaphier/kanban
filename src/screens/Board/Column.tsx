import Task from './Task';
import { useState } from 'react';
import styles from './Column.module.css';
import useBoardStore from 'store/boardStore';
import { Droppable } from '@hello-pangea/dnd';
import TaskForm, { TaskData } from './TaskForm';
import PlusIcon from 'components/icons/PlusIcon';

export type ColumnProps = { id: string; title: string; tasks: TaskData[] };

export default function Column({ id, title, tasks }: ColumnProps) {
  const addTask = useBoardStore((state) => state.addTask);
  const [displayForm, setDisplayForm] = useState(false);

  const handleDisplayForm = () => {
    setDisplayForm(true);
  };

  const handleCancelForm = () => {
    setDisplayForm(false);
  };

  const handleSubmitTaskForm = (formData: TaskData) => {
    addTask(id, formData);
    setDisplayForm(false);
  };

  return (
    <section className={styles.column}>
      <header className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        {tasks.length < 100 && (
          <button
            title="Add task"
            className={styles.button}
            onClick={handleDisplayForm}
          >
            <PlusIcon />
          </button>
        )}
      </header>
      {displayForm && (
        <div className={styles.formWrapper}>
          <TaskForm
            onCancel={handleCancelForm}
            onSubmit={handleSubmitTaskForm}
          />
        </div>
      )}
      <Droppable droppableId={id} isDropDisabled={tasks.length >= 100}>
        {(provided) => (
          <div
            className={styles.dropZone}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasks.map((taskData, index) => (
              <Task
                key={taskData.id}
                index={index}
                columnId={id}
                {...taskData}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </section>
  );
}
