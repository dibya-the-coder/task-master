import {
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
  alpha,
  IconButton,
  Tooltip,
  Autocomplete,
  Switch,
  FormControlLabel,
  Divider,
  Avatar,
  List,
  ListItem,
  ListItemText,
  InputAdornment
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addTodo, addCategory, addLabel, SubTask } from '../store/todoSlice';
import { v4 as uuidv4 } from 'uuid';

// Icons
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import FlagIcon from '@mui/icons-material/Flag';
import CategoryIcon from '@mui/icons-material/Category';
import LabelIcon from '@mui/icons-material/Label';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import NotificationsIcon from '@mui/icons-material/Notifications';
import RepeatIcon from '@mui/icons-material/Repeat';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const priorityColors = {
  low: '#22c55e',
  medium: '#f59e0b',
  high: '#ef4444'
};

const colorOptions = [
  '#ef4444', '#f97316', '#f59e0b', '#84cc16', 
  '#22c55e', '#14b8a6', '#3b82f6', '#6366f1'
];

const recurringOptions = [
  { value: 'none', label: 'No Repeat' },
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' }
] as const;

// Mock users for demo
const users = [
  { id: '1', name: 'John Doe', avatar: '👨‍💼' },
  { id: '2', name: 'Jane Smith', avatar: '👩‍💼' },
  { id: '3', name: 'Mike Johnson', avatar: '👨‍💻' },
];

