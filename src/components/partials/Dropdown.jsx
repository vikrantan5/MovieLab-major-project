const Dropdown = ({ title, options, func, value }) => {
  return (
    <select
      defaultValue={value || '0'}
      onChange={func}
      className="select-modern"
      aria-label={title}
    >
      <option value="0" disabled>
        {title}
      </option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o.toString().replace(/_/g, ' ').toUpperCase()}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
