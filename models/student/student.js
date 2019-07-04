let buildMakeStudent = function({schema}) {
  return ({
    name,
    age,
    grade,
    prefect = false
  } = {}) => {
    const {error} = schema.validate({name, age, grade, prefect})
    if (error) throw new Error(error)

    return {
      getName: () => name,
      getAge: () => age,
      getGrade: () => grade,
      isPrefect: () => prefect
    }
  }
}

module.exports = buildMakeStudent