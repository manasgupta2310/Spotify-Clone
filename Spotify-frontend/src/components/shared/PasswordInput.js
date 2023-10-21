const TextInput = (props) => {
  return (
    <div className="textInputDiv flex flex-col space-y-2 w-full">
      <label for={props.label} className="font-semibold">
        {props.label}
      </label>
      <input
        className="p-2 border rounded border-solid border-gray-400"
        type="password"
        placeholder={props.placeholder}
        id={props.label}
        value={props.value}
        onChange={(event) => {
          props.setValue(event.target.value);
        }}
      />
    </div>
  );
};

export default TextInput;
