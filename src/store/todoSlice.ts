import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Comment {
  id: string;
  userId: string;
  text: string;
  createdAt: string;
}

export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Todo {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  dueTime?: string;
  status: 'pending' | 'in-progress' | 'completed';
  category: string;
  createdAt: string;
  assignedTo?: string[];
  labels: string[];
  attachments?: string[];
  subtasks: SubTask[];
  comments: Comment[];
  reminder?: string;
  recurring?: 'daily' | 'weekly' | 'monthly' | 'none';
  color?: string;
}

interface TodoState {
  todos: Todo[];
  categories: string[];
  labels: string[];
  filters: {
    status: string[];
    priority: string[];
    category: string[];
    labels: string[];
    assignedTo: string[];
  };
  sort: {
    field: keyof Todo;
    direction: 'asc' | 'desc';
  };
  search: string;
}

const initialState: TodoState = {
  todos: [],
  categories: ['Personal', 'Work', 'Shopping', 'Others'],
  labels: ['Important', 'Urgent', 'Can Wait', 'Review Needed'],
  filters: {
    status: [],
    priority: [],
    category: [],
    labels: [],
    assignedTo: [],
  },
  sort: {
    field: 'createdAt',
    direction: 'desc',
  },
  search: '',
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.unshift(action.payload);
    },
    updateTodo: (state, action: PayloadAction<Todo>) => {
      const index = state.todos.findIndex(todo => todo.id === action.payload.id);
      if (index !== -1) {
        state.todos[index] = action.payload;
      }
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
    addCategory: (state, action: PayloadAction<string>) => {
      if (!state.categories.includes(action.payload)) {
        state.categories.push(action.payload);
      }
    },
    addLabel: (state, action: PayloadAction<string>) => {
      if (!state.labels.includes(action.payload)) {
        state.labels.push(action.payload);
      }
    },
    toggleTodoStatus: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find(todo => todo.id === action.payload);
      if (todo) {
        const statusMap = {
          'pending': 'in-progress',
          'in-progress': 'completed',
          'completed': 'pending'
        } as const;
        todo.status = statusMap[todo.status];
      }
    },
    addSubtask: (state, action: PayloadAction<{ todoId: string; subtask: SubTask }>) => {
      const todo = state.todos.find(todo => todo.id === action.payload.todoId);
      if (todo) {
        todo.subtasks.push(action.payload.subtask);
      }
    },
    toggleSubtask: (state, action: PayloadAction<{ todoId: string; subtaskId: string }>) => {
      const todo = state.todos.find(todo => todo.id === action.payload.todoId);
      if (todo) {
        const subtask = todo.subtasks.find(st => st.id === action.payload.subtaskId);
        if (subtask) {
          subtask.completed = !subtask.completed;
        }
      }
    },
    addComment: (state, action: PayloadAction<{ todoId: string; comment: Comment }>) => {
      const todo = state.todos.find(todo => todo.id === action.payload.todoId);
      if (todo) {
        todo.comments.push(action.payload.comment);
      }
    },
    setFilters: (state, action: PayloadAction<Partial<TodoState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setSort: (state, action: PayloadAction<TodoState['sort']>) => {
      state.sort = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    assignTodo: (state, action: PayloadAction<{ todoId: string; userId: string }>) => {
      const todo = state.todos.find(todo => todo.id === action.payload.todoId);
      if (todo) {
        if (!todo.assignedTo) todo.assignedTo = [];
        if (!todo.assignedTo.includes(action.payload.userId)) {
          todo.assignedTo.push(action.payload.userId);
        }
      }
    },
    unassignTodo: (state, action: PayloadAction<{ todoId: string; userId: string }>) => {
      const todo = state.todos.find(todo => todo.id === action.payload.todoId);
      if (todo && todo.assignedTo) {
        todo.assignedTo = todo.assignedTo.filter(id => id !== action.payload.userId);
      }
    },
    setReminder: (state, action: PayloadAction<{ todoId: string; reminder: string }>) => {
      const todo = state.todos.find(todo => todo.id === action.payload.todoId);
      if (todo) {
        todo.reminder = action.payload.reminder;
      }
    },
  },
});

export const {
  addTodo,
  updateTodo,
  deleteTodo,
  addCategory,
  addLabel,
  toggleTodoStatus,
  addSubtask,
  toggleSubtask,
  addComment,
  setFilters,
  setSort,
  setSearch,
  assignTodo,
  unassignTodo,
  setReminder,
} = todoSlice.actions;

export default todoSlice.reducer; 