const AddTodo = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const categories = useAppSelector(state => state.todo.categories);
  const labels = useAppSelector(state => state.todo.labels);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [dueDate, setDueDate] = useState('');
  const [dueTime, setDueTime] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [subtasks, setSubtasks] = useState<SubTask[]>([]);
  const [newSubtask, setNewSubtask] = useState('');
  const [assignedUsers, setAssignedUsers] = useState<string[]>([]);
  const [recurring, setRecurring] = useState<'none' | 'daily' | 'weekly' | 'monthly'>('none');
  const [reminder, setReminder] = useState(false);
  const [selectedColor, setSelectedColor] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);

  // Dialogs
  const [newCategoryDialog, setNewCategoryDialog] = useState(false);
  const [newLabelDialog, setNewLabelDialog] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [newLabel, setNewLabel] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const todo = {
      id: uuidv4(),
      title: title.trim(),
      description: description.trim(),
      priority,
      dueDate,
      dueTime,
      status: 'pending' as const,
      category,
      createdAt: new Date().toISOString(),
      assignedTo: assignedUsers,
      labels: selectedLabels,
      attachments: attachments.map(file => file.name),
      subtasks,
      comments: [],
      reminder: reminder ? new Date().toISOString() : undefined,
      recurring,
      color: selectedColor,
    };

    dispatch(addTodo(todo));
    navigate('/todos');
  };

  const handleAddSubtask = () => {
    if (newSubtask.trim()) {
      setSubtasks([
        ...subtasks,
        { id: uuidv4(), title: newSubtask.trim(), completed: false }
      ]);
      setNewSubtask('');
    }
  };

  const handleRemoveSubtask = (id: string) => {
    setSubtasks(subtasks.filter(task => task.id !== id));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments([...attachments, ...Array.from(e.target.files)]);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper 
        elevation={0} 
        sx={{ 
          p: 4, 
          borderRadius: 3,
          background: theme.palette.mode === 'dark' 
            ? alpha(theme.palette.background.paper, 0.8)
            : alpha(theme.palette.background.paper, 0.9),
          backdropFilter: 'blur(10px)',
          border: `1px solid ${theme.palette.mode === 'dark' 
            ? alpha(theme.palette.common.white, 0.1)
            : alpha(theme.palette.common.black, 0.1)}`,
        }}
      >
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography 
            variant="h4" 
            gutterBottom 
            sx={{ 
              fontWeight: 700,
              background: theme.palette.mode === 'dark'
                ? 'linear-gradient(45deg, #60a5fa, #818cf8)'
                : 'linear-gradient(45deg, #3b82f6, #6366f1)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Create New Task
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Add a new task with all the details you need to track
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            {/* Basic Info Section */}
            <Box>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Basic Information
              </Typography>
              <Stack spacing={3}>
                <TextField
                  label="Task Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  fullWidth
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    }
                  }}
                />

                <TextField
                  label="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  multiline
                  rows={4}
                  fullWidth
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    }
                  }}
                />
              </Stack>
            </Box>

            <Divider />

            {/* Date and Priority Section */}
            <Box>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Schedule & Priority
              </Typography>
              <Stack spacing={3}>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <TextField
                    type="date"
                    label="Due Date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    sx={{ flex: 1, minWidth: 200 }}
                  />
                  <TextField
                    type="time"
                    label="Due Time"
                    value={dueTime}
                    onChange={(e) => setDueTime(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    sx={{ flex: 1, minWidth: 200 }}
                  />
                </Box>

                <FormControl sx={{ minWidth: 200 }}>
                  <InputLabel>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <FlagIcon fontSize="small" />
                      Priority
                    </Box>
                  </InputLabel>
                  <Select
                    value={priority}
                    label="⚑ Priority"
                    onChange={(e) => setPriority(e.target.value as any)}
                    sx={{ borderRadius: 2 }}
                  >
                    {(['low', 'medium', 'high'] as const).map((p) => (
                      <MenuItem key={p} value={p}>
                        <Chip 
                          label={p.charAt(0).toUpperCase() + p.slice(1)} 
                          size="small" 
                          sx={{ 
                            bgcolor: priorityColors[p],
                            color: '#fff',
                            textTransform: 'capitalize',
                          }} 
                        />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>
            </Box>

            <Divider />

            {/* Categories and Labels Section */}
            <Box>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Categories & Labels
              </Typography>
              <Stack spacing={3}>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                  <FormControl fullWidth>
                    <InputLabel>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CategoryIcon fontSize="small" />
                        Category
                      </Box>
                    </InputLabel>
                    <Select
                      value={category}
                      label="Category"
                      onChange={(e) => setCategory(e.target.value)}
                      sx={{ borderRadius: 2 }}
                    >
                      {categories.map((cat) => (
                        <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <Tooltip title="Add New Category">
                    <IconButton
                      onClick={() => setNewCategoryDialog(true)}
                      sx={{ 
                        bgcolor: theme.palette.primary.main,
                        color: 'white',
                        '&:hover': {
                          bgcolor: theme.palette.primary.dark,
                        }
                      }}
                    >
                      <AddIcon />
                    </IconButton>
                  </Tooltip>
                </Box>

                <Autocomplete
                  multiple
                  options={labels}
                  value={selectedLabels}
                  onChange={(_, newValue) => setSelectedLabels(newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <LabelIcon fontSize="small" />
                          Labels
                        </Box>
                      }
                    />
                  )}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        label={option}
                        {...getTagProps({ index })}
                        sx={{ borderRadius: 1 }}
                      />
                    ))
                  }
                />
              </Stack>
            </Box>

            <Divider />

            {/* Subtasks Section */}
            <Box>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Subtasks
              </Typography>
              <Stack spacing={2}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <TextField
                    fullWidth
                    size="small"
                    value={newSubtask}
                    onChange={(e) => setNewSubtask(e.target.value)}
                    placeholder="Add a subtask"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CheckBoxOutlineBlankIcon fontSize="small" />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Button
                    variant="contained"
                    onClick={handleAddSubtask}
                    sx={{ minWidth: 'auto', px: 2 }}
                  >
                    <AddIcon />
                  </Button>
                </Box>

                <List>
                  {subtasks.map((task) => (
                    <ListItem
                      key={task.id}
                      secondaryAction={
                        <IconButton 
                          edge="end" 
                          onClick={() => handleRemoveSubtask(task.id)}
                          size="small"
                        >
                          <DeleteOutlineIcon />
                        </IconButton>
                      }
                    >
                      <ListItemText primary={task.title} />
                    </ListItem>
                  ))}
                </List>
              </Stack>
            </Box>

            <Divider />

            {/* Additional Options Section */}
            <Box>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Additional Options
              </Typography>
              <Stack spacing={3}>
                {/* Assigned Users */}
                <Autocomplete
                  multiple
                  options={users}
                  getOptionLabel={(option) => option.name}
                  value={users.filter(user => assignedUsers.includes(user.id))}
                  onChange={(_, newValue) => {
                    setAssignedUsers(newValue.map(user => user.id));
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <GroupAddIcon fontSize="small" />
                          Assign To
                        </Box>
                      }
                    />
                  )}
                  renderOption={(props, option) => (
                    <li {...props}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar sx={{ width: 24, height: 24 }}>{option.avatar}</Avatar>
                        {option.name}
                      </Box>
                    </li>
                  )}
                />

                {/* Recurring Option */}
                <FormControl fullWidth>
                  <InputLabel>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <RepeatIcon fontSize="small" />
                      Recurring
                    </Box>
                  </InputLabel>
                  <Select
                    value={recurring}
                    label="Recurring"
                    onChange={(e) => setRecurring(e.target.value as any)}
                  >
                    {recurringOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {/* Color Selection */}
                <Box>
                  <Typography variant="subtitle2" gutterBottom>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <ColorLensIcon fontSize="small" />
                      Color Tag
                    </Box>
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {colorOptions.map((color) => (
                      <IconButton
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        sx={{
                          bgcolor: color,
                          width: 32,
                          height: 32,
                          border: selectedColor === color ? 2 : 0,
                          borderColor: 'white',
                          '&:hover': {
                            bgcolor: color,
                          }
                        }}
                      />
                    ))}
                  </Box>
                </Box>

                {/* Attachments */}
                <Box>
                  <Button
                    component="label"
                    variant="outlined"
                    startIcon={<AttachFileIcon />}
                    sx={{ mb: 2 }}
                  >
                    Add Attachments
                    <input
                      type="file"
                      hidden
                      multiple
                      onChange={handleFileChange}
                    />
                  </Button>
                  {attachments.length > 0 && (
                    <Box sx={{ ml: 2 }}>
                      {attachments.map((file, index) => (
                        <Chip
                          key={index}
                          label={file.name}
                          onDelete={() => {
                            setAttachments(attachments.filter((_, i) => i !== index));
                          }}
                          sx={{ mr: 1, mb: 1 }}
                        />
                      ))}
                    </Box>
                  )}
                </Box>

                {/* Reminder Switch */}
                <FormControlLabel
                  control={
                    <Switch
                      checked={reminder}
                      onChange={(e) => setReminder(e.target.checked)}
                    />
                  }
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <NotificationsIcon fontSize="small" />
                      Set Reminder
                    </Box>
                  }
                />
              </Stack>
            </Box>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              size="large"
              startIcon={<SaveIcon />}
              sx={{
                mt: 2,
                py: 1.5,
                borderRadius: 2,
                background: 'linear-gradient(45deg, #3b82f6, #6366f1)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #2563eb, #4f46e5)',
                }
              }}
            >
              Create Task
            </Button>
          </Stack>
        </form>
      </Paper>

      {/* Dialogs */}
      <Dialog 
        open={newCategoryDialog} 
        onClose={() => setNewCategoryDialog(false)}
        PaperProps={{
          sx: {
            borderRadius: 3,
            bgcolor: theme.palette.mode === 'dark' 
              ? alpha(theme.palette.background.paper, 0.8)
              : alpha(theme.palette.background.paper, 0.9),
            backdropFilter: 'blur(10px)',
          }
        }}
      >
        <DialogTitle>Add New Category</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Category Name"
            fullWidth
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setNewCategoryDialog(false)}>Cancel</Button>
          <Button 
            onClick={() => {
              if (newCategory.trim()) {
                dispatch(addCategory(newCategory.trim()));
                setCategory(newCategory.trim());
                setNewCategory('');
                setNewCategoryDialog(false);
              }
            }} 
            variant="contained"
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog 
        open={newLabelDialog} 
        onClose={() => setNewLabelDialog(false)}
        PaperProps={{
          sx: {
            borderRadius: 3,
            bgcolor: theme.palette.mode === 'dark' 
              ? alpha(theme.palette.background.paper, 0.8)
              : alpha(theme.palette.background.paper, 0.9),
            backdropFilter: 'blur(10px)',
          }
        }}
      >
        <DialogTitle>Add New Label</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Label Name"
            fullWidth
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setNewLabelDialog(false)}>Cancel</Button>
          <Button 
            onClick={() => {
              if (newLabel.trim()) {
                dispatch(addLabel(newLabel.trim()));
                setSelectedLabels([...selectedLabels, newLabel.trim()]);
                setNewLabel('');
                setNewLabelDialog(false);
              }
            }} 
            variant="contained"
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AddTodo; 