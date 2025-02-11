import {
  Container,
  Typography,
  Paper,
  Box,
  Chip,
  IconButton,
  useTheme,
  alpha,
  Grid,
  Stack,
  Avatar,
  Tooltip,
  Menu,
  MenuItem,
  TextField,
  InputAdornment,
  AvatarGroup,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Badge,
} from '@mui/material';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { toggleTodoStatus, deleteTodo, addComment } from '../store/todoSlice';

// Icons
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ForumIcon from '@mui/icons-material/Forum';

const priorityColors = {
  low: '#22c55e',
  medium: '#f59e0b',
  high: '#ef4444'
};

const statusColors = {
  'pending': '#f97316',
  'in-progress': '#3b82f6',
  'completed': '#22c55e'
};

const TodoList = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todo.todos);
  const [search, setSearch] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null);
  const [sortAnchorEl, setSortAnchorEl] = useState<null | HTMLElement>(null);
  const [commentDialog, setCommentDialog] = useState(false);
  const [newComment, setNewComment] = useState('');

  const handleStatusChange = (todoId: string) => {
    dispatch(toggleTodoStatus(todoId));
  };

  const handleDelete = (todoId: string) => {
    dispatch(deleteTodo(todoId));
    setAnchorEl(null);
  };

  const handleAddComment = () => {
    if (selectedTodo && newComment.trim()) {
      dispatch(addComment({
        todoId: selectedTodo,
        comment: {
          id: Date.now().toString(),
          userId: 'current-user', // Replace with actual user ID
          text: newComment.trim(),
          createdAt: new Date().toISOString()
        }
      }));
      setNewComment('');
      setCommentDialog(false);
    }
  };

  const filteredTodos = todos.filter(todo => 
    todo.title.toLowerCase().includes(search.toLowerCase()) ||
    todo.description.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon sx={{ color: statusColors.completed }} />;
      case 'in-progress':
        return <AccessTimeIcon sx={{ color: statusColors['in-progress'] }} />;
      default:
        return <RadioButtonUncheckedIcon sx={{ color: statusColors.pending }} />;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 700,
            background: theme.palette.mode === 'dark'
              ? 'linear-gradient(45deg, #60a5fa, #818cf8)'
              : 'linear-gradient(45deg, #3b82f6, #6366f1)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Your Tasks
        </Typography>
      </Box>

      {/* Search and Filters */}
      <Paper 
        elevation={0}
        sx={{ 
          p: 2, 
          mb: 3, 
          borderRadius: 3,
          background: alpha(theme.palette.background.paper, 0.8),
          backdropFilter: 'blur(10px)',
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                sx: { borderRadius: 2 }
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack direction="row" spacing={1} justifyContent={{ xs: 'flex-start', md: 'flex-end' }}>
              <Button
                startIcon={<FilterListIcon />}
                onClick={(e) => setFilterAnchorEl(e.currentTarget)}
                sx={{ borderRadius: 2 }}
              >
                Filter
              </Button>
              <Button
                startIcon={<SortIcon />}
                onClick={(e) => setSortAnchorEl(e.currentTarget)}
                sx={{ borderRadius: 2 }}
              >
                Sort
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Paper>

      {/* Todo List */}
      <Grid container spacing={3}>
        {filteredTodos.map((todo) => (
          <Grid item xs={12} key={todo.id}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3,
                background: alpha(theme.palette.background.paper, 0.8),
                backdropFilter: 'blur(10px)',
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-2px)',
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                <IconButton 
                  onClick={() => handleStatusChange(todo.id)}
                  sx={{ mt: 1 }}
                >
                  {getStatusIcon(todo.status)}
                </IconButton>

                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        textDecoration: todo.status === 'completed' ? 'line-through' : 'none',
                        color: todo.status === 'completed' ? 'text.secondary' : 'text.primary'
                      }}
                    >
                      {todo.title}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton
                        size="small"
                        onClick={() => {
                          setSelectedTodo(todo.id);
                          setCommentDialog(true);
                        }}
                      >
                        <Badge badgeContent={todo.comments.length} color="primary">
                          <ChatBubbleOutlineIcon />
                        </Badge>
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          setSelectedTodo(todo.id);
                          setAnchorEl(e.currentTarget);
                        }}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </Box>
                  </Box>

                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{ mb: 2 }}
                  >
                    {todo.description}
                  </Typography>

                  <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
                    <Chip
                      size="small"
                      label={todo.priority}
                      sx={{ 
                        bgcolor: priorityColors[todo.priority],
                        color: '#fff',
                        textTransform: 'capitalize'
                      }}
                    />
                    <Chip
                      size="small"
                      label={todo.category}
                      variant="outlined"
                    />
                    {todo.labels.map((label) => (
                      <Chip
                        key={label}
                        size="small"
                        label={label}
                        variant="outlined"
                        sx={{ borderRadius: 1 }}
                      />
                    ))}
                  </Stack>

                  <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      {todo.assignedTo && todo.assignedTo.length > 0 && (
                        <AvatarGroup max={3} sx={{ '& .MuiAvatar-root': { width: 24, height: 24, fontSize: '0.8rem' } }}>
                          {todo.assignedTo.map((userId) => (
                            <Tooltip key={userId} title={`User ${userId}`}>
                              <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                                {userId[0].toUpperCase()}
                              </Avatar>
                            </Tooltip>
                          ))}
                        </AvatarGroup>
                      )}
                      {todo.dueDate && (
                        <Typography variant="caption" color="text.secondary">
                          Due: {new Date(todo.dueDate).toLocaleDateString()}
                          {todo.dueTime && ` ${todo.dueTime}`}
                        </Typography>
                      )}
                    </Box>
                    {todo.subtasks.length > 0 && (
                      <Chip
                        size="small"
                        label={`${todo.subtasks.filter(st => st.completed).length}/${todo.subtasks.length} subtasks`}
                        variant="outlined"
                      />
                    )}
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Menus and Dialogs */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => selectedTodo && handleDelete(selectedTodo)}>
          <DeleteOutlineIcon sx={{ mr: 1 }} /> Delete
        </MenuItem>
      </Menu>

      <Menu
        anchorEl={filterAnchorEl}
        open={Boolean(filterAnchorEl)}
        onClose={() => setFilterAnchorEl(null)}
      >
        <MenuItem>All Tasks</MenuItem>
        <MenuItem>My Tasks</MenuItem>
        <MenuItem>Completed</MenuItem>
        <MenuItem>In Progress</MenuItem>
        <MenuItem>Pending</MenuItem>
      </Menu>

      <Menu
        anchorEl={sortAnchorEl}
        open={Boolean(sortAnchorEl)}
        onClose={() => setSortAnchorEl(null)}
      >
        <MenuItem>Due Date</MenuItem>
        <MenuItem>Priority</MenuItem>
        <MenuItem>Created Date</MenuItem>
        <MenuItem>Status</MenuItem>
      </Menu>

      {/* Comments Dialog */}
      <Dialog 
        open={commentDialog} 
        onClose={() => setCommentDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ForumIcon />
            Comments
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mb: 2 }}>
            {selectedTodo && todos.find(t => t.id === selectedTodo)?.comments.map((comment) => (
              <Paper
                key={comment.id}
                sx={{ 
                  p: 2, 
                  mb: 1, 
                  bgcolor: alpha(theme.palette.background.paper, 0.6)
                }}
              >
                <Typography variant="body2">{comment.text}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {new Date(comment.createdAt).toLocaleString()}
                </Typography>
              </Paper>
            ))}
          </Box>
          <TextField
            fullWidth
            multiline
            rows={3}
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCommentDialog(false)}>Cancel</Button>
          <Button 
            onClick={handleAddComment}
            variant="contained"
            disabled={!newComment.trim()}
          >
            Add Comment
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default TodoList; 