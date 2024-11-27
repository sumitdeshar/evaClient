import { Button, Table, Image, Flex } from "antd";
import { useState } from "react";
import "./eventTable.css";

export default function EventTable(prop) {
  const { events, handleEventDetailView, handleDelete } = prop;
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  console.log(`${events}`);
  const columns = [
    {
      title: "Vehicle Image",
      dataIndex: "image",
      key: "image",
      render: (_, event) => (
        <Image
          src={event.event_images[0]?.image_path || "https://picsum.photos/200"}
          width={80}
          className="vehicle-image"
          preview={true}
        />
      ),
      width: 100,
    },
    {
      title: "Vehicle ID",
      dataIndex: "event_vehicle",
      key: "vehicle_id",
      render: (vehicle) => `${vehicle.id || ""} `,
      align: "center",
    },
    {
      title: "Arrival Status",
      dataIndex: "event_vehicle",
      key: "arrival_status",
      render: (vehicle) => `${vehicle.arrival_status || "--"}`,
      align: "center",
    },
    {
      title: "Speed",
      dataIndex: "event_vehicle",
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
      dataIndex: "Actions",
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

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys, selectedRows) => {
      const selectedIds = selectedRows.map((row) => row.id);
      setSelectedRowKeys(selectedIds);
      console.log("Selected Row IDs:", selectedIds);
    },
  };

  const hasSelected = selectedRowKeys.length > 0;

  return (
    <Flex gap="middle" vertical>
      <h2 className="event-title">Event List</h2>
      <Flex align="center" gap="middle">
        <Button
          type="primary"
          color="danger"
          onClick={() => handleDelete(selectedRowKeys)} // Pass selected keys to delete handler
          disabled={!hasSelected}
        >
          Delete
        </Button>
        {hasSelected ? `Selected ${selectedRowKeys.length} items` : null}
      </Flex>
      <Table
        columns={columns}
        dataSource={events}
        pagination={false}
        rowKey={(event) => event.id}
        bordered
        rowSelection={rowSelection} // Enable row selection
        className="event-table"
      />
    </Flex>
  );
}
// <div className="event-table-container">
//   <h2 className="event-title">Event List</h2>
//   <Button
//     type="primary"
//     onClick={start}
//     disabled={!hasSelected}
//     loading={loading}
//   >
//     Reload
//   </Button>
//   {hasSelected ? `Selected ${selectedRowKeys.length} items` : null}
//   {console.log(selectedRowKeys)}
//   <Table
//     columns={columns}
//     dataSource={events}
//     pagination={false}
//     rowKey={(event) => event.id}
//     bordered
//     rowSelection={selectedRowKeys}
//     className="event-table"
//   />
// </div>
//   );
// }
