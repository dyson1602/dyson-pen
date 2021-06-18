import './action-bar.css'
import { useActions } from '../hooks/use-actions';
import ActionBarButton from './action-bar-button';

interface ActionBarProps {
  id: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  const { moveCell, deleteCell } = useActions();

  return (
    <div className="action-bar">
      <ActionBarButton clickAction={() => moveCell(id, 'up')} icon="arrow-up" />
      <ActionBarButton
        clickAction={() => moveCell(id, 'down')}
        icon="arrow-down"
      />
      <ActionBarButton clickAction={() => deleteCell(id)} icon="times" />
    </div>
  );
};

export default ActionBar;
