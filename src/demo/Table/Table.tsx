type TableProp = {
  headers: Array<string | number>;
  body: Array<Array<string | number>>;
};

export const Table = ({ headers, body }: TableProp) => {
  return (
    <table>
      <thead>
        <tr>
          {headers.map((heading) => {
            return <th key={heading}>{heading}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {body.map((row, idx) => {
          return (
            <tr key={idx}>
              {row.map((entry, ridx) => {
                return <td key={(idx + 1) * ridx}>{entry}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
