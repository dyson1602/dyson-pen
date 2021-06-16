import { DeleteCellAction, MoveCellAction } from '../state/actions';

interface ActionBarButtonProps {
  clickAction(): MoveCellAction | DeleteCellAction;
  icon: string;
}

const ActionBarButton: React.FC<ActionBarButtonProps> = ({
  clickAction,
  icon,
}) => {
  return (
    <button
      className="button is-primary is-small"
      onClick={() => clickAction()}
    >
      <i className={`fas fa-${icon}`} />
    </button>
  );
};

export default ActionBarButton;
