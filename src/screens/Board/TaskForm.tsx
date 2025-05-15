import styles from './TaskForm.module.css';

export type TaskData = {
  id: string;
  title: string;
  email: string;
  description: string;
};

export type TaskFormProps = {
  onCancel?: () => void;
  onSubmit?: (data: TaskData) => void;
};

export default function TaskForm({ onCancel, onSubmit }: TaskFormProps) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = Object.fromEntries(
      new FormData(event.currentTarget).entries(),
    ) as TaskData;

    formData.id = crypto.randomUUID();

    if (typeof onSubmit === 'function') {
      onSubmit(formData);
    }
  };

  // @TODO - disable the submit button if fields are empty
  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <label>
        <span>Title</span>
        <input name="title" />
      </label>
      <label>
        <span>Email</span>
        <input name="email" />
      </label>
      <label>
        <span>Description</span>
        <textarea name="description" />
      </label>
      <div className={styles.actions}>
        <button className={styles.buttonPrimary} type="submit">
          Save task
        </button>
        <button
          className={styles.buttonSecondary}
          type="button"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
