import { Pagination } from "antd";

export default function EventPagination(prop) {
  const { currentPage, npage, paginate, eventsPerPage } = prop;

  return (
    <nav>
      <Pagination
        className="justify-content-center"
        current={currentPage}
        total={npage * eventsPerPage}
        pageSize={eventsPerPage}
        onChange={(page) => paginate(page)}
        showSizeChanger={false}
        showQuickJumper={false}
      />
    </nav>
  );
}
