import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

function CreateNew() {
  const navigate = useNavigate();
  const params = useParams();

  const [editing, setEditing] = useState(false);
  const [formTask, setFormTask] = useState({
    title: "",
    description: "",
    done: false,
  });

  const handleChange = (event: any) => {
    const { name, value, type, checked } = event.target;
    setFormTask({
      ...formTask,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const loadTask = async (id: number) => {
    const res = await fetch(`http://localhost:8000/tasks/api/v1/tasks/${id}`);
    const data = await res.json();
    setFormTask(data);
    setEditing(true);
  };

  const handlesubmit = async (event: any) => {
    event.preventDefault();
    try {
      if (editing) {
        await fetch(`http://localhost:8000/tasks/api/v1/tasks/${params.id}/`, {
          method: "PATCH",
          body: JSON.stringify(formTask),
          headers: {
            "Content-Type": "application/json",
          },
        });

        navigate("/");
      } else {
        await fetch("http://localhost:8000/tasks/api/v1/tasks/", {
          method: "POST",
          body: JSON.stringify(formTask),
          headers: {
            "Content-Type": "application/json",
          },
        });
        setEditing(false);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setEditing(false);
    }
  };

  useEffect(() => {
    if (params.id) {
      loadTask(Number(params.id));
    }
  }, [params.id]);

  return (
    <div>
      <h1 className="text-center p-3">Create New Task</h1>
      <div>
        <Form className="container " onSubmit={handlesubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Title Task</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formTask.title}
              placeholder="name@example.com"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              onChange={handleChange}
              value={formTask.description}
              name="description"
              rows={3}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              name="done"
              checked={formTask.done}
              onChange={handleChange}
              label="Done"
            />
          </Form.Group>
          <Button variant="primary" type="submit" disabled={!formTask.title && !formTask.description}>
            {editing ? "Edit" : "Create"}
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default CreateNew;
