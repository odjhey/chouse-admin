import React from "react";
import {
  useTable,
  useSortBy,
  useAsyncDebounce,
  useGlobalFilter,
  useFilters,
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

const ColumnFilter = ({ column: { filterValue, setFilter, filter } }) => {
  return (
    <input
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${filter ? filter : ""}...`}
    />
  );
};

const Table = (props: { columns: any; data: any }) => {
  const { columns, data } = props;

  // functions to run when a column is filtered depending on the type
  const filterTypes = {
    text: (rows, id, filterValue) => {
      return rows.filter((row) => {
        const rowValue = row.values[id];
        return rowValue !== undefined
          ? String(rowValue)
              .toLowerCase()
              .startsWith(String(filterValue).toLowerCase())
          : true;
      });
    },
  };
  const defaultColumn = {
    // Let's set up our default Filter UI
    Filter: ColumnFilter,
  };

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
      //@ts-ignore
      defaultColumn,
      filterTypes,
    },
    useGlobalFilter,
    useFilters,
    useSortBy
  );

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((hg) => (
          <tr {...hg.getHeaderGroupProps()}>
            {hg.headers.map((col, idx) => {
              //@ts-ignore
              const { canFilter, render } = col;

              return (
                <th key={`th-${idx}`}>
                  {/* 
                     // @ts-ignore */}
                  <div {...col.getHeaderProps(col.getSortByToggleProps())}>
                    {render("Header")}
                    <span>
                      {
                        //@ts-ignore
                        col.isSorted ? (col.isSortedDesc ? "▾" : "▴") : ""
                      }
                    </span>
                  </div>
                  <div>{canFilter ? render("Filter") : null}</div>
                </th>
              );
            })}
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
