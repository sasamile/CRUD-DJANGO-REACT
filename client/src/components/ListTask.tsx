import { Button, ListGroup } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export interface Task {
  id: number;
  title: string;
  description: string;
  done: boolean;
}

function ListTask() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);

  const getTasks = async () => {
    const res = await fetch("http://localhost:8000/tasks/api/v1/tasks/");
    const data = await res.json();
    setTasks(data);
  };

  const handleDelete = async (id: number) => {
    await fetch(`http://localhost:8000/tasks/api/v1/tasks/${id}/`, {
      method: "DELETE",
    });
    setTasks(tasks.filter((task) => task.id !== id));
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div>
      <h1 className="text-center p-3">Task</h1>
      <ListGroup className="container">
        {tasks.map((task, index) => (
          <ListGroup.Item key={index}>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h1>{task.title}</h1>
                <p>{task.description}</p>
              </div>
              <div>
                {task.done ? (
                  <Button variant="success" className="m-3">
                    Completed
                  </Button>
                ) : (
                  <Button variant="secondary" className="m-3">
                    Pendiente
                  </Button>
                )}
                <Button
                  variant="warning"
                  className="m-3"
                  onClick={() => navigate(`/${task.id}/edit`)}
                >
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDelete(task.id)}>
                  Delete
                </Button>
              </div>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default ListTask;
