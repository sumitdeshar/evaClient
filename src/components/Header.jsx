import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";

const { Header: AntHeader } = Layout;

export default function Header() {
  const navigate = useNavigate();

  return (
    <AntHeader style={{ backgroundColor: "#1890ff" }} className="mb-4">
      <div
        style={{
          color: "white",
          fontSize: "1.5rem",
          fontWeight: "bold",
          cursor: "pointer",
          display: "inline-block",
          marginRight: "20px",
        }}
        onClick={() => navigate("/")}
      >
        Event Visualization App
      </div>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["home"]}
        style={{ backgroundColor: "inherit", display: "inline-block" }}
      >
        <Menu.Item key="home" onClick={() => navigate("/")}>
          Home
        </Menu.Item>
        <Menu.Item key="projects" onClick={() => navigate("/projects")}>
          Projects
        </Menu.Item>
        <Menu.Item key="settings" onClick={() => navigate("/config")}>
          Settings
        </Menu.Item>
        <Menu.Item key="about">
          <a href="#">About</a>
        </Menu.Item>
        <Menu.Item key="contact">
          <a href="#">Contact</a>
        </Menu.Item>
      </Menu>
    </AntHeader>
  );
}
