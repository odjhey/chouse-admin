import React from "react";
import {
  useTable,
  useSortBy,
  useAsyncDebounce,
  useGlobalFilter,
} from "react-table";

const GlobalFilterComponent = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}: any) => {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value: any) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <span>
      Search:{" "}
      <input
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
        style={{
          fontSize: "1.1rem",
          border: "0",
        }}
      />
    </span>
  );
};

const Table = (props: { columns: any; data: any }) => {
  const { columns, data } = props;
  const {
    getTableProps,
    getTableBodyProps,
    rows,
    prepareRow,
    visibleColumns,
    headerGroups,
    //@ts-ignore
    preGlobalFilteredRows,
    //@ts-ignore
    setGlobalFilter,
    //@ts-ignore
    globalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy
  );

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((hg) => (
          <tr {...hg.getHeaderGroupProps()}>
            {hg.headers.map((col) => (
              //@ts-ignore
              <th {...col.getHeaderProps(col.getSortByToggleProps())}>
                {col.render("Header")}
                <span>
                  {
                    //@ts-ignore
                    col.isSorted ? (col.isSortedDesc ? "▾" : "▴") : ""
                  }
                </span>
              </th>
            ))}
          </tr>
        ))}
        <tr>
          <th
            colSpan={visibleColumns.length}
            style={{
              textAlign: "left",
            }}
          >
            <GlobalFilterComponent
              preGlobalFilteredRows={preGlobalFilteredRows}
              globalFilter={globalFilter}
              setGlobalFilter={setGlobalFilter}
            />
          </th>
        </tr>
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, _i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const LinkCell = ({ value, column: { getProps }, row }: any) => {
  return getProps().linkWrapperFn(value, row.values);
};

export { LinkCell };
export default Table;
