const _serializeSingle = (teacher) => {
  return {
    'id': teacher.serial,
    'name': teacher.name,
    'subject': teacher.class,
    'tenure': teacher.tenure
  };
};

const serializer = (data) => {
  if (!data) {
    return null
  }
  if (Array.isArray(data)) {
    return data.map(_serializeSingle)
  }
  return _serializeSingle(data)
}

module.exports = serializer
