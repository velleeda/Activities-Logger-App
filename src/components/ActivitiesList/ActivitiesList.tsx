import deleteImg from "../../assets/img/delete_black.svg";
import { useCRUD } from "../../contexts/CRUD";
import { api } from "../../services/api";

export function Activity(props: any) {
  const { time, type, date, id } = props;

  const { getActivity } = useCRUD();

  const handleDeleteActivity = async (activityId: number) => {
    if (window.confirm("Are you sure you want to delete this log?")) {
      await api.delete(`activities/${activityId}`);
    }
    getActivity();
  };

  return (
    <tr>
      <td>{time}</td>
      <td>{type}</td>
      <td>
        <span>{date}</span>
        <span className="td-img">
          <img
            src={deleteImg}
            alt="Remover atividade"
            onClick={() => handleDeleteActivity(id)}
          />
        </span>
      </td>
    </tr>
  );
}
