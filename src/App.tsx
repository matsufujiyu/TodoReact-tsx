import React, { useState } from "react";
import "./App.css";

function App() {
  const [inputTitle, setInputTitle] = useState("");
  const [inputDetail, setInputDetail] = useState("");
  //todo配列オブジェクトの更新用に用意。プロパティはinputValue, id, checkedの３つを更新する。
  const [todos, setTodos] = useState<Todo[]>([]);
  const [show, setShow] = useState(false);

  type Todo = {
    inputValue: {
      title: string;
      detail: string;
    };
    id: number; //keyを指定するため
    checked: boolean;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTitle(e.target.value);
  };
  const handleChange2 = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputDetail(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //新しいTodo作成
    const newTodo: Todo = {
      inputValue: { title: inputTitle, detail: inputDetail },
      id: todos.length,
      checked: false,
    };
    setTodos([...todos, newTodo]);
    setInputTitle("");
    setInputDetail("");
  };

  const handleEdit = (id: number, editTitel: string) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.inputValue.title = editTitel;
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const handleEdit2 = (id: number, editDetail: string) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.inputValue.detail = editDetail;
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const handleChecked = (id: number, checked: boolean) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.checked = !checked;
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const clickToggle = (id: number) => {
    if (todos.filter((todo) => todo.id === id)) {
      setShow(!show);
    }
  };

  const handleDelete = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  return (
    <div className="App">
      <div>
        <h2>TodoList</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <p className="title">タイトル</p>
          <input
            type="text"
            onChange={(e) => handleChange(e)}
            value={inputTitle}
            className="inputTitle"
          />
          <p className="detail">詳細</p>
          <textarea
            name="postContent"
            rows={4}
            cols={40}
            onChange={(e) => handleChange2(e)}
            value={inputDetail}
            className="inputDetail"
          ></textarea>
          <br></br>
          <input type="submit" value="作成" />
        </form>

        <ul className="todoList">
          {todos.map((todo) => (
            <li key={todo.id}>
              <div className="list">
                <input
                  type="text"
                  value={todo.inputValue.title}
                  onChange={(e) => handleEdit(todo.id, e.target.value)}
                  disabled={todo.checked}
                />

                <input
                  type="checkbox"
                  onChange={(e) => handleChecked(todo.id, todo.checked)}
                />
                <button
                  onClick={(e) => clickToggle(todo.id)}
                  className="detailbutton"
                >
                  詳細
                </button>
                <button
                  onClick={() => handleDelete(todo.id)}
                  className="deletebutton"
                >
                  削除
                </button>
              </div>
              {show && (
                <p>
                  <textarea
                    name="postContent"
                    rows={4}
                    cols={40}
                    value={todo.inputValue.detail}
                    onChange={(e) => handleEdit2(todo.id, e.target.value)}
                    disabled={todo.checked}
                  />
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
