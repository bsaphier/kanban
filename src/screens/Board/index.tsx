import Column from './Column';
import styles from './index.module.css';
import useBoardStore from 'store/boardStore';
import { DragDropContext, OnDragEndResponder } from '@hello-pangea/dnd';

export default function Board() {
  const columns = useBoardStore((state) => state.columns);
  const board = useBoardStore((state) => state.board);
  const moveTask = useBoardStore((state) => state.moveTask);

  const handleDragEnd: OnDragEndResponder = (result) => {
    const { destination, source } = result;
    if (destination) {
      moveTask(
        source.droppableId,
        source.index,
        destination.droppableId,
        destination.index,
      );
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className={styles.board}>
        {columns.map(({ id, title }) => (
          <Column key={id} title={title} id={id} tasks={board[id]} />
        ))}
      </div>
    </DragDropContext>
  );
}
