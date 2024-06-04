import TaskList from '@/components/TaskList'
import TaskFormCustom from '@/components/TaskFormCustom'

export const dynamic = 'force-dynamic'

const TasksyPage = () => {
  return (
    <div className="max-w-lg">
      <TaskFormCustom />
      <TaskList />
    </div>
  )
}

export default TasksyPage