import { ChangeEvent, FormEvent, memo, useState } from 'react';
import styles from './Task.module.css';
import formStyles from './TaskForm.module.css';
import { Draggable } from '@hello-pangea/dnd';
import getGravatarUrl from 'helpers/getGravatarUrl';
import useBoardStore from 'store/boardStore';
import EditIcon from 'components/icons/EditIcon';
import CloseIcon from 'components/icons/CloseIcon';

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
  const deleteTask = useBoardStore((state) => state.deleteTask);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [titleEdit, setTitleEdit] = useState(title);
  const [descriptionEdit, setDescriptionEdit] = useState(description);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleDeleteClick = () => {
    setIsDeleting(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setTitleEdit(title);
    setDescriptionEdit(description);
  };

  const handleConfirmDelete = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    deleteTask(columnId, index);
  };

  const handleSaveEdits = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
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
          {!isEditing && !isDeleting && (
            <div className={styles.content}>
              <div className={styles.header}>
                <img src={getGravatarUrl(email)} alt="avatar" />
                <p title={title}>{title}</p>
                <button
                  className={styles.editButton}
                  onClick={handleEditClick}
                  title="Edit Task"
                >
                  <EditIcon />
                </button>
                <button
                  className={styles.deleteButton}
                  onClick={handleDeleteClick}
                  title="Delete Task"
                >
                  <CloseIcon />
                </button>
              </div>
              {Boolean(description) && (
                <p className={styles.description}>{description}</p>
              )}
            </div>
          )}
          {isEditing && (
            <form
              className={formStyles.formContainer}
              onSubmit={handleSaveEdits}
            >
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
                <textarea
                  name="description"
                  value={descriptionEdit}
                  onChange={handleDescriptionChange}
                />
              </label>
              <div className={formStyles.actions}>
                <button className={formStyles.buttonPrimary} type="submit">
                  Save
                </button>
                <button
                  className={formStyles.buttonSecondary}
                  onClick={handleCancelEdit}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
          {isDeleting && (
            <form
              className={formStyles.formContainer}
              onSubmit={handleConfirmDelete}
            >
              <label>
                <span>Are you sure you want to delete this task?</span>
              </label>
              <div className={formStyles.actions}>
                <button className={formStyles.buttonError} type="submit">
                  Delete
                </button>
                <button
                  className={formStyles.buttonSecondary}
                  onClick={() => setIsDeleting(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </Draggable>
  );
}

export default memo<TaskProps>(Task);
