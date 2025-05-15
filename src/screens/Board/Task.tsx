import { ChangeEvent, memo, useState } from 'react';
import styles from './Task.module.css';
import { Draggable } from '@hello-pangea/dnd';
import getGravatarUrl from 'helpers/getGravatarUrl';
import useBoardStore from 'store/boardStore';

export type TaskProps = {
  id: string;
  title: string;
  email: string;
  index: number;
  columnId: string;
  description: string;
};

function Task({ id, columnId, title, email, index, description }: TaskProps) {
  const updateTask = useBoardStore((state) => state.updateTask);
  const [isEditing, setIsEditing] = useState(false);
  const [titleEdit, setTitleEdit] = useState(title);
  const [descriptionEdit, setDescriptionEdit] = useState(description);

  // const handleEditClick = () => {
  //   setIsEditing(true);
  // };

  const handleSave = () => {
    updateTask(columnId, index, {
      id,
      email,
      title: titleEdit,
      description: descriptionEdit,
    });
    setIsEditing(false);
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.currentTarget.value;
    setTitleEdit(newValue);
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.currentTarget.value;
    setDescriptionEdit(newValue);
  };

  return (
    <Draggable draggableId={id} index={index} isDragDisabled={isEditing}>
      {(provided) => (
        <div
          className={styles.container}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {!isEditing && (
            <>
              <div className={styles.header}>
                <img src={getGravatarUrl(email)} alt="avatar" />
                <p title={title}>{title}</p>
              </div>
              {Boolean(description) && (
                <p className={styles.description}>{description}</p>
              )}
              {/* <button onClick={handleEditClick}>Edit</button> */}
            </>
          )}
          {isEditing && (
            <>
              <label>
                <span>Title</span>
                <input
                  name="title"
                  value={titleEdit}
                  onChange={handleTitleChange}
                />
              </label>
              <label>
                <span>Description</span>
                <input
                  name="description"
                  value={descriptionEdit}
                  onChange={handleDescriptionChange}
                />
              </label>
              <button onClick={handleSave}>Save</button>
            </>
          )}
        </div>
      )}
    </Draggable>
  );
}

export default memo<TaskProps>(Task);
