export const CheckboxRadio = ({ id, labelText, register, type, errors, rules, value, name }) => {
  return (
    <div className="mb-4">
      <div className="flex items-center">
        <input
          className={`mr-2 ${errors[name] ? 'border-red-500' : ''}`}
          type={type}
          name={name}
          id={id}
          value={value}
          {...register(name, rules)}
        />
        <label className="text-gray-700" htmlFor={id}>
          {labelText}
        </label>
      </div>
      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">{errors[name]?.message}</p>
      )}
    </div>
  );
};

export const Input = ({ id, labelText, register, type, errors, rules }) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-gray-700 mb-2">
        {labelText}
      </label>
      <input
        id={id}
        type={type}
        className={`border rounded p-2 w-full ${errors[id] ? 'border-red-500' : ''}`}
        {...register(id, rules)}
      />
      {errors[id] && (
        <p className="text-red-500 text-sm mt-1">{errors[id]?.message}</p>
      )}
    </div>
  );
};

export const Select = ({ id, labelText, register, errors, rules, children, disabled = false }) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-gray-700 mb-2">
        {labelText}
      </label>
      <select
        id={id}
        className={`border rounded p-2 w-full ${errors[id] ? 'border-red-500' : ''}`}
        {...register(id, rules)}
        disabled={disabled}
      >
        {children}
      </select>
      {errors[id] && (
        <p className="text-red-500 text-sm mt-1">{errors[id]?.message}</p>
      )}
    </div>
  );
};