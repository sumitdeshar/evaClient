import { Pagination } from "antd";

export default function EventPagination(prop) {
  const { currentPage, npage, paginate, eventsPerPage } = prop;

  return (
    <nav>
      <Pagination
        className="justify-content-center"
        current={currentPage}
        total={(npage || 1) * (eventsPerPage || 1)} // Fallback to avoid NaN
        pageSize={eventsPerPage || 1} // Ensure a valid pageSize
        onChange={(page) => paginate(page)}
        showSizeChanger={false}
        showQuickJumper={false}
      />
    </nav>
  );
}
