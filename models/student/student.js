let buildMakeStudent = function(studentValidator) {
  return ({
    name,
    age,
    grade,
    prefect = false
  } = {}) => {
    let {error} = studentValidator({name, age, grade, prefect})
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