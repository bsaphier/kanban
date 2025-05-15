import { create } from 'zustand';
import { sync } from './middleware/sync';
import { persist } from 'zustand/middleware';
import { TaskData } from 'screens/Board/TaskForm';

// @TODO ability to add columns

type Column = { title: string; id: string };

type Board = {
  [key: string]: TaskData[];
};

type BoardStore = {
  columns: Column[];
  board: Board;
  addTask: (columnId: string, task: TaskData) => void;
  moveTask: (
    sourceColumnId: string,
    sourceIndex: number,
    targetColumnId: string,
    targetIndex: number
  ) => void;
  updateTask: (
    columnId: string,
    taskIndex: number,
    updatedTaskData: TaskData
  ) => void;
  setBoard: (board: Board) => void;
  clearBoard: () => void;
};

const defaultColumnKeys = {
  toDo: 'toDo',
  inProgress: 'inProgress',
  done: 'done',
};

const defaultColumns = [
  { title: 'To do', id: defaultColumnKeys.toDo },
  { title: 'In progress', id: defaultColumnKeys.inProgress },
  { title: 'Done', id: defaultColumnKeys.done },
];

const middlewareOptions = {
  name: 'board-store',
};

const useBoardStore = create<BoardStore>()(
  persist(
    sync(
      (set) => ({
        columns: defaultColumns,
        board: {
          [defaultColumnKeys.toDo]: [],
          [defaultColumnKeys.inProgress]: [],
          [defaultColumnKeys.done]: [],
        },

        addTask: (columnId, task) =>
          set((state) => ({
            board: {
              ...state.board,
              [columnId]: [task, ...state.board[columnId]],
            },
          })),

        moveTask: (sourceColumnId, sourceIndex, targetColumnId, targetIndex) =>
          set((state) => {
            const isMoveWithinColumn = sourceColumnId === targetColumnId;

            // if task is dropped in it's current location, do not change state
            if (isMoveWithinColumn && sourceIndex === targetIndex) {
              return state;
            }

            const sourceTasks = [...state.board[sourceColumnId]];
            const targetTasks = isMoveWithinColumn
              ? sourceTasks
              : [...state.board[targetColumnId]];

            // get the task to move
            const [movingTask] = sourceTasks.splice(sourceIndex, 1);

            // if task was not found, do not change state
            if (!movingTask) {
              return state;
            }

            targetTasks.splice(targetIndex, 0, movingTask);

            return {
              board: {
                ...state.board,
                [sourceColumnId]: sourceTasks,
                [targetColumnId]: targetTasks,
              },
            };
          }),

        updateTask: (columnId, taskIndex, updatedTaskData) =>
          set((state) => {
            const newTasks = [...state.board[columnId]];
            newTasks[taskIndex] = {
              ...newTasks[taskIndex],
              ...updatedTaskData,
            };
            return {
              board: {
                ...state.board,
                [columnId]: newTasks,
              },
            };
          }),

        setBoard: (board) => set({ board }),

        clearBoard: () =>
          set({
            columns: defaultColumns,
            board: {
              [defaultColumnKeys.toDo]: [],
              [defaultColumnKeys.inProgress]: [],
              [defaultColumnKeys.done]: [],
            },
          }),
      }),
      middlewareOptions
    ),
    middlewareOptions
  )
);

export default useBoardStore;
