import { Table, Image, Checkbox } from "antd";
import "./eventTable.css";

export default function EventTable(prop) {
  const { events, handleEventDetailView } = prop;
  const columns = [
    {
      title: <Checkbox />,
      dataIndex: "select",
      key: "select",
      render: () => <Checkbox />,
      width: 50,
      align: "center",
    },
    {
      title: "Vehicle Image",
      dataIndex: "image",
      key: "image",
      render: (_, event) => (
        <Image
          src={event.event_images[0]?.url || "https://picsum.photos/200"}
          width={80}
          className="vehicle-image"
          preview={false}
        />
      ),
      width: 100,
    },
    {
      title: "Vehicle ID",
      dataIndex: "vehicle_id",
      key: "vehicle_id",
      align: "center",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (text) => (text ? "Arriving" : "Leaving"),
      align: "center",
    },
    {
      title: "Speed",
      dataIndex: "vehicle",
      key: "speed",
      render: (vehicle) => `${vehicle.speed_kph || "--"} km/h`,
      align: "center",
    },
    {
      title: "Date",
      dataIndex: "created_at",
      key: "date",
      render: (date) =>
        new Date(date).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
      align: "center",
    },
    {
      title: "Time",
      dataIndex: "created_at",
      key: "time",
      render: (date) =>
        new Date(date).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      align: "center",
    },
    {
      title: (
        <span role="img" aria-label="Actions">
          📋📃
        </span>
      ),
      dataIndex: "actions",
      key: "actions",
      render: (_, event) => (
        <span
          className="details-link"
          onClick={() => handleEventDetailView(event)}
        >
          Details
        </span>
      ),
      align: "center",
    },
  ];

  return (
    <div className="event-table-container">
      <h2 className="event-title">Event List</h2>
      <Table
        columns={columns}
        dataSource={events}
        pagination={false} // Let EventPagination handle pagination if needed
        rowKey={(event) => event.id}
        bordered
        className="event-table"
      />
    </div>
  );
}
